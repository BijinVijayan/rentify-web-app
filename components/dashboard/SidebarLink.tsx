"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { ComponentType, SVGProps } from "react";

type SidebarLinkProps = {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: string;
    onNavigate?: () => void;
    onClick?: (e: React.MouseEvent) => void | Promise<void>;
};

export default function SidebarLink({
                                        label,
                                        icon: Icon,
                                        href,
                                        onNavigate,
                                        onClick
                                    }: SidebarLinkProps) {
    const pathname = usePathname();
    const active = pathname === href;

    // --- COMBINED HANDLER ---
    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        // 1. If a custom onClick exists (like Logout), run it first
        if (onClick) {
            onClick(e);
        }

        // 2. Then run the navigation handler (Close Sidebar)
        if (onNavigate) {
            onNavigate();
        }
    };

    return (
        <Link
            href={href}
            className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
        ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
      `}
            // Use the combined handler here
            onClick={handleClick}
        >
            <Icon className={active ? "text-blue-600" : "text-gray-400"} />
            {label}
        </Link>
    );
}