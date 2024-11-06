import BeneficiaryCard from "@/app/components/beneficiary";
import { getBalance } from "../transfer/page";
import { auth } from "@/app/lib/auth";
import { prisma } from "@repo/db/client";
import DashboardBalance from "@/app/components/dashboardBalance";

const getBeneficiary = async () => {
    const session = await auth();

    const beneficiary = await prisma.p2pTransfer.findMany({
        where: {
            fromUserId: Number(session?.user?.id)
        },
        select: {
            toUser: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                }
            }
        }
    });
    const uniqueBeneficiaries = Array.from(
        new Map(beneficiary.map(transfer => [transfer.toUser.email, transfer.toUser])).values()
    );

    return uniqueBeneficiaries;
};




const page = async () => {
    const session = await auth();
    const balance = await getBalance()
    const beneficiaries = await getBeneficiary()


    console.log(session?.user?.name)
    return <div>
        <div className="flex flex-col space-y-2 mt-24">
            <h2 className="font-bold text-slate-900 text-6xl">Hello,<span className=" text-red-600 opacity-35">{(session?.user?.name)?.split(" ")[0]}</span></h2>
            <h3 className="text-3xl font-bold">Good Afternoon</h3>
            <h1 className="text-3xl font-bold opacity-20">WelCome to PlayTM</h1>
        </div>

        <DashboardBalance amount={balance.amount} locked={balance.locked} />
        <div className="mt-6">
            <BeneficiaryCard transfers={beneficiaries || []} />
        </div>
    </div>
}

export default page