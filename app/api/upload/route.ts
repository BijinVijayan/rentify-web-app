// app/api/upload/route.ts - Conceptual, requires file processing logic
import { NextResponse } from "next/server";
import cloudinary from "@/lib/cloudinary"; // Assuming you created this utility
// You'd need a robust way to read the file stream/buffer from the request

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') as File;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        // Convert file to buffer or read its stream
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Convert buffer to Base64 data URI
        const dataURI = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(dataURI, {
            folder: "host_avatars", // Optional: organize your uploads
        });

        // Return the secure URL from Cloudinary
        return NextResponse.json({ url: result.secure_url }, { status: 200 });

    } catch (error) {
        console.error("Cloudinary upload failed:", error);
        return NextResponse.json({ error: "File upload failed" }, { status: 500 });
    }
}

// NOTE: You must disable the body parser for file uploads in Next.js
// by adding a config to the file:
// export const config = { api: { bodyParser: false, }, };