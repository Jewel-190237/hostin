"use client";
import React from "react";
import { FiSearch } from "react-icons/fi";

const SearchInput = ({
  className,
  wrapperClassName,
  onChange,
  placeholder,
}) => {
  return (
    <div
      className={`relative flex items-center mr-2 font-nunito !h-fit ${
        wrapperClassName || ""
      }`}
    >
      <FiSearch className="absolute right-3 text-gray-500 pointer-events-none" />
      <input
        className={`w-full text-base border px-2 py-2 rounded-full border-gray-300 focus:ring-2 focus:ring-primary focus:outline-none transition-all duration-200 ease-in-out ${
          className || ""
        }`}
        onChange={onChange}
        placeholder={placeholder || ("Search")}
      />
    </div>
  );
};
export default SearchInput;