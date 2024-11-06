import { atom } from 'recoil';

export interface OnRampTransactionProps {
    time: Date | undefined;
    amount: number | undefined;
    status: string | undefined;
    provider: string | undefined;
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
