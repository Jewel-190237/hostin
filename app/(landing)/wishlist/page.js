"use client"

import { useState } from "react"
import Image from "next/image"
import { Input } from "antd"
import { BiX } from "react-icons/bi"
import { useUser } from "@/app/context/user"
import { useI18n } from "@/app/context/i18n"

export default function ShoppingCart() {
  const { allcartItem, updateItemQuantity, removeItem } = useUser();
  const [cartItems, setCartItems] = useState(allcartItem);
  const {langCode} = useI18n();
  const [couponCode, setCouponCode] = useState("")



  const clearCart = () => {
    setCartItems([])
  }


  return (
    <div className="w-full container overflow-auto my-10 font-roboto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border">
            <th className="text-left py-1 md:py-3 px-2 font-semibold text-xl text-textMain w-36 lg:w-full">Product Name</th>
            <th className="text-center py-1 md:py-3 px-2 font-semibold text-xl text-textMain border-l ">Price</th>
            <th className="text-center py-1 md:py-3 px-2 font-semibold text-xl text-textMain border-l w-20">Quantity</th>
            <th className="text-center py-1 md:py-3 px-2 font-semibold text-xl text-textMain border-l w-36">Subtotal</th>
            <th className="text-right py-0 md:py-3 px-2 md:px-3 border-l w-20">
              
              <button className="whitespace-pre bg-white text-primary  px-2 md:px-3 py-2 rounded">
                Add to Cart
              </button>
            </th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => (
            <tr key={item._id} className="border">
              <td className="py-[10px] px-4 border-r">
                <div className="flex items-center gap-4">
                  <div className="w-[73px] h-20 border relative flex-shrink-0">
                    <Image src={item.thumbnail || "/default.png"} alt={item.name[langCode] || "product Image"} loading="lazy" width={1000} height={1000} className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <h3 className="font-medium text-lg text-textMain w-40 lg:w-full">
                      {item.name[langCode]}
                    </h3>
                    <p className="text-sm text-gray-500">Price: ${item.price}</p>
                    <p className="text-sm text-gray-500">Quantity: {item.quantity}</p>
                  </div>
                </div>
              </td>
              <td className=" text-center border-r w-36 px-3">${item.price}</td>
              <td className=" text-center border-r">
                <div className="flex items-center  justify-center">
                  <div className="w-fit border flex items-center  justify-center">
                    <button
                      onClick={() => {
                        const newQuantity = item.quantity - 1;
                        updateItemQuantity(item._id, newQuantity);
                        if (newQuantity > 0) {
                          setCartItems(cartItems.map(cartItem => 
                            cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
                          ));
                        } else {
                          setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
                        }
                      }}
                      className="w-5 h-5 flex items-center justify-center bg-[#D9D9D9] rounded-sm"
                    >
                      -
                    </button>
                    <span className="w-5 text-center">{item.quantity}</span>
                    <button
                      onClick={() => {
                        const newQuantity = item.quantity + 1;
                        updateItemQuantity(item._id, newQuantity);
                        setCartItems(cartItems.map(cartItem => 
                          cartItem._id === item._id ? { ...cartItem, quantity: newQuantity } : cartItem
                        ));
                      }}
                      className="w-5 h-5 flex items-center justify-center bg-[#D9D9D9] text-primary rounded-sm"
                    >
                      +
                    </button>
                  </div>
                </div>
              </td>
              <td className=" text-center border-r px-3">${item.price * item.quantity}</td>
              <td className="text-center">
                <button className="bg-primary text-white px-2 md:px-3 py-2 rounded">
                  Add to Cart
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      
    </div>
  )
}
