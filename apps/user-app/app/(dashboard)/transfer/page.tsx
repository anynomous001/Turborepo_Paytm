import { auth } from "@/app/api/auth/[...nextauth]/route"
import AddMoneyCard from "../../components/AddMoneyCard"
import { BalanceCard } from "../../components/BalanceCard"
import OnRampTransactionCard from "../../components/onRampTransactionCard"
import { authOptions } from "../../lib/auth"
import prisma from "@repo/db/client"


async function getBalance() {
    const session = await auth()


    if (!session?.user?.id) {
        throw new Error("User ID is missing from session");
    }

    const balance = await prisma.balance.findFirst({
        where: {
            userId: Number(session?.user?.id)
        },
    })
    return {
        amount: balance?.amount || 0,
        locked: balance?.locked || 0
    }
}

async function getOnrampTransactions() {
    const session = await auth()

    const transactions = await prisma.onRampTransaction.findMany({
        where: {
            userId: Number(session?.user?.id)
        }
    })

    return transactions.map(transaction => ({
        time: transaction.startTime,
        amount: transaction.amount,
        status: transaction.status,
        provider: transaction.provider
    }))

}


const page = async () => {

    const balance = await getBalance()
    const transactions = await getOnrampTransactions()

    return (
        <div className="flex  pt-20 justify-around gap-6  min-h-full min-w-full ">
            <AddMoneyCard />
            <div className="flex flex-col">

                <BalanceCard amount={balance.amount} locked={balance.locked} />
                <OnRampTransactionCard transactions={transactions} />
            </div>
        </div>
    )
}

export default page