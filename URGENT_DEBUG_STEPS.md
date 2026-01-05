# 緊急デバッグ手順

## 発生している問題

1. ❌ メールが届かない
2. ❌ 注文完了画面が表示されない

---

## 即座に確認すべきこと

### 1. Vercelのデプロイステータスを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブをクリック
3. 最新のデプロイメントのステータスを確認
   - ✅ 「Ready」になっているか
   - ❌ 「Error」や「Building」のままになっていないか

**デプロイが失敗している場合**：
- エラーログを確認
- エラーを修正して再デプロイ

### 2. VercelのFunctionsログを確認

1. Vercel Dashboard → 「Functions」タブ
2. `/api/checkout` を選択
3. ログを確認

**確認ポイント**：
- エラーメッセージが表示されていないか
- リクエストが正常に処理されているか

### 3. 環境変数の確認（最重要）

Vercel Dashboard → Settings → Environment Variables で以下を確認：

必須の環境変数：
- ✅ `STRIPE_SECRET_KEY` が設定されているか
- ✅ `STRIPE_WEBHOOK_SECRET` が設定されているか（新しく追加したもの）
- ✅ `RESEND_API_KEY` が設定されているか
- ✅ `RESEND_FROM_EMAIL` が設定されているか
- ✅ `ADMIN_EMAIL` が設定されているか
- ✅ `NEXT_PUBLIC_BASE_URL` が設定されているか（`https://atapworks.co.jp`）

**環境変数が不足している場合**：
- 不足している環境変数を追加
- 再デプロイ

### 4. Stripe DashboardのWebhookイベントを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイント（`adventurous-oasis`）をクリック
3. 「最新のイベント」タブを確認

**確認ポイント**：
- イベントが表示されているか
- エラーが発生しているか
- レスポンスコードが `200` か

---

## 考えられる原因と解決方法

### 原因1: 環境変数 `STRIPE_WEBHOOK_SECRET` が設定されていない、または間違っている

**症状**: 注文完了画面は表示されるが、メールが届かない

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. `STRIPE_WEBHOOK_SECRET` が設定されているか確認
3. 値が正しいか確認（Stripe Dashboardからコピーした値）
4. 設定されていない、または間違っている場合は、正しい値を設定
5. 再デプロイ

### 原因2: 環境変数 `NEXT_PUBLIC_BASE_URL` が設定されていない

**症状**: 注文完了画面が表示されない

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. `NEXT_PUBLIC_BASE_URL` が設定されているか確認
3. 値が `https://atapworks.co.jp` になっているか確認
4. 設定されていない、または間違っている場合は、正しい値を設定
5. 再デプロイ

### 原因3: デプロイが失敗している

**症状**: サイト全体が動作しない、またはエラーが表示される

**解決方法**:
1. Vercel Dashboard → Deployments でエラーログを確認
2. エラーを修正
3. 再デプロイ

### 原因4: Stripe APIキーが間違っている、または本番キーが設定されていない

**症状**: チェックアウトが失敗する、エラーが表示される

**解決方法**:
1. Stripe Dashboardで本番モードのAPIキーを確認
2. Vercel Dashboard → Settings → Environment Variables
3. `STRIPE_SECRET_KEY` が本番キー（`sk_live_...`）になっているか確認
4. 間違っている場合は、正しい値を設定
5. 再デプロイ

---

## 緊急時の対応手順

### ステップ1: デプロイステータスを確認

Vercel Dashboard → Deployments → 最新のデプロイメントのステータス

### ステップ2: 環境変数を確認

Vercel Dashboard → Settings → Environment Variables → 必須の環境変数がすべて設定されているか確認

### ステップ3: Functionsのログを確認

Vercel Dashboard → Functions → `/api/checkout` のログ → エラーがないか確認

### ステップ4: 問題を特定

上記の確認結果から、問題の原因を特定

### ステップ5: 修正と再デプロイ

問題を修正して、再デプロイ

---

## 確認チェックリスト

- [ ] Vercel Dashboard → Deployments → 最新のデプロイメントが「Ready」になっている
- [ ] Vercel Dashboard → Settings → Environment Variables → すべての必須環境変数が設定されている
- [ ] Vercel Dashboard → Functions → `/api/checkout` のログにエラーがない
- [ ] Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」でエラーがない

---

## 次のステップ

まず、上記の確認項目をチェックして、問題の原因を特定してください。

特に重要なのは：
1. **デプロイステータス**（失敗していないか）
2. **環境変数**（すべて設定されているか）
3. **Functionsのログ**（エラーがないか）

確認結果を共有していただければ、より具体的な解決方法を提案できます。

