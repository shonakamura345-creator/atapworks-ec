# Webhook 307リダイレクトエラーの修正

## 問題

Webhookのレスポンスコードが `307`（リダイレクト）になっています。

**レスポンス**:
```json
{
  "redirect": "https://www.atapworks.co.jp/api/webhooks/stripe",
  "status": "307",
}
```

## 原因

Stripe Dashboardで設定されているWebhookエンドポイントURLが `https://www.atapworks.co.jp/api/webhooks/stripe`（`www`付き）になっているか、または `https://atapworks.co.jp/api/webhooks/stripe` から `www`付きのURLにリダイレクトされている可能性があります。

**問題点**:
- WebhookエンドポイントURLが `www`付きと`www`なしで不一致
- リダイレクトが発生しているため、Webhookが正常に処理されない

---

## 解決方法

### ステップ1: Stripe DashboardでWebhookエンドポイントURLを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイント（`energetic-glow`）をクリック
3. 「送信先を編集」をクリック
4. エンドポイントURLを確認

**確認ポイント**:
- エンドポイントURLが `https://www.atapworks.co.jp/api/webhooks/stripe` になっていないか確認
- エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認

---

### ステップ2: WebhookエンドポイントURLを修正

**方法1: 既存のエンドポイントを編集**

1. Stripe Dashboard → Webhook → エンドポイント → 「送信先を編集」をクリック
2. エンドポイントURLを `https://atapworks.co.jp/api/webhooks/stripe` に変更（`www`なし）
3. 「保存」をクリック

**方法2: 新しいエンドポイントを作成（推奨）**

1. Stripe Dashboard → Webhook → 既存のエンドポイントを削除
2. 「イベントの送信先を作成する」をクリック
3. 以下の情報を入力：
   - **イベントを選択**: `checkout.session.completed`
   - **エンドポイントURL**: `https://atapworks.co.jp/api/webhooks/stripe`（`www`なし、重要！）
   - **APIバージョン**: `2025-11-17.clover`
4. 「送信先を作成する」をクリック
5. **Webhookシークレットをコピー**（`whsec_...` で始まる）

---

### ステップ3: Vercelの環境変数を更新

新しいWebhookシークレットをVercelの環境変数に設定してください。

**手順**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `STRIPE_WEBHOOK_SECRET` を探す
3. 「編集」をクリック
4. 新しいWebhookシークレットを貼り付け
5. 「Save」をクリック
6. **再デプロイ**（重要！）

---

### ステップ4: テスト購入を再実行

1. サイト（`https://atapworks.co.jp`）でテスト購入を実行
2. Stripe Dashboard → Webhook → 「最新のイベント」タブを確認
3. レスポンスコードが `200` になっているか確認
4. Vercel Dashboardのログを確認
5. メールが届くか確認

---

## 重要なポイント

### `www`付きと`www`なしの違い

- ❌ `https://www.atapworks.co.jp/api/webhooks/stripe` - リダイレクトが発生する可能性
- ✅ `https://atapworks.co.jp/api/webhooks/stripe` - 正しいURL（`www`なし）

**推奨**: `www`なしのURLを使用してください。

---

## 確認手順

### 1. Stripe Dashboardで確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認（`www`なし）

### 2. テスト購入を実行

1. サイトでテスト購入を実行
2. Stripe Dashboard → Webhook → 「最新のイベント」タブを確認
3. レスポンスコードが `200` になっているか確認

### 3. Vercel Dashboardでログを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

---

## まとめ

1. ⏳ **Stripe DashboardでWebhookエンドポイントURLを修正**（`www`なしのURLに変更）
2. ⏳ **WebhookシークレットをVercelの環境変数に設定**
3. ⏳ **再デプロイ**
4. ⏳ **テスト購入を再実行**
5. ⏳ **レスポンスコードが `200` になっているか確認**

まず、**Stripe DashboardでWebhookエンドポイントURLを `https://atapworks.co.jp/api/webhooks/stripe`（`www`なし）に修正**してください。

