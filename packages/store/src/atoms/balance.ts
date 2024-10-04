import { atom } from "recoil"

export interface BalanceState {
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

export const loadingAtom = atom<boolean>({
    key: 'loading',
    default: true
})