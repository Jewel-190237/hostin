"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Swiper from "swiper"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import { FaChevronLeft, FaChevronRight } from "react-icons/fa"
import "swiper/css"
import "swiper/css/pagination"
import "swiper/css/navigation"

const AdvertisementBanner = () => {
  const swiperRef = useRef(null)

  const slides = [
    {
      id: 1,
      type: "gift-voucher",
      title: "GIFT VOUCHER",
      subtitle: "No. 1 234 567 890",
      discount: "75%",
      validity: "VALID UNTIL 31.07.2021",
      link: "/promotions",
      linkText: "Shop Now",
      gradient: "bg-gradient-to-r from-black to-orange-500",
    },
    {
      id: 2,
      type: "limited-edition",
      title: "LIMITED EDITION",
      subtitle: "COLLECTION",
      discountBadge: "50% OFF",
      imageSrc: "/placeholder.svg?height=100&width=150",
      link: "/limited-edition",
      linkText: "Shop Now",
      gradient: "bg-gray-900",
    },
    {
      id: 3,
      type: "Elimited-edition",
      title: "LIMITED EDITION",
      subtitle: "COLLECTION",
      discountBadge: "50% OFF",
      imageSrc: "/placeholder.svg?height=100&width=150",
      link: "/limited-edition",
      linkText: "Shop Now",
      gradient: "bg-gray-900",
    },
    {
      id: 4,
      type: "Mlimited-edition",
      title: "LIMITED EDITION",
      subtitle: "COLLECTION",
      discountBadge: "50% OFF",
      imageSrc: "/placeholder.svg?height=100&width=150",
      link: "/limited-edition",
      linkText: "Shop Now",
      gradient: "bg-gray-900",
    },
  ]

  useEffect(() => {
    if (swiperRef.current) {
      const swiper = new Swiper(swiperRef.current, {
        modules: [Navigation, Pagination, Autoplay],
        breakpoints: {
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1280: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
        },
        loop: true,
        navigation: {
          nextEl: ".advert-next",
          prevEl: ".advert-prev",
        },
        autoplay: {
          delay: 5000,
          disableOnInteraction: false,
        },
      })

      return () => {
        swiper.destroy()
      }
    }
  }, [])

  return (
    <section className="w-full px-4 sm:my-10 my-3">
      <div className="container mx-auto">
        <div className="relative">
          <div ref={swiperRef} className="swiper">
            <div className="swiper-wrapper">
              {slides.map((slide) => (
                <div key={slide.id} className="swiper-slide">
                  <div className={`relative h-32 md:h-[180px] w-full rounded-lg overflow-hidden ${slide.gradient}`}>
                    <div className="absolute inset-0 flex items-center">
                      {slide.type === "gift-voucher" && (
                        <>
                          <div className="w-1/2 pl-6 md:pl-10">
                            <div className="text-orange-500 font-bold text-xl md:text-3xl">{slide.title}</div>
                            <div className="text-white text-xs md:text-sm mt-1">{slide.subtitle}</div>
                            <Link
                              href={slide.link}
                              className="inline-block mt-2 bg-orange-500 text-white text-xs md:text-sm px-4 py-1 rounded-sm hover:bg-orange-600 transition-colors"
                            >
                              {slide.linkText}
                            </Link>
                          </div>
                          <div className="w-1/2 flex flex-col items-center">
                            <div className="text-white text-xs md:text-sm">D I S C O U N T</div>
                            <div className="text-white font-bold text-4xl md:text-6xl">{slide.discount}</div>
                            <div className="text-white text-[8px] md:text-xs">{slide.validity}</div>
                          </div>
                        </>
                      )}
                      {slide.type === "limited-edition" && (
                        <>
                          <div className="w-1/2 flex justify-center">
                            <div className="relative">
                              <img
                                src={slide.imageSrc}
                                alt="Limited Edition Shoe"
                                className="h-20 md:h-24 object-contain"
                              />
                              <div className="absolute -top-2 -right-2 bg-white text-red-600 text-xs font-bold py-1 px-2 transform rotate-12">
                                {slide.discountBadge}
                              </div>
                            </div>
                          </div>
                          <div className="w-1/2 flex flex-col items-start pr-6">
                            <div className="text-white text-xs md:text-sm">{slide.title}</div>
                            <div className="text-white font-bold text-xl md:text-2xl">{slide.subtitle}</div>
                            <Link
                              href={slide.link}
                              className="inline-block mt-2 bg-orange-500 text-white text-xs md:text-sm px-4 py-1 rounded-sm hover:bg-orange-600 transition-colors"
                            >
                              {slide.linkText}
                            </Link>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <div className="advert-prev absolute left-5 top-[80%] transform -translate-y-1/2 w-6 h-6 bg-white bg-opacity-80 rounded-sm flex items-center justify-center cursor-pointer z-10 hover:bg-white transition-colors">
            <FaChevronLeft className="h-4 w-4" />
          </div>
          <div className="advert-next absolute right-5 top-[80%] transform -translate-y-1/2 w-6 h-6 bg-white bg-opacity-80 rounded-sm flex items-center justify-center cursor-pointer z-10 hover:bg-white transition-colors">
            <FaChevronRight className="h-4 w-4" />
          </div>

          {/* Pagination Dots */}
          <div className="advert-pagination absolute bottom-1 w-full flex justify-center"></div>
        </div>
      </div>
    </section>
  )
}

export default AdvertisementBanner
