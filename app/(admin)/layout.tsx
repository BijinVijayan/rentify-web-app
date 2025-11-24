"use client"
import Sidebar from "@/components/dashboard/Sidebar";
import Header from "@/components/dashboard/Header";
import React, {useState} from "react";

export default function AdminLayout({
                                        children,
                                    }: Readonly<{
    children: React.ReactNode;
}>) {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="min-h-screen bg-[#F9FAFB] flex font-sans text-slate-900">
            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
            <div className="flex-1 flex flex-col min-w-0 lg:ml-64">
                <Header onMenuClick={() => setSidebarOpen(true)} />
                <main className="flex-1 overflow-y-auto">{children}</main>
            </div>
        </div>
    );
}
