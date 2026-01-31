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
 * Stripeから注文情報を取得するAPI
 * GET /api/admin/order?orderId=xxx&password=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const orderId = searchParams.get("orderId");
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

    if (!orderId) {
      return NextResponse.json(
        { error: "注文IDが必要です" },
        { status: 400 }
      );
    }

    const stripe = getStripe();

    // Stripeからセッション情報を取得
    const session = await stripe.checkout.sessions.retrieve(orderId, {
      expand: ["line_items"],
    });

    if (!session) {
      return NextResponse.json(
        { error: "注文が見つかりません" },
        { status: 404 }
      );
    }

    // メタデータから配送先情報を取得
    const customerName = session.metadata?.customerName || "";
    const customerEmail = session.customer_email || session.metadata?.customerEmail || "";
    const customerPhone = session.metadata?.customerPhone || "";
    const customerPostalCode = session.metadata?.customerPostalCode || "";
    const customerPrefecture = session.metadata?.customerPrefecture || "";
    const customerCity = session.metadata?.customerCity || "";
    const customerAddress = session.metadata?.customerAddress || "";
    const customerBuilding = session.metadata?.customerBuilding || "";

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

    return NextResponse.json({
      orderId: session.id,
      customerName,
      customerEmail,
      shippingInfo: {
        name: customerName,
        phone: customerPhone,
        postalCode: customerPostalCode,
        prefecture: customerPrefecture,
        city: customerCity,
        address: customerAddress,
        building: customerBuilding,
      },
      orderItems,
      totalAmount,
      createdAt: new Date(session.created * 1000).toISOString(),
      paymentStatus: session.payment_status,
    });
  } catch (error: any) {
    console.error("注文情報取得エラー:", error);
    
    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        { error: "注文が見つかりません。注文IDを確認してください。" },
        { status: 404 }
      );
    }
    
    return NextResponse.json(
      { error: error.message || "注文情報の取得に失敗しました" },
      { status: 500 }
    );
  }
}
