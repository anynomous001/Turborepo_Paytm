import { useRecoilValue, useSetRecoilState } from "recoil"
import { balanceAtom, BalanceState } from "../atoms/balance"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}
export const useSetBalance = ({ amount, locked }: BalanceState) => {
    const setBalance = useSetRecoilState(balanceAtom);
    setBalance(() => ({
        amount: amount,
        locked: locked
    }))
}   