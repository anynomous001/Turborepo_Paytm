'use client'

import { Button } from '@repo/ui/button';
import { Card } from '@repo/ui/card';
import Center from '@repo/ui/Center';
import Input from "@repo/ui/Input";
import Select from '@repo/ui/Select'
import React from 'react'


const SUPPORTED_BANKS = [{
    name: "HDFC Bank",
    redirectUrl: "https://netbanking.hdfcbank.com"
}, {
    name: "Axis Bank",
    redirectUrl: "https://www.axisbank.com/"
}];


const AddMoneyCard = () => {
    const [redirectUrl, setRedirectUrl] = React.useState(SUPPORTED_BANKS[0]?.name)




    return (
        <Card title='Add Money'>
            <Center>
                <div className={'flex flex-col gap-6'}>
                    <Input placeHolder='Enter Amount' onChange={(value) => { console.log(value) }} label='Amount' />

                    <Select onSelect={(value) => {
                        setRedirectUrl(SUPPORTED_BANKS.find(x => x.name == value)?.redirectUrl || '')
                    }}
                        options={SUPPORTED_BANKS.map(bank => ({
                            key: bank.name,
                            value: bank.name
                        }))}
                    ></Select>
                </div>
                <div className='flex justify-center'>
                    <Button onClick={() => {
                        window.location.href = redirectUrl || ""
                    }} >Add Money</Button>
                </div>
            </Center>


        </Card >

    )
}

export default AddMoneyCard