"use client";

import { useState, useEffect, use } from "react";

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type ShippingInfo = {
  name: string;
  phone: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
};

type Order = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  orderItems: OrderItem[];
  totalAmount: number;
  createdAt: string;
  shippingInfo: ShippingInfo;
};

export default function InvoicePage({
  params,
}: {
  params: Promise<{ orderId: string }>;
}) {
  const { orderId } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // パスワード認証
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password.trim()) {
      setError("パスワードを入力してください");
      return;
    }
    setIsAuthenticated(true);
    setError("");
  };

  // 注文情報を取得
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchOrder = async () => {
      try {
        const response = await fetch(
          `/api/admin/order?orderId=${encodeURIComponent(orderId)}&password=${encodeURIComponent(password)}`
        );
        const data = await response.json();

        if (!response.ok) {
          if (response.status === 401) {
            setIsAuthenticated(false);
            setError("パスワードが正しくありません");
          } else {
            setError(data.error || "注文情報の取得に失敗しました");
          }
          return;
        }

        setOrder(data);
      } catch (err) {
        setError("通信エラーが発生しました");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrder();
  }, [isAuthenticated, orderId, password]);

  // 印刷実行
  const handlePrint = () => {
    window.print();
  };

  // パスワード入力画面
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-xl font-bold text-gray-800 mb-4 text-center">
            🔐 納品書を表示
          </h1>
          <form onSubmit={handleLogin}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg mb-4"
              placeholder="管理者パスワード"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg"
            >
              表示
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ローディング
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>読み込み中...</p>
      </div>
    );
  }

  // エラー
  if (error || !order) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">{error || "注文が見つかりません"}</p>
      </div>
    );
  }

  const orderDate = new Date(order.createdAt).toLocaleDateString("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      {/* 印刷用スタイル */}
      <style jsx global>{`
        @media print {
          .no-print {
            display: none !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          .invoice-container {
            padding: 0 !important;
            max-width: 100% !important;
          }
        }
      `}</style>

      {/* 印刷ボタン（印刷時は非表示） */}
      <div className="no-print bg-gray-100 p-4 flex justify-center gap-4">
        <button
          onClick={handlePrint}
          className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg"
        >
          🖨️ 印刷する
        </button>
        <button
          onClick={() => window.close()}
          className="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg"
        >
          閉じる
        </button>
      </div>

      {/* 納品書本体 */}
      <div className="invoice-container max-w-2xl mx-auto p-8 bg-white">
        {/* ヘッダー */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">納 品 書</h1>
          <p className="text-gray-600">{orderDate}</p>
        </div>

        {/* お届け先 */}
        <div className="mb-8 p-4 border-b-2 border-gray-800">
          <p className="text-lg font-bold text-gray-800 mb-2">
            {order.shippingInfo.name} 様
          </p>
          <p className="text-gray-700">
            〒{order.shippingInfo.postalCode}
            <br />
            {order.shippingInfo.prefecture} {order.shippingInfo.city}{" "}
            {order.shippingInfo.address} {order.shippingInfo.building}
          </p>
        </div>

        {/* 注文番号 */}
        <div className="mb-6 text-right">
          <p className="text-sm text-gray-600">
            注文番号: {order.orderId.slice(-12)}
          </p>
        </div>

        {/* 商品一覧 */}
        <table className="w-full mb-8">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="text-left py-2 text-gray-800">商品名</th>
              <th className="text-right py-2 text-gray-800 w-20">数量</th>
              <th className="text-right py-2 text-gray-800 w-28">単価</th>
              <th className="text-right py-2 text-gray-800 w-28">金額</th>
            </tr>
          </thead>
          <tbody>
            {order.orderItems.map((item, index) => (
              <tr key={index} className="border-b border-gray-300">
                <td className="py-3 text-gray-800">{item.name}</td>
                <td className="py-3 text-right text-gray-800">
                  {item.quantity}
                </td>
                <td className="py-3 text-right text-gray-800">
                  ¥{item.price.toLocaleString()}
                </td>
                <td className="py-3 text-right text-gray-800">
                  ¥{(item.price * item.quantity).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t-2 border-gray-800">
              <td colSpan={3} className="py-3 text-right font-bold text-gray-800">
                合計金額
              </td>
              <td className="py-3 text-right font-bold text-xl text-gray-800">
                ¥{order.totalAmount.toLocaleString()}
              </td>
            </tr>
          </tfoot>
        </table>

        {/* 店舗情報 */}
        <div className="mt-12 pt-8 border-t border-gray-300 text-right">
          <p className="font-bold text-gray-800 mb-1">Sho建築士オンラインストア</p>
          <p className="text-sm text-gray-600">
            ご利用ありがとうございました
          </p>
        </div>
      </div>
    </>
  );
}
