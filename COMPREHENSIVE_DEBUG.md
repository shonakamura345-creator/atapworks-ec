# 注文確定画面とメールが届かない問題の総合デバッグ

## 発生している問題

1. ❌ 注文確定画面が表示されない
2. ❌ メールが届かない

---

## 段階的なデバッグ手順

### ステップ1: デプロイステータスを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブをクリック
3. 最新のデプロイメントのステータスを確認
   - ✅ 「Ready」になっているか
   - ❌ 「Error」や「Building」のままになっていないか
   - ⏳ 「Building」の場合は完了するまで待つ

**デプロイが失敗している場合**：
- エラーログを確認
- エラーを修正して再デプロイ

**デプロイが「Building」の場合**：
- 完了するまで待つ

---

### ステップ2: 環境変数の確認

Vercel Dashboard → Settings → Environment Variables で以下を確認：

必須の環境変数：
- ✅ `NEXT_PUBLIC_BASE_URL` = `https://atapworks.co.jp`（修正済み？）
- ✅ `STRIPE_SECRET_KEY` = `sk_live_...` または `sk_test_...`（どちらが設定されているか確認）
- ✅ `STRIPE_WEBHOOK_SECRET` = `whsec_...`（設定されているか確認）
- ✅ `RESEND_API_KEY` = `re_...`（設定されているか確認）
- ✅ `RESEND_FROM_EMAIL` = `info@atapworks.co.jp` など（設定されているか確認）
- ✅ `ADMIN_EMAIL` = `info.shokenchikushi@gmail.com`（設定されているか確認）

**確認ポイント**：
- `NEXT_PUBLIC_BASE_URL` が `https://atapworks.co.jp` になっているか（`http://localhost:3000` ではないか）
- 環境変数を変更した後、再デプロイしたか

---

### ステップ3: VercelのFunctionsログを確認

1. Vercel Dashboard → 「Functions」タブ
2. `/api/checkout` を選択
3. ログを確認

**確認ポイント**：
- エラーメッセージが表示されていないか
- リクエストが正常に処理されているか
- 「Stripe Checkout Session作成エラー」などのエラーがないか

4. `/api/webhooks/stripe` を選択
5. ログを確認

**確認ポイント**：
- Webhookが受信されているか
- エラーメッセージが表示されていないか
- メール送信のログ（「📧 顧客への注文確認メールを送信します」など）が表示されているか

---

### ステップ4: Stripe DashboardのWebhookイベントを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイント（`adventurous-oasis` など）をクリック
3. 「最新のイベント」タブを確認

**確認ポイント**：
- イベントが表示されているか
- イベントが表示されていない場合、Webhookが届いていない
- イベントが表示されている場合、レスポンスコードが `200` か確認
- レスポンスコードが `400` や `500` の場合、エラーの詳細を確認

---

### ステップ5: テスト購入の流れを確認

1. サイト（`https://atapworks.co.jp`）でテスト購入を試す
2. ブラウザの開発者ツール（F12キー）を開く
3. Consoleタブでエラーを確認
4. Networkタブで `/api/checkout` のリクエスト/レスポンスを確認

**確認ポイント**：
- `/api/checkout` のリクエストが成功しているか（ステータスコード `200`）
- レスポンスに `sessionId` が含まれているか
- エラーメッセージが表示されていないか

---

## よくある問題と解決方法

### 問題1: 環境変数を変更したが再デプロイしていない

**症状**: 環境変数は正しく設定されているが、変更が反映されない

**解決方法**:
1. Vercel Dashboard → Deployments
2. 最新のデプロイメントの「...」→「Redeploy」
3. 再デプロイが完了するまで待つ

### 問題2: NEXT_PUBLIC_BASE_URLがまだ間違っている

**症状**: 注文確定画面が表示されない

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. `NEXT_PUBLIC_BASE_URL` の値を確認
3. `https://atapworks.co.jp` になっているか確認
4. 間違っている場合は修正して再デプロイ

### 問題3: StripeキーとWebhookエンドポイントのモードが一致していない

**症状**: メールが届かない、Webhookが動作しない

**確認方法**:
- Stripe Dashboardの右上でモードを確認（テストモード or 本番モード）
- Vercelの環境変数 `STRIPE_SECRET_KEY` の値（`sk_test_...` or `sk_live_...`）
- Webhookエンドポイントがどのモードで作成されているか

**解決方法**:
- テストモードを使用する場合：テストモードでWebhookエンドポイントを作成、テストキーを使用
- 本番モードを使用する場合：本番モードでWebhookエンドポイントを作成、本番キーを使用

### 問題4: Webhookエンドポイントが作成されていない、または間違っている

**症状**: メールが届かない

**解決方法**:
1. Stripe Dashboard → 開発者 → Webhook
2. エンドポイントが作成されているか確認
3. エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認
4. 監視するイベントに `checkout.session.completed` が選択されているか確認

### 問題5: Resend APIキーが設定されていない、または間違っている

**症状**: メールが届かない

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. `RESEND_API_KEY` が設定されているか確認
3. 値が正しいか確認
4. 間違っている場合は修正して再デプロイ

---

## 確認チェックリスト

### デプロイ
- [ ] Vercel Dashboard → Deployments → 最新のデプロイメントが「Ready」になっている
- [ ] 環境変数を変更した後、再デプロイした

### 環境変数
- [ ] `NEXT_PUBLIC_BASE_URL` = `https://atapworks.co.jp`（`http://localhost:3000` ではない）
- [ ] `STRIPE_SECRET_KEY` が設定されている
- [ ] `STRIPE_WEBHOOK_SECRET` が設定されている
- [ ] `RESEND_API_KEY` が設定されている
- [ ] `RESEND_FROM_EMAIL` が設定されている
- [ ] `ADMIN_EMAIL` が設定されている

### Stripe
- [ ] Stripe Dashboard → Webhook → エンドポイントが作成されている
- [ ] エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっている
- [ ] 監視するイベントに `checkout.session.completed` が選択されている
- [ ] Stripe DashboardのモードとWebhookエンドポイントのモードが一致している

### ログ
- [ ] Vercel Dashboard → Functions → `/api/checkout` のログにエラーがない
- [ ] Vercel Dashboard → Functions → `/api/webhooks/stripe` のログにエラーがない
- [ ] Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」でイベントが表示されているか

---

## 次のステップ

上記の確認項目をチェックして、問題の原因を特定してください。

特に重要なのは：
1. **環境変数 `NEXT_PUBLIC_BASE_URL` が正しく設定され、再デプロイしたか**
2. **VercelのFunctionsログにエラーがないか**
3. **Stripe DashboardのWebhookイベントでエラーが発生していないか**

確認結果を共有していただければ、より具体的な解決方法を提案できます。

