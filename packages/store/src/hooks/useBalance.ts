import { useRecoilValue, useSetRecoilState } from "recoil"
import { balanceAtom } from "../atoms/balance"

export const useBalance = () => {
    const value = useRecoilValue(balanceAtom);
    return value;
}
export const useSetBalance = ({ balance }: { balance: number }) => {
    const setBalance = useSetRecoilState(balanceAtom);
    setBalance(balance)
}   