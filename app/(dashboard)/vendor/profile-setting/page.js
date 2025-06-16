"use client"

import ProfileContent from "@/app/components/vendor/profile/profileinfo"
import { useState } from "react"
import { SiHomeassistantcommunitystore } from "react-icons/si";
import {
  MdPerson as User,
  MdLock as Lock,
} from "react-icons/md"
import ShopInfoContent from "@/app/components/vendor/profile/ShopInfoContent";
import ResetPassword from "@/app/components/vendor/profile/resetpassword";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState("Profile")

  const tabs = [
    { name: "Profile", icon: <User size={18} className="text-gray-500" /> },
    { name: "Shop info", icon: <SiHomeassistantcommunitystore size={18} className="text-gray-500" /> },
    { name: "Reset password", icon: <Lock size={18} className="text-gray-500" /> },

  ]

  return (
    <div className="flex flex-col md:flex-row min-h-[30vh] ">
      {/* Sidebar */}
      <div className="w-full md:w-64 bg-white border-r border-gray-200 rounded-2xl h-fit">
        <div className="p-4">
          <h1 className="text-xl font-medium text-textMain">Profile</h1>
        </div>
        <nav className="my-4">
          <ul>
            {tabs.map((tab) => (
              <li
                key={tab.name}
                className={`px-4 py-3 flex items-center gap-2 rounded-l-xl cursor-pointer ${
                  activeTab === tab.name
                    ? "bg-gray-100 border-l-4 border-primary text-textMain"
                    : "text-gray-600 hover:bg-gray-50"
                }`}
                onClick={() => setActiveTab(tab.name)}
              >
                {tab.icon}
                <span>{tab.name}</span>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:px-6 px-0 py-4 md:py-0">
        {activeTab === "Profile" && <ProfileContent />}
        {activeTab === "Shop info" && <ShopInfoContent />}
        {activeTab === "Reset password" && <ResetPassword />}
      </div>
    </div>
  )
}