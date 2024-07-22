'use client'

import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import Center from '@repo/ui/Center';
import Input from "@repo/ui/Input";
import Select from '@repo/ui/Select'
import React from 'react'
import createOnrampTransactions from '../lib/actions/createOnrampTransactions';


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
    const [amount, setAmount] = React.useState(0)




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
                    <Button onClick={async () => {
                        await createOnrampTransactions(amount, provider)
                        // window.location.href = redirectUrl || ""
                    }} >Add Money</Button>
                </div>
            </Center>


        </Card >

    )
}

export default AddMoneyCard