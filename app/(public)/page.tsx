import {Featured, Hero, HomeCallToAction, HowRentifyWorks} from "@/components";

function Page() {
    return (
        <section className={"bg-white"}>
            <Hero />
            <Featured/>
            <HowRentifyWorks/>
            <HomeCallToAction/>
        </section>
    )
}

export default Page
