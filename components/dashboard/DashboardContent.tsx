import StatCard from "./StatCard";
import EarningsChart from "./EarningsChart";
import OccupancyChart from "./OccupancyChart";
import {BsDownload} from "react-icons/bs";

export default function DashboardContent() {
    return (
        <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Welcome back, Alex! Here&#39;s a summary of your activity.</p>
                </div>
                <button className="flex justify-center items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                    <BsDownload />
                    Download Reports
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <StatCard title="Total Listings" value="12" change="+2" trend="up" subtext="this month"/>
                <StatCard title="Booked Properties" value="8" change="+5%" trend="up" subtext="vs last month"/>
                <StatCard title="Earnings (This Month)" value="AED 4,500" change="+15.2%" trend="up" subtext=""/>
                <StatCard title="Upcoming Payouts" value="AED 2,150" change="Next payout" trend="neutral" subtext="in 3 days"/>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-xl border border-gray-200 ">
                    <div className="flex items-baseline gap-4 mb-6">
                        <h3 className="text-gray-900 font-medium">Earnings Trend</h3>
                        <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-gray-900">$6,780</span>
                            <span className="text-green-500 text-sm font-medium">+5.8%</span>
                            <span className="text-gray-400 text-sm">Last 30 Days</span>
                        </div>
                    </div>
                    <EarningsChart />
                </div>
                <div className="bg-white p-6 rounded-xl border border-gray-200  flex flex-col">
                    <div className="flex items-baseline gap-2 mb-8">
                        <h3 className="text-gray-900 font-medium">Occupancy Rate</h3>
                        <span className="text-2xl font-bold text-gray-900">82%</span>
                        <span className="text-red-500 text-sm font-medium">-1.2%</span>
                    </div>
                    <div className="flex-1 flex items-center justify-center">
                        <OccupancyChart />
                    </div>
                    <div className="mt-8 text-center text-sm text-gray-500">
                        Based on confirmed bookings for the current month.
                    </div>
                </div>
            </div>
        </div>
    );
}
