"use client";

import Link from "next/link";
import { useCart } from "../contexts/CartContext";

const SHIPPING_FEE = 300;
const FREE_SHIPPING_THRESHOLD = 3000;

export default function CartPage() {
  const {
    items,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    clearCart,
  } = useCart();

  const subtotal = getTotalPrice();
  const shippingFee =
    subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-white p-6">
        <div className="mx-auto max-w-4xl">
          <h1 className="text-2xl font-bold mb-6 text-black">カート</h1>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-12 text-center">
            <p className="text-slate-600 mb-4">カートに商品がありません</p>
            <Link
              href="/#goods"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700"
            >
              商品を見る
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-4xl">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">カート</h1>
          <button
            onClick={clearCart}
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            カートを空にする
          </button>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {/* 商品一覧 */}
          <div className="md:col-span-2 space-y-4">
            {items.map((item) => (
              <div
                key={item.product.id}
                className="flex gap-4 rounded-2xl border border-slate-200 p-4"
              >
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900">
                    {item.product.name}
                  </h3>
                  <div className="mt-1 text-slate-600">
                    ¥{item.product.price.toLocaleString()}
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity - 1)
                      }
                      className="h-8 w-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    >
                      −
                    </button>
                    <span className="w-8 text-center text-slate-900">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() =>
                        updateQuantity(item.product.id, item.quantity + 1)
                      }
                      className="h-8 w-8 rounded border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                    >
                      +
                    </button>
                  </div>

                  <div className="w-24 text-right font-semibold text-slate-900">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-slate-400 hover:text-slate-600"
                    aria-label="削除"
                  >
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* 合計 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 h-fit">
            <h2 className="mb-4 font-semibold text-black">注文合計</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between font-semibold text-black">
                <span>小計</span>
                <span>¥{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-semibold text-black">
                <span>送料</span>
                <span>
                  {shippingFee === 0 ? (
                    <span className="text-green-600">無料</span>
                  ) : (
                    `¥${shippingFee.toLocaleString()}`
                  )}
                </span>
              </div>
              {subtotal < FREE_SHIPPING_THRESHOLD && (
                <div className="text-xs text-slate-500">
                  ¥
                  {(FREE_SHIPPING_THRESHOLD - subtotal).toLocaleString()}
                  以上で送料無料
                </div>
              )}
              <div className="mt-4 flex justify-between border-t border-slate-300 pt-4 text-lg font-semibold text-slate-900">
                <span>合計</span>
                <span>¥{total.toLocaleString()}</span>
              </div>
            </div>

            <Link
              href="/checkout"
              className="mt-6 block w-full rounded-xl bg-slate-900 px-6 py-3 text-center font-semibold text-white hover:bg-slate-800"
            >
              レジに進む
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

