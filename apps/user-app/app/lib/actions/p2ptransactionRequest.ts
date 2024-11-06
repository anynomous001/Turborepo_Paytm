'use server'

import { prisma } from "@repo/db/client";
import { auth } from "../auth";


export default async function p2pTransactionRequest(email: string, amount: number) {
    const session = await auth()

    const fromUserId = session?.user?.id

    if (!fromUserId) {
        return {
            error: "An Error occured while sending ..!",
        }
    }

    try {

        const toUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (toUser?.id === Number(fromUserId)) {
            return {
                error: "Enter valid user details !"
            }
        }

        if (!toUser) {
            return {
                error: "User doesn't exist !"
            }
        }

        const transactionRequest = await prisma.moneyRequest.create({
            data: {
                amount: Number(amount),
                fromUserId: Number(fromUserId),
                toUserId: toUser.id,
            }
        })


        return {
            message: 'Money request sent successfully',
            transactionRequest
        }

    } catch (error: any) {
        return {
            error: error?.message || "Some unexpected error took place !!"
        }
    }
}