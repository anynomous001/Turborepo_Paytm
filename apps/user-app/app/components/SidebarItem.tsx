'use client'


import { useRouter } from 'next/navigation'
import React from 'react'

interface SidebarItemProps {
    href: string,
    icon: React.ReactNode,
    title: string
}


const SidebarItem = ({ href, title, icon }: SidebarItemProps) => {
    const router = useRouter()
    return (
        <div className="hover:cursor-pointer py-4 text-xl font-semibold  hover:bg-slate-300 " onClick={() => {
            console.log(href)
            router.push(href)
        }}>
            <div className='flex items-center pl-6'>
                {icon}
                <div className='ml-4'>
                    {title}
                </div>
            </div>

        </div>
    )
}

export default SidebarItem



