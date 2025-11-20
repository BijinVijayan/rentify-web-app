import React from 'react'
import Image from "next/image";
import {HomeSearchBar} from "@/components/index";

const Hero = () => {
    return (
        <div className={"bg-white pb-28 relative"}>
            <Image src={"/images/hero-image.png"} alt={"hero"} width={4784} height={2000} className={"opacity-90"} />
            <div className={"bg-white rounded-lg absolute shadow-md w-4/5 sm:w-3/4  left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
                <HomeSearchBar/>
            </div>
            <div className={"hidden text-white sm:block text-center sm:absolute top-1/3 left-1/2 transform -translate-x-1/2 -translate-y-1/2"}>
                <h2 className={"font-extrabold text-3xl md:text-5xl mb-2"}>Find Your Perfect Rental Home</h2>
                <p className={"text-xl"}>Discover the best properties for rent in your favorite locations</p>
            </div>
        </div>
    )
}
export default Hero
