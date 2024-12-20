'use client'

import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signinInput, SigninInputType } from '@repo/zod/zodTypes'
import { Input } from '@/components/ui/input'
import LoadingButton from './loading-button'
import { handleCredentialsSignin } from '../lib/actions/authActions'
import React from 'react'
import ErrorMessage from './error-message'

const Auth = () => {

    const [globalError, setGlobalError] = React.useState<string>("")

    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<SigninInputType>({
        resolver: zodResolver(signinInput),
        defaultValues: {
            password: "",
            email: "",
        }
    })

    const onSubmit = async (data: SigninInputType) => {
        try {

            const result = await handleCredentialsSignin(data)
            if (result?.message) {
                setGlobalError(result.message);
            }

        } catch (error) {
            console.log("An unexpected error occurred. Please try again.");
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
                        {/* <Label htmlFor='name' className=''>
                            Name
                        </Label>
                        <Input className='bg-white' placeholder='John Doe' type='text' id='name' {...register('name')} />
                        {errors.name && <p className='text-red-500'>{errors.name?.message}</p>
                        } */}
                        <Label htmlFor='password' className=''>
                            Password
                        </Label>
                        <Input className='bg-white' placeholder='******' type='password' id='password' {...register('password')} />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>
                        }
                        {/* <Label htmlFor='number' className=''>
                            Number
                        </Label>
                        <Input className='bg-white' placeholder='98743532' type='text' id='number' {...register('number')} />
                        {errors.number && <p className='text-red-500'>{errors.number.message}</p>
                        } */}
                        <Label htmlFor='email' className=''>
                            Email
                        </Label>
                        <Input className='bg-white' placeholder='doejohn@gmail.com' type='email' id='email' {...register('email')} />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>
                        }
                        <LoadingButton
                            pending={isSubmitting}
                        >Sign In</LoadingButton>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Auth
