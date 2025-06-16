"use client"

import { Card } from "antd"
import { Avatar } from "antd" 
// import Button from "../common/button"

const transactions = [
  {
    id: 1,
    name: "Stripe",
        date: "Today 7:18 AM",
    amount: "+$580.00",
    type: "Income",
    
    icon: "S",
    iconColor: "bg-blue-500",
  },
  {
    id: 2,
    name: "Cashback",
    
    date: "01 Jan, 11:44 AM",
    amount: "+$560.00",
    type: "Income",
  
    icon: "C",
    iconColor: "bg-green-500",
  },
  {
    id: 3,
    name: "Refund from amazon",
    
    date: "Today 7:18 AM",
    amount: "-$60.00",
    type: "Expense",
    
    icon: "a",
    iconColor: "bg-yellow-500",
  },
  {
    id: 4,
    name: "Refund from amazon",
    
    date: "Today 7:18 AM",
    amount: "-$60.00",
    type: "Expense",
    
    icon: "a",
    iconColor: "bg-yellow-500",
  },
  {
    id: 5,
    name: "Refund from amazon",
    date: "Today 7:18 AM",
    amount: "-$60.00",
    type: "Expense",
    icon: "a",
    iconColor: "bg-yellow-500",
  },
  {
    id: 8,
    name: "Refund from amazon",
    date: "Today 7:18 AM",
    amount: "-$60.00",
    type: "Expense",
    icon: "a",
    iconColor: "bg-yellow-500",
  },
  {
    id: 6,
    name: "Refund from amazon",
    date: "Today 7:18 AM",
    amount: "-$60.00",
    type: "Expense",
    icon: "a",
    iconColor: "bg-yellow-500",
  },
]

export function RecentActivity() {
  return (
    <Card className="shadow-md h-full">
      <div className="flex flex-row items-center justify-between pb-2">
        <h3 className="text-xl font-medium">Transection Activity</h3>
       
      </div>
      <div>
        <div className="space-y-6 h-[270px] overflow-y-auto sidebar-scrollbar">
          {transactions.map((transaction) => (
            <div key={transaction.id} className="flex items-center justify-between">
              <div className="flex items-center">
                <Avatar
                  className={`flex items-center justify-center text-white`}
                  style={{ backgroundColor: transaction.iconColor }}
                >
                  {transaction.icon}
                </Avatar>
                <div className="ml-4">
                  <div className="font-medium">{transaction.name}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">{transaction.date}</div>
                
              </div>
              <div className={`font-medium ${transaction.type === "Income" ? "text-green-600" : "text-red-600"}`}>
                {transaction.amount}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
