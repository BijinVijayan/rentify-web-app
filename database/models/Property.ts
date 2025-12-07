import mongoose, { Schema, Document, Model } from "mongoose";

// Interface for Amenities Group Structure
interface AmenityGroup {
    group: string;
    items: {
        key: string;
        label: string;
        icon: string;
    }[];
}

export interface IProperty extends Document {
    hostId: mongoose.Types.ObjectId;
    title: string;
    description: string;
    propertyType: string;
    listingType: "RENT" | "SALE";
    rentFrequency?: ("MONTHLY" | "YEARLY")[];

    // Pricing
    price: {
        sale?: number;
        monthly?: number;
        yearly?: number;
        securityDeposit?: number;
        maintenanceFee?: number;
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
    amenities: AmenityGroup[];
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
            maintenanceFee: Number, // <--- ADDED HERE
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

        amenities: [
            {
                group: String,
                items: [{ key: String, label: String, icon: String }]
            }
        ],

        status: { type: String, default: "Pending" },
    },
    { timestamps: true }
);

const Property: Model<IProperty> = mongoose.models.Property || mongoose.model<IProperty>("Property", PropertySchema);
export default Property;