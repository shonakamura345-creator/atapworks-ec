"use client";

import { useState } from "react";
import Image from "next/image";

type ProductImageGalleryProps = {
  images: string[];
  productName: string;
};

export default function ProductImageGallery({
  images,
  productName,
}: ProductImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const goToImage = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="space-y-4">
      {/* メイン画像 */}
      <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative">
        <Image
          src={images[currentIndex]}
          alt={`${productName} ${currentIndex + 1}枚目`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        
        {/* 前へ/次へボタン（複数画像がある場合のみ表示） */}
        {images.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              aria-label="前の画像"
            >
              <svg
                className="w-6 h-6 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full p-2 shadow-md transition-colors"
              aria-label="次の画像"
            >
              <svg
                className="w-6 h-6 text-slate-700"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </>
        )}
      </div>

      {/* サムネイル（複数画像がある場合のみ表示） */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                currentIndex === index
                  ? "border-blue-600 ring-2 ring-blue-200"
                  : "border-slate-200 hover:border-slate-300"
              }`}
              aria-label={`${index + 1}枚目の画像を表示`}
            >
              <div className="relative w-full h-full bg-slate-100">
                <Image
                  src={img}
                  alt={`${productName} ${index + 1}枚目 サムネイル`}
                  fill
                  className="object-contain"
                  sizes="80px"
                />
              </div>
            </button>
          ))}
        </div>
      )}

      {/* 画像インデックス表示 */}
      {images.length > 1 && (
        <div className="text-center text-sm text-slate-500">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}

