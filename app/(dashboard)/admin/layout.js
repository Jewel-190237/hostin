"use client"
import React, { useState, useEffect } from "react"
import Header from "@/app/components/admin/layout/header"
import Sidebar from "@/app/components/admin/layout/sidebar"
import { Md12Mp, MdCategory, MdChat } from "react-icons/md"
import { FaStore, FaCopy, FaBarcode } from "react-icons/fa"
import { LiaStoreAltSolid, LiaShippingFastSolid } from "react-icons/lia"
import { BsShop } from "react-icons/bs"
import { PiQuotesThin } from "react-icons/pi"
import { useRouter } from "next/navigation"
import { fetchUser } from "@/app/helpers/backend"
import MainLoader from "@/app/components/common/loader"
import { TbShoppingBagHeart } from "react-icons/tb";


const menu = [
  {
    menu: "Dashboard",

  },
  {
    label: "Dashboard",

    href: "/admin",
    icon: <MdCategory />,
  },
  {
    menu: "Users",

  },
  {
    label: "User",
    href: "/admin/users",
    icon: <TbShoppingBagHeart />,
  },
  {
    label: "Vendor",
    href: "/admin/vendors",
    icon: <TbShoppingBagHeart />,
  },
  {
    label: "Subscribers",
    href: "/admin/subscribers",
    icon: <TbShoppingBagHeart />,
  },
  {
    menu: "Inventory",

  },
   {
    label: "Shops",
    icon: <Md12Mp />,
    children: [
    {
    label: "Category",
    href: "/admin/inventory/category",
    icon: <MdCategory />,

  },
  {
    label: "Product Brand",
    href: "/admin/inventory/brand",
    icon: <FaStore />,

  },
  {
    label: "Product Sections",
    href: "/admin/inventory/sections",
    icon: <LiaStoreAltSolid />,

  },
  {
    label: "Product Attributes",
    href: "/admin/inventory/attribute",
    icon: <LiaShippingFastSolid />,

  },
  {
    label: "Product",
    href: "/admin/inventory",
    icon: <LiaShippingFastSolid />,
  },
    ],
  },
  {
    label: "Vendor Product",
    href: "/admin/inventory/vendor-product",
    icon: <BsShop />,

  },
  {
    label: "Orders",
    href: "/admin/order",
    icon: <FaCopy />,

  },
  {
    label: "Coupon",
    href: "/admin/inventory/coupon",
    icon: <FaBarcode />,

  },
  {
    label: "Testimonial",
    href: "/admin/inventory/testimonial",
    icon: <PiQuotesThin />,

  },
  { menu: "Blog" },
  {
    label: "Blog",
    href: "/admin/blog",
    icon: <Md12Mp />,
  },
  {
    label: "Blog Category",
    href: "/admin/blog/category",
    icon: <Md12Mp />,
  },
  {
    label: "Blog Tags",
    href: "/admin/blog/tag",
    icon: <Md12Mp />,
  },
 
 
  {
    menu: "Settings",

  },
  {
    label: "Settings",
    href: "/admin/settings",
    icon: <FaStore />,
    
  },
  {
    label: "FAQ",
    href: "/admin/settings/faq",
    icon: <MdChat />,

  },
  {
    label: "Email Settings",
    href: "/admin/settings/mail-settings",
    icon: <MdChat />,

  },
  {
    label: "Payment Settings",
    href: "/admin/settings/payment-setting",
    icon: <MdChat />,

  },
  {
    label: "SMS Settings",
    href: "/admin/settings/sms",
    icon: <MdChat />,

  },
  {
    label: "Contact Settings",
    href: "/admin/settings/contact-us",
    icon: <MdChat />,
  },
  {
    menu: "Banner",

  },
  
  {
    label: "Banner Settings",
    href: "/admin/banner",
    icon: <MdChat />,

  },


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
      if (data?.role === "admin") {
        setUser(data)
      } else {
        router.push("/login")
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