'use client'
import React from 'react'
import DeliveryOptions from '@/app/components/landing/productsComponent/DeliveryOptions'
import MoreProducts from '@/app/components/landing/productsComponent/MoreProducts'
import ProductDescription from '@/app/components/landing/productsComponent/ProductDescription'
import ProductDetails from '@/app/components/landing/productsComponent/productDetails'
import ProductFAQ from '@/app/components/landing/productsComponent/ProductFAQ'
import ProductReviews from '@/app/components/landing/productsComponent/ProductReviews'

const Page = () => {

    return (
        <div className='container my-7'>
            <div className=" grid grid-cols-1 xl:grid-cols-5 gap-6">
                <div className="xl:col-span-4 col-span-1">
                    <ProductDetails />
                </div>
                <div className="xl:ml-5 ml-0 xl:col-span-1 col-span-1">
                    <DeliveryOptions />
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <ProductDescription />
                    <ProductReviews />
                    <ProductFAQ />
                </div>
                <div className="lg:col-span-1">
                    <MoreProducts />
                </div>
            </div>
        </div>
    )
}

export default Page