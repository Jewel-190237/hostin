"use client"
import { Card } from "antd" // Import Ant Design Card

export function CreditCard() {
  return (
    <Card className="overflow-hidden">
      <div className="relative h-48 w-full bg-gradient-to-r from-purple-600 to-purple-400 p-6 text-white">
        <div className="flex justify-between">
          <div className="flex flex-col">
            <div className="mb-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="h-4 w-4"
              >
                <path d="M20 16.7a3.3 3.3 0 0 1-4.3 1.9L2.3 12.8a3 3 0 0 1-1.8-1.8a3 3 0 0 1 .4-2.8L4 4.8a3 3 0 0 1 2.4-1.3a3 3 0 0 1 2.4.8L17.3 12a3.3 3.3 0 0 1 2.7 4.7Z" />
                <path d="M15 19.7a3 3 0 0 1-2.4-1.3L4.3 10a3 3 0 0 1 0-4.3" />
              </svg>
            </div>
          </div>
          <div className="text-xl font-bold">VISA</div>
        </div>
        <div className="mt-4 text-xl font-medium">4253 5432 3521 3090</div>
        <div className="mt-6 flex justify-between">
          <div>
            <div className="text-xs opacity-80">CARD HOLDER</div>
            <div>Jubed Ahmed</div>
          </div>
          <div>
            <div className="text-xs opacity-80">EXPIRES</div>
            <div>09/30</div>
          </div>
        </div>
        <div className="absolute bottom-4 right-6 flex space-x-2">
          <div className="h-6 w-10 rounded-md bg-red-500"></div>
          <div className="h-6 w-10 rounded-md bg-blue-500"></div>
          <div className="h-6 w-10 rounded-md bg-purple-800"></div>
        </div>
      </div>
    </Card>
  )
}
