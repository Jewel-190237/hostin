"use client"

import Image from "next/image"


const LatestTransactions = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Latest Purchase Products</h2>
       
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-gray-600">
              <th className="pb-3 font-medium">Product</th>
              <th className="pb-3 !text-end font-medium">Price</th>
              <th className="pb-3 font-medium !text-center">Status</th>
            </tr>
          </thead>
        </table>
        <div className="h-[300px] overflow-y-auto sidebar-scrollbar">
          <table className="w-full">
            <tbody>
              {/* Example Row */}
              {[
                { image: "/man.jpg", name: "SwiftBuds", price: "$39.99", status: "Success", color: "indigo" },
                { image: "/man.jpg", name: "CozyCloud Pillow das das d dasd", price: "$19.95", status: "Pending", color: "pink" },
                { image: "/man.jpg", name: "AquaGrip Bottle", price: "$9.99", status: "Failed", color: "red" },
                { image: "/man.jpg", name: "GlowLite Lamp", price: "$24.99", status: "Success", color: "orange" },
                { image: "/man.jpg", name: "Bitvitamin", price: "$26.45", status: "Success", color: "indigo" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
                { image: "/man.jpg", name: "FitTrack", price: "$49.95", status: "Success", color: "yellow" },
              ].map((item, idx) => (
                <tr key={idx}>
                  <td className="py-2">
                    <div className="flex items-center">
                      <div className={`w-8 h-8 rounded bg-${item.color}-100 flex items-center justify-center mr-2`}>
                        <Image className={`text-${item.color}-500 text-xs`} src={item.image} alt={item.name} width={20} height={20} />
                      </div>
                      <span>{item.name.length > 16 ? `${item.name.slice(0, 16)}...` : item.name}</span>
                    </div>
                  </td>
                  <td className="py-2">{item.price}</td>
                  <td className="py-2">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded ${
                        item.status === "Success"
                          ? "bg-indigo-100 text-indigo-600"
                          : item.status === "Pending"
                          ? "bg-pink-100 text-pink-600"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default LatestTransactions
