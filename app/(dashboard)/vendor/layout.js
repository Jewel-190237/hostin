"use client"
import React, { useState, useEffect } from "react"
import { Md12Mp, MdCategory } from "react-icons/md"
import { FaBarcode } from "react-icons/fa"
import { LiaShippingFastSolid } from "react-icons/lia"
import { PiQuotesThin } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { fetchUser } from "@/app/helpers/backend";
import Sidebar from "@/app/components/vendor/layout/sidebar"
import Header from "@/app/components/vendor/layout/header"
import MainLoader from "@/app/components/common/loader"
import { TbShoppingBagHeart } from "react-icons/tb"


const menu = [
  {
    menu: "Dashboard",

  },
  {
    label: "Dashboard",

    href: "/vendor",
    icon: <MdCategory />,
  },
  {
    menu: "Inventory",

  },
  
  {
    label: "Product",
    href: "/vendor/inventory",
    icon: <LiaShippingFastSolid />,
  },
  {
    label: "Coupon",
    href: "/vendor/inventory/coupon",
    icon: <FaBarcode />,

  },
  {
    label: "Attribute",
    href: "/vendor/inventory/attribute",
    icon: <FaBarcode />,

  },

  // {
  //   label: "Shops",
  //   icon: <Md12Mp />,
  //   children: [
  //     {
  //       label: "Product",
  //       icon: <TbShoppingBagHeart />,
  //       href: "/vendor/inventory",
  //     },
  //     {
  //       label: "Coupon",
  //       icon: <TbShoppingBagHeart />,
  //       href: "/vendor/inventory",
  //     },
  //   ],
  // },
 
  
]

export default function ClientLayout({ children }) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [sidebarMobileOpen, setSidebarMobileOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null) 
  const router = useRouter()

  useEffect(() => {
    fetchUser().then(({ data }) => {
      if (data?.role === "vendor") {
        setUser(data)
      } else {
        router.push("/")
      }
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const handleSidebarToggle = (isOpen) => {
    if (isMobile) {
      setSidebarMobileOpen(isOpen)
    }
  }

  if (loading) {
    return <MainLoader />
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Sidebar
        title="k++"
        menu={menu}
        onCollapsedChange={setSidebarCollapsed}
        onMobileToggle={handleSidebarToggle}
      />
      <Header
        title="k++"
        sidebarCollapsed={sidebarCollapsed}
        isMobile={isMobile}
        sidebarMobileOpen={sidebarMobileOpen}
      />
      <main
        className="transition-all duration-300 pt-16"
        style={{
          marginLeft: isMobile ? "0" : sidebarCollapsed ? "60px" : "250px",
        }}
      >
        <div className="p-4 rounded duration-500 z-40 bg-gray-100">{children}</div>
      </main>
    </div>
  )
}