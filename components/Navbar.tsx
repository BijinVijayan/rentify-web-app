// components/Navbar.tsx
"use client";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {RiMenu2Line} from "react-icons/ri";
import {IoIosClose} from "react-icons/io";

const navLinks = [
    { name: "Home", href: "/" },
    { name: "Properties", href: "/properties" },
    { name: "Neighborhoods", href: "/neighborhoods" },
    { name: "Become a Host", href: "/be-a-host" },
];

export default function Navbar() {
    const [mobileOpen, setMobileOpen] = useState(false);

    return (
        <header className="shadow bg-white fixed top-0 w-full z-30 ">
            <nav className="flex items-center justify-between max-w-7xl mx-auto py-1 px-4 min-h-[68px]">
                {/* Logo */}
                <Link href={'/'} className="flex items-center gap-2">
                    <Image src={"/icons/renfity icon.png"} alt={"rentify"} width={500} height={500} className={"w-6"} />
                    <span className="font-bold text-base sm:text-xl text-primary-color">Rentify</span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map(link => (
                        <Link href={link.href} key={link.name} className="text-primary-text hover:text-primary-color transition">
                            {link.name}
                        </Link>
                    ))}

                </div>
                <div className={"hidden md:flex items-center justify-center text-sm gap-6"}>
                    <Link href="/signin" className="border px-4 py-1.5 rounded-md text-primary-color border-primary-color hover:bg-blue-50 transition">
                        Log in
                    </Link>
                    {/*<Link href="/" className="bg-primary-color px-4 py-1.5 rounded-md text-white hover:bg-primary-color/90 transition">*/}
                    {/*    Sign up*/}
                    {/*</Link>*/}
                </div>

                {/* Mobile Button */}
                <button aria-label="Open menu"
                        className="md:hidden inline-flex items-center p-2 text-primary-color"
                        onClick={() => setMobileOpen(true)}>
                    <RiMenu2Line size={26} className={""} />
                </button>
            </nav>

            {/* Mobile Sidebar */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.aside
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", stiffness: 200, damping: 20 }}
                        className="fixed top-0 right-0 bg-white shadow-lg w-full h-full z-40 flex flex-col p-6"
                    >
                        <button
                            onClick={() => setMobileOpen(false)}
                            aria-label="Close menu"
                            className="self-end mb-4"
                        >
                            <IoIosClose size={30} className={"text-primary-text"} />
                        </button>
                        <div className="flex flex-col gap-6">
                            {navLinks.map(link => (
                                <Link
                                    href={link.href}
                                    key={link.name}
                                    className="text-primary-text hover:text-primary-text text-base font-medium"
                                    onClick={() => setMobileOpen(false)}
                                >
                                    {link.name}
                                </Link>
                            ))}
                            <Link href="/signin" onClick={() => setMobileOpen(false)}
                                  className="mt-4   border px-4 py-2 text-center font-medium rounded-md text-primary-color border-primary-color hover:bg-blue-50 transition">
                                Log in
                            </Link>
                            {/*<Link href="/" onClick={() => setMobileOpen(false)}*/}
                            {/*      className="bg-primary-color px-4 py-1 rounded-md text-white hover:bg-blue-600 transition">*/}
                            {/*    Sign up*/}
                            {/*</Link>*/}
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Backdrop */}
            <AnimatePresence>
                {mobileOpen && (
                    <motion.div
                        initial={{ opacity: 0 }} animate={{ opacity: 0.3 }} exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black z-30"
                        onClick={() => setMobileOpen(false)}
                    />
                )}
            </AnimatePresence>
        </header>
    );
}
