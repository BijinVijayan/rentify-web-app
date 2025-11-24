"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ComponentType, SVGProps } from "react";

type SidebarLinkProps = {
    label: string;
    icon: ComponentType<SVGProps<SVGSVGElement>>;
    href: string;
    onNavigate?: () => void;
};

export default function SidebarLink({ label, icon: Icon, href, onNavigate }: SidebarLinkProps) {
    const pathname = usePathname();
    const active = pathname === href;

    return (
        <Link
            href={href}
            className={`
        w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors
        ${active ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
      `}
            onClick={onNavigate}
        >
            <Icon className={active ? "text-blue-600" : "text-gray-400"} />
            {label}
        </Link>
    );
}
