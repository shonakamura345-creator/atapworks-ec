"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
  return (
    <section
      id="home"
      className="relative w-full overflow-hidden bg-base pt-20 pb-16 lg:pt-24 lg:pb-24"
    >
      {/* 背景のやわらかい光（クールなブルー） */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <div className="absolute -top-32 -right-24 h-[520px] w-[520px] rounded-full bg-[#1a66c0]/10 blur-3xl" />
        <div className="absolute -bottom-40 -left-32 h-[560px] w-[560px] rounded-full bg-[#29a8e0]/10 blur-3xl" />
      </div>

      <div className="relative z-10 mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-14">
        {/* 左：テキスト */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 lg:order-1"
        >
          <span className="mb-6 inline-block rounded-full border-soft bg-surface px-4 py-1.5 text-xs font-bold tracking-[0.14em] text-ocean shadow-soft">
            ARCHITECT / CREATOR
          </span>

          <h1 className="text-4xl font-bold leading-[1.32] tracking-tight text-ink lg:text-5xl">
            誰もが憧れる、
            <br />
            建築業界を目指して。
          </h1>

          <p className="mt-5 text-base font-bold text-ink lg:text-lg">
            一級建築士が、動画・SNS・旅で建築の面白さを社会に届けます。
          </p>

          <p className="mt-5 max-w-xl text-sm leading-relaxed text-ink-sub">
            設計の現場を知る一級建築士でありながら、SNSで建築を語り、全国の建物を訪ね歩く。専門性とわかりやすさ、その両方で届けられる発信があります。動画制作・SNS運用・建築ツアー・登壇——建築の「伝える」を、まとめてご相談ください。
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="#contact" className="btn-ocean px-7 py-3.5 text-sm font-bold">
              仕事・コラボの相談
            </Link>
            <Link
              href="#works"
              className="rounded-full border border-ink/15 bg-surface px-7 py-3.5 text-sm font-bold text-ink transition-colors hover:border-ink/40"
            >
              できることを見る
            </Link>
          </div>
        </motion.div>

        {/* 右：ポートレート写真 */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.15 }}
          className="order-1 lg:order-2"
        >
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[28px] shadow-soft-lg">
            <Image
              src="/hero.jpg"
              alt="Sho建築士（東京タワーを背景に）"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
              style={{ objectPosition: "50% 42%" }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
