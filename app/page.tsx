"use client";

import Link from "next/link";
import Image from "next/image";
import { products } from "./data/products";
import { useEffect, useState } from "react";
import RunningGame from "./components/RunningGame";

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
      <section id="home" className="min-h-screen flex items-center bg-white py-20 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 w-full">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* 左側：テキストエリア */}
            <div className="text-center md:text-left">
              <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold mb-6">
                書籍出版記念
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                出版イベント
                <br />
                開催決定
              </h1>
              <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-slate-700 mb-8 leading-relaxed">
                書籍『建物は物理学である』の出版を記念し、<br className="hidden sm:block" />
                全国でイベントを開催いたします
              </p>
              <a
                href="#schedule"
                className="inline-block rounded-xl bg-blue-600 px-8 py-4 font-semibold text-white hover:bg-blue-700 transition-colors text-lg"
              >
                ツアースケジュールを見る
              </a>
            </div>

            {/* 右側：人物写真（スクロール追従効果付き） */}
            <div className="relative">
              <div
                className="relative w-full aspect-[3/4] max-w-md mx-auto transition-transform duration-75 ease-out"
                style={{
                  transform: `translateY(${scrollY * 0.3}px)`,
                }}
              >
                <div className="rounded-2xl overflow-hidden shadow-2xl bg-white">
                  <Image
                    src="/Photoroom_20260103_080646.PNG"
                    alt="Sho建築士"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

      {/* SCHEDULE セクション */}
      <section id="schedule" className="min-h-screen flex items-center bg-white py-20">
        <div className="mx-auto max-w-3xl px-6 w-full">
          <h2 className="text-4xl font-bold text-slate-900 mb-16 text-center">
            SCHEDULE
          </h2>
          <div className="space-y-1">
            {/* 2月 - 東京（詳細未定） */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  TBD
                </div>
                <div className="text-slate-900 font-semibold">
                  東京 <span className="text-slate-600 font-normal text-sm ml-2">書店イベント</span>
                </div>
              </div>
            </div>

            {/* 3月7日 北海道 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.03.7 SAT
                </div>
                <div className="text-slate-900 font-semibold">
                  北海道 <span className="text-slate-600 font-normal text-sm ml-2">札幌</span>
                </div>
              </div>
            </div>

            {/* 3月15日 大阪 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.03.15 SUN
                </div>
                <div className="text-slate-900 font-semibold">
                  大阪 <span className="text-slate-600 font-normal text-sm ml-2">心斎橋</span>
                </div>
              </div>
            </div>

            {/* 3月20日 横浜 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.03.20 FRI
                </div>
                <div className="text-slate-900 font-semibold">
                  横浜 <span className="text-slate-600 font-normal text-sm ml-2">希望が丘</span>
                </div>
              </div>
            </div>

            {/* 3月21日 愛知 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.03.21 SAT
                </div>
                <div className="text-slate-900 font-semibold">
                  愛知 <span className="text-slate-600 font-normal text-sm ml-2">名古屋</span>
                </div>
              </div>
            </div>

            {/* 3月22日 東京 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.03.22 SUN
                </div>
                <div className="text-slate-900 font-semibold">
                  東京 <span className="text-slate-600 font-normal text-sm ml-2">御茶ノ水</span>
                </div>
              </div>
            </div>

            {/* 3月28日 宮城 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.03.28 SAT
                </div>
                <div className="text-slate-900 font-semibold">
                  宮城 <span className="text-slate-600 font-normal text-sm ml-2">仙台</span>
                </div>
              </div>
            </div>

            {/* 4月4日 or 5日 秋田 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.04.4 SAT<br />or 2025.04.5 SUN
                </div>
                <div className="text-slate-900 font-semibold">
                  秋田
                </div>
              </div>
            </div>

            {/* 4月11日 福岡 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.04.11 SAT
                </div>
                <div className="text-slate-900 font-semibold">
                  福岡 <span className="text-slate-600 font-normal text-sm ml-2">赤坂</span>
                </div>
              </div>
            </div>

            {/* 4月12日 東京 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.04.12 SUN
                </div>
                <div className="text-slate-900 font-semibold">
                  東京 <span className="text-slate-600 font-normal text-sm ml-2">立川</span>
                </div>
              </div>
            </div>

            {/* 4月13日 福島 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.04.13 MON
                </div>
                <div className="text-slate-900 font-semibold">
                  福島 <span className="text-slate-600 font-normal text-sm ml-2">郡山</span>
                </div>
              </div>
            </div>

            {/* 4月18日 千葉 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.04.18 SAT
                </div>
                <div className="text-slate-900 font-semibold">
                  千葉 <span className="text-slate-600 font-normal text-sm ml-2">稲毛</span>
                </div>
              </div>
            </div>

            {/* 4月25日 岡山 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.04.25 SAT
                </div>
                <div className="text-slate-900 font-semibold">
                  岡山
                </div>
              </div>
            </div>

            {/* 4月26日 広島 */}
            <div className="py-4 border-b border-blue-100">
              <div className="flex items-center gap-8">
                <div className="text-slate-900 text-sm font-medium w-32">
                  2025.04.26 SUN
                </div>
                <div className="text-slate-900 font-semibold">
                  広島
                </div>
              </div>
            </div>
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
                  {product.description && (
                    <p className="text-sm text-slate-600 mb-4">
                      {product.description}
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
        <div className="mx-auto max-w-6xl px-6">
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
