'use client'

import { Label } from '@/components/ui/label'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signupInput, SignupInputType } from '@repo/zod/zodTypes'
import { Input } from '@/components/ui/input'
import React from 'react'
import ErrorMessage from '@/app/components/error-message'
import LoadingButton from '@/app/components/loading-button'
import { handleCredentialsSignin, handleCredentialsSignup, handleGithubSignin, handleGoogleSignin } from '@/app/lib/actions/authActions'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { ServerActionResponse } from '@/types/actions';


const signup = () => {

    interface ValuesForSignIn {
        email: string,
        password: string
    }
    const [globalError, setGlobalError] = React.useState<string>("")

    const {
        handleSubmit,
        register,
        setError,
        formState: { errors, isSubmitting }
    } = useForm<SignupInputType>({
        resolver: zodResolver(signupInput),
        defaultValues: {
            number: "",
            password: "",
            name: "",
            email: "",
        }
    })

    const onSubmit = async (data: SignupInputType) => {
        try {

            const result: ServerActionResponse = await handleCredentialsSignup(data)
            if (result.success) {
                console.log("Account has created successfully.")

                const valuesForSignin = {
                    email: data.email,
                    password: data.password,
                }
                await handleCredentialsSignin(valuesForSignin)
            } else {
                setGlobalError(result.message);
            }
        } catch (error) {
            setGlobalError("An unexpected error occurred. Please try again.");
        }
    }

    return (
        <div className='w-full h-[100vh] flex justify-center items-center'>
            <div className='w-80 shadow-lg bg-slate-100 p-8 rounded-md'>
                <div className='text-center'>
                    <h1 className='mb-2 text-2xl text-gray-950 font-semibold'>Medium</h1>
                </div>
                <div className='mt-2'>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                        {globalError && <ErrorMessage error={globalError} />}
                        <Label htmlFor='name' className=''>
                            Name
                        </Label>
                        <Input className='bg-white' placeholder='John Doe' type='text' id='name' {...register('name')} />
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>
                        }
                        <Label htmlFor='password' className=''>
                            Password
                        </Label>
                        <Input className='bg-white' placeholder='******' type='password' id='password' {...register('password')} />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>
                        }
                        <Label htmlFor='number' className=''>
                            Number
                        </Label>
                        <Input className='bg-white' placeholder='98743532' type='text' id='number' {...register('number')} />
                        {errors.number && <p className='text-red-500'>{errors.number.message}</p>
                        }
                        <Label htmlFor='email' className=''>
                            Email
                        </Label>
                        <Input className='bg-white' placeholder='doejohn@gmail.com' type='email' id='email' {...register('email')} />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>
                        }
                        <LoadingButton
                            pending={isSubmitting}
                        >Sign up
                        </ LoadingButton>
                    </form>


                    <span className='text-sm text-gray-500 text-center block my-2'>
                        or
                    </span>
                    <div className='flex flex-col space-y-4'>
                        <form className='w-full' action={handleGithubSignin}>

                            <Button variant={'outline'} className='w-full' type='submit' >
                                <Github className='h-4 w-4 mr-2' />
                                Sign in With Github
                            </Button>
                        </form>
                        <form className='w-full' action={handleGoogleSignin}>
                            <Button variant={'outline'} className='w-full' type='submit' >
                                <FcGoogle className='h-4 w-4 mr-2' />
                                Sign in With Google
                            </Button>
                        </form>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default signup
