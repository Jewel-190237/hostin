"use client"

import { Sidebar } from "@/app/components/user/layout/sideber"
import { fetchUser } from "@/app/helpers/backend"
import { useEffect, useState } from "react"
import React from "react"
import { BiMenu } from "react-icons/bi"
import { useRouter } from "next/navigation"

export default function DashboardLayout({ children }) {
  const router = useRouter()
  const [user, setUser] = useState(null) 
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    fetchUser().then(({ data }) => {
      setLoading(true)  
      if (data?.role === "user") {
        setUser(data)
      } else {
        router.push("/")
      }
      setLoading(false)
    })
  }, [])
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    const toggleMobileMenu = () => {
      setIsMobileMenuOpen(!isMobileMenuOpen)
    }
  
    const closeMobileMenu = () => {
      setIsMobileMenuOpen(false)
    }
  

    return (
        <div className="container flex relative pt-5 pb-10">
        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" onClick={closeMobileMenu} />
        )}
  
        {/* Sidebar */}
        <Sidebar isOpen={isMobileMenuOpen} onClose={closeMobileMenu} />
  
        {/* Main Content */}
        <div className="flex-1 flex flex-col ">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white  flex items-center justify-between sticky top-0 z-30">
            <button onClick={toggleMobileMenu} className="p-2 rounded-md hover:bg-gray-100">
              <BiMenu className="w-6 h-6" />
            </button>
            <div className="w-10"></div> {/* Spacer for centering */}
          </div>
  
          {/* Content */}
          <div className="flex-1 pl-4 lg:pl-6">{children}</div>
        </div>
      </div>
    )
}
