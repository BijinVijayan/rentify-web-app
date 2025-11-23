import React from 'react'
import HostHero from "@/components/host/HostHero";
import InfoCard from "@/components/InfoCard";
import {BsHouseAddFill} from "react-icons/bs";
import {IoIosChatboxes} from "react-icons/io";
import {FaMoneyBill} from "react-icons/fa";
import {MdOutlinePayment, MdOutlineSupportAgent, MdVerifiedUser} from "react-icons/md";
import HostCallToAction from "@/components/host/HostCallToAction";
import FaqSection from "@/components/host/FaqSection";
import HostsSection from "@/components/Testimonials";

const Page = () => {

    const cardsData = [
        {
            iconName: <BsHouseAddFill />,
            title: '1. List Your Property',
            description: 'Create your listing in minutes. Add photos, set your price, and tell us about your unique space.',
            iconBgClass: 'bg-sky-800/10 p-4 rounded-full',
            iconColorClass: 'text-sky-900',
            center: true,

        },
        {
            iconName: <IoIosChatboxes />,
            title: '2. Connect with Guests',
            description: 'Receive booking requests and communicate directly with potential guests before they arrive.',
            iconColorClass: 'text-sky-900',
            iconBgClass: 'bg-sky-800/10 p-4 rounded-full',
            center: true,
        },
        {
            iconName: <FaMoneyBill />,
            title: '3. Get Paid Securely',
            description: 'Our secure payment system ensures you get paid on time, every time, after each successful stay.',
            iconColorClass: 'text-sky-900',
            iconBgClass: 'bg-sky-800/10 p-4 rounded-full',
            center: true,
        },
    ];
    const benefitsData = [
        {
            iconName: <MdVerifiedUser />,
            title: 'Verified Guests',
            description: 'Our comprehensive verification system for guests means you can welcome newcomers with confidence and peace of mind.',
            iconBgClass: 'p-1 rounded-full',
            iconColorClass: 'text-lime-700',

        },
        {
            iconName: <MdOutlineSupportAgent />,
            title: '24/7 Support',
            description: 'Have a question or need help? Our global support team is available around the clock to assist you with anything you need.',
            iconColorClass: 'text-lime-700',
            iconBgClass: 'p-1 rounded-full',
        },
        {
            iconName: <MdOutlinePayment />,
            title: 'Secure Payments',
            description: 'We handle all the transactions for you. Money from your bookings is sent directly to you after guests check in.',
            iconColorClass: 'text-lime-700',
            iconBgClass: 'p-1 rounded-full',
        },
    ];
    return (
        <section className={"bg-slate-50 "}>
            <HostHero/>
            <div className={"max-w-7xl mx-auto py-10 pb-0 sm:py-14 sm:px-4"}>
                <h3 className={"text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-center mb-6"}>How Hosting Works</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-4">
                    {cardsData.map((card, idx) => (
                        <InfoCard key={idx} {...card} />
                    ))}
                </div>
            </div>
            <div className={"max-w-7xl mx-auto py-10 sm:py-14 sm:px-4"}>
                <h3 className={"text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight text-center mb-6"}>Benefits You Can Count On</h3>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6 p-4">
                    {benefitsData.map((card, idx) => (
                        <InfoCard key={idx} {...card} />
                    ))}
                </div>
            </div>
            <HostsSection/>
            <FaqSection />
            <HostCallToAction />
        </section>
    )
}
export default Page
