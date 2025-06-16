import React from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts"
import { Select } from "antd" // Use Ant Design Select
import { FaBox, FaUsers, FaShoppingCart, FaChartBar } from "react-icons/fa" // Use React Icons

// Sample data for the chart
const data = [
  { name: "Jan", earning: 18000, expense: 12000 },
  { name: "Feb", earning: 15000, expense: 14000 },
  { name: "Mar", earning: 12000, expense: 18000 },
  { name: "Apr", earning: 22000, expense: 17000 },
  { name: "May", earning: 43000, expense: 33000 },
  { name: "Jun", earning: 18000, expense: 15000 },
  { name: "Jul", earning: 25000, expense: 17000 },
  { name: "Aug", earning: 10000, expense: 11000 },
  { name: "Sep", earning: 23000, expense: 17000 },
  { name: "Oct", earning: 47000, expense: 35000 },
  { name: "Nov", earning: 16000, expense: 13000 },
  { name: "Dec", earning: 20000, expense: 15000 },
]

const MetricCard = ({ title, value, change, icon }) => {
  return (
    <div className="bg-white p-4 border h-full border-gray-100">
      <div className="flex justify-between items-start mb-2">
        <div className="text-gray-600 text-sm">{title}</div>
        <div
          className={`p-2 rounded-lg ${
            title === "Total Products"
              ? "bg-blue-100"
              : title === "Total Customer"
                ? "bg-orange-100"
                : title === "Total Orders"
                  ? "bg-gray-100"
                  : "bg-pink-100"
          }`}
        >
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold mb-1">{value}</div>
      <div className="flex items-center text-sm">
        <span className="mr-1">Increase by</span>
        <span className={`font-medium ${change.isPositive ? "text-green-500" : "text-red-500"}`}>{change.value}</span>
        <span className="ml-1 text-gray-600">this week</span>
      </div>
    </div>
  )
}

export default function RevenueReport() {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
      <div className="flex flex-col lg:flex-row">
        {/* Left side - Chart section */}
        <div className="w-full lg:w-1/2  border-gray-100">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Revenue Report</h2>
            <Select defaultValue="yearly" style={{ width: 120 }}>
              <Select.Option value="yearly">Yearly</Select.Option>
              <Select.Option value="monthly">Monthly</Select.Option>
              <Select.Option value="weekly">Weekly</Select.Option>
              <Select.Option value="daily">Daily</Select.Option>
            </Select>
          </div>

          <div className="flex gap-6 mb-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded mr-2"></div>
              <span className="text-sm">Earning: $500,00,000.00</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-orange-400 rounded mr-2"></div>
              <span className="text-sm">Expense: $20,000.00</span>
            </div>
          </div>

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="earning" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="expense" fill="#fb923c" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right side - Metrics cards */}
        <div className="w-full lg:w-1/2 pl-0 md:pl-4 mt-6 md:mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 h-full">
            <MetricCard
              title="Total Products"
              value="300"
              change={{ value: "+200", isPositive: true }}
              icon={<FaBox className="h-5 w-5 text-blue-500" />}
            />
            <MetricCard
              title="Total Customer"
              value="50,000"
              change={{ value: "-5k", isPositive: false }}
              icon={<FaUsers className="h-5 w-5 text-orange-500" />}
            />
            <MetricCard
              title="Total Orders"
              value="1500"
              change={{ value: "+1k", isPositive: true }}
              icon={<FaShoppingCart className="h-5 w-5 text-gray-500" />}
            />
            <MetricCard
              title="Total Sales"
              value="$25,00,000.00"
              change={{ value: "+$10k", isPositive: true }}
              icon={<FaChartBar className="h-5 w-5 text-pink-500" />}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
