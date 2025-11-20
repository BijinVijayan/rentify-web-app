import React from "react";

export type Currency = 'USD' | 'AED' | 'INR' | 'EUR' | 'GBP' | 'JPY' | 'CAD';

export type Amenity = {
    name: string;
    icon: React.ReactNode;
};

export type AmenityGroupName =
    | "Building"
    | "Health and Fitness"
    | "Security"
    | "Technologies";

export type AmenityGroup = {
    group: AmenityGroupName;
    amenities: Amenity[];
};

export type Host = {
    id: string;
    name: string;
    avatarUrl: string;
    memberSince: string;
};

export type LocationMapProps = {
    location: LocationType;
};

export type LocationType = {
    lat: number,
    lng: number,
    formattedAddress: string,
    location?: LocationType
};

export type Review = {
    reviewer: string;
    avatarUrl: string;
    createdAt: string;
    rating: number;
    comment: string;
};

export type ReviewsSectionProps = {
    rating: number;
    reviewCount: number;
    reviews: Review[];
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
    location: LocationType;
    rating: number;
    reviewCount: number;
    reviews: Review[];
};

export type PropertyCardType = {
    id: string;
    city: string;
    state?: string;
    country?: string;
    title: string;
    pricePerMonth: number;
    currency: Currency;
    beds: number;
    baths: number;
    sqft: number;
    rating?: number;
    reviewCount?: number;
    imageUrl: string;
};

export type PropertyCardProps = {
    property: PropertyCardType;
    onClickAction?: (id: string) => void;
    className?: string;
};

