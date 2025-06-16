import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { IoStar } from 'react-icons/io5'
import { MdOutlineArrowForwardIos } from 'react-icons/md'

const SellerCard = ({ data }) => {
    return (
        <div key={data?._id} className="p-4 flex flex-col items-center">
            <div className="h-[200px] w-full flex items-center justify-center border">
                <Image
                    src={data?.shop_image || "/default.png"}
                    alt={data?.name || "Brand Logo"}
                    width={150}
                    height={150}
                    loading="lazy"
                    className="h-full object-cover"
                />
            </div>
            <div className="flex flex-col justify-center items-center text-center">
                <h3 className="text-textMain text-xl font-medium">{data?.shop_name}</h3>
                <div className="flex items-center gap-1 justify-center">
                    <div className="flex justify-center mt-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <IoStar
                                key={star}
                                className={`w-4 h-4 ${star <= Math.round(data?.rating || 0) ? "text-yellow-400" : "text-gray-300"} fill-current`}
                            />
                        ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-1">(7 Reviews)</p>
                </div>
                <Link href={`/shop`} className="mt-1.5 borde  border-primary bg-textMain text-white text-sm px-[10px] py-[5px] gap-2.5  flex items-center">
                    Go To Store
                    <MdOutlineArrowForwardIos />
                </Link>
            </div>
        </div>
    )
}

export default SellerCard