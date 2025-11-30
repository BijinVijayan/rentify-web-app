import mongoose, { Schema, Document, Model } from "mongoose";

export interface IProperty extends Document {
    hostId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    propertyType: string;

    // Listing Specifics
    listingType: "RENT" | "SALE";
    rentFrequency?: ("MONTHLY" | "YEARLY")[]; // If Rent, which frequencies are offered

    // Pricing
    price: {
        sale?: number;
        monthly?: number;
        yearly?: number;
        securityDeposit?: number;
    };
    currency: string;

    // Specs
    beds: number;
    baths: number;
    sqft: number;

    // Location
    location: {
        lat: number;
        lng: number;
        address: string;
        city: string;
        country: string;
    };

    images: string[];
    amenities: string[]; // Store keys like 'swimming_pool', 'wifi'
    status: "Draft" | "Pending" | "Published";
}

const PropertySchema = new Schema<IProperty>(
    {
        hostId: { type: Schema.Types.ObjectId, ref: "Host", required: true },
        title: { type: String, required: true },
        description: String,
        propertyType: { type: String, default: "Apartment" },

        listingType: { type: String, enum: ["RENT", "SALE"], required: true },
        rentFrequency: [{ type: String, enum: ["MONTHLY", "YEARLY"] }],

        price: {
            sale: Number,
            monthly: Number,
            yearly: Number,
            securityDeposit: Number,
        },
        currency: { type: String, default: "AED" },

        beds: { type: Number, required: true },
        baths: { type: Number, required: true },
        sqft: { type: Number, required: true },

        location: {
            lat: { type: Number, required: true },
            lng: { type: Number, required: true },
            address: { type: String, required: true },
            city: String,
            country: String
        },

        images: [String],
        amenities: [String],

        status: { type: String, default: "Pending" },
    },
    { timestamps: true }
);

const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>("Property", PropertySchema);
export default Property;