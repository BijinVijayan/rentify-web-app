// src/mock/propertyDetailsDubai.ts
import { PropertyDetailsType } from "@/types/property"
import { FaSwimmingPool, FaHome, FaParking, FaWifi } from "react-icons/fa";
import { MdBalcony, MdElevator, MdSpa, MdSecurity, MdAcUnit } from "react-icons/md";

export const mockPropertyDetailsDubai: PropertyDetailsType = {
    id: "apt_dubai001",
    title: "2 BHK Luxury Apartment in Downtown Dubai",
    city: "Dubai",
    state: "Dubai",
    country: "UAE",
    address: "Burj Vista Tower 1, Sheikh Mohammed bin Rashid Blvd, Downtown Dubai, Dubai, UAE",
    pricePerMonth: 18500,
    currency: "AED",
    forRent: true,
    securityDeposit: 37000,
    maintenance: 1200,
    beds: 2,
    baths: 2,
    sqft: 1600,
    images: [
        // Living room
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?fit=crop&w=1200&q=80',
        // Master bedroom
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?fit=crop&w=1200&q=80',
        'https://images.unsplash.com/photo-1637747022660-12ce5ce4e420?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1681194189961-e2aa414f9c7f?q=80&w=3174&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
        'https://images.unsplash.com/photo-1675063737195-8820bbb0f8d0?q=80&w=3037&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'

    ],
    thumbnailUrls: [
        'https://images.unsplash.com/photo-1524758631624-e2822e304c36?fit=crop&w=400&q=60',
        'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?fit=crop&w=400&q=60',
    ],
    host: {
        id: "host_dubai123",
        name: "Layla Hamdan",
        avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
        memberSince: "2020"
    },
    description: `Live in luxury in this 2 BHK apartment at Burj Vista, located steps from the iconic Burj Khalifa and Dubai Mall.
    Spacious living area with modern furniture, open-concept kitchen, full-height windows, secure smart-home system, and a private balcony with panoramic city views.
    Enjoy building amenities (pool, spa, gym), 24/7 security, and covered parking.`,
    amenities: [
        {
            group: "Building",
            amenities: [
                { name: "Private Balcony", icon: <MdBalcony /> },
                { name: "Elevator Access", icon: <MdElevator /> },
                { name: "Smart Home System", icon: <FaWifi /> },
            ],
        },
        {
            group: "Health and Fitness",
            amenities: [
                { name: "Swimming Pool", icon: <FaSwimmingPool /> },
                { name: "Gymnasium", icon: <FaHome /> },
                { name: "Sauna & Spa", icon: <MdSpa /> },
            ],
        },
        {
            group: "Security",
            amenities: [
                { name: "24/7 Security", icon: <MdSecurity /> },
                { name: "Secure Parking", icon: <FaParking /> },
            ],
        },
        {
            group: "Technologies",
            amenities: [
                { name: "Central Air Conditioning", icon: <MdAcUnit /> },
                { name: "High-speed WiFi", icon: <FaWifi /> },
            ],
        },
    ],
    location: {
        lat: 25.196729,
        lng: 55.274528,
        formattedAddress: "Burj Vista Tower 1, Downtown Dubai, Dubai, UAE"
    },
    rating: 4.97,
    reviewCount: 18,
    reviews: [
        {
            reviewer: "Ahmed Hassan",
            avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=400&q=80',
            createdAt: "2025-04-19",
            rating: 5,
            comment: "Exceptional location, breathtaking views, and Layla was incredibly helpful. Highly recommend for business stays!"
        },
        {
            reviewer: "Maria Fernandes",
            avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
            createdAt: "2024-12-05",
            rating: 4.9,
            comment: "The apartment is stunning, pool and gym are top-notch. Would stay here again in a heartbeat."
        }
    ]
};
