import prisma from "@repo/db/client"
import SendMoney from "../../components/SendMoney"
import { getServerSession } from "next-auth"
import { authOptions } from "../../lib/auth"
import P2pTransactionsCard from "../../components/p2pTransactionCard"


async function getp2pTransactionRecord() {

    const session = await getServerSession(authOptions)

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

const page = async () => {

    const p2pTransactions = await getp2pTransactionRecord()

    return (
        <div className="flex  pt-20 justify-around gap-6  min-h-full min-w-full ">

            <SendMoney />
            <P2pTransactionsCard transactions={p2pTransactions} />
        </div>
    )
}

export default page