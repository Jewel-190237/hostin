import Image from 'next/image'
import React from 'react'
import { BiChat, BiMessageSquare } from 'react-icons/bi'
import { BsArrowRight } from 'react-icons/bs'
import { MdArrowForwardIos } from 'react-icons/md'

const VendorInfo = () => {
  return (
    <div className="font-roboto">
      <div className="flex flex-col md:flex-row  overflow-hidden">
        {/* Left side - Image */}
        <div className="w-full md:w-1/2">
          <div className=" bg-gray-100 relative">
          <Image
          width={1000}
          height={500}
            src="/coupon.png" 
            alt="Healthcare with fern leaf" 
            className="w-full h-64 md:h-full object-cover"
          />
        </div>
         <div className="grid grid-cols-3 gap-2 mt-6 text-center">
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Positive Seller Rating</span>
              <span className="font-medium text-primary text-xl">81%</span>
            </div>
            <div className="flex flex-col border-l border-r">
              <span className="text-xs text-gray-600">Ship On Time</span>
              <span className="font-medium text-[#22C55E] text-xl">100%</span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-600">Chat Response Rate</span>
              <span className="font-medium text-[#22C55E] text-xl">95%</span>
            </div>
          </div>
        </div>
        {/* Right side - Shop Info */}
        <div className="w-full md:w-1/2 p-6 flex flex-col justify-between">
          <div className="space-y-4">
            {/* Shop Details */}
            <div>
              <div className="flex mb-2">
                <span className="font-semibold text-textMain mr-2">Shop Name:</span>
                <span>Health Care Bangladesh</span>
              </div>
              <div className="flex mb-4">
                <span className="font-semibold text-textMain mr-2">Owner Name:</span>
                <span>Mahmud Hossan</span>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="space-y-2">
              <button className=" bg-primary hover:bg-orange-500 text-white py-2 px-11 rounded flex items-center justify-center">
                <BiChat className="h-5 w-5 mr-2" />
                Chat Now
              </button>
              <button className=" bg-textMain hover:bg-blue-900 text-white py-2 px-[38px] rounded flex items-center justify-center">
                Go To Store
                <MdArrowForwardIos className="h-5 w-5 ml-2" />
              </button>
            </div>
          </div>
         
        </div>
      </div>
    </div>
  )
}

export default VendorInfo
