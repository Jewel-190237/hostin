"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { BsArrowRight, BsArrowUpRight } from "react-icons/bs"

// Dynamically import ApexCharts
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function OverallStatistics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Sparkline chart options
  const sparklineOptions = (colors = ["#818cf8"]) => ({
    chart: {
      type: "line",
      sparkline: { enabled: true },
      toolbar: { show: false },
    },
    stroke: {
      width: 2,
      curve: "smooth",
    },
    colors: colors,
    tooltip: {
      fixed: { enabled: false },
      x: { show: false },
      marker: { show: false },
    },
  })

  // Sample data for sparkline charts
  const sparklineData = [
    { name: "Expenses", data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54, 30, 40, 50] },
    { name: "Leads", data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14, 30, 50] },
    { name: "Churn", data: [15, 55, 40, 20, 33, 61, 16, 29, 6, 26, 4, 25, 40, 10] },
    { name: "New Users", data: [5, 15, 30, 35, 20, 30, 40, 50, 35, 20, 25, 30, 45] },
    { name: "Returning", data: [45, 55, 40, 50, 33, 43, 56, 35, 46, 32, 70, 50, 40, 30] },
  ]

  // Structured data for API integration
  const statisticsData = [
    {
      title: "Total Expenses",
      value: "$134,032",
      change: "0.45%",
      changeColor: "text-green-500",
      link: "#",
      chartColor: "#818cf8",
      data: sparklineData[0].data,
    },
    {
      title: "New Users",
      value: "7,893",
      change: "11.05%",
      changeColor: "text-green-500",
      link: "#",
      chartColor: "#f97316",
      data: sparklineData[3].data,
    },
    {
      title: "Returning Users",
      value: "3,258",
      change: "1.69%",
      changeColor: "text-green-500",
      link: "#",
      chartColor: "#818cf8",
      data: sparklineData[4].data,
    },
  ]

  // Replace individual sections with a loop
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Overall Statistics</h2>
      </div>

      <div className="space-y-6">
        {statisticsData.map((stat, idx) => (
          <div key={idx}>
            <div className="flex justify-between items-center mb-1">
              <div className="text-sm text-gray-600">{stat.title}</div>
              <div className={`flex items-center ${stat.changeColor} text-xs`}>
                {stat.change} <BsArrowUpRight size={12} className="ml-0.5" />
              </div>
            </div>
            <div className="flex justify-between items-center">
              <div className="text-xl font-bold text-gray-800">{stat.value}</div>
              
            </div>
            {mounted && (
              <div className="h-10 mt-1">
                <ReactApexChart
                  options={sparklineOptions([stat.chartColor])}
                  series={[{ data: stat.data }]}
                  type="line"
                  height="100%"
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
