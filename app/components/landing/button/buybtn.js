import React from 'react'

const BuyBtn = ({ children, onClick }) => {
    return (
        <button onClick={onClick} className="group bg-primary text-white sm:py-[10px] p-2 sm:px-[27px] rounded-md flex items-center justify-center overflow-hidden gap-[6px]">
            <svg className='transition-transform duration-700 ease-in-out group-hover:translate-x-[200%]' xmlns="http://www.w3.org/2000/svg" width="20" height="25" viewBox="0 0 20 25" fill="none">
                <path d="M1.83489 10.6418C1.9277 9.15684 3.15909 8 4.64692 8C5.20317 8 5.74698 8.16465 6.2098 8.4732L7.65483 9.43655C9.01845 10.3456 10.8342 10.1658 11.993 9.00699C12.6378 8.36222 13.5123 8 14.4241 8H14.53C16.4805 8 18.0948 9.51658 18.2165 11.4633L18.7344 19.7505C18.8783 22.0533 17.0495 24 14.7422 24H5.2578C2.95052 24 1.12167 22.0533 1.26559 19.7505L1.83489 10.6418Z" fill="#FFDC00" stroke="#2B3F6C" strokeWidth="1.5" />
                <circle cx="10" cy="17" r="5" fill="#A4C400" />
                <path d="M7.00033 17.3333L9.16699 19.5L13.5003 15.1667" stroke="#2B3F6C" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M14 11V5.81507C14 4.66162 13.5021 3.56432 12.634 2.80477V2.80477C11.1259 1.48518 8.87409 1.48518 7.36598 2.80477V2.80477C6.49792 3.56432 6 4.66162 6 5.81507L6 11" stroke="#2B3F6C" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <span className='font-roboto sm:text-xl font-semibold text-xl leading-7 group-hover:text-transparent transition-transform duration-500 ease-in-out'>
                {children}
            </span>
        </button>
    )
}

export default BuyBtn