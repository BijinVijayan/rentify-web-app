"use client"

import React, { useState } from 'react';
import Image from "next/image";
import Link from "next/link";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";

export default function LoginHost() {
    const [isLoading, setIsLoading] = useState(false);

    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            // We ask to go to dashboard.
            // The Server Callback (in route.ts) will INTERCEPT this if the user is not a host.
            await signIn('google', {
                callbackUrl: '/dashboard'
            });
        } catch (error) {
            console.error("Login failed:", error);
            toast.error("Something went wrong");
            setIsLoading(false);
        }
    };

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden font-sans">
            {/* Background Layers */}
            <div className="absolute inset-0 -z-10">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-white to-teal-50" />
                <div className="absolute top-[-20%] left-[-10%] w-[70vh] h-[70vh] rounded-full bg-teal-200/40 mix-blend-multiply filter blur-[80px] opacity-70 animate-blob" />
                <div className="absolute top-[-20%] right-[-10%] w-[70vh] h-[70vh] rounded-full bg-purple-200/40 mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-2000" />
                <div className="absolute bottom-[-20%] left-[20%] w-[70vh] h-[70vh] rounded-full bg-blue-200/40 mix-blend-multiply filter blur-[80px] opacity-70 animate-blob animation-delay-4000" />
            </div>

            <div className="w-full max-w-lg sm:px-4 ">
                <div className="bg-white max-sm:min-h-screen max-sm:flex max-sm:flex-col max-sm:justify-center sm:rounded-xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] p-8 md:p-12 text-center relative overflow-hidden">

                    <div className="mb-10">
                        <div className={"flex items-center justify-center mb-4"}>
                            <Image src={"/icons/renfity icon.png"} alt={"logo"} width={1000} height={1000} className={"w-8 sm:w-10 mr-2"} />
                            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Rentify</h1>
                        </div>
                        <p className="text-gray-500 sm:text-lg leading-relaxed">
                            Join Rentify to list your property and manage bookings.
                        </p>
                    </div>

                    <div className="space-y-4">
                        <button
                            type="button"
                            onClick={handleGoogleLogin}
                            disabled={isLoading}
                            className="group relative w-full flex items-center justify-center gap-3 bg-[#00695C] hover:bg-[#005c51] text-white font-semibold h-14 rounded-xl transition-all duration-200 ease-in-out hover:shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <div className="bg-white p-1 rounded-full w-6 h-6 flex items-center justify-center">
                                        <svg viewBox="0 0 24 24" width="16" height="16" xmlns="http://www.w3.org/2000/svg"><g transform="matrix(1, 0, 0, 1, 27.009001, -39.238998)"><path fill="#4285F4" d="M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z" /><path fill="#34A853" d="M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z" /><path fill="#FBBC05" d="M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.734 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z" /><path fill="#EA4335" d="M -14.754 43.989 C -12.984 43.989 -11.424 44.599 -10.174 45.789 L -6.704 42.299 C -8.804 40.309 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z" /></g></svg>
                                    </div>
                                    Continue with Google
                                </>
                            )}
                        </button>
                    </div>

                    <div className="mt-8 space-y-8">
                        <div className="text-gray-500 font-medium">
                            Don&#39;t have an account yet?{' '}
                            <Link href="/create-host" className="text-[#00695C] hover:text-[#004D40] hover:underline font-bold inline-flex items-center gap-1 transition-all">
                                Get started as a host!
                            </Link>
                        </div>
                        <div className="text-xs text-gray-400 leading-relaxed max-w-xs mx-auto">
                            By continuing, you agree to Rentify&#39;s{' '}
                            <a href="#" className="underline hover:text-gray-600">Terms of Service</a>
                            {' '}and{' '}
                            <a href="#" className="underline hover:text-gray-600">Privacy Policy</a>.
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}