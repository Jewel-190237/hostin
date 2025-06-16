'use client'
import React from 'react'

const Specification = () => {
  return (
    <div className="w-full ">
      {[
        { label: "Weight", value: "7kg" },
        { label: "Color", value: "As picture" },
        { label: "Material", value: "Wood" },
        { label: "Seating Capacity", value: "Single" }
      ].map((spec, index) => (
        <div 
          key={index} 
          className="flex border border-gray-300 mb-[10px]"
        >
          <div className="w-1/2 py-3 px-7 border-r border-gray-300 text-textBody font-medium">
            {spec.label}
          </div>
          <div className="w-1/2 py-3 px-7 text-textBody font-medium">
            {spec.value}
          </div>
        </div>
      ))}
    </div>
  )
}

export default Specification