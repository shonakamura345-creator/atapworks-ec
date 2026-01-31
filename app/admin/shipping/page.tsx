"use client";

import { useState } from "react";

type OrderInfo = {
  orderId: string;
  customerName: string;
  customerEmail: string;
  shippingInfo: {
    name: string;
    phone: string;
    postalCode: string;
    prefecture: string;
    city: string;
    address: string;
    building: string;
  };
  orderItems: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount: number;
  createdAt: string;
  paymentStatus: string;
};

export default function ShippingAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");

  const [orderId, setOrderId] = useState("");
  const [orderInfo, setOrderInfo] = useState<OrderInfo | null>(null);
  const [orderError, setOrderError] = useState("");
  const [isLoadingOrder, setIsLoadingOrder] = useState(false);

  const [trackingNumber, setTrackingNumber] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // パスワード認証
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!password.trim()) {
      setAuthError("パスワードを入力してください");
      return;
    }

    // パスワードを保存してログイン状態にする
    setIsAuthenticated(true);
  };

  // 注文情報を取得
  const handleFetchOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setOrderError("");
    setOrderInfo(null);
    setSendResult(null);

    if (!orderId.trim()) {
      setOrderError("注文IDを入力してください");
      return;
    }

    setIsLoadingOrder(true);

    try {
      const response = await fetch(
        `/api/admin/order?orderId=${encodeURIComponent(orderId)}&password=${encodeURIComponent(password)}`
      );
      const data = await response.json();

      if (!response.ok) {
        setOrderError(data.error || "注文情報の取得に失敗しました");
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
        return;
      }

      setOrderInfo(data);
    } catch (error) {
      setOrderError("通信エラーが発生しました");
    } finally {
      setIsLoadingOrder(false);
    }
  };

  // 発送メールを送信
  const handleSendShippingEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendResult(null);

    if (!trackingNumber.trim()) {
      setSendResult({ success: false, message: "追跡番号を入力してください" });
      return;
    }

    if (!estimatedDeliveryDate.trim()) {
      setSendResult({
        success: false,
        message: "お届け予定日を入力してください",
      });
      return;
    }

    setIsSending(true);

    try {
      const response = await fetch("/api/admin/shipping", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password,
          orderId,
          trackingNumber,
          estimatedDeliveryDate,
          customMessage: customMessage.trim() || undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setSendResult({
          success: false,
          message: data.error || "メール送信に失敗しました",
        });
        if (response.status === 401) {
          setIsAuthenticated(false);
        }
        return;
      }

      setSendResult({
        success: true,
        message: `発送メールを ${data.sentTo} に送信しました`,
      });

      // フォームをリセット
      setTrackingNumber("");
      setEstimatedDeliveryDate("");
      setCustomMessage("");
    } catch (error) {
      setSendResult({ success: false, message: "通信エラーが発生しました" });
    } finally {
      setIsSending(false);
    }
  };

  // ログイン前の画面
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-lg shadow-xl p-8 w-full max-w-md">
          <h1 className="text-2xl font-bold text-white mb-6 text-center">
            🔐 管理者ログイン
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label
                htmlFor="password"
                className="block text-gray-300 text-sm font-medium mb-2"
              >
                パスワード
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="管理者パスワードを入力"
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm mb-4">{authError}</p>
            )}
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              ログイン
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ログイン後の画面
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            📦 発送メール管理
          </h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword("");
              setOrderInfo(null);
            }}
            className="text-gray-400 hover:text-white text-sm"
          >
            ログアウト
          </button>
        </div>

        {/* 注文ID入力 */}
        <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
          <h2 className="text-xl font-semibold text-white mb-4">
            1. 注文情報を取得
          </h2>
          <form onSubmit={handleFetchOrder} className="flex gap-4">
            <input
              type="text"
              value={orderId}
              onChange={(e) => setOrderId(e.target.value)}
              className="flex-1 px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="注文ID（Stripe Session ID）を入力"
            />
            <button
              type="submit"
              disabled={isLoadingOrder}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-6 rounded-lg transition-colors whitespace-nowrap"
            >
              {isLoadingOrder ? "取得中..." : "取得"}
            </button>
          </form>
          {orderError && (
            <p className="text-red-400 text-sm mt-3">{orderError}</p>
          )}
          <p className="text-gray-500 text-sm mt-3">
            ※ 注文IDは管理者への通知メールに記載されています
          </p>
        </div>

        {/* 注文情報表示 */}
        {orderInfo && (
          <>
            <div className="bg-gray-800 rounded-lg shadow-xl p-6 mb-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                📋 注文情報
              </h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">お客様情報</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-white font-medium">
                      {orderInfo.customerName} 様
                    </p>
                    <p className="text-gray-300 text-sm">
                      {orderInfo.customerEmail}
                    </p>
                  </div>
                </div>
                <div>
                  <h3 className="text-gray-400 text-sm mb-2">配送先</h3>
                  <div className="bg-gray-700 rounded-lg p-4">
                    <p className="text-gray-300 text-sm">
                      〒{orderInfo.shippingInfo.postalCode}
                      <br />
                      {orderInfo.shippingInfo.prefecture}{" "}
                      {orderInfo.shippingInfo.city}{" "}
                      {orderInfo.shippingInfo.address}{" "}
                      {orderInfo.shippingInfo.building}
                      <br />
                      TEL: {orderInfo.shippingInfo.phone}
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-gray-400 text-sm mb-2">注文内容</h3>
                <div className="bg-gray-700 rounded-lg overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-gray-600">
                        <th className="text-left text-gray-300 text-sm font-medium px-4 py-3">
                          商品名
                        </th>
                        <th className="text-right text-gray-300 text-sm font-medium px-4 py-3">
                          数量
                        </th>
                        <th className="text-right text-gray-300 text-sm font-medium px-4 py-3">
                          金額
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {orderInfo.orderItems.map((item, index) => (
                        <tr key={index} className="border-t border-gray-600">
                          <td className="text-white px-4 py-3">{item.name}</td>
                          <td className="text-gray-300 text-right px-4 py-3">
                            {item.quantity}
                          </td>
                          <td className="text-gray-300 text-right px-4 py-3">
                            ¥{item.price.toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr className="border-t border-gray-500 bg-gray-600">
                        <td
                          colSpan={2}
                          className="text-white font-medium px-4 py-3"
                        >
                          合計
                        </td>
                        <td className="text-white font-bold text-right px-4 py-3">
                          ¥{orderInfo.totalAmount.toLocaleString()}
                        </td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>

              <div className="mt-4 flex gap-4 text-sm">
                <span className="text-gray-400">
                  注文日時:{" "}
                  <span className="text-gray-300">
                    {new Date(orderInfo.createdAt).toLocaleString("ja-JP")}
                  </span>
                </span>
                <span className="text-gray-400">
                  決済状況:{" "}
                  <span
                    className={
                      orderInfo.paymentStatus === "paid"
                        ? "text-green-400"
                        : "text-yellow-400"
                    }
                  >
                    {orderInfo.paymentStatus === "paid" ? "支払済み" : "未払い"}
                  </span>
                </span>
              </div>
            </div>

            {/* 発送メール送信フォーム */}
            <div className="bg-gray-800 rounded-lg shadow-xl p-6">
              <h2 className="text-xl font-semibold text-white mb-4">
                2. 発送メールを送信
              </h2>
              <form onSubmit={handleSendShippingEmail} className="space-y-4">
                <div>
                  <label
                    htmlFor="trackingNumber"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    追跡番号 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="trackingNumber"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="日本郵便の追跡番号を入力"
                  />
                </div>

                <div>
                  <label
                    htmlFor="estimatedDeliveryDate"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    お届け予定日 <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    id="estimatedDeliveryDate"
                    value={estimatedDeliveryDate}
                    onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="例: 2月3日（月）〜 2月5日（水）"
                  />
                </div>

                <div>
                  <label
                    htmlFor="customMessage"
                    className="block text-gray-300 text-sm font-medium mb-2"
                  >
                    カスタムメッセージ（任意）
                  </label>
                  <textarea
                    id="customMessage"
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                    placeholder="お客様へのメッセージを入力（任意）"
                  />
                </div>

                {sendResult && (
                  <div
                    className={`p-4 rounded-lg ${
                      sendResult.success
                        ? "bg-green-900/50 border border-green-700"
                        : "bg-red-900/50 border border-red-700"
                    }`}
                  >
                    <p
                      className={
                        sendResult.success ? "text-green-300" : "text-red-300"
                      }
                    >
                      {sendResult.success ? "✅ " : "❌ "}
                      {sendResult.message}
                    </p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSending}
                  className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 text-white font-medium py-4 px-6 rounded-lg transition-colors text-lg"
                >
                  {isSending ? "送信中..." : "📧 発送メールを送信"}
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
