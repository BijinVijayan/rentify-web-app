// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-footer-bg text-white py-12 px-4">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10">
                {/* Brand column */}
                <div className="flex-1 min-w-[200px]">
                    <h2 className="font-bold text-2xl mb-2">Rentify</h2>
                    <p className="text-gray-200 text-base max-w-[250px]">
                        Find your perfect rental home with ease.
                    </p>
                </div>
                {/* Explore column */}
                <div className="flex-1 min-w-[150px]">
                    <h3 className="font-bold sm:text-lg mb-3">Explore</h3>
                    <nav className="flex flex-col gap-2 max-sm:text-sm">
                        <Link href="/" className="hover:underline text-gray-100">Home</Link>
                        <Link href="/" className="hover:underline text-gray-100">Properties</Link>
                        <Link href="/" className="hover:underline text-gray-100">Neighborhoods</Link>
                        <Link href="/" className="hover:underline text-gray-100">Resources</Link>
                    </nav>
                </div>
                {/* About column */}
                <div className="flex-1 min-w-[150px]">
                    <h3 className="font-bold sm:text-lg mb-3">About</h3>
                    <nav className="flex flex-col gap-2 max-sm:text-sm">
                        <Link href="/" className="hover:underline text-gray-100">Our Story</Link>
                        <Link href="/" className="hover:underline text-gray-100">Team</Link>
                        <Link href="/" className="hover:underline text-gray-100">Careers</Link>
                        <Link href="/" className="hover:underline text-gray-100">Press</Link>
                    </nav>
                </div>
                {/* Support column */}
                <div className="flex-1 min-w-[150px]">
                    <h3 className="font-bold sm:text-lg mb-3">Support</h3>
                    <nav className="flex flex-col gap-2 max-sm:text-sm">
                        <Link href="/" className="hover:underline text-gray-100">Help Center</Link>
                        <Link href="/" className="hover:underline text-gray-100">Contact Us</Link>
                        <Link href="/" className="hover:underline text-gray-100">Privacy Policy</Link>
                        <Link href="/" className="hover:underline text-gray-100">Terms of Service</Link>
                    </nav>
                </div>
            </div>
            <hr className="border-gray-500 my-6" />
            <div className="text-center text-gray-300 text-sm">
                © 2025 Rentify. All rights reserved.
            </div>
        </footer>
    );
}
