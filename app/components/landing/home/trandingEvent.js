'use client'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const TrandingEvent = () => {
    const promotions = [
        {
        id: "1",
        image: "/v1.jpg",
        link: "/promotion/summer-sale",
        },
        {
        id: "2",
        image: "/v2.jpg",
        link: "/promotion/winter-sale",
        },
    ]
  return (
    <div className="container px-4 my-10">
     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {promotions.map(promotion => (
            <Link key={promotion.id} href={promotion.link} className='md:h-[400px] h-auto w-full'>
                <Image src={promotion.image} alt={`Promotion ${promotion.id}`} width={1000} height={1000} className='w-full h-full object-fill' />
            </Link>
        ))}
     </div>
    </div>
  )
}

export default TrandingEvent
