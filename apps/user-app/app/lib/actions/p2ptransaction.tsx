'use server'


import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";



export default async function p2ptransaction(to: string, amount: number) {
    const session = await getServerSession(authOptions)
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
            message: "User doesn'y exist."
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
    })
}