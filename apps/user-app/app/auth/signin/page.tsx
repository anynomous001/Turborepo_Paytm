'use client'

import { Label } from '@/components/ui/label'
import { FcGoogle } from "react-icons/fc";
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { signinInput, SigninInputType } from '@repo/zod/zodTypes'
import { Input } from '@/components/ui/input'
import React from 'react'
import ErrorMessage from '@/app/components/error-message'
import LoadingButton from '@/app/components/loading-button'
import { handleCredentialsSignin, handleGithubSignin, handleGoogleSignin } from '@/app/lib/actions/authActions'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'
import { useRouter, useSearchParams } from 'next/navigation';


const signin = () => {

    const params = useSearchParams();
    const error = params.get("error");
    const router = useRouter();

    const [globalError, setGlobalError] = React.useState<string>("");

    React.useEffect(() => {
        if (error) {
            switch (error) {
                case "OAuthAccountNotLinked":
                    setGlobalError(
                        "Please use your email and password to sign in."
                    );
                    break;
                default:
                    setGlobalError(
                        "An unexpected error occurred. Please try again."
                    );
            }
        }
        router.replace("/auth/signin");
    }, [error, router]);

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
                    <h1 className='mb-2 text-2xl text-gray-950 font-semibold'>Login into your account.</h1>
                </div>
                <div className='mt-2'>

                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>
                        {globalError && <ErrorMessage error={globalError} />}

                        <Label htmlFor='password' className=''>
                            Password
                        </Label>
                        <Input className='bg-white' placeholder='******' type='password' id='password' {...register('password')} />
                        {errors.password && <p className='text-red-500'>{errors.password.message}</p>
                        }

                        <Label htmlFor='email' className=''>
                            Email
                        </Label>
                        <Input className='bg-white' placeholder='doejohn@gmail.com' type='email' id='email' {...register('email')} />
                        {errors.email && <p className='text-red-500'>{errors.email.message}</p>
                        }
                        <LoadingButton
                            pending={isSubmitting}
                        >Sign in
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

export default signin
