import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Property from "@/database/models/Property";
import Host from "@/database/models/Host";

// --- GET: List Properties (Host Mode OR Public Mode) ---
export async function GET(request: Request) {
    try {
        await connectDB();
        const { searchParams } = new URL(request.url);

        // 1. Extract Params
        const page = parseInt(searchParams.get("page") || "1");
        const limit = parseInt(searchParams.get("limit") || "10");
        const search = searchParams.get("search") || "";
        const filter = searchParams.get("filter") || "All";
        const mode = searchParams.get("mode"); // 'public' or null (default host)

        let query: any = {};

        // --- BRANCHING LOGIC ---

        if (mode === "public") {
            // === PUBLIC MODE ===
            // No Auth required.
            // STRICT RULE: Only show "Published" (or Active) properties
            // query.status = "Published";

            // Note: Public users shouldn't see 'Drafts' or 'Pending'
        } else {
            // === HOST MODE (Default) ===
            // 1. Auth Check (Strict)
            const session = await getServerSession(authOptions);
            if (!session?.user?.email) {
                return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
            }

            const host = await Host.findOne({ email: session.user.email });
            if (!host) {
                return NextResponse.json({ error: "Host profile not found" }, { status: 403 });
            }

            // 2. Filter by Host ID
            query.hostId = host._id;

            // 3. Status Filters (Only allow Hosts to filter by status)
            if (filter === "For Rent") query.listingType = "RENT";
            if (filter === "For Sale") query.listingType = "SALE";
            if (filter === "Paused") query.status = "Pending";
            if (filter === "Drafts") query.status = "Draft";
        }

        // --- SHARED SEARCH LOGIC (Applies to both) ---
        if (search) {
            query.$or = [
                { title: { $regex: search, $options: "i" } },
                { "location.address": { $regex: search, $options: "i" } },
                { "location.city": { $regex: search, $options: "i" } }
            ];
        }

        // --- EXECUTE QUERY ---
        const skip = (page - 1) * limit;

        const properties = await Property.find(query)
            .populate("hostId", "fullName avatarUrl") // Optional: Populate host details for public cards
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .lean();

        const total = await Property.countDocuments(query);

        return NextResponse.json({
            properties,
            pagination: {
                total,
                page,
                pages: Math.ceil(total / limit)
            }
        });

    } catch (error) {
        console.error("API Error:", error);
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}

// ... (DELETE function remains the same, strictly for Hosts)
export async function DELETE(request: Request) {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);
        if (!session?.user?.email) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const body = await request.json();
        const { ids } = body;

        if (!ids || !Array.isArray(ids) || ids.length === 0) {
            return NextResponse.json({ error: "No IDs provided" }, { status: 400 });
        }

        const host = await Host.findOne({ email: session.user.email });

        // Security: Ensure we only delete properties owned by this host
        const result = await Property.deleteMany({
            _id: { $in: ids },
            hostId: host._id
        });

        return NextResponse.json({ message: "Deleted successfully", count: result.deletedCount });

    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}