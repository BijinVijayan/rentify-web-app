import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Property from "@/database/models/Property";
import Host from "@/database/models/Host";
// import Review from "@/database/models/Review"; // Uncomment when you have a Review model

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        // Await params in Next.js 15
        const { id } = await params;

        // 1. Fetch Property and Populate Host
        // We use .lean() for performance since we don't need Mongoose document methods
        const property = await Property.findById(id)
            .populate("hostId", "fullName avatarUrl createdAt")
            .lean();

        if (!property) {
            return NextResponse.json(
                { error: "Property not found" },
                { status: 404 }
            );
        }

        // 2. Fetch Reviews (Placeholder logic)
        // If you have a Review model, you would do:
        // const reviews = await Review.find({ propertyId: id }).sort({ createdAt: -1 }).lean();
        const reviews: any[] = [];

        // 3. Map DB Data to UI Interface (PropertyDetailsType)
        const mappedProperty = {
            id: property._id.toString(),
            title: property.title,
            description: property.description || "",
            // Location
            city: property.location.city,
            country: property.location.country || "",
            address: property.location.address,
            location: {
                lat: property.location.lat,
                lng: property.location.lng,
                address: property.location.address,
                city: property.location.city,
                country: property.location.country
            },

            price: {
                sale: property.price.sale,
                monthly: property.price.monthly,
                yearly: property.price.yearly,
                maintenanceFee: property.price.maintenanceFee || 0,
                securityDeposit: property.price.securityDeposit,
            },

            rentFrequency: property.rentFrequency,

            // Specs
            beds: property.beds,
            baths: property.baths,
            sqft: property.sqft,

            // Media
            images: property.images || [],
            thumbnailUrls: property.images || [], // Use same images for now

            // Host Mapping
            host: {
                id: (property.hostId as any)._id.toString(),
                fullName: (property.hostId as any).fullName,
                avatarUrl: (property.hostId as any).avatarUrl,
                memberSince: (property.hostId as any).createdAt || new Date().toISOString()
            },

            // Amenities (Pass through or map if structure differs)
            amenities: property.amenities || [],

            // Ratings & Reviews
            rating: 5.0, // Calculate this from reviews array if available
            reviewCount: reviews.length,
            reviews: reviews
        };

        return NextResponse.json(mappedProperty);

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
}