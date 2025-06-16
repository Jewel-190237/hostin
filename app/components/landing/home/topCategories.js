"use client"

import { useEffect, useRef } from "react"
import Image from "next/image"
import Swiper from "swiper"
import { Navigation, Pagination } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { useI18n } from "@/app/context/i18n"


const TopCategories = ({ categories }) => {
  const swiperContainerRef = useRef(null)
  const {langCode} = useI18n()
  useEffect(() => {
    if (swiperContainerRef.current) {
      const swiper = new Swiper(swiperContainerRef.current.querySelector(".swiper"), {
        modules: [Navigation, Pagination],
        loop:true,
        grabCursor: true,
        autoplay: {
          delay: 0,
          reverseDirection: true,
        },
        effect: 'slide',
        speed: 300,
        breakpoints: {
          0: {
            slidesPerView: 2,
            spaceBetween: 10,
          },
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 24,
          },
          1280: {
            slidesPerView: 6,
            spaceBetween: 34,
          },
        },
      })

      return () => {
        swiper.destroy()
      }
    }
  }, [])

  return (
    <section className="w-full py-6 px-4 " ref={swiperContainerRef}>
      <div className="container mx-auto border">
        <div className="flex justify-center items-center m-5">
          <h2 className=" text-[28px] text-center font-bold leading-[36px] text-[#1C486F]">Top categories of the month</h2>
        </div>

        <div className="relative">
          <div className="swiper">
            <div className="swiper-wrapper my-4 mx-3 ">
              {categories?.map((category) => (
                <div key={category._id} className="swiper-slide py-4 rounded-[20px] group  transition-shadow hover:shadow-[0px_5px_15px_0px_rgba(0,0,0,0.25)]" 
                  >
                  <div className="block cursor-pointer">
                    <div className="flex flex-col items-center">
                      <div className="w-20 h-20 md:w-40 md:h-40 rounded-full overflow-hidden bg-gray-100 mb-2">
                        <Image
                        loading="lazy"
                          src={category?.image || "/default.png"}
                          alt={category?.name[langCode] || "Category Image"}
                          width={1000}
                          height={1000}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="categorytext ">{category?.name[langCode]}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="categories-pagination mt-4 flex justify-center"></div>
        </div>
      </div>
    </section>
  )
}

export default TopCategories
