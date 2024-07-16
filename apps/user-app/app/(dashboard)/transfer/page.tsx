import Center from "@repo/ui/Center"
import AddMoneyCard from "../../components/AddMoneyCard"
import { BalanceCard } from "../../components/BalanceCard"
import OnRampTransactionCard from "../../components/onRampTransactionCard"

const page = () => {
    return (
        <div className="flex  pt-20 justify-around gap-6  min-h-full min-w-full ">
            <AddMoneyCard />
            <div className="flex flex-col">
                <BalanceCard amount={0} locked={0} />
                <OnRampTransactionCard />
            </div>
        </div>
    )
}

export default page