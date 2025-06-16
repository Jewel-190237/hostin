import BlogCard from '@/app/components/landing/cards/blogCard'
import React from 'react'

const Page = () => {
  return (
    <div className='space-y-4'>
      {
        Array.from({length: 4}).map((_, index) => (
          <BlogCard key={index} />
      ))
      
      }
    </div>
  )
}

export default Page
