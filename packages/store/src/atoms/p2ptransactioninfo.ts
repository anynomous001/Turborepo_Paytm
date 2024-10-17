import { atom } from 'recoil'

export interface P2ptransactionInfoProps {
    email: string,
    amount: number,
    status: string
}


export const p2pTransactionsInfoAtom = atom<P2ptransactionInfoProps>({
    key: 'p2pTransactionsInfo',
    default: {
        email: "",
        amount: 0,
        status: ""
    }
})