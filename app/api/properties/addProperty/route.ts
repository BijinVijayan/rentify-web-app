import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Host from "@/database/models/Host";
import Property from "@/database/models/Property";

export async function POST(request: Request) {
    try {
        await connectDB();

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const host = await Host.findOne({ email: session.user.email });

        if (!host) {
            return NextResponse.json({ error: "Host profile not found." }, { status: 403 });
        }

        const body = await request.json();

        // Separate specs to flatten them, everything else (price, location, amenities, images) matches schema
        const { specs, ...rest } = body;

        const newProperty = await Property.create({
            ...rest,
            beds: specs.beds,
            baths: specs.baths,
            sqft: specs.sqft,
            hostId: host._id,
            status: "Pending",
        });

        return NextResponse.json(
            { message: "Property created successfully", propertyId: newProperty._id },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error creating property:", error);
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}