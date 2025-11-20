import Link from 'next/link';

export default function HomeCallToAction() {
    return (
        <section className="bg-primary-color py-10 sm:py-20 px-4 flex flex-col items-center justify-center text-center">
            <h2 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold mb-7">
                Ready to Find Your Perfect Home?
            </h2>
            <p className="text-white text-lg sm:text-xl mb-2">
                Join thousands of happy renters who found their dream home with Rentify.
            </p>
            <p className="text-white mb-10">
                Sign up today and start your search!
            </p>
            <Link
                href="/"
                className="inline-block px-8 py-3 rounded-lg bg-white text-[#4892f7] font-semibold shadow-sm transition hover:bg-slate-100"
            >
                Get Started
            </Link>
        </section>
    );
}
