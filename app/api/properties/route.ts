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
            return NextResponse.json(
                { error: "Host profile not found." },
                { status: 403 }
            );
        }

        const body = await request.json();

        // --- FIX START: Destructure and Flatten Data ---
        // We separate 'specs' from the rest of the body
        const { specs, ...rest } = body;

        const newProperty = await Property.create({
            ...rest, // Spread title, description, price, etc.

            // Explicitly map the nested specs to the root schema fields
            beds: specs.beds,
            baths: specs.baths,
            sqft: specs.sqft,

            hostId: host._id,
            status: "Pending",
        });
        // --- FIX END ---

        return NextResponse.json(
            { message: "Property created successfully", propertyId: newProperty._id },
            { status: 201 }
        );

    } catch (error: any) {
        console.error("Error creating property:", error);
        // Return the specific mongoose validation error message if available
        return NextResponse.json(
            { error: error.message || "Internal Server Error" },
            { status: 500 }
        );
    }
}