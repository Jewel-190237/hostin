"use client"
import { useI18n } from "@/app/context/i18n";
import { useUser } from "@/app/context/user";
import { Dropdown, message, Select, Space, Tooltip } from "antd";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react"
import { AiOutlineDeliveredProcedure } from "react-icons/ai";
import { FaBuildingUser } from "react-icons/fa6";
import { FiLock, FiLogOut, FiUser } from "react-icons/fi";

export default function Header({ title, sidebarCollapsed, isMobile = false, sidebarMobileOpen = false }) {
  const [open, setOpen] = useState(false);
  const { user, getUser, setUser } = useUser();
  const router = useRouter();
  const i18n = useI18n();
  const defaultLang = i18n?.languages?.find((lang) => lang?.default)?.name;
  const langFromLocalStorage = typeof localStorage !== "undefined" ? localStorage.getItem("lang") : null;
  const handleLogout = () => {
    localStorage.removeItem('token')
    router.push('/')
    getUser();
    setUser();
    message.success(i18n?.t('Logged out successfully'))
  }
  const items = [
    {
      label: i18n?.t('Profile'),
      icon: <FiUser />,
      key: '1',
      onClick: () => router.push('/admin/profile'),
    },
    {
      label: i18n?.t('Change Password'),
      icon: <FiLock />,
      key: '2',
      onClick: () => { setOpen(true) },
    },
    {
      label: i18n?.t('Logout'),
      icon: <FiLogOut />,
      key: '3',
      onClick: handleLogout,
    }
  ];
  return (
    <header
      className="fixed top-0 right-0 h-16 bg-white shadow-sm z-10 flex items-center justify-between transition-all duration-300"
      style={{
        left: isMobile ? "0" : sidebarCollapsed ? "60px" : "250px",
        paddingLeft: isMobile ? "60px" : "24px", 
        paddingRight: "24px",
      }}
    >
      <div className="flex items-center gap-4 overflow-hidden">
      </div>

      <div className="flex items-center gap-3">
        <Tooltip title="Go LiveSite">
          <Link href="/">
            <AiOutlineDeliveredProcedure size={25} />
          </Link>
        </Tooltip>
 
      {defaultLang === undefined ? (
            <p>Select Language</p>
          ) : (
            <div className="flex items-center gap-x-6">
              <div className="!text-white border border-green-600/40 rounded-md">
                <Select
                  value={
                    langFromLocalStorage
                      ? i18n?.languages?.find(
                        (lang) => lang?._id === langFromLocalStorage
                      )?.name
                      : i18n?.languages?.find((lang) => lang?.default)?.name
                  }
                  style={{ width: 100, color: "white" }}
                  variant="borderless"
                  onChange={(value) => {
                    i18n?.changeLanguage(value);
                  }}
                  options={i18n?.languages?.map((lang) => ({
                    value: lang?._id,
                    label: lang?.name,
                  }))}
                  className="inline-flex items-center justify-center !text-white capitalize"
                />
              </div>
            </div>
          )}
          <Dropdown
  menu={{
    items,
  }}
>
  <div className="cursor-pointer flex items-center justify-between gap-2">
    <Space className="cursor-pointer">
      {
        user?.image && user.image.trim() ? ( 
          <Image
            src={user.image.trim()} 
            alt="user"
            width={40}
            height={40}
            className="w-[25px] h-[25px] md:w-[30px] md:h-[30px] lg:w-[40px] lg:h-[40px] rounded-full"
          />
        ) : (
          <FaBuildingUser className="text-lg sm:text-xl" />
        )
      }
    </Space>
    <p className="text-lg capitalize">{user?.first_name}</p>
  </div>
</Dropdown>
       
      </div>
    </header>
  )
}
