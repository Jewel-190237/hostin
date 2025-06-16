"use client"

import { Card } from "antd";
import dynamic from "next/dynamic";
const BarChartComponent = dynamic(
  () => import("./barChart"),
  {
    ssr: false,
  }
);
const data = [
  { store: "Store A", revenue: 5000 },
  { store: "Store B", revenue: 7000 },
  { store: "Store C", revenue: 4500 },
  { store: "Store D", revenue: 8000 },
  { store: "Store E", revenue: 6000 },
  { store: "Store F", revenue: 9000 },
  { store: "Store G", revenue: 6000 },
  { store: "Store H", revenue: 6000 },
  { store: "Store I", revenue: 2000 },
  { store: "Store J", revenue: 6000 },
  { store: "Store K", revenue: 6000 },
  { store: "Store W", revenue: 2000 },
  { store: "Store X", revenue: 6000 },
  { store: "Store Z", revenue: 6000 },
];

export function MarketGraph() {
  return (
    <Card className="shadow-md pb-2">
      <div className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center">
          <h3 className="text-xl font-medium">Top Vendor Store Revenue Statistics</h3>
        </div>
        
      </div>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-sm text-gray-500 mb-2">Total Revenue: $30,000</div>
          <div className="flex space-x-4 text-sm">
            <span>Highest: Store D ($8,000)</span>
            <span>Lowest: Store C ($4,500)</span>
          </div>
        </div>
        <div className="flex space-x-4 text-sm">
          <div>
            <div className="text-gray-500">Total Stores</div>
            <div className="font-medium">5</div>
          </div>
          <div>
            <div className="text-gray-500">Average Revenue</div>
            <div className="font-medium text-green-500">$6,000</div>
          </div>
        </div>
      </div>
 <BarChartComponent data={data} />
   
    </Card>
  );
}
