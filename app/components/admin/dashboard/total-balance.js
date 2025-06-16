"use client"

import { Card } from "antd"

import { AiOutlineEye, AiOutlineEyeInvisible, AiOutlineArrowUp, AiOutlineArrowDown, AiOutlineMore } from "react-icons/ai"
import { useState } from "react"
import Button from "../common/button"

export function TotalBalance() {
  const [showBalance, setShowBalance] = useState(true)

  return (
    <Card className="shadow-md">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-xl font-medium">Total Balance</h3>
        <Button variant="ghost" size="icon" onClick={() => setShowBalance(!showBalance)}>
          {showBalance ? <AiOutlineEye className="h-4 w-4" /> : <AiOutlineEyeInvisible className="h-4 w-4" />}
        </Button>
      </div>
      <div>
        <div className="flex flex-col">
          <div className="flex items-baseline">
            <h2 className="text-4xl font-bold">{showBalance ? "$12,355.40" : "••••••••"}</h2>
            <Button variant="ghost" size="icon" className="ml-2">
              <AiOutlineArrowUp className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-2 flex items-center text-sm">
            <div className="flex items-center rounded-full bg-green-100 px-2 py-1 text-green-600">
              <AiOutlineArrowUp className="mr-1 h-3 w-3" />
              <span>4.51%</span>
            </div>
            <span className="ml-2 text-gray-500">+$4,499 compared to last month</span>
          </div>
          <div className="mt-6 flex space-x-3">
            <Button className="flex-1 bg-black text-white hover:bg-gray-800">
              <AiOutlineArrowUp className="mr-2 h-4 w-4" />
              Transfer
            </Button>
            <Button variant="outline" className="flex-1">
              <AiOutlineArrowDown className="mr-2 h-4 w-4" />
              Request
            </Button>
            <Button variant="ghost" size="icon">
              <AiOutlineMore className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  )
}
