import Credentials from 'next-auth/providers/credentials'
import bcryptjs from 'bcryptjs'
import client from "@repo/db/client"
import { signinInput } from '@repo/zod/zodTypes'
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

import { NextAuthConfig } from 'next-auth'


const publicRoutes = ["/auth/signin", "/auth/signup"]
const authRoutes = ["/auth/signin", "/auth/signup"]



export default {
    providers: [
        Github,
        Google,
        Credentials({
            credentials: {
                email: { label: "Email", type: "email", placeholder: "Email" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials: any) {

                const parsedCredentials = signinInput.safeParse(credentials)
                if (!parsedCredentials.success) {
                    console.error("invalid credentials :", parsedCredentials.error.errors)

                    return null
                }
                const user = await client.user.findUnique({
                    where: {
                        email: credentials.email as string
                    }
                })

                if (!user) {
                    console.log("Invalid credentials");
                    return null;
                }

                if (!user.password) {
                    console.log("User does not have password,may have auhtorized with any Oauth app.")
                    return null;
                }

                const isPasswordValid = await bcryptjs.compare(credentials.password as string, user.password)

                if (!isPasswordValid) {
                    console.log("Invalid password");
                    return null;
                }

                const { password, ...userWithoutPassword } = user;
                return userWithoutPassword;

            }
        })

    ],
    pages: {
        signIn: "/auth/signin",
        newUser: "/auth/signup",
    },

    callbacks: {
        /*
        You can update session data this way 
        it can also be updated by catching trigger from jwt,
        then from client component you can trigger update method and 
        update the session data.
        */
        jwt({ token, user }: any) {
            if (user) {
                /*This is another way of updating session data. */
                token.id = user.id as string
                token.role = user.role as string
            }
            return token
        },
        async session({ token, session }: any) {
            session.user.id = token.id;
            session.user.role = token.role
            return session;
        },
        authorized({ request: { nextUrl }, auth }: any) {

            const isLoggedIn = !!auth?.user
            const { pathname } = nextUrl

            if (publicRoutes.includes(pathname)) {
                return true
            }

            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/dashboard', nextUrl))
                }

                return true // Allow access to auth routes if user is not logged in
            }


            if (pathname.startsWith('/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }

            return isLoggedIn; // Allow access if the user is authenticated

        }
    }
} satisfies NextAuthConfig;