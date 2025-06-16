'use client';
import Image from 'next/image'
import React from 'react'
import { message } from 'antd'

const CouponCard = ({ data }) => {
  const handleCopyCoupon = () => {
    const couponCode = data?.couponCode;
    navigator.clipboard.writeText(couponCode).then(() => {
      message.success(`Coupon code "${couponCode}" copied to clipboard!`);
    });
  };

  return (
    <div className='w-full'>
      <button className="w-full cursor-pointer" onClick={handleCopyCoupon}>
        <div className="h-[159px] w-full">
          <Image src={data?.image || '/default.png'} alt='banner' width={1000} height={1000} className='w-full h-full object-fill' loading="lazy" />
        </div>
        <h1 className='section-title mt-3 line-clamp-2'>{data?.title}</h1>
      </button>
    </div>
  )
}

export default CouponCard
