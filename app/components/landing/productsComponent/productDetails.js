"use client"

import { useState } from "react"
import Image from "next/image"
import { Swiper, SwiperSlide } from "swiper/react"
import { FreeMode, Navigation, Thumbs } from "swiper/modules"
import "swiper/css"
import "swiper/css/free-mode"
import "swiper/css/navigation"
import "swiper/css/thumbs"
import { FaInstagram, FaLinkedinIn, FaMinus, FaPlus } from "react-icons/fa6"
import { IoIosHeart, IoMdStar } from "react-icons/io";
import { CiShare2 } from "react-icons/ci"
import AddCartbtn from "../button/addCartbtn"
import BuyBtn from "../button/buybtn"
import { BiLogoFacebook } from "react-icons/bi";
import { BsTwitterX } from "react-icons/bs"
import { FiYoutube } from "react-icons/fi"


export default function ProductDetails() {
    const [thumbsSwiper, setThumbsSwiper] = useState(null)

    const [quantity, setQuantity] = useState(1);

const handleIncrement = () => {
    setQuantity((prev) => prev + 1);
};

const handleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
};
    const images = [
        "/chair.jpg",
        "/chair.jpg",
        "/chair.jpg",
    ]

    return (
        <div className="mb-10 font-roboto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:gap-8 sm:gap-5 gap-4">
                {/* Left side - Product Images with Swiper */}
                <div className="space-y-4 xl:px-0 px-4">
                    <div className="border rounded-md overflow-hidden">
                        <Swiper
                            spaceBetween={10}
                            //   navigation={true}
                            thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                            modules={[FreeMode, Navigation, Thumbs]}
                            className="w-full md:h-[405px] h-[300px] "
                        >
                            {images.map((img, index) => (
                                <SwiperSlide key={index}>
                                    <div className="flex items-center justify-center h-full">
                                        <Image
                                            src={img || "/default.png"}
                                            alt={`Green Plant view ${index + 1}`}
                                            width={400}
                                            height={400}
                                            className="object-contain h-full w-full"
                                        />
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>

                    {/* Thumbnail Swiper */}
                    <Swiper
                        onSwiper={setThumbsSwiper}
                        spaceBetween={10}
                        slidesPerView={3}
                        freeMode={true}
                        watchSlidesProgress={true}
                        modules={[FreeMode, Navigation, Thumbs]}
                        className="thumbs-swiper"
                    >
                        {images.map((img, index) => (
                            <SwiperSlide key={index} className="cursor-pointer border rounded-md overflow-hidden md:h-[123px] sm:h-[100px] h-[80px]">
                                <Image
                                    src={img || "/default.png"}
                                    alt={`Thumbnail ${index + 1}`}
                                    width={100}
                                    height={100}
                                    className="object-cover w-full h-full"
                                />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Right side - Product Info */}
                <div className="space-y-4 xl:px-0 px-4">
                    <div className="text-xs text-[var(--text-color-tertiary)] mb-1 font-normal flex gap-4 flex-wrap items-center">
                        <div className="flex items-center border px-1 ">
                            Category: Home supplies</div>
                        <div className="flex items-center border px-1 ">
                            Brand: Wonder</div>
                        <div className="flex items-center border px-1 ">
                            Code: WH11223
                        </div>
                    </div>
                    <div>
                        <h1 className="product-title">Decor Plant | Room Decorator By Plant</h1>
                        <div className="flex items-center mt-1">
                            <div className="flex">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <IoMdStar key={star} className="w-4 h-4 text-primary fill-current" />
                                ))}
                            </div>
                            <div className="text-xs text-[var(--text-color-tertiary)] font-normal ml-1 flex items-center">
                            <span className="">4.92/4Reviews</span>
                            <div className="flex items-center ml-3">
                                <CiShare2 className="w-[14px] h-[14px] "/>
                                <IoIosHeart className="w-[14px] h-[14px] ml-2" />
                            </div>
                            </div>
                        </div>
                    </div>
                    <div className="">
                        <h2 className="text-textBody text-xs font-normal">Offer end in:</h2>
                   <div className="flex items-center gap-[6px] font-roboto text-xs font-medium">
                     <span className="bg-primary text-white p-1 ">
                        10 Days
                    </span>
                     <span className="bg-primary text-white p-1">
                         09 Hour : 24 Minims : 32 Sec
                    </span>
                   </div>
                    </div>

                    <div className="flex items-center ">
                        <div className="price text-textMain">$224</div>
                        <div className="text-tertialText cut-price ml-2">$274</div>
                    </div>

                    <div className="flex items-center text-sm text-gray-600">
                        <span className="mr-4 stock">In Stock</span>
                        <span className="remaining">351 items remaining</span>
                    </div>

                    <div className=" py-4 my-4">
                        <div className="flex items-center">
                            <div className="flex items-center border rounded-md p-[5px] px-4">
                                <button  onClick={handleDecrement} className="px-3 py-1 hover:bg-gray-100">
                                    <FaMinus className="h-4 w-4" />
                                </button>
                                <span className="w-8 text-center">{quantity}</span>
                                <button onClick={handleIncrement} className="px-3 py-1 hover:bg-gray-100">
                                    <FaPlus className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <AddCartbtn>
                            Add to Cart
                        </AddCartbtn>
                        <BuyBtn >
                            Buy Now
                        </BuyBtn>
                    </div>

                    <div className="pt-4 flex flex-wrap items-center gap-[10px]">
                        <p className="text-xl font-roboto text-black font-semibold mb-2">Share:</p>
                        <div className="flex space-x-3">
                            <button className="p-2 duration-300 rounded-full hover:bg-primary bg-textMain text-white hover:text-white ">
                                <BiLogoFacebook className="h-6 w-6" />
                            </button>
                            <button className="p-2 duration-300 rounded-full hover:bg-primary bg-textMain text-white hover:text-white ">
                                <BsTwitterX className="h-6 w-6" />
                            </button>
                            <button className="p-2 duration-300 rounded-full hover:bg-primary bg-textMain text-white hover:text-white ">
                                <FaInstagram className="h-6 w-6" />
                            </button>
                            <button className="p-2 duration-300 rounded-full hover:bg-primary bg-textMain text-white hover:text-white ">
                                <FaLinkedinIn className="h-6 w-6" />
                            </button>
                            <button className="p-2 duration-300 rounded-full hover:bg-primary bg-textMain text-white hover:text-white ">
                                <FiYoutube className="h-6 w-6" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
