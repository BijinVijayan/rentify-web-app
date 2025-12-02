"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import {
    Search, Filter, Plus, MoreVertical, Edit2, Eye, Trash2,
    ChevronLeft, ChevronRight, LayoutGrid, List as ListIcon, PauseCircle
} from "lucide-react";

// Types
interface Property {
    _id: string;
    title: string;
    listingType: "RENT" | "SALE";
    price: { sale?: number; monthly?: number };
    currency: string;beds: number; baths: number; sqft: number;
    location: { address: string; city: string };
    status: string;
    images: string[];
    createdAt: string;
}

export default function PropertiesPage() {
    // --- State ---
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState<"list" | "grid">("list");

    // Filters & Pagination
    const [search, setSearch] = useState("");
    const [activeFilter, setActiveFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [totalItems, setTotalItems] = useState(0);

    // Selection
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    // --- Fetch Data ---
    const fetchProperties = useCallback(async () => {
        setLoading(true);
        try {
            const params = new URLSearchParams({
                page: currentPage.toString(),
                limit: "10",
                search: search,
                filter: activeFilter
                // No mode passed -> Defaults to Host Mode
            });

            const res = await fetch(`/api/properties?${params}`);
            const data = await res.json();

            if (res.ok) {
                setProperties(data.properties);
                setTotalPages(data.pagination.pages);
                setTotalItems(data.pagination.total);
            } else {
                toast.error("Failed to load properties");
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    }, [currentPage, search, activeFilter]);

    useEffect(() => {
        // Debounce search
        const timer = setTimeout(() => fetchProperties(), 300);
        return () => clearTimeout(timer);
    }, [fetchProperties]);

    // --- Handlers ---

    const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.checked) {
            setSelectedIds(properties.map(p => p._id));
        } else {
            setSelectedIds([]);
        }
    };

    const handleSelectOne = (id: string) => {
        if (selectedIds.includes(id)) {
            setSelectedIds(selectedIds.filter(item => item !== id));
        } else {
            setSelectedIds([...selectedIds, id]);
        }
    };

    const handleDelete = async (idsToDelete: string[]) => {
        if (!confirm("Are you sure you want to delete these properties?")) return;

        const toastId = toast.loading("Deleting...");
        try {
            const res = await fetch('/api/properties', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ids: idsToDelete })
            });

            if (res.ok) {
                toast.success("Deleted successfully", { id: toastId });
                setSelectedIds([]); // Clear selection
                fetchProperties(); // Refresh list
            } else {
                throw new Error("Delete failed");
            }
        } catch (error) {
            toast.error("Error deleting properties", { id: toastId });
        }
    };

    // --- UI Formatting Helpers ---
    const formatPrice = (p: Property) => {
        const amount = p.listingType === 'SALE' ? p.price.sale : p.price.monthly;
        const period = p.listingType === 'RENT' ? '/mo' : '';
        return `${p.currency} ${amount?.toLocaleString()}${period}`;
    };

    const getStatusColor = (status: string) => {
        switch(status.toLowerCase()) {
            case 'published': return 'bg-green-100 text-green-700';
            case 'pending': return 'bg-yellow-100 text-yellow-700';
            case 'draft': return 'bg-gray-100 text-gray-700';
            default: return 'bg-blue-100 text-blue-700';
        }
    };

    return (
        <div className="p-6 max-w-7xl mx-auto min-h-screen">
            {/* --- HEADER --- */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Properties</h1>
                    <p className="text-gray-500 mt-1">Manage all your rental and sale listings.</p>
                </div>
                <Link href="/add-property" className="px-5 py-2.5 rounded-lg font-medium text-sm border border-gray-200 transition-colors flex items-center gap-2">
                    <Plus size={18} />
                    Add New Property
                </Link>
            </div>

            {/* --- CONTROLS --- */}
            <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm mb-6">
                <div className="flex flex-col md:flex-row gap-4 justify-between items-center">

                    {/* Search */}
                    <div className="relative w-full md:w-96">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                        <input
                            type="text"
                            placeholder="Search by name, address, city..."
                            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>

                    {/* View Toggle & Filter Btn */}
                    <div className="flex items-center gap-3 w-full md:w-auto">
                        <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-lg hover:bg-gray-50 text-gray-700 text-sm font-medium transition-colors">
                            <Filter size={18} />
                            <span>Filters</span>
                        </button>
                        <div className="flex border border-gray-200 rounded-lg p-1 bg-gray-50">
                            <button onClick={() => setViewMode("list")} className={`p-2 rounded ${viewMode === 'list' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>
                                <ListIcon size={18} />
                            </button>
                            <button onClick={() => setViewMode("grid")} className={`p-2 rounded ${viewMode === 'grid' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}>
                                <LayoutGrid size={18} />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex gap-2 mt-6 overflow-x-auto pb-2 md:pb-0">
                    {["All", "For Rent", "For Sale", "Paused", "Drafts"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => { setActiveFilter(tab); setCurrentPage(1); }}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                                activeFilter === tab
                                    ? "bg-blue-100 text-blue-700"
                                    : "text-gray-600 hover:bg-gray-100"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {/* --- BULK ACTION BAR (Floating) --- */}
            {selectedIds.length > 0 && (
                <div className="bg-blue-50 border border-blue-100 p-4 rounded-xl mb-6 flex items-center justify-between animate-in fade-in slide-in-from-top-2">
                    <div className="flex items-center gap-3">
                        <div className="w-5 h-5 bg-blue-600 text-white flex items-center justify-center rounded text-xs font-bold">
                            {selectedIds.length}
                        </div>
                        <span className="text-sm font-medium text-blue-900">properties selected</span>
                    </div>
                    <div className="flex items-center gap-2">
                        {/*<button className="p-2 hover:bg-blue-100 rounded-lg text-blue-700" title="Pause">*/}
                        {/*    <PauseCircle size={20} />*/}
                        {/*</button>*/}
                        <button
                            onClick={() => handleDelete(selectedIds)}
                            className="p-2 hover:bg-red-100 rounded-lg text-red-600"
                            title="Delete"
                        >
                            <Trash2 size={20} />
                        </button>
                    </div>
                </div>
            )}

            {/* --- CONTENT AREA --- */}
            {loading ? (
                <div className="text-center py-20 text-gray-500">Loading properties...</div>
            ) : properties.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                    <div className="mx-auto w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 text-gray-400">
                        <Search size={32} />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900">No properties found</h3>
                    <p className="text-gray-500">Try adjusting your search or filters.</p>
                </div>
            ) : (
                <>
                    {/* LIST VIEW (Table - Desktop/Tablet) */}
                    {viewMode === "list" && (
                        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hidden md:block">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-500 uppercase tracking-wider">
                                    <th className="p-4 w-12">
                                        <input
                                            type="checkbox"
                                            className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                            onChange={handleSelectAll}
                                            checked={selectedIds.length === properties.length && properties.length > 0}
                                        />
                                    </th>
                                    <th className="p-4">Property</th>
                                    <th className="p-4">Type</th>
                                    <th className="p-4">Details</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4 text-right">Actions</th>
                                </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100">
                                {properties.map((property) => (
                                    <tr key={property._id} className={`group hover:bg-gray-50 transition-colors ${selectedIds.includes(property._id) ? 'bg-blue-50/30' : ''}`}>
                                        <td className="p-4">
                                            <input
                                                type="checkbox"
                                                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                checked={selectedIds.includes(property._id)}
                                                onChange={() => handleSelectOne(property._id)}
                                            />
                                        </td>
                                        <td className="p-4">
                                            <div className="flex gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-200 flex-shrink-0">
                                                    {property.images[0] ? (
                                                        <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-gray-400"><Eye size={20}/></div>
                                                    )}
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900 text-sm">{property.title}</h3>
                                                    <p className="text-gray-500 text-xs mt-1 line-clamp-1">{property.location.address}, {property.location.city}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                                <span className={`px-2.5 py-1 rounded text-xs font-bold ${property.listingType === 'SALE' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                                                    For {property.listingType === 'SALE' ? 'Sale' : 'Rent'}
                                                </span>
                                        </td>
                                        <td className="p-4">
                                            <div className="font-bold text-gray-900 text-sm">{formatPrice(property)}</div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {property?.beds} bed • {property?.baths} bath • {property?.sqft} sqft
                                            </div>
                                        </td>
                                        <td className="p-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(property.status)}`}>
                                                    <span className="w-1.5 h-1.5 rounded-full bg-current" />
                                                    {property.status}
                                                </span>
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 transition-opacity">
                                                <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete([property._id])}
                                                    className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                                <button className="p-2 text-gray-400 hover:text-gray-900 rounded-lg">
                                                    <MoreVertical size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* GRID / MOBILE VIEW (Cards) */}
                    <div className={`${viewMode === 'list' ? 'md:hidden' : ''} grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6`}>
                        {properties.map((property) => (
                            <div key={property._id} className={`bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow relative ${selectedIds.includes(property._id) ? 'ring-2 ring-blue-500 border-transparent' : 'border-gray-200'}`}>

                                {/* Mobile Checkbox Overlay */}
                                <div className="absolute top-3 left-3 z-10">
                                    <input
                                        type="checkbox"
                                        className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 bg-white shadow-sm"
                                        checked={selectedIds.includes(property._id)}
                                        onChange={() => handleSelectOne(property._id)}
                                    />
                                </div>

                                <div className="relative h-48 bg-gray-200">
                                    {property.images[0] && (
                                        <Image src={property.images[0]} alt={property.title} fill className="object-cover" />
                                    )}
                                    <div className="absolute top-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded text-xs font-bold text-gray-900">
                                        {formatPrice(property)}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <div className="flex justify-between items-start mb-2">
                                        <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wide ${property.listingType === 'SALE' ? 'bg-green-100 text-green-700' : 'bg-purple-100 text-purple-700'}`}>
                                            For {property.listingType === 'SALE' ? 'Sale' : 'Rent'}
                                        </span>
                                        <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getStatusColor(property.status)}`}>
                                            {property.status}
                                        </span>
                                    </div>
                                    <h3 className="font-bold text-gray-900 mb-1 line-clamp-1">{property.title}</h3>
                                    <p className="text-gray-500 text-xs mb-3 line-clamp-1">{property.location.address}</p>

                                    <div className="flex items-center gap-4 text-xs text-gray-600 border-t border-gray-100 pt-3">
                                        <span>{property?.beds} Beds</span>
                                        <span>{property?.baths} Baths</span>
                                        <span>{property?.sqft} Sqft</span>
                                    </div>

                                    <div className="flex justify-end gap-2 mt-4 pt-3 border-t border-gray-100">
                                        <button className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg"><Edit2 size={16}/></button>
                                        <button onClick={() => handleDelete([property._id])} className="p-2 text-gray-500 hover:bg-red-50 hover:text-red-600 rounded-lg"><Trash2 size={16}/></button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* --- PAGINATION --- */}
                    <div className="flex flex-col md:flex-row justify-between items-center mt-8 pt-6 border-t border-gray-200 text-sm text-gray-500 gap-4">
                        <span>Showing <span className="font-bold text-gray-900">{((currentPage - 1) * 10) + 1}-{Math.min(currentPage * 10, totalItems)}</span> of {totalItems}</span>

                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                disabled={currentPage === 1}
                                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                <ChevronLeft size={16} /> Previous
                            </button>

                            {/* Simple Page Numbers */}
                            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                                let pageNum = i + 1;
                                // Simple logic to keep current page visible if > 5
                                if (totalPages > 5 && currentPage > 3) pageNum = currentPage - 2 + i;
                                if (pageNum > totalPages) return null;

                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-9 h-9 rounded-lg font-medium transition-colors ${
                                            currentPage === pageNum
                                                ? "bg-blue-600 text-white"
                                                : "hover:bg-gray-50 text-gray-700"
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}

                            <button
                                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                                disabled={currentPage === totalPages}
                                className="px-3 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1"
                            >
                                Next <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}