'use client'
import React, { useEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Swiper from "swiper"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

const Heroswiper = ({ data }) => {

    const swiperRef = useRef(null)

    useEffect(() => {
        if (swiperRef.current) {
            const swiper = new Swiper(swiperRef.current, {
                modules: [Navigation, Pagination, Autoplay],
                slidesPerView: 1,
                spaceBetween: 0,
                loop: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                autoplay: {
                    delay: 5000,
                },
            })

            return () => {
                swiper.destroy()
            }
        }
    }, [])
    return (
        <div ref={swiperRef} className="swiper bulet w-full">
            <div className="swiper-wrapper">
                {data?.data?.docs?.map((slide) => (
                    <Link href={slide?.url} key={slide?._id} className="swiper-slide">
                        <div className="w-full xl:h-[416px] lg:h-[390px] sm:h-[300px] h-[150px] flex flex-col md:flex-row items-center relative">
                            <div className="absolute inset-0 w-full h-full -z-10">
                                <Image
                                    src={slide?.image || ""}
                                    alt={slide?.name || "Hero Image"}
                                    width={4000}
                                    quality={90}
                                    loading="lazy"
                                    height={4000}
                                    className="object-fill w-full h-full"
                                />
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
            <div className="swiper-pagination absolute bottom-2 flex justify-center space-x-1"></div>
        </div>
    )
}

export default Heroswiper