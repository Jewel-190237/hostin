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

  const applyCoupon = () => {
    alert(`Coupon ${couponCode} applied!`)
  }

  const checkout = () => {
    alert("Proceeding to checkout!")
  }

  const calculateSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
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
              <button onClick={clearCart} className="bg-orange-500 hover:bg-orange-600 whitespace-pre text-white px-2 md:px-3 py-2 rounded">
                Clear Cart
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
                <button onClick={() => {
                  removeItem(item._id);
                  setCartItems(cartItems.filter(cartItem => cartItem._id !== item._id));
                }} className="text-orange-500 hover:text-orange-700">
                  <BiX className="h-5 w-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {cartItems.length === 0 && (
        <div className="text-center py-8">
          <p className="text-gray-500">Your cart is empty</p>
        </div>
      )}

      {cartItems.length > 0 && (
        <div className="mt-6 flex flex-col md:flex-row border p-5  justify-between items-start md:items-center">
          <div className="flex mb-4 md:mb-0">
            <Input
              type="text"
              placeholder="Coupon code"
              value={couponCode}
              onChange={(e) => setCouponCode(e.target.value)}
              className="w-40 mr-2"
            />
            <button onClick={applyCoupon} className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded">
              Apply Coupon
            </button>
          </div>

          <div className="flex flex-col items-end">
            <div className="mb-2">
              <span className="font-medium">Subtotal: ${calculateSubtotal()}</span>
            </div>
            <button onClick={checkout} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded">
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
