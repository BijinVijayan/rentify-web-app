"use client";

import React from "react";
import { Icons } from "@/data/Icons";
import SidebarLink from "./SidebarLink";
import Image from "next/image";
import { useHostStore } from "@/store/useHostStore";
import { signOut } from "next-auth/react";

interface SidebarProps {
    onClose?: () => void;
    isOpen: boolean;
}

export default function Sidebar({ isOpen, onClose }: SidebarProps) {
    // 1. Get currentHost AND clearHost from the store
    const { currentHost, clearHost } = useHostStore();

    // 2. Create the Logout Handler
    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        // A. Close sidebar (if on mobile)
        if (onClose) onClose();
        // B. Clear the global client state (Zustand)
        clearHost();
        // C. Sign out from the server and redirect to home
        await signOut({ callbackUrl: '/' });
    };

    // Fallback image in case avatarUrl is missing/empty
    const avatarSrc = currentHost?.avatarUrl || "/images/no-profile.png";

    return (
        <>
            {/* Mobile overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={onClose}
                />
            )}

            <aside
                className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-white border-r border-gray-200 flex flex-col
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
            >
                {/* Logo */}
                <div className="h-16 flex items-center px-6 border-b border-gray-100">
                    <Image
                        src={"/icons/renfity icon.png"}
                        alt={"logo"}
                        width={100}
                        height={100}
                        className={"w-6"}
                    />
                    <span className="ml-3 text-xl font-bold text-gray-900 tracking-tight">
                        Rentify
                    </span>
                </div>

                <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
                    <SidebarLink label="Dashboard" icon={Icons.Dashboard} href="/dashboard" onNavigate={onClose}/>
                    <SidebarLink label="Properties" icon={Icons.Properties} href="/properties" onNavigate={onClose}/>
                    <SidebarLink label="Calendar" icon={Icons.Calendar} href="/calendar" onNavigate={onClose}/>
                    <SidebarLink label="Messages" icon={Icons.Messages} href="/messages" onNavigate={onClose}/>
                    <SidebarLink label="Analytics" icon={Icons.Analytics} href="/analytics" onNavigate={onClose}/>
                </nav>

                <div className="p-4 border-t border-gray-100 space-y-1">
                    <SidebarLink label="Settings" icon={Icons.Settings} href="/settings" onNavigate={onClose}/>

                    {/* 3. Attach the Logout Handler here */}
                    {/* We pass href="/" as a fallback, but onClick handles the actual logic */}
                    <SidebarLink
                        label="Logout"
                        icon={Icons.Logout}
                        href="/"
                        onClick={handleLogout}
                    />
                </div>

                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        {/* 4. Safe Image Rendering */}
                        <div className="relative w-10 h-10 rounded-full overflow-hidden border border-gray-200 bg-gray-100">
                            <Image
                                src={avatarSrc}
                                width={100}
                                height={100}
                                alt="User"
                                className="w-full h-full object-cover"
                            />
                        </div>

                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900 line-clamp-1">
                                {currentHost?.fullName || "Host"}
                            </span>
                            {currentHost?.createdAt && (
                                <span className="text-xs text-gray-500">
                                    {new Date(currentHost.createdAt).toLocaleDateString()}
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}