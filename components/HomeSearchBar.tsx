'use client';

import { useState } from 'react';

export default function HomeSearchBar() {
    const [place, setPlace] = useState('Dubai');
    const [type, setType] = useState('rent');

    const handleSearch = () => {
        console.log('Search:', { place, type });
        // Add your search logic here
    };

    return (
        <div className="w-full h-full mx-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="flex flex-col md:flex-row gap-4">
                {/* Input and Select Row */}
                <div className="flex flex-row gap-4 text-sm sm:text-base flex-1">
                    {/* Place Input */}
                    <div className="flex-1 border border-light-border rounded-lg">
                        <input
                            type="text"
                            placeholder="City or neighborhood"
                            value={place}
                            onChange={(e) => setPlace(e.target.value)}
                            className="w-full h-[48px] px-4 text-[#A0A0A0] placeholder-gray-400 border-0 rounded-lg focus:outline-none focus:ring-0"
                        />
                    </div>

                    {/* Type Select */}
                    <div className="flex-1 border border-light-border rounded-lg relative">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full h-[48px] px-4 pr-8 text-[#A0A0A0] bg-white border-0 rounded-lg focus:outline-none focus:ring-0 cursor-pointer appearance-none"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E")`,
                                backgroundPosition: 'right 0.75rem center',
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '1.25em 1.25em',
                            }}
                        >
                            <option value="rent" className="py-4 hover:bg-blue-50">Rent</option>
                            <option value="buy" className="py-4 hover:bg-blue-50">Buy</option>
                        </select>
                    </div>
                </div>

                {/* Search Button */}
                <button
                    onClick={handleSearch}
                    className="bg-blue-500 text-sm sm:text-base md:min-w-[200px] w-full md:w-auto h-[48px] hover:bg-blue-600 cursor-pointer text-white font-medium px-8 rounded-lg transition-colors duration-200"
                >
                    Search
                </button>
            </div>
        </div>
    );
}
