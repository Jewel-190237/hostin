'use client'
import { useI18n } from '@/app/context/i18n'
import { fetchpublicProducts } from '@/app/helpers/backend'
import { FaSearch } from "react-icons/fa"
import { FaCartPlus } from "react-icons/fa6"
import { useFetch } from '@/app/helpers/hooks'
import Image from 'next/image'
import React, { useRef, useState } from 'react'

const SearchBer = () => {
      const [searchQuery, setSearchQuery] = useState("")
  const [showSearchResults, setShowSearchResults] = useState(false)
  const [data, getData, { loading }] = useFetch(fetchpublicProducts)
  const searchResultsRef = useRef(null)
    const {langCode} = useI18n()
  const handleSearchFocus = () => {
    if (searchQuery.trim()) setShowSearchResults(true)
  }
  const handleSearchChange = (e) => {
    const value = e.target.value
    setSearchQuery(value)
    if (value.trim()) {
      setShowSearchResults(true)
      getData({ search: value, langCode })
    } else {
      setShowSearchResults(false)
    }
  }
  return (
    <div className="relative " ref={searchResultsRef}>
      <input
        type="text"
        placeholder="Type your product name..."
        value={searchQuery}
        onChange={handleSearchChange}
        onFocus={handleSearchFocus}
        onBlur={() => setTimeout(() => setShowSearchResults(false), 200)}
        className="xl:w-[540px] md:w-[400px] w-full border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:ring-1 focus:ring-[var(--text-color)]"
      />
      <button
        onClick={() => {
          if (searchQuery.trim()) {
            setShowSearchResults(true)
            getData({ search: searchQuery, langCode })
          }
        }}
        className="absolute right-0 top-0 h-full mr-3 md:mr-0 px-4 rounded-r-md border-gray-300"
      >
        <div className="h-6 w-0.5 bg-gray-300 absolute right-12 top-2"></div>
        <FaSearch className="h-5 w-5 text-gray-500" />
      </button>
      {showSearchResults && searchQuery.trim() && (
        <div className="absolute left-0 !font-roboto right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg z-50 max-h-[50vh] sidebar-scrollbar overflow-y-auto">
          <div className="divide-y divide-gray-200">
            {loading ? (
              <div className="p-4 text-center text-gray-500">Loading...</div>
            ) : (Array.isArray(data?.docs) && data?.docs?.length > 0 ? data?.docs?.map((product) => (
              <div    key={product?._id} className="flex items-center  p-3 hover:bg-gray-50">
                <div className="w-10 h-10 mr-3 flex-shrink-0 bg-gray-100 rounded">
                  <Image
                    src={product?.thumbnail || "/default.png"}
                    alt={product?.name[langCode] || "Product"}
                    width={1000}
                    height={1000}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-grow">
                  <h3 onClick={() => router.push(`/product/${product?._id}`)} className="cursor-pointer text-sm font-medium text-[var(--text-color)]">{product?.name[langCode]}</h3>
                  <div className="flex items-center gap-3 mt-1">
                    <div className="flex items-center">
                      <span className="text-primary text-lg font-bold">
                        ₹{product?.final_price || 0}
                      </span>
                      {product?.price && product.discount ? (
                        <>
                          <span className="ml-1 text-[#74778A] text-xs line-through">
                            ₹{product?.price}
                          </span>
                          <span className="ml-1 bg-primary text-white rounded px-0.5 text-xs">
                            {product.discount}% off
                          </span>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 ml-3">
                  <button className="p-1 text-gray-500 hover:text-gray-700">
                    <FaCartPlus />
                  </button>
                </div>
              </div>
            )) : (
              <div className="p-4 text-center text-gray-500">No results found.</div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchBer
