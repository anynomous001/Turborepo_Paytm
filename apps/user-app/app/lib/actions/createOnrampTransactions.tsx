'use server'

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"




export default async function createOnrampTransactions(amount: number, provider: string) {
    const session = await getServerSession(authOptions)
    const token = (Math.random() * 100).toString()
    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    await prisma.onRampTransaction.create({
        data: {
            status: "Processing",
            token: token,
            provider: provider,
            amount: amount * 100,
            startTime: new Date(),
            userId: Number(session?.user?.id),

        }
    })
    return {
        message: "Done"
    }
}
