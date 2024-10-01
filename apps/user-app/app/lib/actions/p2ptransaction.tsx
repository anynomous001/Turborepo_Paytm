'use server'

import prisma from "@repo/db/client";
import { auth } from "../auth";


export default async function p2ptransaction(to: string, amount: number) {
    const session = await auth();

    const from = session?.user?.id
    if (!from) {
        return {
            message: "An Error occured while sending ..!"
        }
    }

    const toUser = await prisma.user.findFirst({
        where: {
            number: to
        }
    })

    if (!toUser) {
        return {
            message: "User doesn't exist."
        }
    }

    await prisma.$transaction(async (tx) => {

        const fromBalance = await tx.balance.findUnique({
            where: {
                userId: Number(from)
            }
        })



        if (!fromBalance || fromBalance.amount < amount) {
            return {
                message: "Insufficient Balance !!"
            }
        }

        await tx.balance.update({
            where: {
                userId: Number(from)
            },
            data: {
                amount: { decrement: amount }
            }
        })

        await tx.balance.update({
            where: {
                userId: Number(toUser.id)
            },
            data: {
                amount: { increment: amount }
            }
        })

        await tx.p2pTransfer.create({
            data: {
                fromUserId: Number(from),
                toUserId: Number(toUser.id),
                amount,
                timeStamp: new Date()
            }
        })
        console.log("Transfer Completed !!")
    })
}