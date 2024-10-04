import { atom } from 'recoil';

export interface OnRampTransactionProps {
    time: Date,
    amount: number,
    status: string,
    provider: string,
}

export interface TransactionState {
    transactions: OnRampTransactionProps[]
}

export const transactionAtom = atom<TransactionState>({
    key: 'transaction',
    default: {
        transactions: []
    }
});
