"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "./data/products";
import { scheduleItems } from "./data/schedule";
import { useEffect, useState } from "react";
import RunningGame from "./components/RunningGame";
import NewsSection from "./components/NewsSection";
import Hero from "./components/Hero";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* HOME セクション */}
      {/* HOME セクション - New Component */}
      <Hero />


      {/* 本の紹介セクション */}
      <section className="min-h-screen flex items-center bg-blue-50 py-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左側：本の表紙画像エリア */}
            <div className="text-center md:text-left">
              <div className="relative aspect-[3/4] max-w-sm mx-auto md:mx-0">
                {/* 本の表紙画像 - 商品データから取得 */}
                {products.find(p => p.id === "book")?.image ? (
                  <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl relative bg-white">
                    <Image
                      src={products.find(p => p.id === "book")!.image!}
                      alt="建物は物理学である"
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ) : (
                  <div className="w-full h-full rounded-2xl bg-gradient-to-br from-blue-50 to-white border-4 border-blue-100 shadow-2xl flex items-center justify-center">
                    <div className="text-center p-8">
                      <div className="text-4xl mb-4">📖</div>
                      <p className="text-sm text-slate-600 font-medium">
                        書籍の表紙画像を<br />
                        こちらに表示します
                      </p>
                      <p className="text-xs text-slate-400 mt-2">
                        （画像を追加予定）
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 右側：タイトルと説明 */}
            <div className="text-center md:text-left">
              <div className="mb-6">
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
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
                className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 transition-colors text-lg"
              >
                書籍を購入する
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* NEWS セクション */}
      <NewsSection />

      {/* SCHEDULE セクション */}
      <section id="schedule" className="min-h-screen flex items-center bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 w-full">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            SCHEDULE
          </h2>
          <div className="space-y-1">
            {scheduleItems.map((item) => (
              <div
                key={item.id}
                className={`py-4 border-b border-blue-100 relative ${
                  item.isPast ? "opacity-70" : ""
                }`}
              >
                {/* 終了イベント: 横線で消す */}
                {item.isPast && (
                  <div
                    className="absolute inset-0 flex items-center pointer-events-none px-6"
                    aria-hidden
                  >
                    <div className="w-full h-px bg-slate-400 ml-36" />
                  </div>
                )}
                <div className="flex items-center gap-8">
                  <div
                    className={`text-slate-900 text-sm font-medium w-32 ${
                      item.isPast ? "line-through text-slate-500" : ""
                    }`}
                  >
                    {item.dateLabel}
                    {item.dateLabelSub && (
                      <>
                        <br />
                        {item.dateLabelSub}
                      </>
                    )}
                  </div>
                  <div className="flex-1 flex items-center justify-between gap-4 flex-wrap">
                    <div
                      className={`font-semibold ${
                        item.isPast
                          ? "line-through text-slate-500"
                          : item.isPostponed
                            ? "text-amber-700"
                            : "text-slate-900"
                      }`}
                    >
                      {item.detailLink && !item.isPast && !item.isPostponed ? (
                        <a
                          href={item.detailLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-blue-600 transition-colors cursor-pointer"
                        >
                          {item.location}{" "}
                          {item.venue && (
                            <span className="text-slate-600 font-normal text-sm ml-2">
                              {item.venue}
                            </span>
                          )}
                        </a>
                      ) : (
                        <>
                          {item.location}{" "}
                          {item.venue && (
                            <span className="text-slate-600 font-normal text-sm ml-2">
                              {item.venue}
                            </span>
                          )}
                          {item.isPast && (
                            <span className="text-slate-500 font-normal text-xs ml-2">
                              （終了）
                            </span>
                          )}
                          {item.isPostponed && (
                            <span className="text-amber-600 font-semibold text-xs ml-2">
                              （延期）
                            </span>
                          )}
                        </>
                      )}
                    </div>
                    <div className="flex items-center gap-4">
                      {item.noteLink && (
                        <a
                          href={item.noteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700 underline whitespace-nowrap"
                        >
                          活動報告はこちら
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                      {item.registrationLink && (
                        <a
                          href={item.registrationLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-green-600 hover:text-green-700 underline whitespace-nowrap"
                        >
                          申し込み
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                      {item.detailLink && !item.isPast && !item.isPostponed && (
                        <a
                          href={item.detailLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-sm font-semibold text-blue-600 hover:text-blue-700 underline whitespace-nowrap"
                        >
                          詳細はこちら
                          <svg
                            className="h-3 w-3"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-16 pt-8 border-t border-blue-100">
            <p className="text-slate-600 mb-4 text-sm">
              詳細は決定次第公式LINEでお知らせします
            </p>
            <a
              href="https://lin.ee/nnqRfjX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#06C755] px-6 py-3 font-semibold text-white hover:bg-[#05B048] transition-colors"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.086.766.062 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              公式LINEで最新情報を受け取る
            </a>
          </div>
        </div>
      </section>

      {/* GOODS セクション */}
      <section id="goods" className="min-h-screen bg-white py-20">
        <div className="mx-auto max-w-6xl px-6">
          <h2 className="text-4xl font-bold text-slate-900 mb-12 text-center">
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
      <section id="game" className="min-h-screen bg-blue-50 py-20">
        <div className="mx-auto max-w-6xl px-2 md:px-6">
          <RunningGame />
        </div>
      </section>

      {/* CONTACT セクション */}
      <section id="contact" className="min-h-screen flex items-center bg-white py-20">
        <div className="mx-auto max-w-2xl px-6 w-full">
          <h2 className="text-4xl font-bold text-slate-900 mb-8 text-center">
            CONTACT
          </h2>
          <div className="rounded-2xl border border-blue-100 bg-blue-50 p-8 text-center">
            <p className="text-slate-700 mb-8 text-lg">
              ご質問やお問い合わせがございましたら、<br />
              公式LINEからお気軽にご連絡ください。
            </p>
            <a
              href="https://lin.ee/nnqRfjX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 rounded-xl bg-[#06C755] px-8 py-4 font-semibold text-white hover:bg-[#05B048] transition-colors"
            >
              <svg
                className="h-6 w-6"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.086.766.062 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
              </svg>
              LINEでお問い合わせ
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
