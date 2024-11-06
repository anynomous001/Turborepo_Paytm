'use client'

import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { p2pTransactionsAtom } from "@repo/store/p2pTransactionsAtom"
import { p2pTransactionsInfoAtom } from "@repo/store/p2pTransactionsInfoAtom"
import { useSetRecoilState } from "recoil"
import p2ptransaction from "../lib/actions/p2ptransaction"
import p2pRequestFeedback from "../lib/actions/p2pRequest"
import { balanceAtom } from "@repo/store/balanceAtom"
import React from "react"



interface p2pRequestsProps {
    id: number,
    amount: number,
    name: string | null,
    email: string,
    status: string
}

interface RequestCardProps {
    p2pRequests: p2pRequestsProps[]
}

export const RequestCard = ({ p2pRequests }: RequestCardProps) => {
    const setP2ptransactionDetails = useSetRecoilState(p2pTransactionsInfoAtom)
    const setP2pTransactionInfo = useSetRecoilState(p2pTransactionsAtom)
    const setBalanceInfo = useSetRecoilState(balanceAtom)




    const filteredArray = p2pRequests.filter(req => req.status !== "Approved" && req.status !== "Declined");


    const [filteredRequest, setFilteredRequest] = React.useState(filteredArray)
    const { toast } = useToast()


    console.log(p2pRequests)


    React.useEffect(() => {
        setFilteredRequest(filteredRequest)
    }, [filteredArray])


    async function handleRequestDecline(id: number) {

        const declineResponse = await p2pRequestFeedback(id, "Declined")
        toast({
            title: "Request Declined.",
            description: "Request Declined.",
            variant: "success"
        });
        console.log(declineResponse + "from handleRequestDecline")

    }

    async function handleRequestApprove(id: number, amount: number, email: string) {
        const { message, response, error } = await p2ptransaction(email, amount)


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
            toast({
                title: "Transaction Successful !",
                description: message,
                variant: "success"
            })
            setP2pTransactionInfo((prevP2pBalanceTransfer) => ({
                transactions: [
                    ...prevP2pBalanceTransfer.transactions,
                    {
                        time: response.response.timeStamp,
                        amount: response.response.amount,
                        fromUser: response.response.fromUserId,
                        toUser: response.response.toUserId
                    }
                ]
            }))

            const approvedResponse = await p2pRequestFeedback(id, "Approved")

            setBalanceInfo(() => ({
                amount: response.fromUserBalance?.amount,
                locked: response.fromUserBalance?.locked
            }))
            console.log(approvedResponse, 'from card')

        }


    }
    console.log(p2pRequests.length)
    return (filteredRequest.length === 0 ?
        <div>
            <p>
                No Money Request
            </p>
        </div>
        : (
            <div className="">
                {
                    filteredRequest.map(req => (
                        <div className="flex p-4 justify-between bg-slate-400" key={req.id}>
                            <h1>{req.name}</h1>
                            <h1>{req.status}</h1>
                            <p>Requested</p>
                            <h2>{req.amount}</h2>
                            <Button onClick={() => handleRequestApprove(req.id, req.amount, req.email)}>Send</Button>
                            <Button onClick={() => handleRequestDecline(req.id)}>Decline</Button>
                        </div>
                    ))
                }

            </div>)
    )
}