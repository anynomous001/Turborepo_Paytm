import { atom } from "recoil"

interface BalanceState {
    amount: number,
    locked: number
}

export const balanceAtom = atom<BalanceState>({
    key: "balance",
    default: {
        amount: 0,
        locked: 0
    }
})