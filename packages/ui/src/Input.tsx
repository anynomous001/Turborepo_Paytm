import React from 'react'

const Input = ({ label, onChange, placeHolder }: {
    label: string,
    onChange: (value: string) => void,
    placeHolder: string
}) => {
    return (
        <div className='flex flex-col'>
            <label className='w-full font-semibold '>{label}</label>
            <input className='p-2 mt-2' placeholder={placeHolder} onChange={(e) => onChange(e.target.value)} />
        </div>
    )
}

export default Input