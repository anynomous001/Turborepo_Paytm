import { atom } from 'recoil'

export interface requestState {
    id: number,
    amount: number,
    name: string | null,
    email: string,
    status: string
}

export interface requestStateProps {
    p2pRequests: requestState[]
}


export const RequestAtom = atom<requestStateProps>({
    key: "Request",
    default: {
        p2pRequests: []
    }
})