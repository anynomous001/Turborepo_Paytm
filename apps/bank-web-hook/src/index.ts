import express from "express"
import db from "@repo/db/client"
import cors from 'cors';



const app = express()

app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));



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
        userId: req.body.id,
        amount: req.body.amount
    }



    try {

        const account = await db.balance.findFirst({
            where: {
                userId: Number(paymentInformation.userId)
            }
        })

        let transactionOperations = [];

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


        const accountBalance = await db.balance.findFirst({
            where: {
                userId: Number(paymentInformation.userId)
            }
        })
        res.json({
            message: "Captured2",
            response,
            accountBalance

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