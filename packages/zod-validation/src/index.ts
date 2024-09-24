import z from 'zod'

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 chararters long"),
    number: z.string().min(10, "Number must be at least 10 chararters long")
})

export type SignupInputType = z.infer<typeof signupInput>

export const signinInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 chararters long"),
    number: z.string().min(10, "Number must be at least 10 chararters long")
})

export type SigninInputType = z.infer<typeof signupInput>