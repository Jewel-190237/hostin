import { useState } from "react"
import Description from "./description"
import Specification from "./specification"
import VendorInfo from "./vendorInfo"

export default function ProductDescription() {
  const [activeTab, setActiveTab] = useState("Description")

  return (
    <div className="mb-14">
      <div className="border-b mb-4">
        <div className="flex">
          <button
            className={`px-4 py-2 font-medium ${activeTab === "Description" ? "border-b-2 border-primary text-textMain" : "text-gray-500"}`}
            onClick={() => setActiveTab("Description")}
          >
            Description
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "Specification" ? "border-b-2 border-primary text-textMain" : "text-gray-500"}`}
            onClick={() => setActiveTab("Specification")}
          >
            Specification
          </button>
          <button
            className={`px-4 py-2 font-medium ${activeTab === "VendorInfo" ? "border-b-2 border-primary text-textMain" : "text-gray-500"}`}
            onClick={() => setActiveTab("VendorInfo")}
          >
            VendorInfo
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {activeTab === "Description" && (
        
           <Description />
        )}
        {activeTab === "Specification" && (
          <Specification />
        )}
        {activeTab === "VendorInfo" && (
      <VendorInfo />
        )}
      </div>
    </div>
  )
}
