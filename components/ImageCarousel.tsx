import React, { useState, TouchEvent } from "react";
import Image from "next/image";
import { GoChevronLeft, GoChevronRight } from "react-icons/go";

type Props = {
    images: string[];
    altPrefix?: string;
};

export default function ImageCarousel({ images, altPrefix = "Apartment image" }: Props) {
    const [active, setActive] = useState(0);
    const [direction, setDirection] = useState<"left" | "right" | "">(""); // For slide animate

    // Swipe tracking
    let startX = 0;
    function handleTouchStart(e: TouchEvent) {
        startX = e.touches[0].clientX;
    }
    function handleTouchEnd(e: TouchEvent) {
        const endX = e.changedTouches[0].clientX;
        if (endX < startX - 40) goNext();
        if (endX > startX + 40) goPrev();
    }

    function goPrev() {
        setDirection("left");
        setActive((active - 1 + images.length) % images.length);
    }

    function goNext() {
        setDirection("right");
        setActive((active + 1) % images.length);
    }

    // Animation logic
    // We'll set translate-x before/after active, and animate
    // The image wrapper will always contain just 1 image, with animation on change

    return (
        <div className="w-full relative max-w-full mb-6 select-none">
            <div
                className="overflow-hidden aspect-[4/3] relative"
                onTouchStart={handleTouchStart}
                onTouchEnd={handleTouchEnd}
                style={{ width: "100%" }}
            >
                {/* Sliding animation wrapper */}
                <div
                    key={active}
                    className={`absolute top-0 left-0 w-full h-full transition-transform duration-500 ${
                        direction === "right"
                            ? "animate-slide-in-right"
                            : direction === "left"
                                ? "animate-slide-in-left"
                                : ""
                    }`}
                    style={{
                        willChange: "transform",
                    }}
                    onAnimationEnd={() => setDirection("")}
                >
                    <Image
                        src={images[active]}
                        alt={`${altPrefix} ${active + 1}`}
                        width={2000}
                        height={1500}
                        className="w-full h-full object-cover"
                        priority
                    />
                </div>
            </div>

            {/* Left Button */}
            <button
                aria-label="Previous"
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 text-slate-700 rounded-full shadow text-xl"
                style={{ zIndex: 3 }}
            >
                <GoChevronLeft />
            </button>

            {/* Right Button */}
            <button
                aria-label="Next"
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1 bg-white/80 text-slate-700 rounded-full shadow text-xl"
                style={{ zIndex: 3 }}
            >
                <GoChevronRight />
            </button>

            {/* Bullet indicators */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
                {images.map((_, i) => (
                    <span
                        key={i}
                        className={`block w-2.5 h-2.5 rounded-full ${
                            i === active ? "bg-blue-600" : "bg-gray-200"
                        }`}
                        style={{ transition: "background 0.3s" }}
                    ></span>
                ))}
            </div>

            {/* Slide animation CSS (Tailwind + keyframes) */}
            <style jsx>{`
        @keyframes slideInRight {
          from { transform: translateX(100%); opacity: 0.7; }
          to   { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideInLeft {
          from { transform: translateX(-100%); opacity: 0.7; }
          to   { transform: translateX(0); opacity: 1; }
        }
        .animate-slide-in-right {
          animation: slideInRight 0.3s;
        }
        .animate-slide-in-left {
          animation: slideInLeft 0.3s;
        }
      `}</style>
        </div>
    );
}
