import express from "express"
import db from "@repo/db/client"

const app = express()

app.get('/hdfcwebhook', async (req, res) => {
    const paymentInformation = {
        token: req.body.token,
        userId: req.body.user_indentifier,
        amount: req.body.amount
    }

    try {
        await db.balance.update({
            where: {
                userId: paymentInformation.userId
            },
            data: {
                amount: {
                    increment: paymentInformation.amount
                }
            }
        })

        await db.onRampTransaction.update({
            where: {
                token: paymentInformation.token
            },
            data: {
                status: "success"
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


app.listen(3003)