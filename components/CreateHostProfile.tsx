"use client"
import React, { useState, ChangeEvent, DragEvent } from 'react';
import { BsPerson, BsCloudUpload, BsList, BsX } from 'react-icons/bs';
import Image from "next/image";
import toast from "react-hot-toast"; // Assumed installed and configured globally
import { useRouter } from 'next/navigation'; // <-- Import useRouter

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
    phone?: string;
    location?: string;
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

const PHONE_PREFIX = '+971';

const PhoneInputField: React.FC<InputFieldProps> = ({
                                                        label,
                                                        placeholder = "",
                                                        value,
                                                        onChange,
                                                        error = null,
                                                        name
                                                    }) => (
    <div className="flex flex-col gap-1.5">
        <label className="text-sm font-medium text-gray-700">{label}</label>
        <div className="flex rounded-lg border-gray-200 border focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 transition-all overflow-hidden bg-white">
            <span className="flex items-center justify-center px-4 py-3 text-sm text-gray-500 bg-gray-50 border-r border-gray-200">
                {PHONE_PREFIX}
            </span>
            <input
                type="tel"
                name={name}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`w-full px-4 py-3 text-sm outline-none transition-all flex-1 ${
                    error
                        ? 'text-red-600 placeholder:text-red-300'
                        : 'text-gray-900'
                }`}
            />
        </div>
        {error && (
            <span className="text-xs text-red-500">{error}</span>
        )}
    </div>
);


// --- Main Page Component ---

