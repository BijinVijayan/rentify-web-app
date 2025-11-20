"use client"

import {PropertyDetailsType} from "@/types/property";
import {
    AmenitiesGrid,
    HostInfoCard,
    PricingBox,
    PropertyImageGallery,
    PropertySummary,
    ReviewsSection
} from "@/components/index";
import {MdBed, MdSquareFoot} from "react-icons/md";
import {BiSolidBath} from "react-icons/bi";
import LocationMap from "@/components/LocationMap";
import ImageCarousel from "@/components/ImageCarousel";

type Props = {
    property: PropertyDetailsType;
};

export default function PropertyDetails({ property }: Props) {

    return (
        <div className="mx-auto max-w-7xl py-10 max-sm:pt-0 ">
            <div className="sm:hidden block">
                <ImageCarousel images={property.images} />
            </div>


            <PropertySummary title={property.title} address={property.address} />

            {/* Image gallery */}
            <div className="hidden sm:block my-8">
                <PropertyImageGallery images={property.images} thumbnailUrls={property.thumbnailUrls} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:px-4 max-sm:my-4">
                {/* Main info and description */}
                <div className="md:col-span-2 max-sm:px-4">
                    {/* Host & basic info row */}
                    <div className="mb-4">
                        <div className="flex flex-col items-start gap-2 sm:gap-3">
                            <span className="text-primary-text sm:text-xl font-semibold">Property hosted by {property.host.name}</span>
                            <div className="flex items-center text-primary-text text-sm gap-6">
                                <div className={"flex items-center justify-center gap-2"}> <MdBed />{ property.beds} bedroom</div>
                                <div className={"flex items-center justify-center gap-2"}><BiSolidBath /> {property.baths} bath</div>
                                <div className={"flex items-center justify-center gap-2"}><MdSquareFoot /> {property.sqft} sqft</div>
                            </div>
                        </div>
                    </div>
                    <div className={"my-4 space-y-2"}>
                        <h3 className={"text-primary-text text-lg sm:text-xl font-semibold"}>Description</h3>
                        <p className={"text-primary-text max-sm:text-sm"}>{property.description}</p>
                    </div>

                    <section className="mt-6">
                        <h3 className="text-lg font-semibold mb-3">Features and Amenities</h3>
                        <AmenitiesGrid amenityGroups={property.amenities} />
                    </section>
                </div>

                {/* Sidebar pricing/action/host */}
                <div className="md:col-span-1 sm:px-2">
                    <PricingBox
                        pricePerMonth={property.pricePerMonth}
                        currency={property.currency}
                        forRent={property.forRent}
                        securityDeposit={property.securityDeposit}
                        maintenance={property.maintenance}
                        onBook={() => {/* Handle booking */}}
                        onScheduleTour={() => {/* Handle scheduling tour */}}
                    />
                    <div className="mt-4">
                        <HostInfoCard host={property.host} onMessage={() => {/* Handle host message */}} />
                    </div>
                </div>
            </div>

            {/* Map section */}
            <section className="mt-10">
                <div className={"max-sm:px-4"}>
                    <h3 className="text-lg font-semibold sm:mb-2">Location Map</h3>
                    <div className="mb-4 text-sm text-gray-500">{property.location.formattedAddress}</div>
                </div>

                <LocationMap location={property.location} />
            </section>

            {/* Reviews */}
            <section className="mt-10 max-sm:px-4">
                <ReviewsSection
                    rating={property.rating}
                    reviewCount={property.reviewCount}
                    reviews={property.reviews}
                />
            </section>
        </div>
    )
}
