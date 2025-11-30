"use client";

import React, { useState, useMemo, ChangeEvent } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import dynamic from "next/dynamic";

// UI Icons
import {
    UploadCloud, Check, Loader2, Search, X, MapPin, Image as ImageIcon
} from "lucide-react";

// Amenity Icons (React Icons)
import { FaSwimmingPool, FaHome, FaParking, FaWifi, FaDumbbell, FaDog } from "react-icons/fa";
import { MdBalcony, MdElevator, MdSpa, MdSecurity, MdAcUnit, MdKitchen, MdDeck, MdMeetingRoom } from "react-icons/md";

// --- Dynamic Map ---
const MapPicker = dynamic(() => import("@/components/MapPicker"), {
    ssr: false,
    loading: () => <div className="h-64 bg-gray-100 flex items-center justify-center animate-pulse text-sm text-gray-500">Loading Map...</div>
});

// --- Types ---
type ListingMode = "RENT" | "SALE";
type RentFreq = "MONTHLY" | "YEARLY";

interface LocationResult {
    place_id: number;
    lat: string;
    lon: string;
    display_name: string;
    address: {
        city?: string;
        town?: string;
        village?: string;
        country?: string;
    };
}

interface PropertyState {
    title: string;
    description: string;
    propertyType: string;
    listingType: ListingMode;
    rentFrequency: RentFreq[];
    price: {
        sale: number;
        monthly: number;
        yearly: number;
        securityDeposit: number;
    };
    currency: string;
    specs: {
        beds: number;
        baths: number;
        sqft: number;
    };
    location: {
        lat: number;
        lng: number;
        address: string;
        city: string;
        country: string;
    };
    amenities: string[];
    images: File[];
}

// --- AMENITY GROUPS (As requested previously) ---
const AMENITY_GROUPS = [
    {
        group: "Building",
        items: [
            { key: "balcony", label: "Private Balcony", icon: <MdBalcony /> },
            { key: "elevator", label: "Elevator", icon: <MdElevator /> },
            { key: "concierge", label: "Concierge", icon: <MdMeetingRoom /> }, // Placeholder icon
        ]
    },
    {
        group: "Health & Fitness",
        items: [
            { key: "pool", label: "Swimming Pool", icon: <FaSwimmingPool /> },
            { key: "gym", label: "Gymnasium", icon: <FaDumbbell /> },
            { key: "spa", label: "Sauna / Spa", icon: <MdSpa /> },
        ]
    },
    {
        group: "Security",
        items: [
            { key: "security", label: "24/7 Security", icon: <MdSecurity /> },
            { key: "parking", label: "Secure Parking", icon: <FaParking /> },
        ]
    },
    {
        group: "Technology",
        items: [
            { key: "wifi", label: "High Speed WiFi", icon: <FaWifi /> },
            { key: "ac", label: "Central A/C", icon: <MdAcUnit /> },
        ]
    }
];

