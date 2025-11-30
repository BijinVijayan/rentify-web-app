// app/api/hosts/check/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import Host from "@/database/models/Host"; // IMPORTANT: Check this import path!
import connectDB from "@/lib/mongodb";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function GET() {
    try {
        console.log("1. API: /api/hosts/check called");

        await connectDB();

        // 1. Get the session
        const session = await getServerSession(authOptions);
        console.log("2. API: Session found?", !!session);

        if (!session || !session.user?.email) {
            console.log("3. API: No session or email found");
            return NextResponse.json({ isHost: false, error: "Unauthorized" }, { status: 401 });
        }

        console.log("3. API: Checking Host DB for email:", session.user.email);

        // 2. Check Host Collection
        // IMPORTANT: Ensure 'Host' model is importing from the file where you defined the Schema
        // If your model file is named 'User.ts' but exports 'Host', verify that.
        // Usually it should be: import Host from "@/database/models/Host";
        const host = await Host.findOne({ email: session.user.email });

        console.log("4. API: Host found in DB?", !!host);

        if (host) {
            return NextResponse.json({ isHost: true }, { status: 200 });
        } else {
            return NextResponse.json({ isHost: false }, { status: 200 });
        }

    } catch (error) {
        console.error("5. API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}