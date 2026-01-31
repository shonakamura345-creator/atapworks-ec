import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendShippingNotificationEmail } from "@/app/lib/email";

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
 * 発送メールを送信するAPI
 * POST /api/admin/shipping
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      password,
      orderId,
      trackingNumber,
      estimatedDeliveryDate,
      customMessage,
    } = body;

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

    // 必須パラメータのチェック
    if (!orderId) {
      return NextResponse.json(
        { error: "注文IDが必要です" },
        { status: 400 }
      );
    }

    if (!trackingNumber) {
      return NextResponse.json(
        { error: "追跡番号が必要です" },
        { status: 400 }
      );
    }

    if (!estimatedDeliveryDate) {
      return NextResponse.json(
        { error: "お届け予定日が必要です" },
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

    if (!customerEmail) {
      return NextResponse.json(
        { error: "顧客のメールアドレスが見つかりません" },
        { status: 400 }
      );
    }

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

    // 発送メールを送信
    const result = await sendShippingNotificationEmail({
      customerEmail,
      customerName,
      orderItems,
      totalAmount,
      shippingInfo: {
        name: customerName,
        phone: customerPhone,
        postalCode: customerPostalCode,
        prefecture: customerPrefecture,
        city: customerCity,
        address: customerAddress,
        building: customerBuilding,
      },
      orderId,
      trackingNumber,
      estimatedDeliveryDate,
      customMessage,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: result.error || "メール送信に失敗しました" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "発送メールを送信しました",
      emailId: result.emailId,
      sentTo: customerEmail,
    });
  } catch (error: any) {
    console.error("発送メール送信エラー:", error);

    if (error.type === "StripeInvalidRequestError") {
      return NextResponse.json(
        { error: "注文が見つかりません。注文IDを確認してください。" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: error.message || "発送メールの送信に失敗しました" },
      { status: 500 }
    );
  }
}
