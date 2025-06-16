'use client'
import React from 'react'

const Page = () => {
  return (
    <div className='container my-7'>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
            <h1 className='text-2xl font-bold'>Flash Sale</h1>
            <p className='text-gray-500'>Limited time offer! Grab your favorite products at unbeatable prices.</p>
            </div>
            <div className="lg:col-span-1">
            <h2 className='text-xl font-semibold'>Featured Products</h2>
            {/* Add featured products here */}
            </div>
        </div>
    </div>
  )
}

export default Page