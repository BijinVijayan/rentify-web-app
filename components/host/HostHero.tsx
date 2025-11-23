import React from 'react'

const HostHero = () => {
    return (
        <div className={"sm:py-10 md:py-14"}>
            <div className={"h-[520px] w-full max-w-7xl mx-auto sm:rounded-xl overflow-auto"}>
                <div
                    className="flex min-h-[520px] host-hero flex-col gap-6 bg-cover bg-center bg-no-repeat @[480px]:gap-8 @[480px]:rounded-xl items-start justify-end px-8 pb-10 @[480px]:px-10"
                    data-alt="Stylish and modern apartment living room with large windows showing a city view">
                    <div className="flex flex-col gap-4 text-left max-w-2xl">
                        <h1 className="text-white text-4xl sm:text-5xl font-black leading-tight tracking-[-0.033em] @[480px]:text-6xl @[480px]:font-black @[480px]:leading-tight @[480px]:tracking-[-0.033em]">Share
                            Your Space. Earn More.</h1>
                        <h2 className="text-white text-base font-normal leading-normal @[480px]:text-lg @[480px]:font-normal @[480px]:leading-normal">Join
                            our community of hosts and enjoy the flexibility, safety, and financial opportunity of sharing
                            your property on Rentify.</h2>
                    </div>
                    <button
                        className="flex min-w-[84px] bg-orange-500 max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-lg h-10 px-5 bg-accent text-white text-sm font-semibold leading-normal tracking-[0.015em] hover:bg-accent/90 transition-colors">
                        <span className="truncate">Get Started</span>
                    </button>
                </div>
            </div>
        </div>
    )
}
export default HostHero
