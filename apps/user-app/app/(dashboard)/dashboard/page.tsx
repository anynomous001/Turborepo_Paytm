'use client'

import Center from "@repo/ui/Center"
import AddMoneyCard from "../../components/AddMoneyCard"
import { BalanceCard } from "../../components/BalanceCard"
import { useSession } from "next-auth/react"




const page = () => {

    const { data: session, update } = useSession();

    return <div>{session?.user?.name}</div>
}

export default page