export default function AddProperty() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Search State
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearching, setIsSearching] = useState(false);
    const [suggestions, setSuggestions] = useState<LocationResult[]>([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Form State
    const [formData, setFormData] = useState<PropertyState>({
        title: "",
        description: "",
        propertyType: "Apartment",
        listingType: "RENT",
        rentFrequency: ["MONTHLY"],
        price: { sale: 0, monthly: 0, yearly: 0, securityDeposit: 0 },
        currency: "AED",
        specs: { beds: 1, baths: 1, sqft: 0 },
        location: { lat: 25.1972, lng: 55.2744, address: "", city: "Dubai", country: "UAE" },
        amenities: [],
        images: []
    });

    const [imagePreviews, setImagePreviews] = useState<string[]>([]);

    // --- HANDLERS (Same as before) ---
    const handleSearchInput = async (e: ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        setSearchQuery(val);
        if (val.length > 2) {
            setIsSearching(true);
            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(val)}&addressdetails=1&limit=5`, {
                    headers: { "User-Agent": "RentifyApp/1.0" }
                });
                const data = await res.json();
                setSuggestions(data);
                setShowSuggestions(true);
            } catch (err) {
                console.error(err);
            } finally {
                setIsSearching(false);
            }
        } else {
            setSuggestions([]);
            setShowSuggestions(false);
        }
    };

    const selectLocation = (place: LocationResult) => {
        setFormData(prev => ({
            ...prev,
            location: {
                lat: parseFloat(place.lat),
                lng: parseFloat(place.lon),
                address: place.display_name,
                city: place.address.city || place.address.town || place.address.village || "Unknown",
                country: place.address.country || "Unknown"
            }
        }));
        setSearchQuery(place.display_name);
        setShowSuggestions(false);
        toast.success("Location set");
    };

    const updateField = (field: keyof PropertyState, value: any) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const updateNested = <K extends keyof PropertyState>(section: K, field: keyof PropertyState[K], value: any) => {
        setFormData(prev => ({
            ...prev,
            [section]: { ...(prev[section] as object), [field]: value }
        }));
    };

    const toggleRentFreq = (freq: RentFreq) => {
        setFormData(prev => {
            const current = prev.rentFrequency;
            return {
                ...prev,
                rentFrequency: current.includes(freq) ? current.filter(f => f !== freq) : [...current, freq]
            };
        });
    };

    const toggleAmenity = (name: string) => {
        setFormData(prev => ({
            ...prev,
            amenities: prev.amenities.includes(name)
                ? prev.amenities.filter(a => a !== name)
                : [...prev.amenities, name]
        }));
    };

    const handleMapSelect = (lat: number, lng: number) => {
        setFormData(prev => ({
            ...prev,
            location: { ...prev.location, lat, lng }
        }));
        toast.success("Location Pin Updated");
    };

    const handleImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            const files = Array.from(e.target.files);
            setFormData(prev => ({ ...prev, images: [...prev.images, ...files] }));
            const newPreviews = files.map(file => URL.createObjectURL(file));
            setImagePreviews(prev => [...prev, ...newPreviews]);
        }
    };

    // --- PROGRESS LOGIC ---
    const progressData = useMemo(() => {
        const hasPricing = formData.listingType === 'SALE'
            ? formData.price.sale > 0
            : (formData.rentFrequency.includes('MONTHLY') ? formData.price.monthly > 0 : false) ||
            (formData.rentFrequency.includes('YEARLY') ? formData.price.yearly > 0 : false);

        const checks = {
            details: !!formData.title && formData.propertyType.length > 0,
            pricing: hasPricing,
            location: !!formData.location.address,
            specs: formData.specs.sqft > 0,
            media: formData.images.length > 0,
        };

        const totalSteps = Object.keys(checks).length;
        const completedSteps = Object.values(checks).filter(Boolean).length;
        const percentage = Math.round((completedSteps / totalSteps) * 100);

        return { checks, percentage };
    }, [formData]);

    // --- SUBMIT ---
    const handleSubmit = async () => {
        if (!progressData.checks.details || !progressData.checks.pricing || !progressData.checks.location) {
            toast.error("Please complete all required sections");
            return;
        }
        setIsSubmitting(true);
        const toastId = toast.loading("Submitting Property...");

        try {
            // Mock upload logic
            const mockUrls = ["https://images.unsplash.com/photo-1512918760383-5658fa5180ea"];
            const payload = { ...formData, images: mockUrls };

            const res = await fetch('/api/properties', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) throw new Error("Submission failed");

            toast.success("Property Published!", { id: toastId });
            router.push('/dashboard');

        } catch (error) {
            toast.error("Error creating property", { id: toastId });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] pb-20 font-sans text-slate-800">
            {/* Header */}
            <header className="px-6 py-5 flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Add Property</h1>
                    <p className="text-sm text-gray-500">Create a new listing</p>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* === LEFT COLUMN (Sticky Sidebar) === */}
                <div className="lg:col-span-2 space-y-8">

                    {/* SECTION 1: Type & Basics */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Listing Basics</h2>

                        <div className="space-y-6">
                            {/* Listing Mode Switcher */}
                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-2 uppercase tracking-wide">I want to</label>
                                <div className="flex gap-4">
                                    {(['RENT', 'SALE'] as ListingMode[]).map(mode => (
                                        <label key={mode} className={`
                                            flex-1 border-2 rounded-xl p-4 cursor-pointer transition-all flex flex-col items-center justify-center gap-2
                                            ${formData.listingType === mode ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 hover:border-gray-300'}
                                        `}>
                                            <input type="radio" name="mode" className="hidden" checked={formData.listingType === mode} onChange={() => updateField('listingType', mode)} />
                                            <span className="font-bold">{mode === 'RENT' ? 'Rent out Property' : 'Sell Property'}</span>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            <InputField
                                label="Property Title"
                                placeholder="e.g. Modern Apartment in Downtown Dubai"
                                value={formData.title}
                                onChange={(e) => updateField('title', e.target.value)}
                            />

                            <div className="grid grid-cols-2 gap-6">
                                <SelectField
                                    label="Property Type"
                                    value={formData.propertyType}
                                    onChange={(e) => updateField('propertyType', e.target.value)}
                                    options={["Apartment", "Villa", "Townhouse", "Penthouse", "Office"]}
                                />
                                <InputField
                                    label="Currency"
                                    value={formData.currency}
                                    disabled
                                    className="bg-gray-50 text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Describe your property (key features, nearby attractions, etc)..."
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all resize-y"
                                    value={formData.description}
                                    onChange={(e) => updateField('description', e.target.value)}
                                />
                            </div>
                        </div>
                    </section>

                    {/* SECTION 2: Dynamic Pricing */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Pricing Configuration</h2>

                        {formData.listingType === 'SALE' ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <CurrencyInput
                                    label="Selling Price"
                                    value={formData.price.sale}
                                    onChange={(e) => updateNested('price', 'sale', parseFloat(e.target.value))}
                                />
                                <CurrencyInput
                                    label="Maintenance Fee (Yearly)"
                                    value={formData.price.securityDeposit}
                                    onChange={(e) => updateNested('price', 'securityDeposit', parseFloat(e.target.value))}
                                />
                            </div>
                        ) : (
                            <div className="space-y-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 mb-2 uppercase">Rent Frequency</label>
                                    <div className="flex gap-3">
                                        {(['MONTHLY', 'YEARLY'] as RentFreq[]).map(freq => (
                                            <button
                                                key={freq}
                                                type="button"
                                                onClick={() => toggleRentFreq(freq)}
                                                className={`px-4 py-2 rounded-lg text-sm font-medium border transition-colors ${
                                                    formData.rentFrequency.includes(freq) ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-600 border-gray-300'
                                                }`}
                                            >
                                                {freq}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {formData.rentFrequency.includes('MONTHLY') && (
                                        <CurrencyInput label="Monthly Rent" value={formData.price.monthly} onChange={(e) => updateNested('price', 'monthly', parseFloat(e.target.value))} />
                                    )}
                                    {formData.rentFrequency.includes('YEARLY') && (
                                        <CurrencyInput label="Yearly Rent" value={formData.price.yearly} onChange={(e) => updateNested('price', 'yearly', parseFloat(e.target.value))} />
                                    )}
                                    <CurrencyInput label="Security Deposit" value={formData.price.securityDeposit} onChange={(e) => updateNested('price', 'securityDeposit', parseFloat(e.target.value))} />
                                </div>
                            </div>
                        )}
                    </section>

                    {/* SECTION 3: Location Search */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Location</h2>

                        <div className="relative mb-6">
                            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">Search Location</label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={handleSearchInput}
                                    placeholder="Start typing (e.g. Marina Dubai)"
                                    className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
                                />
                                <Search className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                                {isSearching && <Loader2 className="absolute right-3 top-3 text-blue-500 w-5 h-5 animate-spin" />}
                            </div>

                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-50 w-full bg-white border border-gray-200 rounded-lg mt-1 shadow-xl max-h-60 overflow-y-auto">
                                    {suggestions.map((place) => (
                                        <li
                                            key={place.place_id}
                                            onClick={() => selectLocation(place)}
                                            className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-sm text-gray-700 border-b border-gray-50 last:border-0"
                                        >
                                            {place.display_name}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                        <InputField label="Confirm Full Address" value={formData.location.address} onChange={(e) => updateNested('location', 'address', e.target.value)} />

                        <div className="w-full h-80 rounded-xl overflow-hidden border border-gray-200 relative mt-4">
                            <MapPicker
                                lat={formData.location.lat}
                                lng={formData.location.lng}
                                onLocationSelect={handleMapSelect}
                            />
                        </div>
                    </section>

                    {/* SECTION 4: Specs & Amenities (Grouped) */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Features & Amenities</h2>

                        <div className="grid grid-cols-3 gap-4 mb-8">
                            <NumberInput label="Bedrooms" value={formData.specs.beds} onChange={(e) => updateNested('specs', 'beds', parseInt(e.target.value))} />
                            <NumberInput label="Bathrooms" value={formData.specs.baths} onChange={(e) => updateNested('specs', 'baths', parseInt(e.target.value))} />
                            <NumberInput label="Area (Sq.ft)" value={formData.specs.sqft} onChange={(e) => updateNested('specs', 'sqft', parseInt(e.target.value))} />
                        </div>

                        <div className="space-y-6">
                            {AMENITY_GROUPS.map((category) => (
                                <div key={category.group}>
                                    <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wide mb-3">
                                        {category.group}
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                                        {category.items.map((item) => {
                                            const isSelected = formData.amenities.includes(item.key);
                                            return (
                                                <button
                                                    key={item.key}
                                                    type="button"
                                                    onClick={() => toggleAmenity(item.key)}
                                                    className={`
                                                        flex items-center gap-3 p-3 rounded-lg border text-left transition-all duration-200
                                                        ${isSelected
                                                        ? 'border-blue-500 bg-blue-50 text-blue-700 shadow-sm'
                                                        : 'border-gray-200 hover:border-gray-300 text-gray-600 bg-white'
                                                    }
                                                    `}
                                                >
                                                    <span className={`text-lg ${isSelected ? 'text-blue-600' : 'text-gray-400'}`}>
                                                        {item.icon}
                                                    </span>
                                                    <span className="text-sm font-medium">{item.label}</span>
                                                    {isSelected && <Check className="ml-auto w-4 h-4 text-blue-500" />}
                                                </button>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* SECTION 5: Media */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 md:p-8">
                        <h2 className="text-lg font-bold text-gray-900 mb-6">Media</h2>

                        <label className="border-2 border-dashed border-gray-300 rounded-xl p-8 flex flex-col items-center justify-center text-center hover:bg-gray-50 transition-colors cursor-pointer">
                            <input type="file" multiple accept="image/*" className="hidden" onChange={handleImageUpload} />
                            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-3">
                                <UploadCloud className="w-6 h-6" />
                            </div>
                            <p className="text-sm font-medium text-gray-900">Click to upload photos</p>
                            <p className="text-xs text-gray-500 mt-1">SVG, PNG, JPG or GIF (max. 10MB)</p>
                        </label>

                        {imagePreviews.length > 0 && (
                            <div className="grid grid-cols-4 md:grid-cols-6 gap-3 mt-6">
                                {imagePreviews.map((src, idx) => (
                                    <div key={idx} className="relative aspect-square rounded-lg overflow-hidden border border-gray-200 group">
                                        <Image src={src} alt="Preview" fill className="object-cover" />
                                        <button
                                            type="button"
                                            onClick={() => {
                                                const newPreviews = imagePreviews.filter((_, i) => i !== idx);
                                                const newFiles = formData.images.filter((_, i) => i !== idx);
                                                setImagePreviews(newPreviews);
                                                updateField('images', newFiles);
                                            }}
                                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-0.5 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </section>

                    {/* BOTTOM ACTION BUTTONS */}
                    <div className="flex justify-end gap-4 pt-6 mt-8">
                        <button
                            type="button"
                            onClick={() => router.back()}
                            className="px-6 py-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={isSubmitting}
                            className="flex items-center gap-2 px-8 py-3 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700 disabled:opacity-70 transition-all shadow-lg shadow-blue-200 active:scale-95"
                        >
                            {isSubmitting && <Loader2 className="w-4 h-4 animate-spin" />}
                            {isSubmitting ? "Publishing..." : "Submit Listing"}
                        </button>
                    </div>

                </div>

                {/* === RIGHT COLUMN (Form Inputs) === */}
                <div className="lg:col-span-1 h-fit sticky top-24 space-y-6">

                    {/* Progress Tracker */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="font-bold text-gray-900">Progress</h3>
                            <span className="text-xs font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded-full">
                                {progressData.percentage}%
                            </span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-2 mb-4">
                            <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${progressData.percentage}%` }}
                            />
                        </div>
                        <div className="space-y-3">
                            <ProgressItem label="Basic Details" completed={progressData.checks.details} />
                            <ProgressItem label="Pricing Configuration" completed={progressData.checks.pricing} />
                            <ProgressItem label="Location & Map" completed={progressData.checks.location} />
                            <ProgressItem label="Specs & Amenities" completed={progressData.checks.specs} />
                            <ProgressItem label="Photos Uploaded" completed={progressData.checks.media} />
                        </div>
                    </section>

                    {/* Live Preview Summary */}
                    <section className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
                        <h3 className="font-bold text-gray-900 mb-4 text-sm uppercase tracking-wide">Live Preview</h3>
                        <div className="group cursor-pointer">
                            <div className="relative h-48 w-full rounded-lg overflow-hidden mb-3 bg-gray-100 border border-gray-200">
                                {imagePreviews.length > 0 ? (
                                    <Image src={imagePreviews[0]} alt="Cover" fill className="object-cover transition-transform group-hover:scale-105" />
                                ) : (
                                    <div className="flex flex-col items-center justify-center h-full text-gray-400">
                                        <ImageIcon className="w-8 h-8 mb-2 opacity-50"/>
                                        <span className="text-xs">No Cover Image</span>
                                    </div>
                                )}
                                <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-gray-800 shadow-sm uppercase">
                                    {formData.listingType}
                                </div>
                            </div>

                            <h4 className="font-bold text-gray-900 text-base mb-1 line-clamp-1">
                                {formData.title || "Untitled Property"}
                            </h4>
                            <p className="text-xs text-gray-500 mb-3 line-clamp-2 flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {formData.location.address || "No address selected"}
                            </p>

                            <div className="flex justify-between items-end border-t border-gray-100 pt-3">
                                <div>
                                    <p className="text-xs text-gray-400">Price</p>
                                    <p className="text-lg font-bold text-blue-600">
                                        {formData.currency} {
                                        formData.listingType === 'SALE'
                                            ? formData.price.sale.toLocaleString()
                                            : (formData.rentFrequency.includes('MONTHLY')
                                                ? formData.price.monthly.toLocaleString() + ' /mo'
                                                : formData.price.yearly.toLocaleString() + ' /yr')
                                    }
                                    </p>
                                </div>
                                <div className="text-right text-xs text-gray-500">
                                    {formData.specs.beds} Beds • {formData.specs.sqft} sqft
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </div>
        </div>
    );
}

