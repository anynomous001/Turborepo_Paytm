'use server'

import prisma from "@repo/db/client";
import { auth } from "../auth";


export default async function p2ptransaction(email: string, amount: number) {
    const session = await auth();
    const from = session?.user?.id

    if (!from) {
        return {
            error: "An Error occured while sending ..!"
        }
    }
    try {


        const toUser = await prisma.user.findFirst({
            where: {
                email: email
            }
        })

        if (toUser?.id === Number(from)) {
            return {
                error: "Enter valid user details !"
            }
        }

        if (!toUser) {
            return {
                error: "User doesn't exist !"
            }
        }

        let response = null
        await prisma.$transaction(async (tx) => {

            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(from)
                }
            })



            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient Balance!!");
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

            response = await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: Number(toUser.id),
                    amount,
                    timeStamp: new Date()
                }
            })
        })

        return {
            message: "Transfer Completed !!",
            response
        }
    } catch (error) {
        console.log(error)
        return {
            error: error.message || "An error occurred during the transfer."
        }
    }


}