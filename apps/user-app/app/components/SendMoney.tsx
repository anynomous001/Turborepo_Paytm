'use client'
import React from 'react'
import { Card } from "@repo/ui/card"
import Input from "@repo/ui/Input"
import p2ptransaction from '../lib/actions/p2ptransaction'
import { Button } from '@/components/ui/button'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { p2pTransactionsAtom } from '@repo/store/p2pTransactionsAtom'
import { p2pTransactionsInfoAtom } from '@repo/store/p2pTransactionsInfoAtom'
import { useToast } from '@/hooks/use-toast'

const SendMoney = () => {
    const [p2ptransactionDetails, setP2ptransactionDetails] = useRecoilState(p2pTransactionsInfoAtom)
    const setP2pTransactionInfo = useSetRecoilState(p2pTransactionsAtom)
    const { toast } = useToast()



    const handleP2pBalanceTransfer = async () => {

        const { message, response, error } = await p2ptransaction(p2ptransactionDetails.email, p2ptransactionDetails.amount * 100);

        if (error) {
            setP2ptransactionDetails((prevDetails) => ({ ...prevDetails, status: error }))
            toast({
                title: "Uh oh! Something went wrong.",
                description: error,
                variant: "destructive"
            });
            return;
        }

        if (message) {
            setP2ptransactionDetails((prevDetails) => ({ ...prevDetails, status: message }))
            setP2pTransactionInfo((prevP2pBalanceTransfer) => ({
                transactions: [
                    ...prevP2pBalanceTransfer.transactions,
                    {
                        time: response.timeStamp,
                        amount: response.amount,
                        fromUser: response.fromUserId,
                        toUser: response.toUserId
                    }
                ]
            }))

            toast({
                title: "Transaction Completed!!",
                description: message,
                variant: "success"
            })
        }
    }

    return (
        <Card title="Send Money">
            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <Input label="Email" placeHolder="demo@gmail.com"
                        onChange={(value) => {
                            setP2ptransactionDetails((prevDetails) => ({ ...prevDetails, email: value }))
                        }} />
                    <Input label="Amount" placeHolder="Ex. 1000"
                        onChange={(value) => {
                            setP2ptransactionDetails((prevDetails) => ({ ...prevDetails, amount: Number(value) }))
                        }} />

                </div>

                <div className="flex justify-center pt-6">
                    <Button
                        variant={'outline'}
                        onClick={
                            () => handleP2pBalanceTransfer()
                        } >Send Money</Button>
                </div>
            </div>
            <p>{p2ptransactionDetails.status}</p>
        </Card>
    )
}

export default SendMoney 