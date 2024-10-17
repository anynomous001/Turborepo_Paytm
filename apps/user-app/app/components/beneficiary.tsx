'use client'
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/hooks/use-toast"
import { p2pTransactionsInfoAtom } from "@repo/store/p2pTransactionsInfoAtom"
import React from "react"
import { useRecoilState, useSetRecoilState } from "recoil"
import p2ptransaction from "../lib/actions/p2ptransaction"
import { p2pTransactionsAtom } from "@repo/store/p2pTransactionsAtom"


type Beneficiary = {
    id: number;
    name: string | null;
    email: string;
};

const BeneficiaryCard = ({ transfers }: { transfers: Beneficiary[] }) => {
    const [p2ptransactionDetails, setP2ptransactionDetails] = useRecoilState(p2pTransactionsInfoAtom)
    const setP2pTransactionInfo = useSetRecoilState(p2pTransactionsAtom)

    const { toast } = useToast()

    const handleSendMoney = async (email: string) => {

        const { message, response, error } = await p2ptransaction(email, p2ptransactionDetails.amount * 100);

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


    function handleRequestMoney(email: string) {
        console.log("handleRequestMoney got clicked !", email)
    }


    return (
        <div className="bg-slate-200 flex flex-col w-[80vw] p-6 h-fit">
            <div className="bg-slate-300 font-medium text-black text-xl flex space-x-14 p-6">
                <h1 className="flex-1 text-center">Email-Id of Beneficiary</h1>
                <h1 className="flex-1 text-center">Name of Beneficiary</h1>
                <h3 className="flex-1 text-center">Send Money / Request Money</h3>
            </div>
            <div className="mt-6 space-y-4">
                {
                    transfers.map((beneficiary) => (
                        <div key={beneficiary.email} className="bg-slate-300 font-medium text-black text-xl flex p-6 space-x-14">
                            <p className="flex-1 text-center">{beneficiary.email}</p>
                            <p className="flex-1 text-center">{beneficiary.name}</p>
                            <div className="flex-1 text-center space-x-4">
                                <Dialog >
                                    <DialogTrigger asChild>
                                        <Button>Send Money</Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>Enter Details</DialogTitle>
                                            <DialogDescription>
                                                Make sure to your profile here. Click save when you're done.
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="name" className="text-right">
                                                    Beneficiary Id
                                                </Label>
                                                <Input id="name" value={beneficiary.email} className="col-span-3" />
                                            </div>
                                            <div className="grid grid-cols-4 items-center gap-4">
                                                <Label htmlFor="amount" className="text-right">
                                                    Amount
                                                </Label>
                                                <Input id="amount" onChange={(e) => setP2ptransactionDetails((prevDetails) => ({ ...prevDetails, amount: Number(e.target.value) }))} value={p2ptransactionDetails.amount} className="col-span-3" />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button type="submit" onClick={() => handleSendMoney(beneficiary.email)}>Send</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Button onClick={() => handleRequestMoney(beneficiary.email)}>Request Money</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>


    )
}

export default BeneficiaryCard