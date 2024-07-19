import express from "express"
import db from "@repo/db/client"
import { OnRampStatus } from '@prisma/client'

const app = express()

app.use(express.json())

app.get('/', async (req, res) => {
    res.status(200).json('Hi there')
})
app.post('/hdfcwebhook', async (req, res) => {
    const paymentInformation: {
        token: string,
        userId: string,
        amount: string
    } = {
        token: req.body.token,
        userId: req.body.user_indentifier,
        amount: req.body.amount
    }

    try {
        await db.balance.updateMany({
            where: {
                userId: Number(paymentInformation.userId)
            },
            data: {
                amount: {
                    increment: Number(paymentInformation.amount)
                }
            }
        })

        await db.onRampTransaction.updateMany({
            where: {
                token: paymentInformation.token
            },
            data: {
                status: OnRampStatus.Success
            }
        })

        res.status(200).json({
            message: "Captured"
        })

    } catch (error) {
        console.error(error)
        res.status(411).json({
            message: "Error while processing webhook"
        })


    }
})


app.listen(3003, () => {
    console.log("Server is running on port 3003")
})