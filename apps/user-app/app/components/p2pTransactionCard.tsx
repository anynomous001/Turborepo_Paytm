'use client'


import { Card } from "@repo/ui/card"
import { p2pTransactionsAtom, P2pTransactionState } from "@repo/store/p2pTransactionsAtom"
import { useRecoilState } from "recoil"
import React from "react"
import cn from 'classnames'
import { useSession } from "next-auth/react"
import { ScrollArea } from "@/components/ui/scroll-area"


// export interface p2pTransactionsCardProps {
//     transactions: P2pTransactionsProps[]
// }


const P2pTransactionsCard = ({ transactions }: P2pTransactionState) => {

    const [p2pTransactionInfo, setP2pTransactionInfo] = useRecoilState(p2pTransactionsAtom)
    const { data: session } = useSession()



    React.useEffect(() => {
        setP2pTransactionInfo({ transactions })
    }, [transactions])


    if (!p2pTransactionInfo?.transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    return <ScrollArea className="h-[60vh]  w-[30vw]" >
        <Card title="Recent Transactions">
            <div className="pt-2">
                {p2pTransactionInfo?.transactions.map(t => <div className="flex justify-between p-4">
                    <div className="">
                        <div className={cn("text-xl opacity-90 font-medium",
                            String(session?.user?.id) === String(t.toUser) ? 'text-green-500' : 'text-red-400'
                        )}>
                            {
                                String(session?.user?.id) === String(t.toUser)
                                    ? `Received INR`
                                    : `Paid INR`
                            }                        </div>
                        <div className="text-slate-600 text-sm">
                            {t.time.toDateString()}
                        </div>
                    </div>
                    <div className={cn(
                        'flex flex-col justify-center',
                        String(session?.user?.id) === String(t.toUser) ? 'text-green-500' : 'text-red-400'
                    )}>
                        {
                            String(session?.user?.id) === String(t.toUser)
                                ? `+ Rs ${t.amount / 100}`
                                : `- Rs ${t.amount / 100}`
                        }

                    </div>


                </div>)}
            </div>
        </Card >


    </ScrollArea>


}

export default P2pTransactionsCard