import React from 'react'
const AddCartbtn = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className="group bg-textMain border border-primary text-white py-2 px-2 sm:px-4 rounded-md flex items-center justify-center overflow-hidden">
      <span
        className="transition-transform duration-700 ease-in-out group-hover:translate-x-[500%]"
        style={{ display: 'flex' }}
      >
        <svg
          className="w-[26px] h-[26px] mr-2 text-primary border border-primary p-0.5 rounded-[2px]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          ></path>
        </svg>
      </span>
      <span className='font-roboto font-semibold text-base sm:text-xl leading-7 transition-transform duration-500 ease-in-out group-hover:translate-x-[-20%] '>{children}</span>
    </button>
  )
}

export default AddCartbtn