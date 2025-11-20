import React from 'react'
import {PropertyCardType} from "@/types/property";
import {PropertyCard} from "@/components/index";

const mockList: PropertyCardType[] = [
    {
        id: 'dxb-1',
        city: 'Dubai Marina',
        state: 'Dubai',
        country: 'UAE',
        title: 'Modern Marina Apartment',
        pricePerMonth: 22000,
        currency: 'AED',
        beds: 2,
        baths: 2,
        sqft: 850,
        rating: 4.9,
        reviewCount: 128,
        imageUrl: 'https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'dxb-2',
        city: 'Downtown Dubai',
        state: 'Dubai',
        country: 'UAE',
        title: 'Chic Downtown Loft',
        pricePerMonth: 32000,
        currency: 'AED',
        beds: 1,
        baths: 1,
        sqft: 700,
        rating: 4.7,
        reviewCount: 89,
        imageUrl: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'dxb-3',
        city: 'Jumeirah Beach Residence',
        state: 'Dubai',
        country: 'UAE',
        title: 'Cozy JBR Studio',
        pricePerMonth: 18000,
        currency: 'AED',
        beds: 1,
        baths: 1,
        sqft: 510,
        rating: 4.8,
        reviewCount: 103,
        imageUrl: 'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=600&q=80',
    },
    {
        id: 'dxb-4',
        city: 'Palm Jumeirah',
        state: 'Dubai',
        country: 'UAE',
        title: 'Luxury Palm View',
        pricePerMonth: 41000,
        currency: 'AED',
        beds: 3,
        baths: 3,
        sqft: 1400,
        rating: 5,
        reviewCount: 77,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1676823553207-758c7a66e9bb?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 'dxb-5',
        city: 'Business Bay',
        state: 'Dubai',
        country: 'UAE',
        title: 'Penthouse with Rooftop',
        pricePerMonth: 95000,
        currency: 'AED',
        beds: 4,
        baths: 4,
        sqft: 2000,
        rating: 4.6,
        reviewCount: 64,
        imageUrl: 'https://images.unsplash.com/photo-1495433324511-bf8e92934d90?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 'dxb-6',
        city: 'Dubai Creek Harbour',
        state: 'Dubai',
        country: 'UAE',
        title: 'Studio in Creek Harbour',
        pricePerMonth: 15000,
        currency: 'AED',
        beds: 1,
        baths: 1,
        sqft: 450,
        rating: 4.4,
        reviewCount: 41,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1676321046262-4978a752fb15?q=80&w=1742&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 'dxb-7',
        city: 'Al Barsha',
        state: 'Dubai',
        country: 'UAE',
        title: 'Loft with Balcony',
        pricePerMonth: 28000,
        currency: 'AED',
        beds: 2,
        baths: 2,
        sqft: 1030,
        rating: 4.7,
        reviewCount: 55,
        imageUrl: 'https://images.unsplash.com/photo-1749878064335-117141e3a1aa?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 'dxb-8',
        city: 'Dubai Silicon Oasis',
        state: 'Dubai',
        country: 'UAE',
        title: 'City View Apartment',
        pricePerMonth: 17500,
        currency: 'AED',
        beds: 2,
        baths: 1,
        sqft: 600,
        rating: 4.9,
        reviewCount: 130,
        imageUrl: 'https://plus.unsplash.com/premium_photo-1676823570969-da7d0074804d?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
];

const Featured = () => {
    return (
        <div className="mx-auto max-w-7xl p-0 sm:p-6 py-8 sm:py-12 md:py-16 ">
            <h1 className="hidden sm:block mb-10 text-2xl md:text-3xl font-extrabold text-primary-text text-center">Featured Properties</h1>
            <div className="grid grid-cols-1 gap-3 sm:gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 items-stretch max-sm:bg-slate-100">
                {mockList.map((p) => (
                    <PropertyCard key={p.id} property={p} />
                ))}
            </div>
        </div>
    )
}

export default Featured
