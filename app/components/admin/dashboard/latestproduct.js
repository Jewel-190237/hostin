"use client"

import { useState } from "react"
import Image from "next/image"
import { BsPencil } from "react-icons/bs"
// import { Pencil, Trash2 } from "lucide-react"

export default function LatestProduct() {
  const [orders, setOrders] = useState([
    {
      id: "1",
      customer: {
        name: "Elena Smith",
        email: "elenasmith387@gmail.com",
        avatar: "/chair.jpg",
      },
      product: "All-Purpose Cleaner",
      quantity: 3,
      amount: 9.99,
      status: "In Progress",
      dateOrdered: "03,Sep 2024",
    },
    {
      id: "2",
      customer: {
        name: "Nelson Gold",
        email: "noahrussell556@gmail.com",
        avatar: "/chair.jpg",
      },
      product: "Kitchen Knife Set",
      quantity: 4,
      amount: 49.99,
      status: "Pending",
      dateOrdered: "26,Jul 2024",
    },
    {
      id: "3",
      customer: {
        name: "Grace Mitchell",
        email: "gracemitchell79@gmail.com",
        avatar: "/chair.jpg",
      },
      product: "Velvet Throw Blanket",
      quantity: 2,
      amount: 29.99,
      status: "Success",
      dateOrdered: "12,May 2024",
    },
    {
      id: "4",
      customer: {
        name: "Spencer Robin",
        email: "leophillips124@gmail.com",
        avatar: "/chair.jpg",
      },
      product: "Aromatherapy Diffuser",
      quantity: 4,
      amount: 19.99,
      status: "Success",
      dateOrdered: "15,Aug 2024",
    },
    {
      id: "5",
      customer: {
        name: "Chloe Lewis",
        email: "chloelewis67@gmail.com",
        avatar: "/chair.jpg",
      },
      product: "Insulated Water Bottle",
      quantity: 2,
      amount: 14.99,
      status: "Pending",
      dateOrdered: "11,Oct 2024",
    },
  ])

  const getStatusColor = (status) => {
    switch (status) {
      case "In Progress":
        return "bg-blue-100 text-blue-700"
      case "Pending":
        return "bg-pink-100 text-pink-700"
      case "Success":
        return "bg-pink-100 text-pink-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleEdit = (id) => {
    console.log(`Editing order ${id}`)
  }


  return (
    <div className="w-full overflow-x-auto min-w-[300px] sm:min-w-full bg-white rounded-lg">
      <table className="w-full overflow-x-auto border-collapse min-w-[300px] sm:min-w-full">
        <thead>
          <tr className="text-left">
            <th className="py-4 px-4 font-medium text-gray-700">Customer</th>
            <th className="py-4 px-4 font-medium text-gray-700">Product</th>
            <th className="py-4 px-4 font-medium text-gray-700">Quantity</th>
            <th className="py-4 px-4 font-medium text-gray-700">Amount</th>
            <th className="py-4 px-4 font-medium text-gray-700">Status</th>
            <th className="py-4 px-4 font-medium text-gray-700">Date Ordered</th>
            <th className="py-4 px-4 font-medium text-gray-700">Actions</th>
          </tr>
        </thead>
        <tbody className="h-[300px] overflow-y-auto sidebar-scrollbar">
          {orders.map((order) => (
            <tr key={order.id} className="border-t border-gray-100 hover:bg-gray-50">
              <td className="py-4 px-4">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 rounded-full overflow-hidden">
                    <Image
                      src={order.customer.avatar || "/placeholder.svg"}
                      alt={order.customer.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="font-medium text-gray-800">{order.customer.name}</div>
                    <div className="text-sm text-gray-500">{order.customer.email}</div>
                  </div>
                </div>
              </td>
              <td className="py-4 px-4 text-gray-800">{order.product}</td>
              <td className="py-4 px-4 text-gray-800">{order.quantity}</td>
              <td className="py-4 px-4 text-gray-800">${order.amount.toFixed(2)}</td>
              <td className="py-4 px-4">
                <span className={`px-3 py-1 rounded-full text-xs font-medium whitespace-pre ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="py-4 px-4 text-gray-800">{order.dateOrdered}</td>
              <td className="py-4 px-4">
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(order.id)}
                    className="p-1.5 rounded-md bg-green-100 text-green-600 hover:bg-green-200 transition-colors"
                  >
                    <BsPencil size={16} />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
