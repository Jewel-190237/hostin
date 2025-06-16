"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import ProductCard from "../cards/productCard"
import SectionTittle from "../common/sectionTittle"

const FlashSale = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("/product.json")
      const data = await response.json()
      setProducts(data)
    }
    fetchProducts()
  }, [])

  return (
    <section className="w-full py-6 px-4">
      <div className="container mx-auto">
        <SectionTittle 
          title="On Sale Now" 
          linkText="All Product" 
          linkHref="/flash-sale" 
        />

        <div className="flex lg:flex-row flex-col gap-6">
          <div className=" md:h-[724px] h-[500px] w-[100%] lg:w-[312px] rounded-lg overflow-hidden ">
            <Image
              src="/flash.png"
              alt="Soy Milk Promotion"
              width={500}
              loading="lazy"
              height={1000}
              className="lg:h-[724px] sm:h-[600px] h-[500px] object-fill !w-full "
            />
          </div>

          <div className="w-[100%] grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-y-5 gap-x-6">
            {products.slice(0, 6).map((product) => (
              <ProductCard key={product._id} data={product} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default FlashSale
