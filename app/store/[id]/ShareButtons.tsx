"use client";

import { useState } from "react";

type ShareButtonsProps = {
  productName: string;
  productUrl: string;
};

export default function ShareButtons({ productName, productUrl }: ShareButtonsProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    // Web Share APIが利用可能かチェック
    if (navigator.share) {
      try {
        setIsSharing(true);
        await navigator.share({
          title: productName,
          text: `${productName} - Sho建築士オンラインストア`,
          url: productUrl,
        });
      } catch (error: any) {
        // ユーザーがシェアをキャンセルした場合やその他のエラー
        if (error.name !== "AbortError") {
          console.error("シェアエラー:", error);
          // フォールバック: リンクをコピー
          fallbackCopyLink();
        }
      } finally {
        setIsSharing(false);
      }
    } else {
      // Web Share APIが利用できない場合はリンクをコピー
      fallbackCopyLink();
    }
  };

  const fallbackCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(productUrl);
      alert("リンクをコピーしました");
    } catch (err) {
      console.error("リンクのコピーに失敗しました:", err);
      // 最後の手段: テキストエリアを使用してコピー
      const textArea = document.createElement("textarea");
      textArea.value = productUrl;
      document.body.appendChild(textArea);
      textArea.select();
      try {
        document.execCommand("copy");
        alert("リンクをコピーしました");
      } catch (e) {
        alert("リンクのコピーに失敗しました");
      }
      document.body.removeChild(textArea);
    }
  };

  const shareText = `${productName} - Sho建築士オンラインストア`;

  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(productUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(productUrl)}`,
  };

  return (
    <div className="mt-6 pt-6 border-t border-slate-200">
      <div className="flex flex-wrap gap-3">
        {/* ネイティブシェアボタン */}
        <button
          onClick={handleShare}
          disabled={isSharing}
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
          シェア
        </button>

        {/* X (Twitter) */}
        <a
          href={shareUrls.twitter}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#000000] text-white hover:bg-[#1a1a1a] transition-colors text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
          X
        </a>

        {/* Facebook */}
        <a
          href={shareUrls.facebook}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-[#1877F2] text-white hover:bg-[#166fe5] transition-colors text-sm font-medium"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
          </svg>
          Facebook
        </a>
      </div>
    </div>
  );
}
