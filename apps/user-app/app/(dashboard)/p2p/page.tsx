import prisma from "@repo/db/client"
import SendMoney from "../../components/SendMoney"
import P2pTransactionsCard from "../../components/p2pTransactionCard"
import { auth } from "@/app/lib/auth"
import { RequestCard } from "@/app/components/requestCard"


async function getp2pTransactionRecord() {

    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        throw new Error("User ID is missing from session");
    }


    const transactions = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        }
    })


    return transactions.map(transaction => ({
        time: transaction.timeStamp,
        amount: transaction.amount,
        fromUser: transaction.fromUserId,
        toUser: transaction.toUserId
    }))

}

export async function getRequestedInfo() {
    const session = await auth()

    if (!session?.user?.id) {
        throw new Error("User ID is missing from session");
    }




    try {
        const requests = await prisma.moneyRequest.findMany({
            where: {
                toUserId: Number(session?.user?.id)
            },
            select: {
                amount: true,
                fromUser: {
                    select: {
                        name: true,
                        email: true
                    }

                }
            }

        })

        if (!requests) {
            return null
        }

        console.log(requests)
        return requests.map(req => ({
            amount: req.amount,
            name: req.fromUser.name,
            email: req.fromUser.email
        }))
    } catch (error) {
        console.log(error)
    }
}



const page = async () => {

    const p2pTransactions = await getp2pTransactionRecord()
    const p2pRequest = await getRequestedInfo()

    console.log(p2pRequest?.map(req => req.amount) + 'jhbhbhjkbhkbkhbhkb')
    return (
        <div className="flex  pt-20 justify-around gap-6  min-h-full min-w-full ">
            <div>
                <SendMoney />
                <RequestCard p2pRequests={p2pRequest} />

            </div>
            <P2pTransactionsCard transactions={p2pTransactions} />
        </div>
    )
}

export default page