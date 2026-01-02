"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function LegalPage() {
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
          特定商取引法に基づく表記
        </h1>

        <div className="space-y-6 text-sm text-slate-700">
          <dl className="space-y-4">
            <div>
              <dt className="font-semibold text-slate-900 mb-1">販売事業者名</dt>
              <dd className="text-slate-600">
                株式会社ATAP Works（屋号：Sho建築士オンラインストア）
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900 mb-1">運営責任者</dt>
              <dd className="text-slate-600">
                中村 奨（代表者）
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
            <div>
              <dt className="font-semibold text-slate-900 mb-1">販売価格</dt>
              <dd className="text-slate-600">
                各商品ページに記載の価格
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900 mb-1">支払い方法</dt>
              <dd className="text-slate-600">
                クレジットカード決済（Stripe経由）
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900 mb-1">商品の引き渡し時期</dt>
              <dd className="text-slate-600">
                ご注文確定後、2〜3日以内に発送
              </dd>
            </div>
            <div>
              <dt className="font-semibold text-slate-900 mb-1">返品・交換について</dt>
              <dd className="text-slate-600">
                商品の性質上、返品・交換はお受けできません。不良品の場合はご連絡ください。
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </main>
  );
}
