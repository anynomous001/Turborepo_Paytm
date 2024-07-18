import { Card } from "@repo/ui/card"

interface onRampTransactionProps {
    time: Date,
    amount: number,
    status: onRampStatus,
    provider: string,
}

interface Props {
    transactions: onRampTransactionProps[]
}

enum onRampStatus {
    Success,
    Failure,
    Processing
}



const OnRampTransactionCard: React.FC<Props> = ({ transactions }) => {


    if (!transactions?.length) {
        return <Card title="Recent Transactions">
            <div className="text-center pb-8 pt-8">
                No Recent transactions
            </div>
        </Card>
    }

    return <Card title="Recent Transactions">
        <div className="pt-2">
            {transactions?.map(t => <div className="flex justify-between p-4">
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