'use server'

import { prisma, Prisma } from "@repo/db/client";
import { auth } from "../auth";

// interface P2PTransfer {
//     fromUserId: number;
//     toUserId: number;
//     amount: number;
//     timeStamp: Date;
// }




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

        // let response: P2PTransfer | null = null;
        // let fromUserBalance = null
        const response = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {

            const fromBalance = await tx.balance.findUnique({
                where: {
                    userId: Number(from)
                }
            })



            if (!fromBalance || fromBalance.amount < amount) {
                throw new Error("Insufficient Balance!!");
            }

            const fromUserBalance = await tx.balance.update({
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

            const response = await tx.p2pTransfer.create({
                data: {
                    fromUserId: Number(from),
                    toUserId: Number(toUser.id),
                    amount,
                    timeStamp: new Date()
                }
            })


            return { response, fromUserBalance }
        })

        console.log(response, 'from p2pserveraction')

        return {
            message: "Transfer Completed !!",
            response,
            // fromUserBalance
        }


    } catch (error: any) {
        console.log(error)
        return {
            error: error?.message || "An error occurred during the transfer."
        }
    }


}