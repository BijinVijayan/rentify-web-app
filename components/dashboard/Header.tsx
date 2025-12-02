import { Icons } from "@/data/Icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface HeaderProps {
    onMenuClick?: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
    const pathname = usePathname();

    // Hide button on add-property and property detail pages
    const shouldHideButton = pathname === "/add-property" || pathname.startsWith("/properties");

    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-8 sticky top-0 z-30">
            <div className="flex items-center gap-4">
                {/* Desktop search */}
                <div className="hidden md:flex items-center relative w-96">
                    <Icons.Search className="absolute left-3 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder="Search"
                        className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-0 focus:bg-white transition-all"
                    />
                </div>

                {/* Mobile hamburger menu button */}
                <button
                    className="md:hidden p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                    onClick={onMenuClick}
                    aria-label="Open sidebar"
                >
                    <Icons.Menu className="w-6 h-6" />
                </button>
            </div>

            <div className="flex items-center gap-4">
                {!shouldHideButton && (
                    <Link href={"/add-property"} className="hidden sm:flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors shadow-sm shadow-blue-200">
                        <Icons.Plus className="w-4 h-4" />
                        Add New Property
                    </Link>
                )}
                <button className="relative p-2 text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <Icons.Bell />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
                </button>
            </div>
        </header>
    );
}
