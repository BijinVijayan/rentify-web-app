export default function EarningsChart() {
    return (
        <div className="w-full h-64 relative">
            <svg viewBox="0 0 800 300" className="w-full h-full overflow-visible">
                <defs>
                    <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2"/>
                        <stop offset="100%" stopColor="#3B82F6" stopOpacity="0"/>
                    </linearGradient>
                </defs>
                <path d="M0,250 C50,250 80,150 120,150 C160,150 180,220 220,220 C260,220 280,100 320,150 C360,200 380,180 420,180 C460,180 480,260 520,260 C560,260 580,100 620,100 C660,100 680,220 720,220 C760,220 800,150 800,150 V300 H0 Z" fill="url(#chartGradient)" />
                <path d="M0,250 C50,250 80,150 120,150 C160,150 180,220 220,220 C260,220 280,100 320,150 C360,200 380,180 420,180 C460,180 480,260 520,260 C560,260 580,100 620,100 C660,100 680,220 720,220 C760,220 800,150 800,150" fill="none" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />
            </svg>
            <div className="absolute top-[30%] left-[75%] bg-gray-900 text-white text-xs px-2 py-1 rounded pointer-events-none transform -translate-x-1/2 -translate-y-full">
                AED6,780
            </div>
            <div className="absolute top-[30%] left-[75%] w-3 h-3 bg-blue-500 rounded-full border-2 border-white transform -translate-x-1/2 translate-y-[-50%]"></div>
        </div>
    );
}
