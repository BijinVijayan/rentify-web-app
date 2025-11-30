import mongoose, { Schema, Document } from "mongoose";

export interface IHost extends Document {
    fullName: string;
    location?: string;
    phone?: string;
    email: string;
    description?: string;
    avatarUrl?: string;
    createdAt: Date;
    updatedAt?: Date;
}

const HostSchema = new Schema<IHost>({
    fullName: { type: String, required: true },
    location: { type: String, required: true },
    phone: { type: String,  required: true },
    email: { type: String, required: true, unique: true },
    description: { type: String },
    avatarUrl: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Host || mongoose.model<IHost>("Host", HostSchema);
