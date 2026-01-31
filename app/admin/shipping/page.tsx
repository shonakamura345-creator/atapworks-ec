"use client";

import { useState, useEffect } from "react";

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

export default function ShippingAdminPage() {
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState("");

  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [trackingNumber, setTrackingNumber] = useState("");
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState("");
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [sendResult, setSendResult] = useState<{
    success: boolean;
    message: string;
  } | null>(null);

  // 注文一覧を取得
  const fetchOrders = async (pwd: string) => {
    setIsLoadingOrders(true);
    setOrdersError("");

    try {
      const response = await fetch(
        `/api/admin/orders?password=${encodeURIComponent(pwd)}`
      );
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setIsAuthenticated(false);
          setAuthError("パスワードが正しくありません");
        }
        setOrdersError(data.error || "注文一覧の取得に失敗しました");
        return;
      }

      setOrders(data.orders || []);
    } catch (error) {
      setOrdersError("通信エラーが発生しました");
    } finally {
      setIsLoadingOrders(false);
    }
  };

  // パスワード認証
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");

    if (!password.trim()) {
      setAuthError("パスワードを入力してください");
      return;
    }

    setIsLoggingIn(true);

    try {
      // パスワードを検証するために注文一覧を取得
      const response = await fetch(
        `/api/admin/orders?password=${encodeURIComponent(password)}`
      );
      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          setAuthError("パスワードが正しくありません");
        } else {
          setAuthError(data.error || "ログインに失敗しました");
        }
        return;
      }

      setIsAuthenticated(true);
      setOrders(data.orders || []);
    } catch (error) {
      setAuthError("通信エラーが発生しました");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // 発送メールを送信
  const handleSendShippingEmail = async (e: React.FormEvent) => {
    e.preventDefault();
    setSendResult(null);

    if (!selectedOrder) return;

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
          orderId: selectedOrder.orderId,
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
            🔐 発送メール管理
          </h1>
          <p className="text-gray-400 text-sm mb-6 text-center">
            管理者パスワードを入力してログインしてください
          </p>
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
                autoFocus
              />
            </div>
            {authError && (
              <p className="text-red-400 text-sm mb-4">{authError}</p>
            )}
            <button
              type="submit"
              disabled={isLoggingIn}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors"
            >
              {isLoggingIn ? "ログイン中..." : "ログイン"}
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ログイン後の画面
  return (
    <div className="min-h-screen bg-gray-900 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-white">
            📦 発送メール管理
          </h1>
          <button
            onClick={() => {
              setIsAuthenticated(false);
              setPassword("");
              setOrders([]);
              setSelectedOrder(null);
            }}
            className="text-gray-400 hover:text-white text-sm"
          >
            ログアウト
          </button>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* 注文一覧 */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-white">
                📋 注文一覧
              </h2>
              <button
                onClick={() => fetchOrders(password)}
                disabled={isLoadingOrders}
                className="text-blue-400 hover:text-blue-300 text-sm"
              >
                {isLoadingOrders ? "更新中..." : "🔄 更新"}
              </button>
            </div>

            {ordersError && (
              <p className="text-red-400 text-sm mb-4">{ordersError}</p>
            )}

            {isLoadingOrders ? (
              <div className="text-center py-8">
                <p className="text-gray-400">読み込み中...</p>
              </div>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-gray-400">注文がありません</p>
              </div>
            ) : (
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {orders.map((order) => (
                  <div
                    key={order.orderId}
                    onClick={() => {
                      setSelectedOrder(order);
                      setSendResult(null);
                      setTrackingNumber("");
                      setEstimatedDeliveryDate("");
                      setCustomMessage("");
                    }}
                    className={`p-4 rounded-lg cursor-pointer transition-colors ${
                      selectedOrder?.orderId === order.orderId
                        ? "bg-blue-900/50 border border-blue-500"
                        : "bg-gray-700 hover:bg-gray-600"
                    }`}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <p className="text-white font-medium">
                          {order.customerName}
                        </p>
                        <p className="text-gray-400 text-sm">
                          {order.customerEmail}
                        </p>
                      </div>
                      <p className="text-green-400 font-medium">
                        ¥{order.totalAmount.toLocaleString()}
                      </p>
                    </div>
                    <div className="flex justify-between items-center">
                      <p className="text-gray-500 text-xs">
                        {order.orderItems.map((item) => item.name).join(", ")}
                      </p>
                      <p className="text-gray-500 text-xs">
                        {new Date(order.createdAt).toLocaleDateString("ja-JP")}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 発送メール送信フォーム */}
          <div className="bg-gray-800 rounded-lg shadow-xl p-6">
            <h2 className="text-xl font-semibold text-white mb-4">
              ✉️ 発送メールを送信
            </h2>

            {!selectedOrder ? (
              <div className="text-center py-12">
                <p className="text-gray-400">
                  左の注文一覧から<br />注文を選択してください
                </p>
              </div>
            ) : (
              <>
                {/* 選択した注文の情報 */}
                <div className="bg-gray-700 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <p className="text-white font-medium text-lg">
                        {selectedOrder.customerName} 様
                      </p>
                      <p className="text-gray-400 text-sm">
                        {selectedOrder.customerEmail}
                      </p>
                    </div>
                    <p className="text-green-400 font-bold text-lg">
                      ¥{selectedOrder.totalAmount.toLocaleString()}
                    </p>
                  </div>
                  
                  <div className="border-t border-gray-600 pt-3 mt-3">
                    <p className="text-gray-400 text-sm mb-1">配送先</p>
                    <p className="text-gray-300 text-sm">
                      〒{selectedOrder.shippingInfo.postalCode}<br />
                      {selectedOrder.shippingInfo.prefecture}{" "}
                      {selectedOrder.shippingInfo.city}{" "}
                      {selectedOrder.shippingInfo.address}{" "}
                      {selectedOrder.shippingInfo.building}
                    </p>
                  </div>

                  <div className="border-t border-gray-600 pt-3 mt-3">
                    <p className="text-gray-400 text-sm mb-1">注文内容</p>
                    {selectedOrder.orderItems.map((item, index) => (
                      <p key={index} className="text-gray-300 text-sm">
                        {item.name} × {item.quantity}
                      </p>
                    ))}
                  </div>

                  {/* 納品書印刷ボタン */}
                  <div className="border-t border-gray-600 pt-3 mt-3">
                    <button
                      type="button"
                      onClick={() => {
                        window.open(
                          `/admin/invoice/${selectedOrder.orderId}`,
                          "_blank"
                        );
                      }}
                      className="w-full bg-gray-600 hover:bg-gray-500 text-white font-medium py-2 px-4 rounded-lg transition-colors text-sm"
                    >
                      🖨️ 納品書を印刷
                    </button>
                  </div>
                </div>

                {/* 発送情報入力フォーム */}
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
                      placeholder="日本郵便の追跡番号"
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
                      placeholder="お客様へのメッセージ（任意）"
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
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
