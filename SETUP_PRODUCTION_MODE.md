# 本番モードで統一設定する手順

## 判断

**本番環境で運用する予定なら、本番モードで統一設定するのがおすすめです。**

メリット：
- ✅ テストモードと本番モードの混在による混乱を避けられる
- ✅ 設定がシンプルになる
- ✅ 本番環境で実際に動作することを確認できる
- ✅ テストカード（4242 4242 4242 4242）は本番モードでも使用可能なので、安全にテストできる

---

## 本番モードで設定する手順

### ステップ1: Stripe Dashboardで本番モードに切り替え

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. 右上で「**本番モード**」をクリックして切り替え（「テストモード」から「本番モード」に）
3. 本番モードに切り替わることを確認

### ステップ2: 本番モードのAPIキーを取得

1. Stripe Dashboard → 「開発者」→「API キー」
2. 「公開可能キー」と「シークレットキー」を確認
3. シークレットキー（`sk_live_...`）をコピー
4. 公開可能キー（`pk_live_...`）もコピー

⚠️ **注意**: 本番キーは機密情報です。漏洩に注意してください。

### ステップ3: 本番モードでWebhookエンドポイントを作成

1. Stripe Dashboard → 「開発者」→「Webhook」
2. 既存のエンドポイントがある場合：
   - テストモードで作成したエンドポイントは本番モードでは表示されないので、本番モードで新しく作成する必要があります
3. 「送信先を追加する」をクリック
4. 「Webhook エンドポイント」を選択
5. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
6. 監視するイベント: `checkout.session.completed` を選択
7. 「送信先を作成する」をクリック
8. エンドポイントが作成されたら、署名シークレット（`whsec_...`）をコピー

⚠️ **重要**: 署名シークレットは一度しか表示されないので、必ずコピーして保存してください。

### ステップ4: Vercelの環境変数を本番キーに更新

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `STRIPE_SECRET_KEY` を選択（または新規追加）
   - Key: `STRIPE_SECRET_KEY`
   - Value: 本番キー（`sk_live_...`）
   - Environment: Production にチェック
   - Save
3. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` を選択（または新規追加）
   - Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Value: 本番公開可能キー（`pk_live_...`）
   - Environment: Production にチェック
   - Save
4. `STRIPE_WEBHOOK_SECRET` を選択（または新規追加）
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: 本番モードのWebhook署名シークレット（`whsec_...`）
   - Environment: Production にチェック
   - Save

### ステップ5: 環境変数を確認

Vercel Dashboard → Settings → Environment Variables で以下を確認：

必須の環境変数：
- ✅ `STRIPE_SECRET_KEY` = `sk_live_...`（本番キー）
- ✅ `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` = `pk_live_...`（本番公開可能キー）
- ✅ `STRIPE_WEBHOOK_SECRET` = `whsec_...`（本番モードのWebhook署名シークレット）
- ✅ `NEXT_PUBLIC_BASE_URL` = `https://atapworks.co.jp`
- ✅ `RESEND_API_KEY` = `re_...`
- ✅ `RESEND_FROM_EMAIL` = `info@atapworks.co.jp` など
- ✅ `ADMIN_EMAIL` = `info.shokenchikushi@gmail.com`

### ステップ6: 再デプロイ

1. Vercel Dashboard → 「Deployments」タブ
2. 最新のデプロイメントの「...」→「Redeploy」
3. 再デプロイが完了するのを待つ

---

## テスト方法

### 方法1: Stripe Dashboardからテスト送信

1. Stripe Dashboard → 開発者 → Webhook → エンドポイント（本番モードで作成したもの）をクリック
2. 「送信をテスト」ボタンをクリック
3. `checkout.session.completed` を選択
4. 「送信」ボタンをクリック
5. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを確認
6. Webhookが受信されているか確認

### 方法2: 実際にテスト購入（テストカードを使用）

1. サイト（`https://atapworks.co.jp`）でテスト購入を試す
2. テストカードを使用：
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 未来の日付（例: 12/25）
   - CVC: 任意の3桁（例: 123）
   - 郵便番号: 任意（例: 12345）
3. 購入を完了
4. 注文完了画面が表示されるか確認
5. Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」タブで確認
6. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログで確認
7. メールが届いているか確認

---

## 注意事項

### 本番モードの注意点

⚠️ **本番モードでは、実際のカードで決済すると実際の決済が発生します。**

テストカード（`4242 4242 4242 4242`）を使用すれば、実際の決済は発生しませんが、安全のため、テスト時は必ずテストカードを使用してください。

### テストカード（本番モードでも使用可能）

- カード番号: `4242 4242 4242 4242`
- 有効期限: 未来の日付
- CVC: 任意の3桁
- 郵便番号: 任意

このカード番号は本番モードでも使用でき、実際の決済は発生しません。

---

## まとめ

1. ✅ Stripe Dashboardを本番モードに切り替え
2. ✅ 本番モードのAPIキーを取得
3. ✅ 本番モードでWebhookエンドポイントを作成
4. ✅ Vercelの環境変数を本番キーに更新
5. ✅ 再デプロイ
6. ✅ テスト

この手順で、本番モードで統一設定できます。

---

## 確認チェックリスト

- [ ] Stripe Dashboardが本番モードになっている
- [ ] 本番モードのAPIキー（`sk_live_...` と `pk_live_...`）を取得
- [ ] 本番モードでWebhookエンドポイントを作成
- [ ] 本番モードのWebhook署名シークレット（`whsec_...`）を取得
- [ ] Vercelの環境変数 `STRIPE_SECRET_KEY` を本番キー（`sk_live_...`）に設定
- [ ] Vercelの環境変数 `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` を本番公開可能キー（`pk_live_...`）に設定
- [ ] Vercelの環境変数 `STRIPE_WEBHOOK_SECRET` を本番モードのWebhook署名シークレット（`whsec_...`）に設定
- [ ] 環境変数を変更した後、再デプロイ
- [ ] テスト送信でWebhookが受信されるか確認
- [ ] テスト購入で注文完了画面が表示されるか確認
- [ ] メールが届いているか確認