// --- HELPER COMPONENTS (Unchanged) ---

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
}

function InputField({ label, className, ...props }: InputProps) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">{label}</label>
            <input
                {...props}
                className={`w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none transition-all ${className}`}
            />
        </div>
    );
}

function NumberInput({ label, value, onChange }: { label: string, value: number, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">{label}</label>
            <input
                type="number"
                min="0"
                value={value || ''}
                onChange={onChange}
                className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none"
            />
        </div>
    );
}

function CurrencyInput({ label, value, onChange }: { label: string, value: number, onChange: (e: ChangeEvent<HTMLInputElement>) => void }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">{label}</label>
            <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                <input
                    type="number"
                    min="0"
                    value={value || ''}
                    onChange={onChange}
                    className="w-full pl-8 pr-4 py-3 rounded-lg border border-gray-200 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none font-medium"
                />
            </div>
        </div>
    );
}

function SelectField({ label, options, value, onChange }: { label: string, options: string[], value: string, onChange: (e: ChangeEvent<HTMLSelectElement>) => void }) {
    return (
        <div>
            <label className="block text-xs font-bold text-gray-500 mb-1.5 uppercase">{label}</label>
            <div className="relative">
                <select
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 outline-none appearance-none"
                >
                    {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">▼</div>
            </div>
        </div>
    );
}

function ProgressItem({ label, completed }: { label: string, completed: boolean }) {
    return (
        <div className="flex items-center justify-between group p-2 rounded hover:bg-gray-50 transition-colors">
            <span className={`text-sm font-medium ${completed ? 'text-gray-900' : 'text-gray-400'}`}>{label}</span>
            <div className={`w-5 h-5 rounded-full flex items-center justify-center transition-all ${completed ? 'bg-green-500 text-white shadow-sm' : 'border-2 border-gray-200'}`}>
                {completed && <Check className="w-3 h-3" />}
            </div>
        </div>
    );
}