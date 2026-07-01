"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "./data/products";
import RunningGame from "./components/RunningGame";
import NewsSection from "./components/NewsSection";
import Hero from "./components/Hero";
import WorksSection from "./components/WorksSection";
import ResultsSection from "./components/ResultsSection";
import AboutSection from "./components/AboutSection";
import MediaSection from "./components/MediaSection";
import ContactForm from "./components/ContactForm";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* HOME セクション */}
      {/* HOME セクション - New Component */}
      <Hero />

      {/* WORKS セクション（仕事・コラボの依頼） */}
      <WorksSection />

      {/* 実績（代表作の動画） */}
      <ResultsSection />

      {/* ABOUT（Sho建築士について） */}
      <AboutSection />

      {/* MEDIA（発信チャンネル） */}
      <MediaSection />


      {/* 本の紹介セクション */}
      <section className="min-h-screen flex items-center bg-base py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左側：本の表紙画像エリア */}
            <div className="text-center md:text-left">
              <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
                {/* 出版イベントで書籍を持つSho建築士 */}
                <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative bg-white">
                  <Image
                    src="/book-event.jpg"
                    alt="出版イベントで『建物は物理学である』を持つSho建築士"
                    fill
                    className="object-cover"
                    style={{ objectPosition: "50% 30%" }}
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              </div>
            </div>

            {/* 右側：タイトルと説明 */}
            <div className="text-center md:text-left">
              <div className="mb-6">
                <h2 className="font-head text-2xl md:text-3xl font-bold text-ink mb-3">
                  建物は物理学である
                </h2>
                <p className="text-lg font-semibold text-slate-700 mb-4">
                  Sho建築士 著
                </p>
                <p className="text-base text-slate-600 mb-6 leading-relaxed">
                  わたしたちの身のまわりは「物理」でいっぱい。<br />
                  身近なものや日常の出来事を通して学べば、<br />
                  世界の見え方が変わり、毎日がもっと楽しくなる。
                </p>
                <div className="space-y-3 text-left">
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-lg mt-0.5">✨</div>
                    <p className="text-slate-700">
                      <span className="font-semibold">物理でつくる、理想の部屋</span><br />
                      <span className="text-sm">ドアの回転力、耐震構造、換気、断熱など、建築に欠かせない物理の概念をわかりやすく解説</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-lg mt-0.5">🎨</div>
                    <p className="text-slate-700">
                      <span className="font-semibold">イラストで学ぶ</span><br />
                      <span className="text-sm">親しみやすいイラストと視覚的な説明で、難しい物理の概念もスッキリ理解</span>
                    </p>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="text-blue-600 text-lg mt-0.5">🏠</div>
                    <p className="text-slate-700">
                      <span className="font-semibold">身近なものから学ぶ</span><br />
                      <span className="text-sm">日常の出来事や身の回りのものを通して、物理と建築の関係を実感</span>
                    </p>
                  </div>
                </div>
              </div>
              <a
                href="#goods"
                className="btn-ocean inline-block px-8 py-4 font-semibold text-lg"
              >
                書籍を購入する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS セクション */}
      <NewsSection />

      {/* GOODS セクション */}
      <section id="goods" className="min-h-screen bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="font-head text-4xl font-bold text-ink mb-12 text-center">
            GOODS
          </h2>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <Link
                key={product.id}
                href={`/store/${product.id}`}
                className="rounded-2xl border border-blue-100 bg-white overflow-hidden shadow-sm hover:shadow-md hover:border-blue-200 transition-all cursor-pointer"
              >
                {/* 商品画像 */}
                <div className="aspect-square bg-slate-100 relative">
                  {(product.images && product.images.length > 0) || product.image ? (
                    <Image
                      src={(product.images && product.images.length > 0) ? product.images[0] : product.image!}
                      alt={product.name}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <div className="text-slate-400 text-center">
                        <p className="text-sm">商品画像</p>
                        <p className="text-xs mt-2">（画像を追加予定）</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="text-lg font-semibold text-slate-900 mb-2">
                    {product.name}
                  </div>
                  {(product.shortDescription || product.description) && (
                    <p className="text-sm text-slate-600 mb-4">
                      {product.shortDescription || product.description}
                    </p>
                  )}
                  <div className="text-xl font-semibold text-slate-900">
                    ¥{product.price.toLocaleString()}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* GAME セクション */}
      <section id="game" className="min-h-screen bg-base py-20">
        <div className="mx-auto max-w-6xl px-2 md:px-6">
          <RunningGame />
        </div>
      </section>

      {/* CONTACT セクション（仕事・コラボのご相談フォーム） */}
      <section id="contact" className="bg-white py-20">
        <div className="mx-auto max-w-2xl px-6 w-full">
          <div className="text-center mb-8">
            <div className="eyebrow">CONTACT</div>
            <h2 className="font-head text-3xl md:text-4xl font-bold text-ink mt-3">
              仕事・コラボのご相談
            </h2>
            <p className="text-sm text-ink-sub mt-4 leading-relaxed">
              動画、SNS、ツアー、登壇——どの入り口からでも構いません。
              <br className="hidden sm:block" />
              「こんなことできますか？」の一言から、一緒に建築を盛り上げる方法を考えます。
            </p>
          </div>
          <ContactForm />
        </div>
      </section>
    </main>
  );
}
