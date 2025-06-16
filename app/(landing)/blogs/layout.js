'use client'
import BlogCard from "@/app/components/landing/cards/blogCard"
import Image from "next/image"
import { BsSearch } from "react-icons/bs"
import { useState } from "react"
// import { Search } from "lucide-react"

export default function BlogPage({children}) {
  const [selectedBlog, setSelectedBlog] = useState(null)

  const blogs = Array.from({length: 4}).map((_, index) => ({
    id: index,
    title: `Blog Title ${index + 1}`,
    content: `This is the content for blog ${index + 1}.`
  }))

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
         
            <div className="lg:col-span-2 space-y-8">
                {children}
            </div>
       

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search your key word"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600">
                <BsSearch className="w-5 h-5" />
              </button>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-orange-500 hover:text-orange-600 text-sm">
                    Fashion
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                    Beauty
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                    Food
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                    Grocery
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                    Lifestyle
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-gray-800 text-sm">
                    Digital Product
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Posts */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Popular Post</h3>
              <div className="space-y-4">
                {[1, 2, 3, 4].map((item) => (
                  <div key={item} className="flex gap-3">
                    <Image
                      src="/placeholder.svg?height=60&width=60"
                      alt="Popular post thumbnail"
                      width={60}
                      height={60}
                      className="w-15 h-15 object-cover rounded-lg flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="text-xs text-gray-500 mb-1">01-05-2025</div>
                      <a href="#" className="text-sm text-gray-700 hover:text-gray-900 line-clamp-2">
                        How to choose the best women watch?
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
