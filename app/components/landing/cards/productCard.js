"use client"
import { useI18n } from "@/app/context/i18n"
import { useUser } from "@/app/context/user"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { TiStar } from "react-icons/ti"

const ProductCard = ({ data }) => {
    const router = useRouter()
    const {langCode} = useI18n()
    const {addItem, removeItem}= useUser()
  return (
    <div className="group bg-white border border-gray-200  overflow-hidden w-full h-fit relative">
      {/* Animated border overlay */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 ease-out"></div>
        <div className="absolute top-0 right-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-500 ease-out delay-500"></div>

        <div className="absolute bottom-0 right-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-500 ease-out delay-[1400ms]"></div>
        <div className="absolute bottom-0 left-0 w-[2px] h-0 bg-primary group-hover:h-full transition-all duration-500 ease-out"></div>
      </div>

      <div onClick={() => router.push(`/product/${data?._id}`)} className="aspect-square cursor-pointer sm:h-[242px] h-48 w-full border-b relative overflow-hidden bg-white p-2">
        <Image
          src={data?.thumbnail || "/default.png"}
          width={1000}
          height={1000}
          alt={data?.thumbnail || "Product Image"}
          loading="lazy"
          className="object-cover h-full w-full group-hover:scale-150 transition-transform duration-700 ease-out"
        />
      </div>

      <div className="py-3 px-5">
        <Link href={`/product/${data?._id}`} className="text-lg line-clamp-1 font-medium text-gray-800 mb-1">{data?.name[langCode]}</Link>

        <div className="flex items-center mb-[7px]">
          <div className="flex items-center justify-center py-0 px-1 bg-green-500  ">
            <span className="text-white flex items-center text-xs font-medium tracking-[3px]">
              {data?.rating}
              <TiStar className="!h-3 !w-3" color="#FCCA19" />
            </span>
          </div>
          <span className="text-xs text-[#74778A] ml-[3px] border-l border-[#74778A] pl-[3px]">
            {data?.soldCount ?? 0}+ Sold
          </span>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <span className="text-primary text-lg font-bold">
              ${isNaN(data?.final_price) ? 0 : data?.final_price}
            </span>
            <span className="ml-1 text-[#74778A] text-xs line-through">${data?.price || 0}</span>
            <span className="ml-1 bg-primary text-white rounded px-0.5 text-xs leading-4">
              {isNaN(data?.discount) ? 0 : data?.discount}% off
            </span>
          </div>

          <div className="flex space-x-1">
            <div className="flex items-center space-x-1">
              <button className="group w-6 h-6 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  className="group-hover:hidden"
                >
                  <path
                    d="M9.09269 2.7856C10.8025 0.281608 13.3732 -0.449601 15.738 0.25399C18.2907 1.01282 20.5351 3.40766 21.2805 6.74281C21.319 6.91377 21.3523 7.08474 21.3804 7.25571C20.3045 6.83697 19.1342 6.80471 18.0403 7.16365C16.4906 5.91165 14.5713 5.70123 12.8651 6.38772C10.7278 7.24913 9.05897 9.43355 8.67246 12.1822C8.17878 15.7014 10.1414 18.863 12.9169 21.5511L13.3841 21.993C13.0072 22.0219 12.6243 21.9575 12.2582 21.872C12.0701 21.8278 11.8831 21.7787 11.6971 21.7247L11.0505 21.5274C5.30222 19.7612 1.45396 16.9981 0.34981 12.8687C-0.531581 9.57295 0.316096 6.27331 2.18002 4.22172C3.90668 2.32136 6.46657 1.5507 9.09269 2.7856ZM11.0529 12.5806C11.5683 8.90882 15.4563 7.09921 17.4527 10.2502C17.4718 10.2795 17.5007 10.2994 17.5332 10.3056C17.5656 10.3117 17.599 10.3036 17.626 10.2831C20.4882 8.06845 23.5742 11.2208 22.9084 14.8637C22.5231 16.9767 20.729 18.7302 17.5261 20.1242L17.0023 20.3478L16.6857 20.4898C16.4123 20.6068 16.1233 20.7002 15.8621 20.6502C15.602 20.6003 15.36 20.403 15.1396 20.1926L14.7663 19.8243C11.9809 17.2064 10.7431 14.7918 11.0529 12.5806Z"
                    fill="#B2B8BD"
                  />
                </svg>

                {/* Hover SVG */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="23"
                  height="24"
                  viewBox="0 0 23 24"
                  fill="none"
                  className="hidden group-hover:block"
                >
                  <path
                    d="M9.09269 2.7856C10.8025 0.281608 13.3732 -0.449601 15.738 0.25399C18.2907 1.01282 20.5351 3.40766 21.2805 6.74281C21.319 6.91377 21.3523 7.08474 21.3804 7.25571C20.3045 6.83697 19.1342 6.80471 18.0403 7.16365C16.4906 5.91165 14.5713 5.70123 12.8651 6.38772C10.7278 7.24913 9.05897 9.43355 8.67246 12.1822C8.17878 15.7014 10.1414 18.863 12.9169 21.5511L13.3841 21.993C13.0072 22.0219 12.6243 21.9575 12.2582 21.872C12.0701 21.8278 11.8831 21.7787 11.6971 21.7247L11.0505 21.5274C5.30222 19.7612 1.45396 16.9981 0.34981 12.8687C-0.531581 9.57295 0.316096 6.27331 2.18002 4.22172C3.90668 2.32136 6.46657 1.5507 9.09269 2.7856ZM11.0529 12.5806C11.5683 8.90882 15.4563 7.09921 17.4527 10.2502C17.4718 10.2795 17.5007 10.2994 17.5332 10.3056C17.5656 10.3117 17.599 10.3036 17.626 10.2831C20.4882 8.06845 23.5742 11.2208 22.9084 14.8637C22.5231 16.9767 20.729 18.7302 17.5261 20.1242L17.0023 20.3478L16.6857 20.4898C16.4123 20.6068 16.1233 20.7002 15.8621 20.6502C15.602 20.6003 15.36 20.403 15.1396 20.1926L14.7663 19.8243C11.9809 17.2064 10.7431 14.7918 11.0529 12.5806Z"
                    fill="#EF4444"
                  />
                </svg>
              </button>
            </div>
            <button onClick={() => addItem({ ...data, quantity: 1 })} className="group w-6 h-6 flex items-center justify-center">
              {/* Default SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="group-hover:hidden"
              >
                <g clipPath="url(#clip0_15041_1014)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.9999 7C27.9999 10.866 24.8659 14 20.9999 14C17.1339 14 13.9999 10.866 13.9999 7C13.9999 3.134 17.1339 0 20.9999 0C24.8659 0 27.9999 3.134 27.9999 7ZM16.9165 8.16667H19.8332V11.0833H22.1665V8.16667H25.0832V5.83333H22.1665V2.91667H19.8332V5.83333H16.9165V8.16667ZM21 16.3333C21.4143 16.3333 21.8224 16.3064 22.2224 16.254L20.9651 21.2829C20.8353 21.8023 20.3686 22.1667 19.8333 22.1667H8.16664C7.62337 22.1667 7.152 21.7917 7.02987 21.2624L4.87599 11.929L4.87407 11.9205L3.73856 7H0V4.66667H4.66667C5.20993 4.66667 5.6813 5.04164 5.80346 5.571L6.94091 10.5H12.3451C13.7297 13.9204 17.083 16.3333 21 16.3333ZM16.3332 25.6667C16.3332 26.9554 17.3778 28 18.6665 28C19.9552 28 20.9999 26.9554 20.9999 25.6667C20.9999 24.378 19.9552 23.3333 18.6665 23.3333C17.3778 23.3333 16.3332 24.378 16.3332 25.6667ZM9.33321 28C8.04455 28 6.99988 26.9554 6.99988 25.6667C6.99988 24.378 8.04455 23.3333 9.33321 23.3333C10.6219 23.3333 11.6665 24.378 11.6665 25.6667C11.6665 26.9554 10.6219 28 9.33321 28Z"
                    fill="#B2B8BD"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15041_1014">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>

              {/* Hover SVG */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="28"
                viewBox="0 0 28 28"
                fill="none"
                className="hidden group-hover:block"
              >
                <g clipPath="url(#clip0_15041_986)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M27.9999 7C27.9999 10.866 24.8659 14 20.9999 14C17.1339 14 13.9999 10.866 13.9999 7C13.9999 3.134 17.1339 0 20.9999 0C24.8659 0 27.9999 3.134 27.9999 7ZM16.9165 8.16667H19.8332V11.0833H22.1665V8.16667H25.0832V5.83333H22.1665V2.91667H19.8332V5.83333H16.9165V8.16667ZM21 16.3333C21.4143 16.3333 21.8224 16.3064 22.2224 16.254L20.9651 21.2829C20.8353 21.8023 20.3686 22.1667 19.8333 22.1667H8.16664C7.62337 22.1667 7.152 21.7917 7.02987 21.2624L4.87599 11.929L4.87407 11.9205L3.73856 7H0V4.66667H4.66667C5.20993 4.66667 5.6813 5.04164 5.80346 5.571L6.94091 10.5H12.3451C13.7297 13.9204 17.083 16.3333 21 16.3333ZM16.3332 25.6667C16.3332 26.9554 17.3778 28 18.6665 28C19.9552 28 20.9999 26.9554 20.9999 25.6667C20.9999 24.378 19.9552 23.3333 18.6665 23.3333C17.3778 23.3333 16.3332 24.378 16.3332 25.6667ZM9.33321 28C8.04455 28 6.99988 26.9554 6.99988 25.6667C6.99988 24.378 8.04455 23.3333 9.33321 23.3333C10.6219 23.3333 11.6665 24.378 11.6665 25.6667C11.6665 26.9554 10.6219 28 9.33321 28Z"
                    fill="#1C486F"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_15041_986">
                    <rect width="28" height="28" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard
