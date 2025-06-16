import React from 'react'

const Page = () => {
  const orders = [
    {
      id: "20651601651951",
      date: "05/10/2025",
      items: [
        "/chair.jpg",
        "/chair.jpg",
        "/chair.jpg",
      ],
      itemCount: "+3",
      total: "$1,547",
    },
    {
      id: "20651601651951",
      date: "05/10/2025",
      items: ["/chair.jpg"],
      total: "$1,547",
    },
    {
      id: "20651601651951",
      date: "05/10/2025",
      items: ["/chair.jpg", "/chair.jpg"],
      total: "$1,547",
    },
    {
      id: "20651601651951",
      date: "05/10/2025",
      items: ["/chair.jpg"],
      total: "$1,547",
    },
  ]
  return (
    <>
      {/* Top Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {/* Personal Profile */}
        <div className=" border border-primary  p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <h2 className="text-base lg:text-lg font-medium text-gray-900">Personal Profile</h2>
            <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Edit</span>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900 text-sm lg:text-base">Majharul Islam Maruf</div>
            <div className="text-gray-600 text-sm lg:text-base">01765601019</div>
            <div className="flex items-center">
              <input type="checkbox" checked className="mr-2 text-orange-600" readOnly />
              <span className="text-xs lg:text-sm text-gray-600">Receive marketing SMS</span>
            </div>
          </div>
        </div>

        {/* Address Book */}
        <div className=" border border-primary  p-4 shadow-sm">
          <div className="flex items-center mb-3">
            <h2 className="text-base lg:text-lg font-medium text-gray-900">Address Book</h2>
            <span className="ml-2 text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded">Edit</span>
          </div>
          <div className="space-y-2">
            <div className="font-medium text-gray-900 text-sm lg:text-base">Majharul Islam Maruf</div>
            <div className="text-gray-600 text-xs lg:text-sm">
              13, Ram Chandra Dash Lan,
              <br />
              Duchbangla, Khulna,
              <br />
              Bangladesh
            </div>
            <div className="text-gray-600 text-sm lg:text-base">(+880) 1765601019</div>
          </div>
        </div>

        {/* Default Billing Address */}
        <div className=" border border-primary  p-4 shadow-sm md:col-span-2 lg:col-span-1">
          <h2 className="text-base lg:text-lg font-medium text-gray-900 mb-3">Default Billing Address</h2>
          <div className="space-y-2">
            <div className="text-gray-600 text-xs lg:text-sm">
              13, Ram Chandra Dash Lan,
              <br />
              Duchbangla, Khulna,
              <br />
              Bangladesh
            </div>
            <div className="text-gray-600 text-sm lg:text-base">(+880) 1765601019</div>
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className=" border border-primary  p-4 shadow-sm">
        <h2 className="text-base lg:text-lg font-medium text-gray-900 mb-4 text-center">Recent Orders</h2>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm lg:text-base">Orders</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm lg:text-base">Placed On</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm lg:text-base">Items</th>
                <th className="text-left py-3 px-4 font-medium text-gray-900 text-sm lg:text-base">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-gray-900 text-sm lg:text-base">{order.id}</td>
                  <td className="py-3 px-4 text-gray-600 text-sm lg:text-base">{order.date}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center space-x-1">
                      {order.items.map((item, itemIndex) => (
                        <img
                          key={itemIndex}
                          src={item || "/placeholder.svg"}
                          alt="Product"
                          className="w-6 h-6 lg:w-8 lg:h-8 rounded object-cover border"
                        />
                      ))}
                      {order.itemCount && (
                        <span className="text-xs lg:text-sm text-gray-500 ml-1">{order.itemCount}</span>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4 font-medium text-gray-900 text-sm lg:text-base">{order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Card View */}
        <div className="md:hidden space-y-4">
          {orders.map((order, index) => (
            <div key={index} className="border border-gray-200  p-4 ">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="font-medium text-gray-900 text-sm">Order #{order.id}</div>
                  <div className="text-gray-600 text-xs">{order.date}</div>
                </div>
                <div className="font-medium text-gray-900 text-sm">{order.total}</div>
              </div>
              <div className="flex items-center space-x-1">
                <span className="text-xs text-gray-600 mr-2">Items:</span>
                {order.items.map((item, itemIndex) => (
                  <img
                    key={itemIndex}
                    src={item || "/placeholder.svg"}
                    alt="Product"
                    className="w-8 h-8 rounded object-cover border"
                  />
                ))}
                {order.itemCount && <span className="text-xs text-gray-500 ml-1">{order.itemCount}</span>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Page