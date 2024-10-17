'use client'

import { Card } from "@repo/ui/card";
import prisma from "@repo/db/client"
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { balanceAtom } from "@repo/store/balanceAtom";



export const BalanceCard = () => {

    const totalBalance = useRecoilValue(balanceAtom);

    return <Card title={"Balance"}>
        <div className="flex flex-col gap-2 p-4">
            <div className="flex justify-between border-b border-slate-300 pb-2">
                <div>
                    Unlocked balance
                </div>
                <div>
                    {totalBalance.amount / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Locked Balance
                </div>
                <div>
                    {totalBalance.locked / 100} INR
                </div>
            </div>
            <div className="flex justify-between border-b border-slate-300 py-2">
                <div>
                    Total Balance
                </div>
                <div>
                    {(totalBalance.locked + totalBalance.amount) / 100} INR
                </div>
            </div>
        </div>
    </Card>
}