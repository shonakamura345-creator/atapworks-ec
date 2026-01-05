# Stripe Webhookエラーの分析

## 確認された問題

StripeのWebhookイベントを確認したところ、以下の点が判明しました：

### 1. APIバージョンの不一致

**Stripeが送信しているAPIバージョン**:
- `"api_version": "2025-11-17.clover"`

**コードで使用しているAPIバージョン**:
- `apiVersion: "2025-02-24.acacia"`

### 2. pending_webhooks: 2

イベントデータに `"pending_webhooks": 2` が含まれています。これは、このイベントに対して2つのWebhookが保留中であることを示しています。Webhookが正常に処理されていない可能性があります。

---

## 確認すべきこと

### 1. Stripe Dashboardでレスポンスコードを確認

**確認方法**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブで、イベントID `evt_1Sm8EXRy4xQUBP6TKFVQsIni` を探す
4. レスポンスコードを確認：
   - ✅ `200` → Webhookは正常に処理された
   - ❌ `400` や `500` → エラーが発生している
5. 「レスポンス本文」をクリックしてエラーメッセージを確認

---

### 2. Vercel Dashboardでログを確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認ポイント**:
- ✅ `POST /api/webhooks/stripe` が表示されているか
- ✅ エラーメッセージが表示されていないか
- ✅ メール送信のログが表示されているか

---

## 考えられる原因

### 原因1: APIバージョンの不一致

**症状**: Webhookが正常に処理されない

**解決方法**: APIバージョンを最新のものに更新（ただし、Webhookの受信自体はAPIバージョンに依存しない）

---

### 原因2: Webhookシークレットの不一致

**症状**: 署名検証が失敗する

**確認方法**:
1. Stripe Dashboard → Webhook → エンドポイント → 「シークレット」をクリック
2. Vercel Dashboard → Settings → Environment Variables → `STRIPE_WEBHOOK_SECRET` と一致しているか確認

**解決方法**:
1. Stripe DashboardでWebhookシークレットをコピー
2. Vercel Dashboard → Settings → Environment Variables → `STRIPE_WEBHOOK_SECRET` を更新
3. 再デプロイ

---

### 原因3: WebhookエンドポイントURLの不一致

**症状**: Webhookが届かない、またはエラーが発生する

**確認方法**:
1. Stripe Dashboard → Webhook → エンドポイント → 「設定」をクリック
2. エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認

**解決方法**:
1. エンドポイントURLを `https://atapworks.co.jp/api/webhooks/stripe` に設定
2. 「保存」をクリック

---

### 原因4: コード内のエラー

**症状**: Webhookは届いているが、処理中にエラーが発生する

**確認方法**:
1. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを確認
2. エラーメッセージの内容を確認

**解決方法**:
1. エラーメッセージの内容に応じて対処
2. コードを修正して再デプロイ

---

## 次のステップ

### ステップ1: Stripe Dashboardでレスポンスコードを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブで、イベントID `evt_1Sm8EXRy4xQUBP6TKFVQsIni` を探す
4. レスポンスコードを確認
5. 「レスポンス本文」をクリックしてエラーメッセージを確認

### ステップ2: Vercel Dashboardでログを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

### ステップ3: エラーの内容に応じて対処

- **レスポンスコードが `400` の場合**: 署名検証の失敗、またはリクエストの形式が間違っている
- **レスポンスコードが `500` の場合**: サーバー側のエラー（コード内のエラー、環境変数の不足など）

---

## 重要な確認事項

1. **Stripe Dashboardでレスポンスコードを確認**（最優先）
2. **Vercel Dashboardでログを確認**
3. **エラーメッセージの内容を確認**
4. **Webhookシークレットが一致しているか確認**
5. **WebhookエンドポイントURLが正しいか確認**

まず、**Stripe Dashboardでレスポンスコードとエラーメッセージを確認**してください。これが最も重要です。

