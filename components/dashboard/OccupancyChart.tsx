export default function OccupancyChart() {
    return (
        <div className="relative w-48 h-48 mx-auto flex items-center justify-center">
            <svg className="w-full h-full transform -rotate-90">
                <circle cx="96" cy="96" r="80" fill="none" stroke="#F3F4F6" strokeWidth="16" />
                <circle cx="96" cy="96" r="80" fill="none" stroke="#3B82F6" strokeWidth="16" strokeDasharray="502" strokeDashoffset="90" strokeLinecap="round" />
            </svg>
            <div className="absolute flex flex-col items-center">
                <span className="text-4xl font-bold text-gray-900">82%</span>
                <span className="text-gray-500 text-sm mt-1">Occupied</span>
            </div>
        </div>
    );
}
