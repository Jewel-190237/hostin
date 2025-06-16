import Image from 'next/image'
import React from 'react'

const BrandCard = ({ data }) => {
  return (
       <div className=" h-[150px] border border-gray-200  flex items-center justify-center">
                <Image
                  src={data?.image || "/default.png"}
                  alt={data?.name}
                  width={1000}
                  loading="lazy"
                  height={1000}
                  className="h-full w-full object-cover py-[10px] px-[9px]"
                />
              </div>
  )
}

export default BrandCard
