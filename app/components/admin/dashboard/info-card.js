import dynamic from "next/dynamic";

const LineChartComponent = dynamic(
  () => import("./lineChart"),
  {
    ssr: false,
  }
);

export const InfoCards = ({ icon, label, value, change, changeColor, lineColor, data }) => {
    return (
      <div className="bg-white rounded-lg p-4 flex-1 min-w-[200px] shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span style={{
                clipPath: "polygon(50% 0, 56% 0, 100% 30%, 100% 70%, 55% 100%, 50% 100%, 0% 70%, 0% 30%)"
            }} className="text-2xl p-3 rounded-md bg-pink-400">{icon}</span>
            <span className="text-sm font-semibold text-gray-600">{label}</span>
          </div>
          <div className={`flex items-center space-x-1 ${changeColor}`}>
            <span className="text-sm font-medium">{change}</span>
            {change !== "0.00%" && (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" 
                  d={change.startsWith("+") ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
              </svg>
            )}
          </div>
        </div>
        <div className="text-2xl font-bold text-gray-800 mt-2">{value}</div>
       <LineChartComponent lineColor={lineColor} data={data} />
      </div>
    );
  };