import React from 'react'
const { LineChart, Line, Tooltip } = require("recharts");
const LineChartComponent = ({lineColor, data}) => {
  return (
    <>
     <div className="mt-2">
          <LineChart width={150} height={50} data={data}>
            <Line type="monotone" dataKey="value" stroke={lineColor} strokeWidth={2} fill="" dot={false} />
            <Tooltip />
          </LineChart>
        </div>
    </>
  )
}

export default LineChartComponent