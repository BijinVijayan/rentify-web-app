import { NextResponse } from "next/server";
import Host from "@/database/models/Host"; // Assuming this is your Mongoose model
import connectDB from "@/lib/mongodb";

export async function POST(request: Request) {
    try {
        await connectDB();
        const body = await request.json();

        // console.log("Received Host Profile Payload:");
        // console.log(JSON.stringify(body, null, 2));

        const { fullName, location, phone, email, description, avatarUrl } = body;

        if (!fullName || !email) {
            // console.error("Validation Failed: Full name or email is missing.");
            return NextResponse.json(
                { error: "Full name and email are required" },
                { status: 400 }
            );
        }

        // --- 4. Check for Existing Host ---
        const existing = await Host.findOne({ email });
        if (existing) {
            // console.error(` Host Exists: A host with email ${email} already exists.`);
            return NextResponse.json(
                { error: "A host with this email already exists" },
                { status: 400 }
            );
        }
        // --- 5. Create New Host ---
        const host = await Host.create({
            fullName,
            location,
            phone,
            email,
            description,
            avatarUrl,
        });

        // console.log(` Host Created: Successfully created host profile for ${host.fullName}.`);
        // console.log(`Host ID: ${host._id}`);

        return NextResponse.json({ host }, { status: 201 });

    } catch (error) {
        // --- 6. Error Handling ---
        // console.error("Internal Server Error during POST request:", error);
        return NextResponse.json(
            { error: "Internal Server Error", details: error instanceof Error ? error.message : "An unknown error occurred" },
            { status: 500 }
        );
    }
}