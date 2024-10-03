'use server'

import prisma from "@repo/db/client"
import { auth } from "../auth";

export default async function createOnrampTransactions(amount: number, provider: string) {


    const session = await auth();

    const token = (Math.random() * 100).toString()

    if (!session?.user || !session.user?.id) {
        return {
            message: "Unauthenticated request"
        }
    }

    const transaction = await prisma.onRampTransaction.create({
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
        // message: "Done",
        transaction
    }
}
