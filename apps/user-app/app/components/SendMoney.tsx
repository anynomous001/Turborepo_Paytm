'use client'
import React from 'react'
import { Card } from "@repo/ui/card"
import Input from "@repo/ui/Input"
import p2ptransaction from '../lib/actions/p2ptransaction'
import { Button } from '@/components/ui/button'
import { useSetRecoilState } from 'recoil'
import { p2pTransactionsAtom } from '@repo/store/p2pTransactionsAtom'
import { useToast } from '@/hooks/use-toast'

const SendMoney = () => {
    const [amount, setAmount] = React.useState("0")
    const [email, setEmail] = React.useState("")
    const [status, setStatus] = React.useState("")
    const setP2pTransactionInfo = useSetRecoilState(p2pTransactionsAtom)
    const { toast } = useToast()



    async function handleP2pBalanceTransfer() {
        const { message, response, error } = await p2ptransaction(email, Number(amount) * 100);

        if (error) {
            setStatus(error);
            toast({
                title: "Uh oh! Something went wrong.",
                description: error,
                variant: "destructive"
            });
            return;
        }

        if (message) {
            setStatus(message);
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
            }));

            toast({
                title: "Transaction Completed!!",
                description: message,
                variant: "success"
            });
        }
    }




    return (
        <Card title="Send Money">
            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <Input label="Email" placeHolder="demo@gmail.com"
                        onChange={(value) => {
                            setEmail(value)
                        }} />
                    <Input label="Amount" placeHolder="Ex. 1000"
                        onChange={(value) => {
                            setAmount(value)
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
            <p>{status}</p>
        </Card>
    )
}

export default SendMoney 