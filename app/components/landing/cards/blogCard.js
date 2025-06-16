import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const BlogCard = () => {
  return (
    <div className="flex flex-col md:flex-row gap-6">
    <div className="md:w-1/3">
      <Image
        src="/default.png"
        alt="Woman wearing watch"
        width={300}
        height={200}
        className="w-full h-48 object-cover rounded-lg"
      />
    </div>
    <div className="md:w-2/3 space-y-3">
      <div className="text-sm text-gray-600">
        By <span className="text-orange-500 font-medium">Agatha Williams</span> on 01-06-2025 at 11:40 pm
      </div>
      <h2 className="text-xl font-semibold text-gray-800">How to choose the best women's watch?</h2>
      <p className="text-gray-600 text-sm leading-relaxed">
        Choosing the right type of watch for women is a little bit tricky. But in this article, the tips for
        purchasing the best.....
      </p>
      <Link
        href="/blogs/1"
        className="inline-flex items-center text-orange-500 text-sm font-medium hover:text-orange-600"
      >
        Read Now
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </Link>
    </div>
  </div>
  )
}

export default BlogCard
