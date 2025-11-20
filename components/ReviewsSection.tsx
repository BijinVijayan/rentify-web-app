// src/components/ReviewsSection.tsx
import { ReviewsSectionProps } from "@/types/property";
import { FaStar, FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";

function formatDate(isoDate: string) {
    const date = new Date(isoDate);
    return date.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
    });
}

// Star rating helper
function StarRating({ rating }: { rating: number }) {
    const fullStars = Math.floor(rating);
    const half = rating % 1 >= 0.25 && rating % 1 < 0.75;
    const stars = Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) return <FaStar key={i} className="text-yellow-400" />;
        if (i === fullStars && half) return <FaStarHalfAlt key={i} className="text-yellow-400" />;
        return <FaRegStar key={i} className="text-gray-300" />;
    });
    return <span className="flex items-center gap-0.5">{stars}</span>;
}

export default function ReviewsSection({ rating, reviewCount, reviews }: ReviewsSectionProps) {
    return (
        <section>
            <div className="mb-5 flex items-center gap-2">
                <FaStar className="text-yellow-400" />
                <span className="font-semibold sm:text-lg">{rating.toFixed(2)}</span>
                <span className="text-gray-500 text-sm sm:text-base font-semibold">· {reviewCount} Reviews</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {reviews.map((r, idx) => (
                    <div key={idx} className="flex items-start gap-4 rounded-lg p-0">
                        <Image
                            src={r.avatarUrl}
                            alt={r.reviewer}
                            width={500}
                            height={500}
                            className="w-12 h-12 rounded-full object-cover border"
                        />
                        <div className="flex-1">
                            <div className="flex items-center gap-2">
                                <span className="text-sm sm:text-base font-semibold">{r.reviewer}</span>
                                <span className="text-gray-400 text-xs sm:text-sm">{formatDate(r.createdAt)}</span>
                            </div>
                            <div className="flex items-center my-1">
                                <StarRating rating={r.rating} />
                                <span className="ml-2 text-gray-500 text-sm">{r.rating.toFixed(1)}</span>
                            </div>
                            <p className="text-gray-700 text-sm mt-1">{r.comment}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
