import express from "express"
import db from "@repo/db/client"


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

        const account = await db.balance.findFirst({
            where: {
                userId: Number(paymentInformation.userId)
            }
        })

        let transactionOperations = [];
        console.log(account)

        if (account) {

            transactionOperations = [
                db.balance.updateMany({
                    where: {
                        userId: Number(paymentInformation.userId)
                    },
                    data: {
                        amount: {
                            // You can also get this from your DB
                            increment: Number(paymentInformation.amount)
                        }
                    }
                }),
                db.onRampTransaction.updateMany({
                    where: {
                        token: paymentInformation.token
                    },
                    data: {
                        status: "Success",
                    }
                })

            ]


        } else {

            transactionOperations = [
                db.balance.create({
                    data: {
                        userId: Number(paymentInformation.userId),
                        amount: Number(paymentInformation.amount),
                        locked: Number(0)

                    }
                }),
                db.onRampTransaction.updateMany({
                    where: {
                        token: paymentInformation.token
                    },
                    data: {
                        status: "Success",
                    }
                })

            ]

        }

        const response = await db.$transaction(transactionOperations)

        res.json({
            message: "Captured",
            response,
            account
        })

    } catch (e) {
        console.error(e);
        res.status(411).json({
            message: "Error while processing webhook"
        })
    }

})




app.listen(3003, () => {
    console.log("Server is running on port 3003")
})