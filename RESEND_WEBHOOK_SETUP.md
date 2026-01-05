# ResendのWebhook設定ガイド

## ResendのWebhookを設定する場合

ResendのWebhookを設定することで、メール送信の詳細な情報を取得できます。

---

## ステップ1: Webhookエンドポイントを作成

まず、ResendのWebhookを受け取るエンドポイントを作成します。

### ファイル: `app/api/webhooks/resend/route.ts`

```typescript
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
        console.log("  メールID:", body.data.email_id);
        console.log("  送信先:", body.data.to);
        break;
        
      case "email.delivered":
        console.log("✅ メールが配信されました");
        console.log("  メールID:", body.data.email_id);
        console.log("  送信先:", body.data.to);
        break;
        
      case "email.delivery_delayed":
        console.log("⚠️ メールの配信が遅延しています");
        console.log("  メールID:", body.data.email_id);
        console.log("  送信先:", body.data.to);
        break;
        
      case "email.complained":
        console.error("❌ メールが迷惑メールとして報告されました");
        console.log("  メールID:", body.data.email_id);
        console.log("  送信先:", body.data.to);
        break;
        
      case "email.bounced":
        console.error("❌ メールがバウンスしました");
        console.log("  メールID:", body.data.email_id);
        console.log("  送信先:", body.data.to);
        console.log("  バウンス理由:", body.data.bounce_type);
        break;
        
      case "email.opened":
        console.log("📬 メールが開封されました");
        console.log("  メールID:", body.data.email_id);
        console.log("  送信先:", body.data.to);
        break;
        
      case "email.clicked":
        console.log("🔗 メール内のリンクがクリックされました");
        console.log("  メールID:", body.data.email_id);
        console.log("  送信先:", body.data.to);
        console.log("  クリックされたリンク:", body.data.link);
        break;
        
      default:
        console.log("ℹ️ 未知のイベントタイプ:", body.type);
    }
    
    return NextResponse.json({ received: true });
  } catch (error: any) {
    console.error("❌ Resend Webhook処理エラー:", error);
    return NextResponse.json(
      { error: error.message || "Webhook processing failed" },
      { status: 500 }
    );
  }
}
```

---

## ステップ2: Resend DashboardでWebhookを設定

1. **Resend Dashboard**にログイン
2. 左側のメニューから「**Webhooks**」をクリック
3. 「**Create Webhook**」または「**Add Webhook**」をクリック

### Webhook設定

- **Endpoint URL**: `https://atapworks.co.jp/api/webhooks/resend`
- **Events**（イベント）: 以下のイベントを選択
  - ✅ `email.sent` - メールが送信された
  - ✅ `email.delivered` - メールが配信された
  - ✅ `email.delivery_delayed` - メールの配信が遅延した
  - ✅ `email.complained` - メールが迷惑メールとして報告された
  - ✅ `email.bounced` - メールがバウンスした
  - ✅ `email.opened` - メールが開封された（オプション）
  - ✅ `email.clicked` - メール内のリンクがクリックされた（オプション）

4. 「**Create Webhook**」をクリック

---

## ステップ3: コードをデプロイ

Webhookエンドポイントのコードをデプロイします：

```bash
git add app/api/webhooks/resend/route.ts
git commit -m "Resend Webhookエンドポイントを追加"
git push origin main
```

Vercelが自動的にデプロイします。

---

## ステップ4: Webhookの動作確認

### 4-1. テストメールを送信

1. サイトでテスト購入を実行
2. メールが送信される

### 4-2. Vercelのログを確認

1. Vercel Dashboard → Functions → `/api/webhooks/resend` を選択
2. ログを確認

**正常な場合のログ**：
```
📧 Resend Webhook受信:
  イベントタイプ: email.sent
  データ: {...}
✅ メールが送信されました
  メールID: [メールID]
  送信先: [メールアドレス]
```

**エラーの場合のログ**：
```
📧 Resend Webhook受信:
  イベントタイプ: email.bounced
  データ: {...}
❌ メールがバウンスしました
  メールID: [メールID]
  送信先: [メールアドレス]
  バウンス理由: [理由]
```

---

## メリット

### 1. メール送信の詳細な追跡

- メールが実際に送信されたか確認
- メールが配信されたか確認
- メールがバウンスしたか確認

### 2. エラーの詳細な把握

- バウンスの理由を確認
- 迷惑メールとして報告された場合の通知
- 配信遅延の通知

### 3. リアルタイムの通知

- メール送信の成功/失敗をリアルタイムで通知
- メールの開封やクリックをリアルタイムで通知

---

## 注意事項

### ResendのWebhookは必須ではない

- メール送信自体には不要
- メール送信の詳細な追跡が必要な場合にのみ設定

### 優先すべき確認事項

1. **StripeのWebhook**が届いているか
2. **Vercelのログ**でエラーが発生していないか
3. **環境変数**が正しく設定されているか
4. **Resend Dashboard**でメールが送信されているか

---

## まとめ

ResendのWebhookは、メール送信の詳細な追跡に有用ですが、**メール送信自体には必須ではありません**。

まずは、基本的な確認（Stripe Webhook、環境変数、Vercelログ）を優先してください。

それでも問題が解決しない場合、またはメール送信の詳細な追跡が必要な場合は、ResendのWebhookを設定してください。

