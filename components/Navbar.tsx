"use client"
import { useCompany } from '@/hooks/useCompany'
import { authStorage } from '@/lib/localStorage'
import { useRouter, usePathname } from 'next/navigation'
import React from 'react'

export const Navbar = () => {
    const navigate = useRouter()
    const pathname = usePathname()

    const onDashboard = pathname === "/dashboard"

    const { data: company } = useCompany()

    return (

        <nav className="h-16 border-b flex items-center px-6 justify-between">
            <span className="font-semibold text-lg">Recruiter Dashboard</span>
            <div className="flex gap-4">
                {onDashboard ?
                    <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={() => {
                        navigate.push(`/${company?.slug}/edit`)
                    }}>Edit Career Page</button>
                    : <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={() => {
                        navigate.push("/dashboard")
                    }}>Dashboard</button>}
                <button className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition" onClick={() => {
                    authStorage.removeToken()
                    navigate.push("/login")
                }}>Logout</button>
            </div>
        </nav>
    )
}
