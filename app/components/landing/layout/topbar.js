"use client"
import { Select } from "antd"
import { MdOutlineMail } from "react-icons/md"
import Image from "next/image"

const { Option } = Select

const TopBar = () => {
  return (
    <div className="bg-primary  text-white">
      <div className="w-full container py-0 sm:py-2 sm:px-4 px-2  gap-2 md:flex md:flex-row md:justify-between md:items-center text-sm">
        <div className="md:flex hidden flex-col items-start text-sm font-normal space-y-2 md:space-y-0 md:space-x-4 md:flex-row md:items-center">
          <div className="flex items-center">
            <span>+8801234567</span>
          </div>
          <div className="flex items-center">
            <MdOutlineMail className="h-4 w-4 mr-1" />
            <span>info@naariclick.com.bd</span>
          </div>
        </div>

        {/* Right section: Seller, Currency, Language */}
        <div className="flex space-y-2 md:space-y-0 md:space-x-4 md:flex-row md:items-center justify-between">
          <div className="flex items-center cursor-pointer">
            <Image src={"/seller.png"} alt="Seller" width={20} height={20} className="mr-1 h-5 w-5 object-fill" />
            <span className="text-sm font-normal">Be a Seller</span>
          </div>

          <div className="flex items-center cursor-pointer currency-selector w-12 currancy-selector ">
            <Select
              defaultValue="USD"
              className="bg-transparent text-white md:w-auto"
              dropdownStyle={{ backgroundColor: "#f97316", color: "#fff" }}
            >
              <Option value="USD">USD</Option>
              <Option value="EUR">EUR</Option>
              <Option value="GBP">GBP</Option>
              <Option value="BDT">BDT</Option>
            </Select>
          </div>

          <div className="flex items-center cursor-pointer language-selector currancy-selector  ">
            <Select
              defaultValue="English"
              className="bg-transparent text-white  md:w-auto"
              dropdownStyle={{ backgroundColor: "#f97316", color: "#fff" }}
            >
              <Option value="English">English</Option>
              <Option value="Spanish">Spanish</Option>
              <Option value="French">French</Option>
              <Option value="German">German</Option>
            </Select>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TopBar
