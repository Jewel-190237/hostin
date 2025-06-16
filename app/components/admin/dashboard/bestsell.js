'use client'
import Image from 'next/image'
import React from 'react'

const Bestsell = () => {
  return (
    <div
      className="!w-full  rounded-lg shadow-lg"
      style={{
        backgroundImage: "url('/1.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
    <div className="flex flex-col md:flex-row items-start gap-4 !w-full">
      <div className="flex-1 space-y-4 p-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 rounded-full  flex items-center justify-center">
            <Image
              src="/headphone.jpg"
              width={40}
              height={40}
              alt="Headphones"
              className="object-contain w-full h-full rounded-full"
            />
          </div>
          <h2 className="text-2xl whitespace-pre text-white font-bold">Today's Sale</h2>
        </div>

        <div className="space-y-1 mt-6">
          <p className="text-sm text-blue-200">
            <span className="text-white font-semibold">HeadPhones 68 x 2 samsung</span>
          </p>
         
            <button
              className="font-semibold text-white bg-white/20 backdrop-blur-md mt-4 px-4 py-2 rounded-lg hover:bg-white/30 transition"
            >
              Price: $9.99
            </button>
          
        </div>

     
      </div>

      <div className=" mt-4 md:mt-0 ">
        <Image
          src="/sell.png"
          width={4000}
          height={4000}
          alt="Person with gifts"
          className="object-fit w-[360px] h-[150px] "    
        />
      </div>
    </div>
  </div>
  )
}

export default Bestsell
