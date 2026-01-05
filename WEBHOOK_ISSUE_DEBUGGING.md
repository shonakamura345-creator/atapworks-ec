# Webhookと注文完了画面の問題のデバッグ

## 発生している問題

1. ❌ メールが届かない
2. ❌ 注文完了画面が表示されない

---

## 緊急確認事項

### 1. Vercelのログを確認

まず、Vercelのログでエラーが発生していないか確認してください：

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Functions」タブをクリック
3. `/api/webhooks/stripe` と `/api/checkout` のログを確認
4. エラーメッセージがあるか確認

### 2. Stripe DashboardのWebhookイベントを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイント（`adventurous-oasis`）をクリック
3. 「最新のイベント」タブを確認
4. イベントが表示されているか、エラーが発生しているか確認

### 3. 環境変数の確認

Vercel Dashboard → Settings → Environment Variables で以下を確認：

- ✅ `STRIPE_SECRET_KEY` が設定されているか
- ✅ `STRIPE_WEBHOOK_SECRET` が設定されているか
- ✅ `RESEND_API_KEY` が設定されているか
- ✅ `RESEND_FROM_EMAIL` が設定されているか
- ✅ `ADMIN_EMAIL` が設定されているか
- ✅ `NEXT_PUBLIC_BASE_URL` が設定されているか（`https://atapworks.co.jp`）

### 4. チェックアウトフローの確認

注文完了画面が表示されない場合、チェックアウトフロー自体に問題がある可能性があります。

確認方法：
1. サイトでテスト購入を試みる
2. ブラウザのコンソール（F12 → Console）でエラーを確認
3. ネットワークタブで `/api/checkout` のリクエスト/レスポンスを確認

---

## よくある問題と解決方法

### 問題1: 環境変数が設定されていない

**症状**: 注文完了画面が表示されない、エラーが発生する

**解決方法**:
1. Vercel Dashboardで環境変数を確認
2. 不足している環境変数を追加
3. 再デプロイ

### 問題2: 環境変数の値が間違っている

**症状**: エラーが発生する、Webhookが動作しない

**解決方法**:
1. 環境変数の値が正しいか確認
2. 特に `STRIPE_WEBHOOK_SECRET` が正しい値か確認
3. 値が間違っている場合は、正しい値を設定して再デプロイ

### 問題3: 再デプロイ後にビルドエラーが発生した

**症状**: デプロイが失敗している、またはエラーが表示される

**解決方法**:
1. Vercel Dashboard → Deployments でデプロイステータスを確認
2. デプロイが失敗している場合、エラーログを確認
3. エラーを修正して再デプロイ

### 問題4: コードの変更が反映されていない

**症状**: 古い動作が続いている

**解決方法**:
1. コードを確認
2. 必要に応じてGitHubにプッシュ
3. Vercelが自動デプロイするのを待つ、または手動で再デプロイ

---

## デバッグ手順

### ステップ1: デプロイステータスを確認

1. Vercel Dashboard → Deployments
2. 最新のデプロイメントのステータスを確認
3. 「Ready」になっているか確認

### ステップ2: Functionsのログを確認

1. Vercel Dashboard → Functions
2. `/api/checkout` のログを確認
3. `/api/webhooks/stripe` のログを確認
4. エラーメッセージがあるか確認

### ステップ3: Stripe Dashboardを確認

1. Stripe Dashboard → Webhook → エンドポイント
2. 「最新のイベント」タブを確認
3. イベントが表示されているか、エラーが発生しているか確認

### ステップ4: ブラウザのコンソールを確認

1. サイトにアクセス
2. F12キーを押して開発者ツールを開く
3. Consoleタブでエラーを確認
4. Networkタブで `/api/checkout` のリクエスト/レスポンスを確認

---

## 緊急時の対応

注文完了画面が表示されない場合、まずは以下を確認してください：

1. ✅ デプロイが成功しているか（Vercel Dashboard → Deployments）
2. ✅ Functionsのログにエラーがないか
3. ✅ 環境変数が正しく設定されているか
4. ✅ ブラウザのコンソールにエラーがないか

問題が解決しない場合は、具体的なエラーメッセージを共有してください。

