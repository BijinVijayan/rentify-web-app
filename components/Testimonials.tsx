import Image from 'next/image';

interface Testimonial {
    id: number;
    name: string;
    location: string;
    quote: string;
    imageSrc: string;
    imageAlt: string;
}

const TESTIMONIALS: Testimonial[] = [
    {
        id: 1,
        name: "Sarah",
        location: "Austin",
        quote: "Hosting on Rentify has been a game-changer for me. The extra income is fantastic, and I've met wonderful people from all over.",
        imageSrc: "https://plus.unsplash.com/premium_photo-1678197937465-bdbc4ed95815?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&q=80&w=800&h=600",
        imageAlt: "Sarah from Austin smiling with a cup of coffee",
    },
    {
        id: 2,
        name: "Michael",
        location: "London",
        quote: "The platform is so easy to use, and the support team is always responsive. I felt secure from my very first booking.",
        imageSrc: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=800&h=600",
        imageAlt: "Michael from London smiling",
    },
    {
        id: 3,
        name: "Chloe",
        location: "Sydney",
        quote: "I love having the flexibility to rent out my spare room whenever I want. It's the perfect way to make my home work for me.",
        imageSrc: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=800&h=600",
        imageAlt: "Chloe from Sydney standing in a living room",
    },
];

const TestimonialCard = ({ data }: { data: Testimonial }) => {
    return (
        <article className="flex flex-col group">
            <div className="relative w-full aspect-[4/3] overflow-hidden rounded-2xl bg-gray-100 mb-6">
                <Image
                    src={data.imageSrc}
                    alt={data.imageAlt}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="flex flex-col gap-3">
                <blockquote className="text-gray-600 italic leading-relaxed sm:text-lg font-light">
                    &quot;{data.quote}&quot;
                </blockquote>

                <div className="font-bold text-gray-900 mt-1 max-sm:text-sm">
                    <span>- {data.name}</span>
                    <span className="text-gray-400 mx-1">,</span>
                    <span>{data.location}</span>
                </div>
            </div>
        </article>
    );
};


export default function HostsSection() {
    return (
        <section className="py-16 md:py-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                        Hear From Our Hosts
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-12">
                    {TESTIMONIALS.map((testimonial) => (
                        <TestimonialCard key={testimonial.id} data={testimonial} />
                    ))}
                </div>
            </div>
        </section>
    );
}