"use client";
import React from "react";
import RevenueReport from "@/app/components/admin/dashboard/cash-flow";
import { InfoCards } from "@/app/components/admin/dashboard/info-card";
import LatestTransactions from "@/app/components/admin/dashboard/LatestTransactions";
import { MarketGraph } from "@/app/components/admin/dashboard/market-graph";
import OverallStatistics from "@/app/components/admin/dashboard/overall-statistics";
import { RecentActivity } from "@/app/components/admin/dashboard/recent-activity";
import SalesStatisticsBarChart from "@/app/components/admin/dashboard/SalesStatisticsBarChart";
import Schedule from "@/app/components/admin/dashboard/schedule";
import OrderStatistics from "@/app/components/admin/dashboard/transaction-overview";
import Bestsell from "@/app/components/admin/dashboard/bestsell";
import LatestProduct from "@/app/components/admin/dashboard/latestproduct";
import TopSellingCategory from "@/app/components/admin/dashboard/topcategory";

const Page = () => {
  const salesData = [
    { name: "1", value: 30 },
    { name: "2", value: 32 },
    { name: "3", value: 31 },
    { name: "4", value: 34 },
    { name: "5", value: 35 },
  ];
  const incomeData = [
    { name: "1", value: 40 },
    { name: "2", value: 38 },
    { name: "3", value: 37 },
    { name: "4", value: 39 },
    { name: "5", value: 38 },
  ];
  const visitorData = [
    { name: "1", value: 33 },
    { name: "2", value: 34 },
    { name: "3", value: 32 },
    { name: "4", value: 35 },
    { name: "5", value: 34 },
  ];

  return (
   <>
       <div className="flex min-h-screen w-full flex-col  duration-500">
      <main className="flex-1 space-y-4 ">
      <div className="grid xl:grid-cols-4 sm:grid-cols-2 gap-4 duration-500">
          
            <InfoCards
              icon="🛒"
            label="TOTAL SALES"
            value="34,945"
            change="+1.56%"
            changeColor="text-green-500"
            lineColor="#34D399"
            data={salesData}/>
            <InfoCards
              icon="💵"
              label="TOTAL INCOME"
              value="$378,802"
              change="-1.56%"
              changeColor="text-red-500"
              lineColor="#F97316"
              data={incomeData}/>
            <InfoCards
              icon="👤"
              label="TOTAL VISITOR"
              value="34,945"
              change="+1.56%"
              changeColor="text-blue-500"
              lineColor="#3B82F6"
              data={visitorData}/>
          <Bestsell />
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 duration-500">
          <div className="col-span-1 md:col-span-3">
            <RevenueReport />
          </div>
          <div className="md:col-span-2 xl:col-span-1 col-span-1">
            <OrderStatistics />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 ">
      <SalesStatisticsBarChart />
      <LatestTransactions />
     <OverallStatistics />
      <Schedule />
    </div>

        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 duration-500">
          <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <RecentActivity />
          </div>
          <div className="col-span-1 md:col-span-2">
            <MarketGraph />
          </div>
        </div>
        <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3 duration-500">
          <div className="col-span-1 md:col-span-2">
            <LatestProduct />
          </div>
          <div className="col-span-1 md:col-span-2 xl:col-span-1">
          <TopSellingCategory />
          </div>
        </div>
      </main>
    </div>
   </>
  );
};

export default Page;
