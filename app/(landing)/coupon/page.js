'use client';
import CouponCard from '@/app/components/landing/cards/couponCard'
import React, { useEffect, useState } from 'react'

const Page = () => {
  const [coupons, setCoupons] = useState([])

  useEffect(() => {
    const fetchCoupons = async () => {
      const response = await fetch('/coupon.json')
      const data = await response.json()
      setCoupons(data)
    }
    fetchCoupons()
  }, [])

  return (
    <div className='container '>
      <h1 className='section-title mt-5 mb-[30px]'>Today's <span className='text-[#EF8121]'>Popular Deals</span></h1>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-6">
        {coupons.map((coupon) => (
          <CouponCard key={coupon.id} data={coupon} />
        ))}
      </div>
    </div>
  )
}

export default Page