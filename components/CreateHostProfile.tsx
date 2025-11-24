
"use client"
import React, { useState, ChangeEvent } from 'react';
import { BsPerson, BsCloudUpload, BsList, BsX } from 'react-icons/bs';
import Image from "next/image";
import Link from "next/link";

type FormData = {
    fullName: string;
    location: string;
    phone: string;
    email: string;
    description: string;
};

type FormErrors = {
    fullName?: string;
    email?: string;
};


type SidebarItemProps = {
    icon: React.ElementType;
    label: string;
    active?: boolean;
    onClick?: () => void;
};

const SidebarItem: React.FC<SidebarItemProps> = ({
                                                     icon: Icon,
                                                     label,
                                                     active = false,
                                                     onClick = () => {},
                                                 }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-semibold rounded-lg transition-colors ${
            active
                ? 'bg-blue-50 text-blue-700'
                : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
        }`}
    >
        <Icon size={20} />
        {label}
    </button>
);

type InputFieldProps = {
    label: string;
    type?: string;
    placeholder?: string;
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error?: string | null;
    name: string;
};

const InputField: React.FC<InputFieldProps> = ({
                                                   label,
                                                   type = "text",
                                                   placeholder = "",
                                                   value,
                                                   onChange,
                                                   error = null,
                                                   name
                                               }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all ${
                error
                    ? 'border-red-400 focus:ring-2 focus:ring-red-100 text-red-600 placeholder:text-red-300'
                    : 'border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-900'
            }`}
        />
        {error && (
            <span className="text-xs text-red-500">{error}</span>
        )}
    </div>
);

// --- Main Page Component ---

