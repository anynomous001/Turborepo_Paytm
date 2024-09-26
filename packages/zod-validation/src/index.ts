import z from 'zod'

export const signupInput = z.object({
    name: z.string().optional(),
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 chararters long"),
    number: z.string().min(10, "Number must be at least 10 chararters long")
})

export type SignupInputType = z.infer<typeof signupInput>

export const signinInput = z.object({
    name: z.string({ required_error: "Name is required" })
        .min(1, "Name is required"),

    email: z.string({ required_error: "Email is required" })
        .min(1, "Email is required")
        .email("Invalid Email"),

    password: z.string({ required_error: "Number is required" })
        .min(1, "Password is required")
        .min(5, "Password must be at least 5 chararters long"),

    number: z.string({ required_error: "Number is required" })
        .min(1, "Number is required")
        .min(10, "Number must be  10 chararters long")
        .max(10, "Number should not exceed 10 chararters")
})

export type SigninInputType = z.infer<typeof signupInput>