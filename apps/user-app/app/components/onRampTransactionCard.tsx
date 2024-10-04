'use client'

import { Card } from "@repo/ui/card"
import { OnRampTransactionProps, transactionAtom, TransactionState } from "@repo/store/transactionAtom"
import { useRecoilState, useRecoilValue } from "recoil"
import React from "react"


interface OnRampTransactionCardProps {
    transactions: OnRampTransactionProps[];
}


const OnRampTransactionCard = ({ transactions }: OnRampTransactionCardProps) => {
    console.log(transactions)
    const [transactionInfo, setTransactionInfo] = useRecoilState(transactionAtom)

    React.useEffect(() => {
        setTransactionInfo({ transactions })
    }, [transactions])

    if (!transactionInfo?.transactions.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactionInfo?.transactions.map(t => <div key={Math.random()} className="flex justify-between p-4">
                <div className="">
                    <div className="text-sm">
                        Received INR
                    </div>
                    <div className="text-slate-600 text-xs">
                        {t.time.toDateString()}
                    </div>
                </div>
                <div className="flex flex-col justify-center">
                    + Rs {t.amount / 100}
                </div>

            </div>)}
        </div>
    </Card>
}

export default OnRampTransactionCard