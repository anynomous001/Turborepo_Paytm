import { Button } from "@/components/ui/button"
import React from 'react'

const LoadingButton = ({ pending, children }: { pending: boolean, children: React.ReactNode }) => {
    return (
        <Button className='w-full mt-4 bg-blue-950 text-indigo-100'
            variant={'outline'} type="submit" disabled={pending} >
            {
                pending ? (
                    <div className="flex items-center justify-center">
                        Processing....
                    </div>
                ) : (
                    <div>
                        {children}
                    </div>
                )
            }
        </Button>
    )
}

export default LoadingButton