"use client";
import {Icons} from "@/data/Icons";
import SidebarLink from "./SidebarLink";
import Image from "next/image";

interface SidebarProps {
    onClose?: () => void
    isOpen: boolean;
}

export default function Sidebar({isOpen, onClose}: SidebarProps) {

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
                    <Image src={"/icons/renfity icon.png"} alt={"logo"} width={1000} height={1000} className={"w-6"}/>
                    <span className="ml-3 text-xl font-bold text-gray-900 tracking-tight">Rentify</span>
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
                    {/*<SidebarLink label="Support" icon={Icons.Support} href="/support" onNavigate={onClose}/>*/}
                    <SidebarLink label="Logout" icon={Icons.Logout} href="/" onNavigate={onClose}/>
                </div>
                <div className="p-4 border-t border-gray-100">
                    <div className="flex items-center gap-3">
                        <img
                            src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=100&h=100"
                            alt="User"
                            className="w-10 h-10 rounded-full object-cover border border-gray-200"
                        />
                        <div className="flex flex-col">
                            <span className="text-sm font-bold text-gray-900">Alex Hartman</span>
                            <span className="text-xs text-gray-500">Host ID: 12345</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
