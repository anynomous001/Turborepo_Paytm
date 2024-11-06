'use client'


import { balanceAtom, BalanceState } from '@repo/store/balanceAtom'
import React from 'react'
import { useRecoilState } from 'recoil'

const DashboardBalance = ({ amount, locked }: BalanceState) => {


    const [balanceInfo, setBalanceInfo] = useRecoilState(balanceAtom)

    React.useEffect(() => {

        setBalanceInfo(() => ({
            amount: amount,
            locked: locked
        }))


    }, [])


    return (
        <div>
            <p className="font-bold text-slate-900 text-4xl">Your Balance, <span className="font-bold text-slate-300 text-6xl">{balanceInfo.amount}</span> </p>
        </div>)
}

export default DashboardBalance