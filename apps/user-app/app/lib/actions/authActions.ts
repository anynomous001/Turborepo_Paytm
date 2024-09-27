"use server"

import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route"
import { signupInput, SignupInputType } from "@repo/zod/zodTypes"
import client from '@repo/db/client'
import { AuthError } from "next-auth"
import bcrypt from "bcrypt"




export async function handleCredentialsSignup({ email, password, number, name }: SignupInputType) {
    try {
        const parsedCredentials = signupInput.safeParse({ email, password, number, name })
        if (!parsedCredentials.success) {
            return { success: false, message: "Invalid data." }
        }
        // checking if the email is already taken
        const existingUser = await client.user.findUnique({
            where: {
                email,
            }
        })

        if (existingUser) {
            return { success: false, message: "Email already exists. Login to continue." };

        }
        const hashedPassword = await bcrypt.hash(password, 10)

        await client.user.create({
            data: {
                email,
                password: hashedPassword,
                number,
                name
            }
        })

        return { success: true, message: "Account created successfully." };


    } catch (error) {
        console.error("Error creating account:", error);
        return { success: false, message: "An unexpected error occurred. Please try again." };
    }
}






export async function handleCredentialsSignin({ email, password }: SignupInputType) {
    try {
        await signIn("credentials", { email, password, redirectTo: '/dashboard' })
    } catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case 'CredentialsSignin':
                    return {
                        message: "Invalid credentials"
                    }
                default:
                    return {
                        message: "Something went error"
                    }
            }

        }
        throw error
    }
}


export async function handleSignOut() {
    await signOut();
}

export async function handleGithubSignin() {
    await signIn("github", { redirectTo: "/dashboard" })
}
export async function handleGoogleSignin() {
    await signIn("google", { redirectTo: "/dashboard" })
}