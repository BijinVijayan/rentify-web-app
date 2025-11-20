'use client';

import Image from 'next/image';
import Link from 'next/link';
import {PropertyCardProps} from "@/types/property";
import {cn} from "@/utils/cn";
import {IoLocationOutline} from "react-icons/io5";
import {GoHome} from "react-icons/go";
import {LiaBathSolid} from "react-icons/lia";
import {MdOutlineSpaceDashboard} from "react-icons/md";
import {FaStar} from "react-icons/fa";

function formatPrice(amount: number, currency: PropertyCardProps['property']['currency']) {
    return new Intl.NumberFormat(undefined, { style: 'currency', currency }).format(amount);
}

export default function PropertyCard({ property, onClickAction, className }: PropertyCardProps) {
    const {
        id,
        city,
        state,
        country,
        title,
        pricePerMonth,
        currency,
        beds,
        baths,
        sqft,
        rating,
        reviewCount,
        imageUrl,
    } = property;

    const location = [city, state].filter(Boolean).join(', ') || country || '';

    const card = (
        <article
            role="article"
            aria-label={title}
            onClick={() => onClickAction?.(id)}
            className={cn(
                'max-sm:p-3  group h-full flex flex-col relative overflow-hidden sm:rounded-lg bg-white sm:shadow-sm transition',
                className
            )}
        >
            <div className="relative h-44 sm:h-40 w-full">
                <Image
                    src={imageUrl}
                    alt={title}
                    fill
                    sizes="(max-width: 640px) 100vw, 400px"
                    className="object-cover max-sm:rounded-lg"
                    priority={false}
                />
            </div>

            <div className="flex flex-col flex-1 p-4 max-sm:pb-2">
                <p className="flex items-center gap-1 text-sm text-gray-text">
                    <IoLocationOutline />
                    {location}
                </p>
                <h3 className="mt-1 text-lg font-bold text-primary-text">
                    {title}
                </h3>
                {/* Spacer pushes the below to the bottom */}
                <div className="mt-auto">
                    <p className="mt-1 text-primary-color font-bold">
                        {formatPrice(pricePerMonth, currency)}/month
                    </p>

                    <div className="mt-3 flex items-center gap-4 text-sm text-gray-text">
                        <span className="flex items-center gap-1">
                            <GoHome />
                            {beds} Beds
                        </span>
                        <span className="flex items-center gap-1">
                            <LiaBathSolid />
                            {baths} Baths
                        </span>
                        {typeof sqft === 'number' && (
                            <span className="flex items-center gap-1">
                                <MdOutlineSpaceDashboard />
                                {sqft} sqft
                            </span>
                        )}
                    </div>

                    {(rating || reviewCount) && (
                        <div className="mt-2 flex items-center gap-1 text-sm text-[#F59E0B]">
                            <FaStar />
                            {rating?.toFixed(1) ?? '—'}
                            {reviewCount ? <span className="text-gray-900">({reviewCount} reviews)</span> : null}
                        </div>
                    )}
                </div>
            </div>
        </article>
    );

    return (
        <Link href={`/property/${id}`} className="block outline-none focus-visible:ring-0">
            {card}
        </Link>
    );
}
