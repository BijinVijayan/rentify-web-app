import React from 'react'
import {ApiProperty} from "@/types/property";
import { notFound } from "next/navigation";
import PropertyDetails from "@/components/PropertyDetails";

// Helper function to fetch data
async function getPropertyDetails(id: string): Promise<ApiProperty | null> {
    const baseUrl = process.env.NEXT_PUBLIC_URL || 'http://localhost:3000';
    try {
        const res = await fetch(`${baseUrl}/api/properties/${id}`, {
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (error) {
        console.error("Fetch error:", error);
        return null;
    }
}

const Property = async ({ params }: { params: Promise<{ id: string }> }) => {
    const { id } = await params;
    const property = await getPropertyDetails(id);
    console.log("property fetched....",property);
    if (!property) {
        return notFound();
    }

    return (
        <div className="bg-slate-50 min-h-screen">
            <PropertyDetails property={property} />
        </div>
    )
}

export default Property