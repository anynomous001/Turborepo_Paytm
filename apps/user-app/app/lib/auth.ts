import Credentials from 'next-auth/providers/credentials'
import bcrypt from 'bcrypt'
import client from "@repo/db/client"
import { signinInput } from '@repo/zod/zodTypes'
import Github from "next-auth/providers/github"
import Google from "next-auth/providers/google"

const publicRoutes = ["/auth/signin", "/auth/signup"]
const authRoutes = ["/auth/signin", "/auth/signup"]



export const authOptions = {
    providers: [
        Github,
        Google,
        Credentials({
            credentials: {
                number: { label: "Phone Number", type: "text", placeholder: "Phone Number" },
                password: { label: "Password", type: "password", placeholder: "Password" }
            },
            async authorize(credentials: any) {

                // const hashedPassword = await bcrypt.hash(credentials.password, 10)
                // const existingUser = await client.user.findFirst({
                //     where: {
                //         number: credentials.number
                //     }
                // });


                // if (existingUser) {
                //     const paswordValidation = await bcrypt.compare(credentials.password, existingUser.password)
                //     if (paswordValidation) {
                //         return {
                //             id: existingUser.id.toString(),
                //             name: existingUser.name,
                //             email: existingUser.email
                //         }
                //     }
                //     return null
                // }

                //     try {
                //         const user = await client.user.create({
                //             data: {
                //                 number: credentials.number,
                //                 password: credentials.password
                //             }
                //         })
                //         return {
                //             id: user.id.toString(),
                //             name: user.name,
                //             email: user.email
                //         }
                //     } catch (e) {
                //         console.error(e);
                //     }
                const parsedCredentials = signinInput.safeParse(credentials)
                if (!parsedCredentials.success) {
                    console.error("invalid credentials :", parsedCredentials.error.errors)

                    return null
                }


                let user = null

                user = {
                    id: '2',
                    role: "admin",
                    name: "Pritam Chakroborty",
                    email: "chakrobortypritam1@gmail.com"
                }

                if (!user) {
                    return null
                }

                return user
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
            console.log('Token:', token);
            console.log('Session:', session);
            session.user.id = token.id;
            session.user.role = token.role
            return session;
        },
        authorized({ request: { nextUrl }, auth }: any) {
            const isLoggedIn = !!auth?.user

            const { pathname } = nextUrl


            //Allow access to public routes to all users
            if (publicRoutes.includes(pathname)) {
                return true
            }

            //Re-direct logged-in users away from auth routes
            if (authRoutes.includes(pathname)) {
                if (isLoggedIn) {
                    return Response.redirect(new URL('/dashboard', nextUrl))
                }

                return true // Allow access to auth routes if user is not logged in
            }


            if (pathname.startsWith('/auth/signin') && isLoggedIn) {
                return Response.redirect(new URL('/dashboard', nextUrl))
            }

            return isLoggedIn; // AAllow access if the user is authenticated

        }
    }


}
