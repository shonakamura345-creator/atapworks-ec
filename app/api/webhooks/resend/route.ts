import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    console.log("📧 Resend Webhook受信:");
    console.log("  イベントタイプ:", body.type);
    console.log("  データ:", JSON.stringify(body.data, null, 2));
    
    // イベントタイプに応じて処理
    switch (body.type) {
      case "email.sent":
        console.log("✅ メールが送信されました");
        console.log("  メールID:", body.data?.email_id || "不明");
        console.log("  送信先:", body.data?.to || "不明");
        break;
        
      case "email.delivered":
        console.log("✅ メールが配信されました");
        console.log("  メールID:", body.data?.email_id || "不明");
        console.log("  送信先:", body.data?.to || "不明");
        break;
        
      case "email.delivery_delayed":
        console.log("⚠️ メールの配信が遅延しています");
        console.log("  メールID:", body.data?.email_id || "不明");
        console.log("  送信先:", body.data?.to || "不明");
        break;
        
      case "email.complained":
        console.error("❌ メールが迷惑メールとして報告されました");
        console.log("  メールID:", body.data?.email_id || "不明");
        console.log("  送信先:", body.data?.to || "不明");
        break;
        
      case "email.bounced":
        console.error("❌ メールがバウンスしました");
        console.log("  メールID:", body.data?.email_id || "不明");
        console.log("  送信先:", body.data?.to || "不明");
        console.log("  バウンス理由:", body.data?.bounce_type || "不明");
        break;
        
      case "email.opened":
        console.log("📬 メールが開封されました");
        console.log("  メールID:", body.data?.email_id || "不明");
        console.log("  送信先:", body.data?.to || "不明");
        break;
        
      case "email.clicked":
        console.log("🔗 メール内のリンクがクリックされました");
        console.log("  メールID:", body.data?.email_id || "不明");
        console.log("  送信先:", body.data?.to || "不明");
        console.log("  クリックされたリンク:", body.data?.link || "不明");
        break;
        
      default:
        console.log("ℹ️ 未知のイベントタイプ:", body.type);
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Resend Webhook処理エラー:", error);
    console.error("  エラーメッセージ:", error?.message || "不明");
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}

