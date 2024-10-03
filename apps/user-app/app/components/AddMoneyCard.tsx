'use client'

import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import Center from '@repo/ui/Center';
import Input from "@repo/ui/Input";
import Select from '@repo/ui/Select'
import React from 'react'
import createOnrampTransactions from '../lib/actions/createOnrampTransactions';
import { useRecoilState } from 'recoil';
import { balanceAtom } from '@repo/store/balanceAtom';
import axios from 'axios'
import prisma from '@repo/db/client';
import { useSession } from 'next-auth/react';


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];


const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = React.useState(SUPPORTED_BANKS[0]?.name)
    const [provider, setProvider] = React.useState(SUPPORTED_BANKS[0]?.name || "")
    const [balance, setBalance] = useRecoilState(balanceAtom)
    const [amount, setAmount] = React.useState(0)



    async function triggerWebHook(token: string, amount: string, id: string) {
        const data = {
            token,
            id,
            amount
        }
        try {
            const response = await axios.post('http://localhost:3003/hdfcwebhook', data)
            console.log('Webhook triggered successfully:', response.data);
            return response.data

        } catch (error) {
            console.log('webhook triggering error', error)
        }
    }



    const handleAddMoney = async () => {
        console.log('handle add money clicked')

        const { transaction } = await createOnrampTransactions(amount, provider)

        console.log(transaction)
        const response = await triggerWebHook(String(transaction?.token), String(transaction?.amount), String(transaction?.userId))
        console.log(response)

        setBalance(() => ({
            amount: response.account.amount,
            locked: response.account.amount,
        }))
    }

    return (
        <Card title='Add Money'>

            <Center>
                <div className={'flex flex-col gap-6'}>
                    <Input placeHolder='Enter Amount' onChange={(value) => {
                        setAmount(Number(value))
                    }} label='Amount' />

                    <Select onSelect={(value) => {
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name == value)?.redirectUrl || '')
                        setProvider(SUPPORTED_BANKS.find(x => x.name == value)?.name || '')
                    }}
                        options={SUPPORTED_BANKS.map(bank => ({
                            key: bank.name,
                            value: bank.name
                        }))}
                    ></Select>
                </div>
                <div className='flex justify-center'>
                    <Button onClick={handleAddMoney} >Add Money</Button>
                </div>
            </Center>


        </Card >

    )
}

export default AddMoneyCard