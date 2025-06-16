"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import { FaEllipsisV, FaArrowUp, FaQuestionCircle, FaArrowRight, FaChartLine } from "react-icons/fa" // Use React Icons

// Dynamically import ApexCharts to avoid SSR issues
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

export default function OrderStatistics() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Chart options for the semi-circular gauge
  const chartOptions = {
    chart: {
      type: "radialBar",
      offsetY: 0,
      sparkline: {
        enabled: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        hollow: {
          margin: 0,
          size: "65%",
          background: "#fff",
          position: "front",
        },
        track: {
          background: "#f2f2f2",
          strokeWidth: "97%",
          margin: 0,
          dropShadow: {
            enabled: false,
          },
        },
        dataLabels: {
          show: true,
          name: {
            show: true,
            fontSize: "18px",
            fontWeight: 600,
            color: "#333",
            offsetY: -10,
          },
          value: {
            show: true,
            fontSize: "14px",
            fontWeight: 500,
            color: "#6b7280",
            offsetY: 8,
            formatter: (val) => val + "%",
          },
          total: {
            show: true,
            label: "Pending",
            formatter: () => "87.8%",
            fontSize: "22px",
            fontWeight: 600,
            color: "#333",
          },
        },
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#ff6384", "#6366f1"],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: "round",
    },
    colors: ["#6366f1"],
    labels: [""],
  }

  // Chart series data
  const chartSeries = [87.8]

  return (
    <div className="bg-white rounded-lg shadow-sm p-5 w-full">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Order Statistics</h2>
    
      </div>

      {/* Total Orders */}
      <div className="flex items-end justify-center">
        <div className="bg-indigo-50 p-3 rounded-lg mr-4">
          <FaChartLine className="text-indigo-600" size={20} />
        </div>
        <div>
          <div className="flex items-center">
            <span className="text-xs font-medium text-gray-500 uppercase">TOTAL ORDERS</span>
            <div className="flex items-center ml-4">
              <span className="text-green-500 text-xs font-medium">Earnings</span>
              <FaQuestionCircle size={14} className="text-green-500 ml-1" />
            </div>
          </div>
          <div className="flex items-center mt-1">
            <span className="text-3xl font-bold text-gray-800">3,736</span>
            <div className="flex items-center ml-2 text-green-500 text-xs font-medium">
              <FaArrowUp size={14} className="mr-0.5" />
              <span>0.57%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Chart with better styling */}
      <div className="relative mb-6">
        {mounted && (
          <div className="relative">
            <ReactApexChart options={chartOptions} series={chartSeries} type="radialBar" height={280} />
          </div>
        )}
      </div>

      {/* Legend with better colors matching the image */}
      <div className="flex flex-wrap justify-center gap-x-4 gap-y-2 mb-4">
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-indigo-500 mr-2"></div>
          <span className="text-sm text-gray-600">Delivered</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-pink-400 mr-2"></div>
          <span className="text-sm text-gray-600">Cancelled</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm text-gray-600">Pending</span>
        </div>
        <div className="flex items-center">
          <div className="w-3 h-3 rounded-full bg-orange-400 mr-2"></div>
          <span className="text-sm text-gray-600">Returned</span>
        </div>
      </div>

    </div>
  )
}
