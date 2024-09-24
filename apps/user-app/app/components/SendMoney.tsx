'use client'
import React from 'react'
import { Button } from "@repo/ui/button"
import { Card } from "@repo/ui/card"
import Input from "@repo/ui/Input"
import p2ptransaction from '../lib/actions/p2ptransaction'
import { redirect } from 'next/navigation'

const SendMoney = () => {
    const [amount, setAmount] = React.useState("0")
    const [number, setNumber] = React.useState("0")

    return (
        <Card title="Send Money">
            <div className="p-4">
                <div className="flex flex-col gap-4">
                    <Input label="Number" placeHolder="997-985-125"
                        onChange={(value) => {
                            setNumber(value)
                        }} />
                    <Input label="Amount" placeHolder="Ex. 1000"
                        onChange={(value) => {
                            setAmount(value)
                        }} />

                </div>

                <div className="flex justify-center pt-6">
                    <Button
                        onClick={async () => {
                            await p2ptransaction(number, (Number(amount) * 100))
                        }} >Send Money</Button>
                </div>
            </div>

        </Card>
    )
}

export default SendMoney