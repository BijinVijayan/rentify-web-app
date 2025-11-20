import {Footer, Navbar} from "@/components";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className={"relative"}>
            <Navbar />
            <main className={"pt-[60px]"}>{children}</main>
            <Footer />
        </div>
    )
}