export default function CreateHostProfile() {
    const [dragActive, setDragActive] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        location: '',
        phone: '',
        email: 'example@email',
        description: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});

    // Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Drag and Drop Handlers
    const handleDrag = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        console.log("Files dropped:", e.dataTransfer.files);
    };

    const validate = () => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formData.fullName) newErrors.fullName = "Full name is required.";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validate()) {
            alert("Profile Saved Successfully!");
        } else {
            console.log("Validation failed");
        }
    };

    return (
        <div className="min-h-screen bg-[#F8F9FB] flex flex-col md:flex-row font-sans text-slate-800">

            {/* --- Mobile Header --- */}
            <div className="md:hidden bg-white border-b border-gray-200 p-4 flex items-center justify-between sticky top-0 z-30">
                <div className="flex items-center gap-2">
                    <Image src={"/icons/renfity icon.png"} alt={"logo"} width={1000} height={1000} className={"w-7"} />
                    <span className="font-bold text-lg text-gray-900">
                        Rentify</span>
                </div>
                <button
                    onClick={() => setMobileMenuOpen(true)}
                    className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg"
                >
                    <BsList size={24} />
                </button>
            </div>

            {/* --- Overlay for Mobile Sidebar --- */}
            {mobileMenuOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-40 md:hidden"
                    onClick={() => setMobileMenuOpen(false)}
                />
            )}

            {/* --- Sidebar (Responsive) --- */}
            <aside
                className={`fixed md:sticky md:top-0 h-full w-64 bg-[#F8F9FB] z-50 transition-transform duration-300 ease-in-out border-r border-gray-200 md:border-none p-5 flex flex-col
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
        `}
            >
                {/* Mobile Close Button */}
                <div className="flex md:hidden justify-between items-center mb-8">
                    <div className="flex items-center gap-2">
                        <Image src={"/icons/renfity icon.png"} alt={"logo"} width={1000} height={1000} className={"w-7"} />
                        <span className="font-bold text-lg text-gray-900">
                        Rentify</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-2 hover:bg-gray-200 rounded-full">
                        <BsX size={24} />
                    </button>
                </div>

                {/* Logo (Desktop only) */}
                <div className="hidden md:flex items-center gap-3 mb-10 px-2 mt-4">
                    <Image src={"/icons/renfity icon.png"} alt={"logo"} width={1000} height={1000} className={"w-7"} />
                    <span className="font-bold text-xl tracking-tight text-gray-900">Rentify</span>
                </div>

                {/* Nav Items - ONLY Host Profile as requested */}
                <nav className="space-y-1 flex-1">
                    <SidebarItem icon={BsPerson} label="Host Profile" active onClick={() => setMobileMenuOpen(false)} />
                </nav>
            </aside>

            {/* --- Main Content --- */}
            <main className="flex-1 overflow-y-auto w-full">
                <div className="max-w-6xl mx-auto px-4 py-8 md:px-12 md:py-12">

                    {/* Page Header */}
                    <div className="mb-8 md:mb-10">
                        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                            Create Your Host Profile
                        </h1>
                        <p className="text-sm md:text-base text-gray-500">
                            Build a comprehensive profile to attract potential renters.
                        </p>
                    </div>

                    {/* Form Card */}
                    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-10">

                        {/* Section: Your Profile */}
                        <div className="flex items-center gap-3 mb-8">
                            <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-500">
                                <BsPerson size={20} />
                            </div>
                            <h2 className="text-lg md:text-xl font-bold text-gray-900">Your Profile</h2>
                        </div>

                        {/* Section: Image Upload */}
                        <div className="mb-10">
                            <label className="block text-sm font-medium text-gray-700 mb-4">Host Image</label>

                            <div className="flex flex-col md:flex-row gap-6 md:gap-8">
                                {/* Avatar Preview */}
                                <div className="flex-shrink-0 mx-auto md:mx-0">
                                    <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-50 shadow-inner">
                                        <img
                                            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=256&h=256"
                                            alt="Host Preview"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>

                                {/* Dropzone */}
                                <div
                                    className={`flex-1 w-full border-2 border-dashed rounded-xl flex flex-col items-center justify-center p-6 md:p-8 transition-colors text-center ${
                                        dragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                                    }`}
                                    onDragEnter={handleDrag}
                                    onDragLeave={handleDrag}
                                    onDragOver={handleDrag}
                                    onDrop={handleDrop}
                                >
                                    <div className="w-10 h-10 mb-3 text-gray-400">
                                        <BsCloudUpload size={40} />
                                    </div>
                                    <p className="text-sm text-blue-500 font-medium mb-1">
                                        <span className="cursor-pointer hover:underline">Upload a file</span>
                                        <span className="text-gray-500 font-normal"> or drag and drop</span>
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                                </div>
                            </div>
                        </div>

                        {/* Section: Form Fields */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">

                            <InputField
                                label="Full Name"
                                name="fullName"
                                placeholder="Enter your full name"
                                value={formData.fullName}
                                onChange={handleChange}
                                error={errors.fullName || null}
                            />

                            <InputField
                                label="Location"
                                name="location"
                                placeholder="e.g. San Francisco, CA"
                                value={formData.location}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Phone Number"
                                name="phone"
                                type="tel"
                                placeholder="Enter your phone number"
                                value={formData.phone}
                                onChange={handleChange}
                            />

                            <InputField
                                label="Email Address"
                                name="email"
                                type="email"
                                placeholder="john.doe@email"
                                value={formData.email}
                                onChange={handleChange}
                                error={errors.email || null}
                            />

                            {/* Textarea spans full width */}
                            <div className="col-span-1 md:col-span-2 flex flex-col gap-1.5">
                                <label className="text-sm font-medium text-gray-700">Host Description</label>
                                <textarea
                                    name="description"
                                    rows={4}
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 text-gray-900 resize-none placeholder:text-gray-400"
                                    placeholder="Tell us a little about yourself. What makes you a great host?"
                                    value={formData.description}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                    </div>

                    {/* Footer Actions */}
                    <div className="mt-8 flex justify-end">
                        <Link href={"/dashboard"}
                            onClick={handleSubmit}
                            className="w-full md:w-auto bg-blue-400 hover:bg-blue-500 text-white font-medium px-8 py-3 rounded-xl shadow-lg shadow-blue-200 transition-all active:scale-95"
                        >
                            Save Host Profile
                        </Link>
                    </div>

                </div>
            </main>
        </div>
    );
}
