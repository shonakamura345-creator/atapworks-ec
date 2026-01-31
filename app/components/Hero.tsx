"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-white">
            {/* Background Glow Effect - Replicating the "Blue Vibe" */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                {/* Top Right Blue Glow */}
                <div className="absolute -top-20 -right-20 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-3xl opacity-50 mix-blend-multiply animate-pulse" />
                {/* Bottom Left Blue Glow */}
                <div className="absolute -bottom-20 -left-20 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl opacity-50 mix-blend-multiply" />
                {/* Subtle Radial Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/50 to-white/80" />
            </div>

            <div className="container mx-auto px-6 lg:px-12 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full pt-20 lg:pt-0">

                {/* Left Column: Text Content */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="flex flex-col items-start space-y-6 lg:space-y-8 text-center lg:text-left order-2 lg:order-1"
                >
                    {/* Badge / Tagline */}
                    <span className="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 font-semibold text-sm tracking-widest border border-blue-100 shadow-sm">
                        書籍出版記念
                    </span>

                    <h1 className="text-4xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
                        出版イベント <br className="hidden lg:block" />
                        <span className="text-blue-600">開催決定</span>
                    </h1>

                    <p className="text-lg text-slate-600 max-w-lg leading-relaxed">
                        書籍『建物は物理学である』の出版を記念し、<br className="hidden lg:block" />
                        全国でイベントを開催いたします。
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
                        <Link
                            href="#schedule"
                            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-full shadow-lg shadow-blue-600/30 transition-all transform hover:scale-105 active:scale-95 text-center"
                        >
                            ツアースケジュールを見る
                        </Link>
                    </div>
                </motion.div>

                {/* Right Column: Hero Image */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1, delay: 0.2 }}
                    className="relative h-[50vh] lg:h-[80vh] w-full flex items-end justify-center lg:justify-end order-1 lg:order-2"
                >
                    {/* Main Image */}
                    {/* REPLACE with your actual photo: e.g. src="/my-photo.png" */}
                    <div className="relative w-full h-full max-w-md lg:max-w-xl">
                        <Image
                            src="/hero_from_dsc01192.png"
                            alt="Sho Architect Portrait"
                            fill
                            className="object-contain object-bottom drop-shadow-2xl rounded-2xl"
                            priority
                        />
                    </div>

                    {/* Decorative Elements around image */}
                    <div className="absolute bottom-10 -z-10 w-full h-1/2 bg-gradient-to-t from-gray-100 to-transparent rounded-full blur-xl opacity-60" />
                </motion.div>
            </div>
        </section>
    );
}
