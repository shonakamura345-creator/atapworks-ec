"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function AboutPage() {
  // ページ読み込み時にスクロール位置をトップにリセット（スムーズスクロールなし）
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
  }, []);

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-900"
        >
          ← ホームに戻る
        </Link>

        <h1 className="text-3xl font-bold text-slate-900 mb-8">
          会社情報
        </h1>

        <div className="space-y-6 text-sm text-slate-700">
          <dl className="space-y-4">
              <div>
                <dt className="font-semibold text-slate-900 mb-1">会社名</dt>
                <dd className="text-slate-600">
                  株式会社ATAP Works
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">屋号</dt>
                <dd className="text-slate-600">
                  Sho建築士オンラインストア
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">代表者</dt>
                <dd className="text-slate-600">
                  中村 奨
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">設立年月日</dt>
                <dd className="text-slate-600">
                  2025年11月22日
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">資本金</dt>
                <dd className="text-slate-600">
                  100万円
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">事業内容</dt>
                <dd className="text-slate-600">
                  建築に関するメディアの企画、制作及び運営
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">従業員数</dt>
                <dd className="text-slate-600">
                  10名（業務委託含む）
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">所在地</dt>
                <dd className="text-slate-600">
                  〒150-0002<br />
                  東京都渋谷区渋谷2丁目19-19<br />
                  ワコー宮益坂ビル5階
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">電話番号</dt>
                <dd className="text-slate-600">
                  070-8402-3817
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-900 mb-1">メールアドレス</dt>
                <dd className="text-slate-600">
                  info.shokenchikushi@gmail.com
                </dd>
              </div>
          </dl>
        </div>
      </div>
    </main>
  );
}

