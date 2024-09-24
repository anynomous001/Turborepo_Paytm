'use client'

import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import axios from 'axios'
import Link from 'next/link'
import { signinInput, signupInput, SignupInputType } from '@repo/zod/zodTypes'
import { Input } from '@/components/ui/input'


const Auth = () => {

    const { handleSubmit, register, setError, formState: { errors, isSubmitting } } = useForm<SignupInputType>({
        resolver: zodResolver(signupInput)
    })


    const onSubmit = async (data: SignupInputType) => {
        const response = await axios.post('api/auth/signup', {

        })
    }


    return (
        <div className=' w-full h-[100vh] flex justify-center items-center  '>
            <div className='w-80 shadow-lg bg-slate-100 p-8 rounded-md '>
                <div className='text-center'>

                    <h1 className='mb-2 text-2xl text-gray-950  font-semibold'>Medium</h1>
                    <p className='text-slate-600  font-medium'>Already Signed Up? <span className=' space-x-2 text-slate-400 font-bold text-md underline'><Link href={'/auth/signin'} >SignIn</Link></span></p>
                </div>
                <div className='mt-2'>
                    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-2'>


                        <Label htmlFor='name' className=''>Name</Label>
                        <Input
                            className=' bg-white'
                            placeholder='john Doe'
                            type='text'
                            id='name'
                            {...register('name')}
                        />
                        {
                            errors.name && (
                                <p className='text-red-600'>{errors.name.message}</p>
                            )
                        }


                        <Label htmlFor='password' className=''>Password</Label>
                        <Input
                            className='bg-white'
                            placeholder='******'
                            type='password'
                            id='password'
                            {...register('password')}
                        />
                        {
                            errors.password && (
                                <p className='text-red-600'>{errors.password.message}</p>
                            )
                        }

                        <Label htmlFor='number' className=''>Number</Label>
                        <Input
                            className='bg-white'
                            placeholder='98743532'
                            type='text'
                            id='number'
                            {...register('number')}
                        />
                        {
                            errors.number && (
                                <p className='text-red-600'>{errors.number.message}</p>
                            )
                        }
                        <Label htmlFor='email' className=''>Email</Label>
                        <Input
                            className='bg-white'
                            placeholder='doejohn@gmail.com'
                            type='text'
                            id='email'
                            {...register('email')}
                        />
                        {
                            errors.email && (
                                <p className='text-red-600'>{errors.email.message}</p>
                            )
                        }


                        <Button
                            disabled={isSubmitting}
                            type='submit'
                            className='mt-4 bg-blue-950 text-indigo-100'
                            variant={'outline'}
                        >Sign Up</Button>

                    </form>
                </div>
            </div>
        </div >
    )
}

export default Auth