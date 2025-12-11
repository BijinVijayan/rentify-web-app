import React from "react";

// --- UI / COMPONENT TYPES ---

export type Currency = 'USD' | 'AED' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export type Amenity = {
    name: string;
    icon: string | React.ReactNode;
};

export type AmenityGroupName =
    | "Building"
    | "Health and Fitness"
    | "Security"
    | "Technology" // Fixed typo from 'Technologies' to match common singular usage if needed
    | "Community"
    | string;      // Allow dynamic groups from DB

export type AmenityGroup = {
    group: AmenityGroupName;
    amenities: Amenity[];
};

export type Host = {
    id: string;
    name: string;
    avatarUrl: string;
    memberSince?: string;
};

export type LocationType = {
    lat: number;
    lng: number;
    formattedAddress: string;
    city?: string;
    country?: string;
};

export type LocationMapProps = {
    location: ApiLocation;
};

export type Review = {
    reviewer: string;
    avatarUrl: string;
    createdAt: string;
    rating: number;
    comment: string;
};

export type ReviewsSectionProps = {
    rating?: number;
    reviewCount?: number;
    reviews?: Review[];
};

export type PropertyDetailsType = {
    id: string;
    title: string;
    city: string;
    state?: string;
    country?: string;
    address: string;
    pricePerMonth: number;
    currency: Currency;
    forRent: boolean;
    securityDeposit?: number;
    maintenance?: number;
    beds: number;
    baths: number;
    sqft: number;
    images: string[];
    thumbnailUrls?: string[];
    host: Host;
    description: string;
    amenities: AmenityGroup[];
    location: ApiLocation;

    // Modified to be optional
    rating?: number;
    reviewCount?: number;
    reviews?: Review[];
};

export type PropertyCardType = {
    id: string;
    city: string;
    state?: string;
    country?: string;
    title: string;
    pricePerMonth: number;
    pricePerYear: number;
    salePrice: number;
    listingType: "RENT" | "SALE";
    currency: Currency;
    beds: number;
    baths: number;
    sqft: number;
    imageUrl: string;
    frequency?: string[];

    // Modified to be optional
    rating?: number;
    reviewCount?: number;
};

export type PropertyCardProps = {
    property: PropertyCardType;
    onClickAction?: (id: string) => void;
    className?: string;
};
// --- API RESPONSE TYPES (DB SCHEMA) ---
// Use these when fetching data in your API routes or Server Components

export interface ApiAmenityItem {
    _id: string;
    key: string;
    label: string;
    icon: string;
}

export interface ApiAmenityGroup {
    _id: string;
    group: string;
    items: ApiAmenityItem[];
}

export interface ApiHostDetails {
    _id: string;
    fullName: string;
    avatarUrl: string;
    memberSince: string;
}

export interface ApiLocation {
    address: string;
    city: string;
    country: string;
    lat: number;
    lng: number;
}

export interface ApiPrice {
    sale?: number;
    monthly?: number;
    yearly?: number;
    maintenanceFee?: number;
    securityDeposit?: number;
}

export interface ApiProperty {
    _id: string;
    title: string;
    description: string;
    listingType: "RENT" | "SALE";
    propertyType: string;
    status: string;
    currency: string;
    // Nested Objects
    price: ApiPrice;
    location: ApiLocation;
    host: ApiHostDetails;
    // Stats
    beds: number;
    baths: number;
    sqft: number;
    // Arrays
    images: string[];
    amenities: ApiAmenityGroup[];
    rentFrequency?: string[];
    // Timestamps
    createdAt: string;
    updatedAt: string;
    // review
    rating?: number;
    reviewCount?: number;
    reviews?: Review[];
}