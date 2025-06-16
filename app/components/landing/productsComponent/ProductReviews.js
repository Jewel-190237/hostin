"use client"
import { useState } from "react"
import { Pagination } from "antd"
import { IoStarSharp } from "react-icons/io5"
import { MdOutlineVerifiedUser } from "react-icons/md"
import Image from "next/image"

export default function ProductReviews() {
  // Sample review data with multiple images
  const firstReviewImages = [
    "/chair.jpg",
    "/man.jpg",
    "/chair.jpg",
    "/chair.jpg",
    "/chair.jpg",
    "/chair.jpg",
    "/chair.jpg",

    "/chair.jpg",
    "/chair.jpg",
    "/chair.jpg",
    "/chair.jpg",
    "/chair.jpg",
    "/chair.jpg",
  ]

  // State for selected image and whether to show all images
  const [selectedImage, setSelectedImage] = useState(firstReviewImages[0])
  const [showAllImages, setShowAllImages] = useState(false)

  // Number of images to show in the thumbnail row before "+3" button
  const visibleThumbnailCount = 4

  // Handle thumbnail click
  const handleThumbnailClick = (image) => {
    setSelectedImage(image)
    setShowAllImages(false)
  }

  // Handle "+3" button click
  const handleShowAllClick = () => {
    setShowAllImages(true)
  }

  // Determine which thumbnails to display
  const displayedThumbnails = showAllImages ? firstReviewImages : firstReviewImages.slice(0, visibleThumbnailCount)

  return (
    <div className="max-w-4xl mx-auto">
      {/* Rating & Reviews Header */}
      <div className="bg-gray-200 px-5">
        <h2 className="text-textMain font-bold text-[28px]">Rating & Reviews</h2>
      </div>

      {/* Rating Summary */}
      <div className=" p-4 flex">
        {/* Left side - Overall rating */}
        <div className="flex flex-col mr-8">
          <div className="text-[52px] font-medium text-textMain">
            5.0<span className="text-[32px] text-[#B2B8BD] font-normal">/5</span>
          </div>
          <div className="flex my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <IoStarSharp key={star} className="w-5 h-5 text-[#FCCA19] fill-current" />
            ))}
          </div>
          <p className="text-base text-gray-600">7 Ratings</p>
        </div>

        {/* Right side - Rating bars */}
        <div className="flex-1">
          <div className="mx-auto w-[50%]">
            {[5, 4, 3, 2, 1].map((rating, index) => (
            <div key={rating} className="flex items-center mb-1">
              <div className="flex mr-2">
                {[1, 2, 3, 4, 5].map((star) => (
                 <IoStarSharp key={star} className="w-4 h-4 text-[#FCCA19] fill-current" />
                ))}
              </div>
              <div className="flex-1 h-4 bg-gray-300 rounded-sm mx-1">
                <div className={`h-4 ${rating === 5 ? "bg-[#FCCA19] w-3/4" : "w-0"} rounded-sm`}></div>
              </div>
              <span className="text-xs text-gray-600 ml-2 w-4">{rating === 5 ? "7" : "0"}</span>
            </div>
          ))}
          </div>
        </div>
      </div>

      {/* Customer Reviews Header */}
      <div className="border px-3 py-[5px] mt-4 flex justify-between items-center">
        <h2 className="text-blue-800 font-medium">Customer Reviews</h2>
        <div className="flex items-center text-xs">
          <div className="flex items-center mr-4">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4"
              />
            </svg>
            <span>Sort: Recent</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            <span>Filter: All Star</span>
          </div>
        </div>
      </div>

      {/* First Review */}
      <div className="border-b pb-4">
        <div className="mt-4">
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <IoStarSharp key={star} className="w-4 h-4 text-[#FCCA19] fill-current" />
            ))}
          </div>
          <div className="flex items-center mt-1">
            <p className="text-sm">Mohid Mahmud</p>
            <div className="ml-2 bg-green-100 text-green-800 text-xs px-1 flex items-center">
            <MdOutlineVerifiedUser />
              <span>Verified Purchase</span>
            </div>
            <p className="text-xs text-gray-500 ml-auto">2 Weeks ago</p>
          </div>
        </div>

        {/* Review Images - Thumbnails */}
        <div className="flex mt-2 space-x-2 space-y-2 flex-wrap">
         {displayedThumbnails.map((image, index) => (
  <div
    key={index}
    className={`border sm:w-[113px] w-[80px] sm:h-[150px] h-[80px] overflow-hidden cursor-pointer hover:border-textMain transition-colors ${
      selectedImage === image ? "border-textBody" : "border-gray-200"
    }`}
    onClick={() => handleThumbnailClick(image)}
  >
    <Image
      src={image || "/placeholder.svg"}
      alt={`Review image ${index + 1}`}
      className="w-full h-full object-cover"
      width={1000}
      height={1000}
    />
  </div>
))}

        {!showAllImages && firstReviewImages.length > visibleThumbnailCount && (
  <div
    className="border sm:w-[113px] w-[80px] sm:h-[150px] h-[80px] overflow-hidden relative bg-gray-100 flex items-center justify-center cursor-pointer hover:border-textMain transition-colors"
    onClick={handleShowAllClick}
  >
    {/* Blurred background image */}
    <Image
      src={firstReviewImages[visibleThumbnailCount]}
      alt="More review"
      fill
      className="absolute inset-0 w-full h-full object-cover blur-sm scale-110"
      style={{ zIndex: 0 }}
    />
    <span className="text-lg font-semibold text-white z-10 relative">
      +{firstReviewImages.length - visibleThumbnailCount}
    </span>
    <div className="absolute inset-0 bg-black opacity-50 z-0"></div>
  </div>
)}
        </div>

        {/* Large Review Image */}
        <div className="mt-4 border w-full sm:w-[437px] sm:h-[582px] h-[360px] ">
          <Image
          width={1000}
          height={1000}
            src={selectedImage || "/placeholder.svg"}
            alt="Selected review image"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Like Counter */}
        <div className="mt-2 flex items-center">
          <div className="bg-blue-800 text-white text-xs p-1 rounded-sm">
            <span>2</span>
          </div>
        </div>
      </div>

      {/* Second Review */}
      <div className="border-b py-4">
        <div>
          <div className="flex">
            {[1, 2, 3, 4, 5].map((star) => (
              <IoStarSharp key={star} className="w-4 h-4 text-[#FCCA19] fill-current" />  
            ))}
          </div>
          <div className="flex items-center mt-1">
            <p className="text-base font-normal text-[#74778A]">Mohid Mahmud</p>
            <div className="ml-2 bg-green-100 text-green-800 text-xs px-1 flex items-center">
             <MdOutlineVerifiedUser />
              <span>Verified Purchase</span>
            </div>
            <p className="text-xs text-gray-500 ml-auto">2 Weeks ago</p>
          </div>
        </div>

        <p className="text-xl text-textMain cmt-2">Product is very good</p>

        {/* Like Counter */}
        <div className="mt-2 flex items-center">
          <div className="border border-gray-300 text-gray-600 text-xs p-1 rounded-sm flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3 mr-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span>0</span>
          </div>
        </div>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-3 mb-5 ant_pagi">
        <Pagination defaultCurrent={1} total={30} pageSize={10} />
      </div>
    </div>
  )
}
