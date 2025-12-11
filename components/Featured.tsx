import React from 'react'
import {ApiProperty, Currency, PropertyCardType} from "@/types/property";
import { PropertyCard } from "@/components/index";

interface ApiResponse {
    properties: ApiProperty[];
    pagination: {
        total: number;
        page: number;
        pages: number;
    }
}

// 1. Data Fetching Function
// FIX: Return type must match the UI type, not the DB type
async function getProperties(): Promise<PropertyCardType[]> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';

    try {
        const res = await fetch(`${baseUrl}/api/properties?mode=public&limit=8`, {
            next: { revalidate: 60 }
        });

        if (!res.ok) {
            console.error("Failed to fetch properties:", res.statusText);
            return [];
        }

        const data: ApiResponse = await res.json();

        return data.properties.map((product: ApiProperty): PropertyCardType => ({
            id: product._id,
            title: product.title,
            city: product.location.city,
            country: product.location.country,
            pricePerMonth: product.price.monthly || 0,
            frequency: product.rentFrequency || [],
            pricePerYear: product.price.yearly || 0,
            listingType: product.listingType,
            salePrice: product.price.sale || 0,
            currency: product.currency as Currency,
            beds: product.beds,
            baths: product.baths,
            sqft: product.sqft,
            imageUrl: product.images?.[0],
            rating: product.rating,
            reviewCount: product.reviewCount,
        }));

    } catch (error) {
        console.error("Error loading properties:", error);
        return [];
    }
}

// 3. Async Component
const Featured = async () => {
    // Await the data directly
    const properties = await getProperties();
    // console.log("property api result",properties);
    // If API fails or returns empty, hide the section
    if (!properties || properties.length === 0) {
        return null;
    }

    return (
        <div className="mx-auto max-w-7xl p-0 sm:p-6 py-8 sm:py-12 md:py-16">
            <h1 className="hidden sm:block mb-10 text-2xl md:text-3xl font-extrabold text-primary-text text-center">
                Featured Properties
            </h1>
            <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch max-sm:bg-slate-100">
                {properties.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                ))}
            </div>
        </div>
    )
}

export default Featured