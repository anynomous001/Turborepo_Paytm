'use client'
import { Button } from "@/components/ui/button"


type Beneficiary = {
    id: number;
    name: string | null; // Assuming name might be nullable
    email: string;
};




const BeneficiaryCard = ({ transfers }: { transfers: Beneficiary[] }) => {


    function handleSendMoney(email: string) {
        console.log("handleSendMoney got clicked !", email)
    }


    function handleRequestMoney(email: string) {
        console.log("handleRequestMoney got clicked !", email)
    }


    return (
        <div className="bg-slate-200 flex flex-col w-[80vw] p-6 h-fit">
            <div className="bg-slate-300 font-medium text-black text-xl flex space-x-14 p-6">
                <h1 className="flex-1 text-center">Email-Id of Beneficiary</h1>
                <h1 className="flex-1 text-center">Name of Beneficiary</h1>
                <h3 className="flex-1 text-center">Send Money / Request Money</h3>
            </div>
            <div className="mt-6 space-y-4">
                {
                    transfers.map((beneficiary) => (
                        <div key={beneficiary.email} className="bg-slate-300 font-medium text-black text-xl flex p-6 space-x-14">
                            <p className="flex-1 text-center">{beneficiary.email}</p>
                            <p className="flex-1 text-center">{beneficiary.name}</p>
                            <div className="flex-1 text-center space-x-4">
                                <Button onClick={() => handleSendMoney(beneficiary.email)}>Send Money</Button>
                                <Button onClick={() => handleRequestMoney(beneficiary.email)}>Request Money</Button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>


    )
}

export default BeneficiaryCard