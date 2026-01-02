import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { products } from "@/app/data/products";

// Stripeインスタンスは環境変数が設定されている場合のみ初期化
const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) {
    throw new Error("STRIPE_SECRET_KEY is not set");
  }
  return new Stripe(secretKey, {
    apiVersion: "2024-11-20.acacia",
  });
};

const SHIPPING_FEE = 300;
const FREE_SHIPPING_THRESHOLD = 3000;

export async function POST(request: NextRequest) {
  try {
    // Stripeインスタンスを取得（環境変数の確認も含む）
    const stripe = getStripe();

    const body = await request.json();
    const { items, customerInfo } = body;

    if (!items || items.length === 0) {
      return NextResponse.json(
        { error: "カートが空です" },
        { status: 400 }
      );
    }

    // カート内の商品をStripeのline_items形式に変換
    const lineItems = items.map((item: { productId: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.productId);
      if (!product) {
        throw new Error(`商品が見つかりません: ${item.productId}`);
      }

      return {
        price_data: {
          currency: "jpy",
          product_data: {
            name: product.name,
            description: product.description || "",
          },
          unit_amount: product.price,
        },
        quantity: item.quantity,
      };
    });

    // 送料を計算
    const subtotal = items.reduce((sum: number, item: { productId: string; quantity: number }) => {
      const product = products.find((p) => p.id === item.productId);
      return sum + (product?.price || 0) * item.quantity;
    }, 0);

    const shippingFee = subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_FEE;

    // 送料がある場合は送料を追加
    if (shippingFee > 0) {
      lineItems.push({
        price_data: {
          currency: "jpy",
          product_data: {
            name: "送料",
          },
          unit_amount: shippingFee,
        },
        quantity: 1,
      });
    }

    // Stripe Checkout Sessionを作成
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://atapworks.co.jp"}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL || "https://atapworks.co.jp"}/cart`,
      customer_email: customerInfo?.email,
      metadata: {
        customerName: customerInfo?.name || "",
        customerPhone: customerInfo?.phone || "",
        customerPostalCode: customerInfo?.postalCode || "",
        customerPrefecture: customerInfo?.prefecture || "",
        customerCity: customerInfo?.city || "",
        customerAddress: customerInfo?.address || "",
        customerBuilding: customerInfo?.building || "",
        newsletter: customerInfo?.newsletter ? "true" : "false",
      },
    });

    return NextResponse.json({ sessionId: session.id });
  } catch (error: any) {
    console.error("Stripe Checkout Session作成エラー:", error);
    const errorMessage =
      error?.message || "決済セッションの作成に失敗しました";
    console.error("詳細エラー:", errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: 500 }
    );
  }
}

