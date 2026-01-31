import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-11-17.clover" as any,
  });
};

/**
 * Stripeから最近の注文一覧を取得するAPI
 * GET /api/admin/orders?password=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const password = searchParams.get("password");

    // パスワード認証
    const adminPassword = process.env.ADMIN_SHIPPING_PASSWORD;
    if (!adminPassword) {
      return NextResponse.json(
        { error: "管理者パスワードが設定されていません" },
        { status: 500 }
      );
    }

    if (password !== adminPassword) {
      return NextResponse.json(
        { error: "パスワードが正しくありません" },
        { status: 401 }
      );
    }

    const stripe = getStripe();

    // 最近の完了したチェックアウトセッションを取得（最大50件）
    const sessions = await stripe.checkout.sessions.list({
      limit: 50,
      expand: ["data.line_items"],
    });

    // 支払い完了したセッションのみフィルタリング
    const completedSessions = sessions.data.filter(
      (session) => session.payment_status === "paid"
    );

    // 注文情報を整形
    const orders = completedSessions.map((session) => {
      const customerName = session.metadata?.customerName || "名前なし";
      const customerEmail = session.customer_email || session.metadata?.customerEmail || "メールなし";
      
      // 注文アイテムを取得
      const lineItems = session.line_items?.data || [];
      const orderItems = lineItems.map((item) => {
        const unitAmount = item.price?.unit_amount || item.amount_total || 0;
        const quantity = item.quantity || 1;
        const product = item.price?.product;
        const productName =
          typeof product === "string"
            ? undefined
            : product?.deleted
              ? undefined
              : product?.name;
        return {
          name: item.description || productName || "商品",
          quantity: quantity,
          price: unitAmount,
        };
      });

      // 合計金額を計算
      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      return {
        orderId: session.id,
        customerName,
        customerEmail,
        orderItems,
        totalAmount,
        createdAt: new Date(session.created * 1000).toISOString(),
        shippingInfo: {
          name: customerName,
          phone: session.metadata?.customerPhone || "",
          postalCode: session.metadata?.customerPostalCode || "",
          prefecture: session.metadata?.customerPrefecture || "",
          city: session.metadata?.customerCity || "",
          address: session.metadata?.customerAddress || "",
          building: session.metadata?.customerBuilding || "",
        },
      };
    });

    return NextResponse.json({ orders });
  } catch (error: any) {
    console.error("注文一覧取得エラー:", error);
    return NextResponse.json(
      { error: error.message || "注文一覧の取得に失敗しました" },
      { status: 500 }
    );
  }
}
