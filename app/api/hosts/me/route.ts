// app/api/hosts/me/route.ts
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/mongodb";
import Host from "@/database/models/Host";

export async function GET() {
    try {
        await connectDB();
        const session = await getServerSession(authOptions);

        if (!session?.user?.email) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const host = await Host.findOne({ email: session.user.email });

        if (!host) {
            return NextResponse.json({ error: "Host not found" }, { status: 404 });
        }

        return NextResponse.json(host, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Server Error" }, { status: 500 });
    }
}