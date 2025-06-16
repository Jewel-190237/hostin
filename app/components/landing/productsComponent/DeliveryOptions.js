'use client'
import { QRCode } from "antd"
import { RiVerifiedBadgeLine } from "react-icons/ri";
import { TbPlayCard7 } from "react-icons/tb";
import { GrChatOption } from "react-icons/gr";
import { FiMapPin } from "react-icons/fi";
import { CiDeliveryTruck } from "react-icons/ci";
import { FcApproval } from "react-icons/fc";

export default function DeliveryOptions() {
  return (
    <>
    <div className=" mb-[6px] bg-[#E8EAE8]  xl:w-[224px] w-full font-roboto">
      {/* Delivery Option */}
      <div className=" p-4 border-b border-gray-300">
        <div className="flex items-center">
          <FiMapPin className="w-5 h-5 text-textMain mr-2" />
 
          <span className="font-normal text-textMain text-sm">Delivery Option</span>
        </div>
        <div className="flex justify-between items-center mt-2 gap-2">
          <div className="text-xs text-[#4F4F4F]">Khulna, Khulna-Town Khulna Sadar</div>
          <button className="text-primary text-sm">Change</button>
        </div>
      </div>
      {/* Standard Delivery */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center gap-[6px]">
          <CiDeliveryTruck  className="w-[19px] h-[19px] text-textMain"/>

          <div className="font-normal text-textMain text-sm">Standard Delivery</div>
        </div>
     <div className="flex items-center justify-between my-[6px] gap-[4px]">
         <h3 className="text-xs text-[#4F4F4F]">Guaranteed by 10-14 May</h3>
         <span className="text-xs text-[#4F4F4F]">$334</span>
     </div>
        <div className="flex items-center gap-[6px]">
          <RiVerifiedBadgeLine className="w-[15px] text-textMain h-[15px]" />
          <div className="font-normal text-textMain text-sm">Cash on Delivery Available</div>
        </div>
      </div>

      {/* Cash on Delivery */}
      <div className="p-4 border-b border-gray-300">
       <h5 className="text-textMain text-[10px]">Return & Warranty</h5>
       <div className=" flex items-center gap-[6px] my-1">
      <TbPlayCard7 className="w-[13px] text-textMain h-[15px]" />
<h3 className="text-xs text-[#4F4F4F]">7 Days Returns</h3>
       </div>
       <div className=" flex items-center gap-[6px]">
     <FcApproval />
<h3 className="text-xs text-[#4F4F4F]">Warranty not available</h3>
       </div>
      </div>


      {/* QR Code */}
      <div className="flex justify-center p-4 ">
        <div className="text-center">
          <QRCode size={65} type="svg" value="https://ant.design/" />
          <div className="text-[10px] text-center mt-[6px]">Scan It</div>
        </div>
      </div>
    </div>



     <div className=" bg-[#E8EAE8] font-roboto ">
      <div className="border-b border-gray-300 py-[10px] font-normal leading-5 px-[16px] justify-between">
        <h3 className="text-[10px] text-textMain">Sold by</h3>
        <div className="text-sm !text-textBody">Health Care Bangladesh Limited</div>
        <div className="flex items-center justify-center gap-1 cursor-pointer">
          <GrChatOption className="text-textMain w-[18px] h-3"/>
          <h3 className="text-xs text-primary text-[10px]">Chat Now</h3>
        </div>
      </div>
      <div className="border-b border-gray-300  font-normal leading-5 px-[16px] justify-between grid grid-cols-3 gap-x-1">
       <div className="flex flex-col items-center py-2">
        <h2 className="text-[8px] leading-none text-black">Positive Seller Rating</h2>
        <h2 className="text-xl font-medium leading-7 text-textMain py-1">81%</h2>
       </div>
       <div className="flex flex-col items-center border-l border-r border-gray-300 px-3 py-2">
        <h2 className="text-[8px] leading-none text-black  ">Ship On Time</h2>
        <h2 className="text-xl font-medium leading-7 text-textMain   py-1">100%</h2>
       </div>
       <div className="flex flex-col items-center py-2">
        <h2 className="text-[8px] leading-none text-black">Chat Reponse Rate</h2>
        <h2 className="text-xl font-medium leading-7 text-textMain py-1">81%</h2>
       </div>
      </div>
<div className="py-[7px]">
  <h2 className="text-primary text-sm text-center font-normal">Go To Store</h2>
</div>
      </div>
    </>
  )
}
