import { atom } from "recoil";


export interface P2pTransactionsProps {
    time: Date,
    amount: number,
    fromUser: number,
    toUser: number
}


export interface P2pTransactionState {
    transactions: P2pTransactionsProps[]
}


export const p2pTransactionsAtom = atom<P2pTransactionState>({
    key: 'p2ptransaction',
    default: {
        transactions: []
    }
})