export default function CreateHostProfile() {
    // Initialize the router
    const router = useRouter();

    const [dragActive, setDragActive] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [uploadedFile, setUploadedFile] = useState<File | null>(null);
    const [avatarPreviewUrl, setAvatarPreviewUrl] = useState<string>('/images/no-profile.png'); // Default placeholder
    const fileInputRef = React.useRef<HTMLInputElement>(null);

    const [formData, setFormData] = useState<FormData>({
        fullName: '',
        location: '',
        phone: '',
        email: '',
        description: ''
    });
    const [errors, setErrors] = useState<FormErrors>({});
    const [isSubmitting, setIsSubmitting] = useState(false);


    // Handle Input Changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        if (errors[name as keyof FormErrors]) {
            setErrors(prev => ({ ...prev, [name]: undefined }));
        }
    };

    // Helper function to process file
    const processFile = (file: File | null) => {
        if (file && file.size <= 5 * 1024 * 1024) { // Check size (5MB limit used here)
            setUploadedFile(file);
            // Use URL.createObjectURL for client-side preview
            setAvatarPreviewUrl(URL.createObjectURL(file));
            return true;
        } else if (file) {
            alert("File is too large. Max size is 5MB.");
            return false;
        }
        return false;
    };

    // Handle File Input Selection
    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };

    // Drag and Drop Handlers
    const handleDrag = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e: DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    // Trigger file input click
    const onUploadClick = () => {
        fileInputRef.current?.click();
    };

    const validate = () => {
        const newErrors: FormErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Basic phone regex for 6 to 14 digits, allowing spaces/hyphens (for front-end validation of input field content)
        const phoneRegex = /^(?:[0-9] ?){6,14}[0-9]$/;


        if (!formData.fullName) newErrors.fullName = "Full name is required.";
        if (!formData.email || !emailRegex.test(formData.email)) {
            newErrors.email = "Please enter a valid email address.";
        }
        if (!formData.location) {
            newErrors.location = "Location is required.";
        } else if (formData.location.length < 5) {
            newErrors.location = "Location should be at least 5 characters long.";
        }

        if (!formData.phone) {
            newErrors.phone = "Phone number is required.";
        } else if (!phoneRegex.test(formData.phone)) {
            newErrors.phone = "Enter a valid phone number (6-14 digits).";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => { // Changed type to HTMLButtonElement
        e.preventDefault();

        if (!validate() || isSubmitting) {
            if (Object.keys(errors).length > 0) {
                toast.error("Please fill in all required fields correctly.");
            }
            return;
        }

        setIsSubmitting(true);

        try {
            let avatarUrl = '';

            // 1. Upload Image (If a file exists)
            if (uploadedFile) {
                const fileData = new FormData();
                fileData.append('file', uploadedFile);

                const uploadRes = await fetch('/api/upload', {
                    method: 'POST',
                    body: fileData,
                });

                if (!uploadRes.ok) {
                    const errorData = await uploadRes.json();
                    throw new Error(errorData.error || "Image upload failed.");
                }

                const uploadData = await uploadRes.json();
                avatarUrl = uploadData.url;
            }

            // 2. Save Host Profile
            // Prepend the prefix before sending to API
            const finalPhone = PHONE_PREFIX + formData.phone;

            const profileData = {
                ...formData,
                phone: finalPhone,
                avatarUrl: avatarUrl,
            };

            const response = await fetch('/api/hosts', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(profileData),
            });

            if (response.ok) {
                toast.success("Host Profile Saved Successfully!");
                // Redirect to signin page after success
                router.replace('/signin');

            } else {
                const errorData = await response.json();
                toast.error(errorData.error || 'Failed to save profile. Please try again.');
            }

        } catch (error) {
            console.error("Submission error:", error);
            // Show a generic error toast for unexpected errors
            toast.error(`An unexpected error occurred.`);
        } finally {
            setIsSubmitting(false);
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
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden p-6 md:p-10">
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
                                        {/* Use Image component for optimization */}
                                        <Image
                                            src={avatarPreviewUrl}
                                            alt="Host Preview" width={1000} height={1000}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    {/* Optional: Clear Image button */}
                                    {uploadedFile && (
                                        <button
                                            onClick={() => {
                                                setUploadedFile(null);
                                                // Reset to initial placeholder path
                                                setAvatarPreviewUrl('/images/no-profile.png');
                                                if (fileInputRef.current) fileInputRef.current.value = "";
                                            }}
                                            className="mt-2 text-xs text-red-500 hover:text-red-700 block w-full text-center"
                                        >
                                            Remove Image
                                        </button>
                                    )}
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
                                    <input
                                        type="file"
                                        ref={fileInputRef}
                                        onChange={handleFileChange}
                                        accept="image/png, image/jpeg, image/gif"
                                        className="hidden" // Hide the default input
                                    />
                                    <div className="w-10 h-10 mb-3 text-gray-400">
                                        <BsCloudUpload size={40} />
                                    </div>
                                    <p className="text-sm text-blue-500 font-medium mb-1">
                                        <span className="cursor-pointer hover:underline" onClick={onUploadClick}>
                                            Upload a file
                                        </span>
                                        <span className="text-gray-500 font-normal"> or drag and drop</span>
                                    </p>
                                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 5MB</p>
                                    {uploadedFile && (
                                        <p className="text-xs text-green-500 mt-1 font-medium">
                                            File selected: **{uploadedFile.name}**
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>

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
                                placeholder="e.g. Dubai, UAE"
                                value={formData.location}
                                onChange={handleChange}
                                error={errors.location || null}
                            />

                            <PhoneInputField
                                label="Phone Number (Dubai Mobile)"
                                name="phone"
                                placeholder="50 123 4567"
                                value={formData.phone}
                                onChange={handleChange}
                                error={errors.phone || null}
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

                    {/* Footer Actions - Changed Link to Button */}
                    <div className="mt-8 flex justify-end">
                        <button
                            type="submit"
                            onClick={handleSubmit}
                            disabled={isSubmitting} // Disable button while submitting
                            className={`w-full md:w-auto text-white font-medium px-8 py-3 rounded-lg transition-all ${
                                isSubmitting
                                    ? 'bg-blue-300 cursor-not-allowed'
                                    : 'bg-blue-500 hover:bg-blue-600 shadow-blue-200 active:scale-95'
                            }`}
                        >
                            {isSubmitting ? 'Saving...' : 'Save Host Profile'}
                        </button>
                    </div>

                </div>
            </main>
        </div>
    );
}