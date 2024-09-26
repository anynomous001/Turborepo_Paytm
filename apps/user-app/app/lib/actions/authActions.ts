"use server"

import { signIn, signOut } from "@/app/api/auth/[...nextauth]/route"
import { SignupInputType } from "@repo/zod/zodTypes"

import { AuthError } from "next-auth"

export async function handleCredentialsSignin({ email, password, number, name }: SignupInputType) {
    try {
        await signIn("credentials", { email, password, number, name, redirectTo: '/dashboard' })
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