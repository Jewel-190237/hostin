"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false })

const SalesStatisticsBarChart = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const barChartOptions = {
    chart: {
      type: "bar",
      stacked: true,
      toolbar: { show: false },
      zoom: { enabled: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        borderRadius: 2,
      },
    },
    dataLabels: { enabled: false },
    stroke: { width: 0 },
    xaxis: {
      categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisBorder: { show: false },
      axisTicks: { show: false },
    },
    yaxis: { show: true },
    fill: { opacity: 1 },
    legend: { show: false },
    colors: ["#818cf8", "#ec4899", "#f97316"],
    tooltip: { enabled: true },
  }

  const barChartSeries = [
    { name: "Total", data: [50, 55, 40, 60, 70, 80, 65] },
    { name: "This Year", data: [35, 41, 36, 26, 45, 48, 52] },
    { name: "Last Year", data: [25, 31, 26, 36, 25, 38, 42] },
  ]

  if (!mounted) return null

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-lg font-semibold mb-4">Sales Statistics</h2>
      <ReactApexChart
        options={barChartOptions}
        series={barChartSeries}
        type="bar"
        height={300}
      />
    </div>
  )
}

export default SalesStatisticsBarChart
