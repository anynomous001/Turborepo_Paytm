import React from 'react'

const Center = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className=' m-4 flex gap-8 flex-col ' >
            {children}
        </div>
    )
}

export default Center