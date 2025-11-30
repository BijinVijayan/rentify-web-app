// lib/cloudinary.ts
import { v2 as cloudinary } from 'cloudinary';

if (!process.env.CLOUDINARY_URL) {
    console.warn("CLOUDINARY_URL is not set. Ensure configuration is correct.");
} else {
    cloudinary.config({
        secure: true,
    });
}

export default cloudinary;