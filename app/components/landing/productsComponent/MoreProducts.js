'use client'
import React from 'react'
import { useEffect, useState } from "react"
import StrateproductCard from "../cards/horizontalproductCard"

export default function MoreProducts() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetch('/product.json')
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(() => setProducts([]))
  }, [])

  return (
    <div className="border border-gray-200  overflow-hidden">
      <div className=" p-3 border-b">
        <h3 className="font-medium text-textMain">More Product From This Seller</h3>
      </div>
      <div className="px-[10px] pb-2">
        <div className="space-y-[10px] mt-11">
          {products.slice(0, 6).map((product) => (
            <StrateproductCard key={product._id} data={product} />
          ))}
        </div>
      </div>
    </div>
  )
}
