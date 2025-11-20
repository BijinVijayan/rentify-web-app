'use client';

import { FaLocationArrow } from 'react-icons/fa6';
import { TbHomeSearch } from 'react-icons/tb';
import { PiSuitcaseSimple } from 'react-icons/pi';
import {HowItWorksStep} from "@/types/types";

const steps: HowItWorksStep[] = [
    {
        icon: <FaLocationArrow size={36} className="text-slate-50 mx-auto" />,
        title: 'Find Your Location',
        description: 'Search for properties in your desired location with our advanced filters.',
    },
    {
        icon: <TbHomeSearch size={36} className="text-slate-50 mx-auto" />,
        title: 'Browse Properties',
        description: 'Explore detailed listings with photos, amenities, and verified reviews.',
    },
    {
        icon: <PiSuitcaseSimple size={36} className="text-slate-50 mx-auto" />,
        title: 'Book Your Stay',
        description: 'Secure your rental with our easy booking system and instant confirmation.',
    }
];

export default function HowRentifyWorks() {
    return (
        <section className="bg-[#f5f8fc] py-8 sm:py-14 px-5">
            <div className="max-w-6xl mx-auto">
                <h2 className="mb-10 text-2xl sm:text-3xl font-bold text-center text-[#273144]">How Rentify Works</h2>
                <div className="grid gap-5 sm:gap-8 grid-cols-1 md:grid-cols-3">
                    {steps.map((step, idx) => (
                        <div
                            key={step.title}
                            className="bg-white rounded-lg shadow px-8 py-10 flex flex-col items-center text-center
                             transition"
                        >
                            <div className={"bg-primary-color p-2.5 rounded-full"}>
                                {step.icon}
                            </div>
                            <h3 className="mt-6 mb-2 text-xl font-bold text-primary-text">{step.title}</h3>
                            <p className="text-gray-text text-base leading-relaxed">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
