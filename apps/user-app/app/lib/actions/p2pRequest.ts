'use server'


import { prisma } from "@repo/db/client"


export default async function p2pRequestFeedback(id: number, status: string) {



    if (status == "Declined") {
        try {
            const declinedResponse = await prisma.moneyRequest.updateMany({
                where: {
                    id: Number(id)
                },
                data: {
                    status: "Declined",  // Use the 'set' operation for enum fields

                }
            })

            // console.log(declinedResponse)
            return declinedResponse
        } catch (error) {
            console.log(error)
            return error
        }
    } else {
        try {
            const approvedResponse = await prisma.moneyRequest.updateMany({
                where: {
                    id: Number(id)
                },
                data: {
                    status: "Approved", // Use the 'set' keyword for enums
                }
            })

            // console.log(approvedResponse)
            return approvedResponse
        } catch (error) {
            console.log(error)
            return error
        }
    }

}