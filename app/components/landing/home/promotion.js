'use client'
import Image from 'next/image'
import React from 'react'

const Promotion = () => {
    const promotions = [
        {
        id: "1",
        image: "/banner.png",
        link: "/promotion/summer-sale",
        },
        {
        id: "2",
        image: "/banner.png",
        link: "/promotion/winter-sale",
        },
    ]
  return (
    <div className="container px-4 lg:px-0">
        {
            promotions?.map((promotion) => (
                <div key={promotion.id} className="md:h-[318px] h-auto w-full mb-4 md:mb-10">
                   <Image
                    src={promotion.image}
                    width={1000}
                    height={500}
                    alt="Promotion"
                    className="md:object-fill object-cover w-full h-full"
                    priority
                    />
                </div>
            ))
        }
    </div>
  )
}

export default Promotion
