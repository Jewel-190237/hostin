export default function Schedule() {
  const colorMap = ["indigo", "pink", "orange", "gray"]; // Static color mapping
  const activities = [
    {
      time: "12 Hrs",
      name: "John Doe",
      description: (
        <>
          Updated the product description for <span className="text-indigo-500">Widget X</span>.
        </>
      ),
    },
    {
      time: "4:32pm",
      name: "Jane Smith",
      description: (
        <>
          added a <span className="text-indigo-500">new user</span> with username{" "}
          <span className="text-pink-500">janesmith89</span>.
        </>
      ),
    },
    {
      time: "11:45am",
      name: "Michael Brown",
      description: (
        <>
          Changed the status of order <span className="text-gray-800 font-medium">#12345</span> to{" "}
          <span className="text-pink-500">Shipped</span>.
        </>
      ),
    },
    {
      time: "9:27am",
      name: "David Wilson",
      description: (
        <>
          added <span className="text-pink-500">John Smith</span> to academy group this day.
        </>
      ),
    },
   
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
      </div>

      <div className="space-y-6">
        {activities.map((activity, idx) => (
          <div className="flex" key={idx}>
            <div className="mr-3 flex flex-col items-center">
              <div className={`w-3 h-3 bg-${colorMap[idx % colorMap.length]}-500 rounded-full`}></div>
              {idx < activities.length - 1 && <div className="w-0.5 h-full bg-gray-200 mt-1"></div>}
            </div>
            <div>
              <div className="text-xs text-gray-500 mb-1">{activity.time}</div>
              <div className="font-medium text-gray-800">{activity.name}</div>
              <p className="text-sm text-gray-600">{activity.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
