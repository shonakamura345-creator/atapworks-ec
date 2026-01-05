import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { sendOrderConfirmationEmail, sendAdminNotificationEmail } from "@/app/lib/email";

const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(secretKey, {
    apiVersion: "2025-11-17.clover" as any,
  });
};

// GETリクエストに対して405エラーを返す
export async function GET(request: NextRequest) {
  return NextResponse.json(
    { error: "Method Not Allowed. This endpoint only accepts POST requests." },
    { status: 405 }
  );
}

export async function POST(request: NextRequest) {
  try {
    const stripe = getStripe();
    const body = await request.text();
    const signature = request.headers.get("stripe-signature");

    if (!signature) {
      return NextResponse.json(
        { error: "No signature provided" },
        { status: 400 }
      );
    }

    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
    if (!webhookSecret) {
      console.error("STRIPE_WEBHOOK_SECRET is not set");
      return NextResponse.json(
        { error: "Webhook secret not configured" },
        { status: 500 }
      );
    }

    let event: Stripe.Event;

    try {
      // Webhookの署名を検証
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err: any) {
      console.error("Webhook signature verification failed:", err.message);
      return NextResponse.json(
        { error: `Webhook Error: ${err.message}` },
        { status: 400 }
      );
    }

    // checkout.session.completedイベントを処理
    if (event.type === "checkout.session.completed") {
      const session = event.data.object as Stripe.Checkout.Session;

      // セッションから詳細情報を取得
      const sessionWithLineItems = await stripe.checkout.sessions.retrieve(
        session.id,
        {
          expand: ["line_items"],
        }
      );

      // メタデータから配送先情報を取得
      const customerName = session.metadata?.customerName || "";
      const customerEmail = session.customer_email || session.metadata?.customerEmail || "";
      const customerPhone = session.metadata?.customerPhone || "";
      const customerPostalCode = session.metadata?.customerPostalCode || "";
      const customerPrefecture = session.metadata?.customerPrefecture || "";
      const customerCity = session.metadata?.customerCity || "";
      const customerAddress = session.metadata?.customerAddress || "";
      const customerBuilding = session.metadata?.customerBuilding || "";
      const newsletter = session.metadata?.newsletter === "true";

      // 注文アイテムを取得
      const lineItems = sessionWithLineItems.line_items?.data || [];
      const orderItems = lineItems.map((item) => {
        // Stripeは金額を最小通貨単位（日本円の場合は円単位）で保存
        // amount_totalは合計金額、unit_amountは単価
        const unitAmount = item.price?.unit_amount || item.amount_total || 0;
        const quantity = item.quantity || 1;
        // productが文字列（ID）の場合とオブジェクトの場合がある
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
          price: unitAmount, // 既に円単位で保存されている
        };
      });

      // 合計金額を計算（各商品の合計から正確に計算）
      const totalAmount = orderItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );

      // 顧客への注文確認メールを送信
      console.log("📧 顧客への注文確認メールを送信します:");
      console.log("  顧客メールアドレス:", customerEmail);
      console.log("  顧客名:", customerName);
      console.log("  注文ID:", session.id);
      console.log("  注文アイテム数:", orderItems.length);
      console.log("  合計金額:", totalAmount);
      
      try {
        await sendOrderConfirmationEmail({
          customerEmail,
          customerName,
          orderItems,
          totalAmount: totalAmount, // 既に円単位
          shippingInfo: {
            name: customerName,
            phone: customerPhone,
            postalCode: customerPostalCode,
            prefecture: customerPrefecture,
            city: customerCity,
            address: customerAddress,
            building: customerBuilding,
          },
          orderId: session.id,
        });
        console.log("✅ 顧客へのメール送信処理が完了しました");
      } catch (emailError: any) {
        console.error("❌ 顧客へのメール送信でエラーが発生しました:");
        console.error("  エラーメッセージ:", emailError?.message || emailError);
        console.error("  エラースタック:", emailError?.stack || "スタック情報なし");
        // メール送信エラーでもWebhookは成功として返す
      }

      // 管理者への通知メールを送信
      console.log("📧 管理者への通知メールを送信します");
      console.log("  管理者メールアドレス:", process.env.ADMIN_EMAIL || "未設定");
      console.log("  顧客メールアドレス:", customerEmail);
      console.log("  注文ID:", session.id);
      
      try {
        await sendAdminNotificationEmail({
          customerEmail,
          customerName,
          orderItems,
          totalAmount: totalAmount, // 既に円単位
          shippingInfo: {
            name: customerName,
            phone: customerPhone,
            postalCode: customerPostalCode,
            prefecture: customerPrefecture,
            city: customerCity,
            address: customerAddress,
            building: customerBuilding,
          },
          orderId: session.id,
        });
        console.log("✅ 管理者へのメール送信処理が完了しました");
      } catch (emailError: any) {
        console.error("❌ 管理者へのメール送信でエラーが発生しました:");
        console.error("  エラーメッセージ:", emailError?.message || emailError);
        console.error("  エラースタック:", emailError?.stack || "スタック情報なし");
        // メール送信エラーでもWebhookは成功として返す
      }
    }

    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return NextResponse.json(
      { error: error.message || "Webhook handler failed" },
      { status: 500 }
    );
  }
}

