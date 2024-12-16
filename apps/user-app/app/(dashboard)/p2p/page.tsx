import { prisma } from "@repo/db/client"
import SendMoney from "../../components/SendMoney"
import P2pTransactionsCard from "../../components/p2pTransactionCard"
import { auth } from "@/app/lib/auth"
import { RequestCard } from "@/app/components/requestCard"


interface transactions {
    id: number;
    amount: number;
    timeStamp: Date;
    fromUserId: number;
    toUserId: number;
}


interface p2pRequestsProps {
    id: number,
    amount: number,
    name: string | null,
    email: string,
    status: string
}


type Request = {
    id: number;
    amount: number;
    fromUser: {
        name: string | null;
        email: string;
    };
    status: string;
};




async function getp2pTransactionRecord() {

    const session = await auth()

    if (!session || !session.user || !session.user.id) {
        throw new Error("User ID is missing from session");
    }

    try {
        const transactions = await prisma.p2pTransfer.findMany({
            where: {
                fromUserId: Number(session?.user?.id)
            }
        })

        if (!transactions) {
            return null
        }


        return transactions.map((transaction: transactions) => ({
            time: transaction.timeStamp,
            amount: transaction.amount,
            fromUser: transaction.fromUserId,
            toUser: transaction.toUserId
        }))
    } catch (error) {
        console.log(error)
        return null
    }



}

async function getRequestedInfo(): Promise<p2pRequestsProps[] | null> {
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
                id: true,
                amount: true,
                status: true,
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

        // console.log(requests)
        return requests.map((req: Request) => ({
            id: req.id,
            amount: req.amount,
            status: req.status,
            name: req.fromUser.name,
            email: req.fromUser.email
        }))
    } catch (error) {
        console.log(error)
        return null;

    }
}



const page = async () => {

    const p2pTransactions = await getp2pTransactionRecord()
    const p2pRequest = await getRequestedInfo()

    // console.log(p2pRequest?.map(req => req.amount) + 'jhbhbhjkbhkbkhbhkb')
    return (
        <div className="flex  pt-20 justify-around gap-6  min-h-full min-w-full ">
            <div>
                <SendMoney />
                <RequestCard p2pRequests={p2pRequest || []} />

            </div>
            <P2pTransactionsCard transactions={p2pTransactions || []} />
        </div>
    )
}

export default page