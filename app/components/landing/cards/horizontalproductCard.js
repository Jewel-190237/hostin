'use client'
import { useI18n } from '@/app/context/i18n'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { MdStarRate } from 'react-icons/md'

const StrateproductCard = ({ data }) => {
  const { langCode } = useI18n()

  return (
    <div className="flex gap-4 font-roboto ">
      <Link href={`/product/${data?._id}`} className="lg:!w-[55%] xs:w-[139px] w-28 border xs:h-[124px] h-20 ">
        <Image
          src={data?.thumbnail || "/default.png"}
          alt={data?.name}
          width={1000}
          loading="lazy"
          height={1000}
          className="!w-full h-full object-fill"
        />
      </Link>
      <div className="w-full ">
        <Link href={`/product/${data?._id}`} className="text-base leading-6 font-normal text-black line-clamp-1">{data?.name[langCode]}</Link>
        <div className="flex mt-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <MdStarRate
              key={star}
              className={`w-3 h-3 fill-current ${star <= (data?.rating || 0) ? '!text-primary' : 'text-gray-300'}`}
            />
          ))}
        </div>
        <div className="flex items-center mt-1">
          <span className="text-sm font-medium text-textMain">${data?.currentPrice}</span>
          <span className="text-xs text-tertialText line-through ml-2">${data?.originalPrice}</span>
        </div>
        <div className="flex items-center mt-1">
          <span className="text-xs bg-green-100 text-textMain px-1.5 py-0.5 rounded">In Stock</span>
          <span className="text-xs text-textMain ml-2">{data?.stock || 0}% remaining</span>
        </div>
      </div>
    </div>
  )
}

export default StrateproductCard
