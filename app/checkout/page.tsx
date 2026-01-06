"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "../contexts/CartContext";

const SHIPPING_FEE = 300;
const FREE_SHIPPING_THRESHOLD = 3000;

const PREFECTURES = [
  "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
  "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
  "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県", "岐阜県",
  "静岡県", "愛知県", "三重県", "滋賀県", "京都府", "大阪府", "兵庫県",
  "奈良県", "和歌山県", "鳥取県", "島根県", "岡山県", "広島県", "山口県",
  "徳島県", "香川県", "愛媛県", "高知県", "福岡県", "佐賀県", "長崎県",
  "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県"
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotalPrice, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    postalCode: "",
    prefecture: "",
    city: "",
    address: "",
    building: "",
    newsletter: false,
  });

  const subtotal = getTotalPrice();
  const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;
  const total = subtotal + shippingFee;

  // カートが空の場合はカートページにリダイレクト
  useEffect(() => {
    if (items.length === 0) {
      router.push("/cart");
    }
  }, [items.length, router]);

  // カートが空の場合は何も表示しない
  if (items.length === 0) {
    return null;
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    // エラーをクリア
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // 郵便番号から住所を自動入力
  const handlePostalCodeChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let value = e.target.value.replace(/[^0-9-]/g, ""); // 数字とハイフンのみ許可
    const postalCode = value.replace(/-/g, "");
    
    // ハイフンを自動挿入
    if (postalCode.length <= 3) {
      value = postalCode;
    } else if (postalCode.length <= 7) {
      value = `${postalCode.slice(0, 3)}-${postalCode.slice(3)}`;
    } else {
      value = `${postalCode.slice(0, 3)}-${postalCode.slice(3, 7)}`;
    }
    
    setFormData((prev) => ({
      ...prev,
      postalCode: value,
    }));
    
    // エラーをクリア
    if (errors.postalCode) {
      setErrors((prev) => ({ ...prev, postalCode: "" }));
    }
    
    // 郵便番号が7桁になったら住所検索
    if (postalCode.length === 7) {
      try {
        const response = await fetch(
          `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${postalCode}`
        );
        const data = await response.json();
        
        if (data.status === 200 && data.results && data.results[0]) {
          const result = data.results[0];
          setFormData((prev) => ({
            ...prev,
            postalCode: value,
            prefecture: result.address1 || "",
            city: result.address2 || "",
            address: result.address3 || "",
          }));
          
          // エラーをクリア
          if (errors.prefecture) {
            setErrors((prev) => ({ ...prev, prefecture: "" }));
          }
          if (errors.city) {
            setErrors((prev) => ({ ...prev, city: "" }));
          }
        }
      } catch (error) {
        console.error("郵便番号検索エラー:", error);
      }
    }
  };

  // テスト用データで自動入力
  const fillTestData = () => {
    setFormData({
      name: "テスト 太郎",
      email: "sho.nakamura345@gmail.com",
      phone: "090-1234-5678",
      postalCode: "100-0001",
      prefecture: "東京都",
      city: "千代田区",
      address: "千代田1-1-1",
      building: "テストビル 101",
      newsletter: false,
    });
    setErrors({});
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "お名前を入力してください";
    }
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "有効なメールアドレスを入力してください";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "電話番号を入力してください";
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "郵便番号を入力してください";
    } else if (!/^\d{3}-?\d{4}$/.test(formData.postalCode)) {
      newErrors.postalCode = "正しい郵便番号を入力してください（例: 123-4567）";
    }
    if (!formData.prefecture) {
      newErrors.prefecture = "都道府県を選択してください";
    }
    if (!formData.city.trim()) {
      newErrors.city = "市区町村を入力してください";
    }
    if (!formData.address.trim()) {
      newErrors.address = "番地を入力してください";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // カート内の商品をAPI用の形式に変換
      const checkoutItems = items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
      }));

      // Stripe Checkout Sessionを作成
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          items: checkoutItems,
          customerInfo: {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            postalCode: formData.postalCode,
            prefecture: formData.prefecture,
            city: formData.city,
            address: formData.address,
            building: formData.building,
            newsletter: formData.newsletter,
          },
        }),
      });

      if (!response.ok) {
        let errorMessage = "決済セッションの作成に失敗しました";
        try {
          // レスポンスをテキストとして読み取る
          const text = await response.text();
          try {
            // JSONとしてパースを試みる
            const error = JSON.parse(text);
            errorMessage = error.error || errorMessage;
          } catch (parseError) {
            // JSON解析に失敗した場合（HTMLが返ってきた場合など）
            console.error("APIレスポンス（JSON以外）:", text.substring(0, 200));
            errorMessage = `サーバーエラー (${response.status}): ${response.statusText}`;
          }
        } catch (e) {
          errorMessage = `サーバーエラー (${response.status}): ${response.statusText}`;
        }
        throw new Error(errorMessage);
      }

      const { sessionId } = await response.json();

      // Stripe Checkoutページにリダイレクト
      const stripe = await import("@stripe/stripe-js").then((mod) =>
        mod.loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)
      );

      if (stripe) {
        const { error } = await stripe.redirectToCheckout({ sessionId });
        if (error) {
          throw new Error(error.message);
        }
      }
    } catch (error) {
      console.error("決済エラー:", error);
      alert(
        error instanceof Error
          ? error.message
          : "決済処理中にエラーが発生しました"
      );
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/cart"
          className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-900"
        >
          ← カートに戻る
        </Link>

        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-black">チェックアウト</h1>
          {/* 開発環境でのみテスト用ボタンを表示 */}
          {process.env.NODE_ENV === "development" && (
            <button
              type="button"
              onClick={fillTestData}
              disabled={isSubmitting}
              className="rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 disabled:bg-slate-100 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              テストデータを入力
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="grid gap-8 md:grid-cols-3" noValidate>
          {/* 配送先情報 */}
          <div className="md:col-span-2">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="mb-6 text-xl font-semibold text-black">配送先情報</h2>

              <div className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    お名前 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border px-4 py-2 text-black placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                      errors.name
                        ? "border-red-300"
                        : "border-slate-300"
                    } focus:border-slate-900 focus:outline-none`}
                    placeholder="山田 太郎"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-500">{errors.name}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    メールアドレス <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border px-4 py-2 text-black placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                      errors.email
                        ? "border-red-300"
                        : "border-slate-300"
                    } focus:border-slate-900 focus:outline-none`}
                    placeholder="example@email.com"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    電話番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border px-4 py-2 text-black placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                      errors.phone
                        ? "border-red-300"
                        : "border-slate-300"
                    } focus:border-slate-900 focus:outline-none`}
                    placeholder="09012345678"
                  />
                  {errors.phone && (
                    <p className="mt-1 text-sm text-red-500">{errors.phone}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="postalCode"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    郵便番号 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handlePostalCodeChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border px-4 py-2 text-black placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                      errors.postalCode
                        ? "border-red-300"
                        : "border-slate-300"
                    } focus:border-slate-900 focus:outline-none`}
                    placeholder="123-4567"
                    maxLength={8}
                  />
                  {errors.postalCode && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.postalCode}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="prefecture"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    都道府県 <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="prefecture"
                    name="prefecture"
                    value={formData.prefecture}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border px-4 py-2 text-black disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                      errors.prefecture
                        ? "border-red-300"
                        : "border-slate-300"
                    } focus:border-slate-900 focus:outline-none`}
                  >
                    <option value="">選択してください</option>
                    {PREFECTURES.map((pref) => (
                      <option key={pref} value={pref}>
                        {pref}
                      </option>
                    ))}
                  </select>
                  {errors.prefecture && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.prefecture}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    市区町村 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border px-4 py-2 text-black placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                      errors.city
                        ? "border-red-300"
                        : "border-slate-300"
                    } focus:border-slate-900 focus:outline-none`}
                    placeholder="渋谷区"
                  />
                  {errors.city && (
                    <p className="mt-1 text-sm text-red-500">{errors.city}</p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    番地 <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className={`w-full rounded-lg border px-4 py-2 text-black placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed ${
                      errors.address
                        ? "border-red-300"
                        : "border-slate-300"
                    } focus:border-slate-900 focus:outline-none`}
                    placeholder="1-2-3"
                  />
                  {errors.address && (
                    <p className="mt-1 text-sm text-red-500">
                      {errors.address}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="building"
                    className="mb-1 block text-sm font-semibold text-black"
                  >
                    建物名・部屋番号
                  </label>
                  <input
                    type="text"
                    id="building"
                    name="building"
                    value={formData.building}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full rounded-lg border border-slate-300 px-4 py-2 text-black placeholder:text-slate-400 disabled:bg-slate-100 disabled:text-slate-500 disabled:cursor-not-allowed focus:border-slate-900 focus:outline-none"
                    placeholder="マンション名 101号室"
                  />
                </div>

                <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      name="newsletter"
                      checked={formData.newsletter}
                      onChange={handleChange}
                      disabled={isSubmitting}
                      className="mt-1 h-4 w-4 cursor-pointer rounded border-slate-300 text-slate-900 focus:ring-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                    <div className="text-sm font-medium text-slate-900">
                      Sho建築士からの今後のイベント情報や最新情報をお知らせするメールマガジンに登録しますか？
                    </div>
                  </label>
                </div>
              </div>
            </div>
          </div>

          {/* 注文確認 */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6 h-fit">
            <h2 className="mb-4 font-semibold text-black">注文内容</h2>

            <div className="mb-4 space-y-3">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex justify-between text-sm"
                >
                  <div className="flex-1">
                    <div className="font-medium text-slate-900">
                      {item.product.name}
                    </div>
                    <div className="text-slate-600">
                      ¥{item.product.price.toLocaleString()} × {item.quantity}
                    </div>
                  </div>
                  <div className="ml-4 font-semibold text-slate-900">
                    ¥{(item.product.price * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-2 border-t border-slate-300 pt-4 text-sm">
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
              <div className="mt-4 flex justify-between border-t border-slate-300 pt-4 text-lg font-semibold text-slate-900">
                <span>合計</span>
                <span>¥{total.toLocaleString()}</span>
              </div>
            </div>

            {/* 銀行振込についての案内 */}
            <div className="mt-4 rounded-lg border border-green-200 bg-green-50 p-4">
              <div className="flex items-start gap-3">
                <svg
                  className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <div className="text-sm text-green-900">
                  <p className="font-semibold mb-1">銀行振込が利用可能になりました</p>
                  <p className="text-green-800">
                    クレジットカードに加えて、銀行振込でのお支払いも可能です。決済画面でお選びいただけます。
                  </p>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 w-full rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white hover:bg-slate-800 disabled:bg-slate-400 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  処理中...
                </span>
              ) : (
                "注文を確定する"
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}

