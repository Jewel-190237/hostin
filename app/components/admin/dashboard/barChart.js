import React from 'react'
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
const BarChartComponent = ({ data }) => {
  return (
    <>
          <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }} barSize={30}>
            <CartesianGrid vertical={false} strokeDasharray="3 3" />
            <XAxis dataKey="store" axisLine={false} tickLine={false} tick={{ fontSize: 10 }} />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => `$${value}`}
            />
            <Tooltip formatter={(value) => `$${value}`} />
            <Bar dataKey="revenue" fill="#22c55e" radius={[10, 10, 10, 10]} />
          </BarChart>
        </ResponsiveContainer>
      </div> 
    </>
  )
}

export default BarChartComponent
