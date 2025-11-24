type  StatCardProps = {
    title    : string,
    value    : string,
    change    : string,
    trend     : string,
    subtext     : string,
}

export default function StatCard({ title, value, change, trend, subtext } : StatCardProps) {
    const isPositive = trend === "up";
    return (
        <div className="bg-white rounded-xl p-6 border border-gray-200">
            <h3 className="text-gray-500 text-sm font-medium mb-4">{title}</h3>
            <div className="text-3xl font-bold text-gray-900 mb-2">{value}</div>
            <div className="flex items-center text-sm font-medium">
        <span className={`${isPositive ? "text-green-500" : "text-red-500"} mr-2`}>
          {change}
        </span>
                <span className="text-gray-400 font-normal">{subtext}</span>
            </div>
        </div>
    );
}
