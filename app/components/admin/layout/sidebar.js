"use client"

import React, { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { MdChevronRight, MdMenu, MdClose } from "react-icons/md"
import { IoCodeSharp } from "react-icons/io5"

export default function Sidebar({ menu, onCollapsedChange, onMobileToggle }) {
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [openMenus, setOpenMenus] = useState({})
  const pathname = usePathname()

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768
      setIsMobile(mobile)
      if (mobile) setCollapsed(true)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)
    return () => window.removeEventListener("resize", checkMobile)
  }, [])

  useEffect(() => {
    onCollapsedChange(collapsed)
  }, [collapsed, onCollapsedChange])

  useEffect(() => {
    if (onMobileToggle && isMobile) {
      onMobileToggle(mobileOpen)
    }
  }, [mobileOpen, isMobile, onMobileToggle])

  const toggleMobile = () => {
    setMobileOpen(!mobileOpen)
  }

  const toggleSubmenu = (label) => {
    setOpenMenus((prev) => ({
      ...prev,
      [label]: !prev[label],
    }))
  }

  return (
    <>
      {mobileOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={() => setMobileOpen(false)}
        />
      )}
      {!mobileOpen && (
        <button
          className="md:hidden fixed top-4 left-4 z-30 bg-gray-900 text-white p-2 rounded-md"
          onClick={toggleMobile}
        >
          <MdMenu size={24} />
        </button>
      )}

      <div
        className="fixed top-0 h-full bg-gray-900 text-white z-30 transition-all duration-300"
        style={{
          width: isMobile ? "250px" : collapsed ? "60px" : "250px",
          left: isMobile ? (mobileOpen ? "0" : "-250px") : "0",
        }}
      >
        {/* Sidebar Header */}
        <div className="p-4 flex items-center justify-between relative">
          <div className={`font-bold flex items-center ${collapsed && !isMobile ? "justify-center w-full" : ""}`}>
            {collapsed && !isMobile ? (
              <span className="text-xl font-bold">+</span>
            ) : (
              <div className="flex items-center">
                <span className="text-xl font-bold mr-1">k</span>
                <span className="text-xl text-white font-bold">++</span>
              </div>
            )}
          </div>
          {isMobile && mobileOpen && (
            <button onClick={toggleMobile} className="md:hidden text-white">
              <MdClose size={24} />
            </button>
          )}
        </div>

        {/* Collapse Button (desktop only) */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden md:block absolute -right-3 top-12 bg-gray-200 rounded-full p-1 text-gray-800 hover:bg-gray-300 transition-colors z-30"
        >
          <IoCodeSharp className={`transform transition-transform ${collapsed ? "" : "rotate-180"}`} />
        </button>

        {/* Sidebar Menu */}
        <div
          className="mt-6 overflow-y-auto sidebar-scrollbar"
          style={{ maxHeight: "calc(100vh - 100px)" }}
        >
          {menu.map((item, index) => {
            if (item.menu) {
              return (!collapsed || isMobile) && (
                <div key={index} className="px-4 py-2 text-gray-400 text-xs uppercase">{item.menu}</div>
              )
            }

            if (item.children) {
              return (
                <div key={index} className="relative">
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className={`w-full flex items-center gap-3 px-4 py-3 duration-500 text-gray-300 hover:bg-gray-800 transition-colors ${
                      collapsed && !isMobile ? "justify-center" : ""
                    }`}
                    title={collapsed && !isMobile ? item.label : ""}
                  >
                    <span className="text-xl">{item.icon}</span>
                    {(!collapsed || isMobile) && (
                      <>
                        <span className="flex-1 text-left font-montserrat font-medium">{item.label}</span>
                        <MdChevronRight
                          className={`transition-transform duration-500 ${
                            openMenus[item.label] ? "rotate-90" : ""
                          }`}
                        />
                      </>
                    )}
                  </button>

                  {/* Animated Submenu */}
                  <div
                    className={`ml-5 overflow-hidden transition-all duration-700 ease-in-out space-y-2 ${
                      openMenus[item.label] && !collapsed ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
                    }`}
                  >
                    {item.children.map((subItem, subIndex) => (
                      <Link
                        key={subIndex}
                        href={subItem.href}
                        className={`block px-2 py-2 text-sm text-gray-300 duration-500 rounded hover:bg-gray-700 transition-colors ${
                          pathname === subItem.href ? "bg-gray-800 text-white" : ""
                        }`}
                        onClick={() => isMobile && setMobileOpen(false)}
                      >
                        <div className="flex items-center gap-2 duration-500">
                          {subItem.icon && <span className="text-xl">{subItem.icon}</span>}
                          <span className="font-montserrat font-medium">{subItem.label}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )
            }

            return (
              <Link
                key={index}
                href={item.href || "/admin"}
                className={`flex items-center gap-3 px-4 py-3 text-gray-300 duration-300 hover:bg-gray-800 transition-colors ${
                  pathname === item.href ? "bg-gray-800 text-white" : ""
                } ${collapsed && !isMobile ? "justify-center" : ""}`}
                title={collapsed && !isMobile ? item.label : ""}
                onClick={() => isMobile && setMobileOpen(false)}
              >
                <span className="text-xl">{item.icon}</span>
                {(!collapsed || isMobile) && (
                  <span className="font-montserrat font-medium">{item.label}</span>
                )}
              </Link>
            )
          })}
        </div>
      </div>
    </>
  )
}
