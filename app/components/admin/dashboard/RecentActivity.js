"use client"

const RecentActivity = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
        <a href="#" className="text-indigo-500 text-sm flex items-center hover:underline">
          View All
        </a>
      </div>

      <div className="text-xs text-gray-500 mb-4">12 Hrs</div>

      <div className="space-y-6">
        {[
          { time: "Now", name: "John Doe", action: "Updated the product description for", target: "Widget X" },
          { time: "4:32pm", name: "Jane Smith", action: "added a new user with username", target: "janesmith89" },
          { time: "11:45am", name: "Michael Brown", action: "Changed the status of order #12345 to", target: "Shipped" },
        ].map((item, idx) => (
          <div key={idx} className="flex">
            <div className="mr-3 flex flex-col items-center">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <div className="w-0.5 h-full bg-gray-200 mt-1"></div>
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{item.time}</div>
              <div className="font-medium text-gray-800">{item.name}</div>
              <p className="text-sm text-gray-600">
                {item.action} <span className="text-pink-500">{item.target}</span>.
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default RecentActivity
