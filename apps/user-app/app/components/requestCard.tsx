'use client'

import { Button } from "@/components/ui/button"



interface p2pRequestsProps {
    amount: number,
    name: string | null,
    email: string
}

interface RequestCardProps {
    p2pRequests: p2pRequestsProps[]
}

export const RequestCard = ({ p2pRequests }: RequestCardProps) => {

    console.log(p2pRequests)

    return (
        <div className="">
            {
                p2pRequests?.map((req) => (
                    <div className="flex p-4 justify-between bg-slate-400" key={Math.random() * 10} >
                        <h1>{req.name}</h1>
                        <p>Requested</p>
                        <h2>{req.amount}</h2>
                        <Button >Send</Button>
                        <Button>Decline</Button>
                    </div>
                ))
            }
        </div>
    )
}