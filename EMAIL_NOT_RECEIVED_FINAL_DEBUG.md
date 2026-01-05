# メールが届かない問題の最終デバッグ

## 問題

決済は完了したが、メールが届かない。

---

## 確認手順（優先順位順）

### ステップ1: Stripe DashboardでWebhookイベントを確認（最優先）

まず、StripeからWebhookが送信されているか確認します。

**確認方法**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブを確認
4. 最新のイベント（決済完了後のイベント）を探す

**確認ポイント**:
- ✅ イベントが表示されているか
- ✅ イベントが表示されていない場合、Webhookが送信されていない
- ✅ イベントが表示されている場合：
  - レスポンスコードが `200` か確認
  - レスポンスコードが `400` や `500` の場合、エラーの詳細を確認
  - 「レスポンス本文」をクリックしてエラーメッセージを確認

**もしイベントが表示されていない場合**:
- Webhookエンドポイントの設定を確認
- 監視するイベントに `checkout.session.completed` が選択されているか確認
- Stripe Dashboardのモードが「本番モード」になっているか確認

---

### ステップ2: Vercel Dashboardでログを確認

Vercel DashboardでWebhookのログを確認します。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認すべきログ**:

#### 正常な場合のログ:
```
POST /api/webhooks/stripe
📧 顧客への注文確認メールを送信します:
  顧客メールアドレス: [メールアドレス]
  RESEND_API_KEY: re_xxxxx...
  RESEND_FROM_EMAIL: onboarding@resend.dev
✅ メール送信成功: {"id":"..."}
✅ 顧客へのメール送信処理が完了しました
📧 管理者への通知メールを送信します
  管理者メールアドレス: info.shokenchikushi@gmail.com
✅ 管理者通知メール送信成功: {"id":"..."}
✅ 管理者へのメール送信処理が完了しました
```

#### エラーが発生している場合のログ:
```
⚠️ RESEND_API_KEYが設定されていません。メールは送信されません。
または
❌ Resendメール送信エラー: [エラーメッセージ]
または
⚠️ ADMIN_EMAILが設定されていません。管理者通知は送信されません。
```

**もしログが表示されない場合**:
- Webhookが届いていない可能性
- 正しいデプロイメントを確認しているか確認
- 正しいFunctionを選択しているか確認

---

### ステップ3: 環境変数を確認

Vercel Dashboardで環境変数が正しく設定されているか確認します。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 以下の環境変数が設定されているか確認：

**必須の環境変数**:
- ✅ `RESEND_API_KEY` - `re_` で始まる
- ✅ `RESEND_FROM_EMAIL` - メールアドレス形式（例: `onboarding@resend.dev`）
- ✅ `ADMIN_EMAIL` - メールアドレス形式（例: `info.shokenchikushi@gmail.com`）
- ✅ `NEXT_PUBLIC_BASE_URL` - `https://atapworks.co.jp`
- ✅ `STRIPE_SECRET_KEY` - `sk_live_` で始まる
- ✅ `STRIPE_WEBHOOK_SECRET` - `whsec_` で始まる

**確認ポイント**:
- ✅ 各環境変数が存在するか
- ✅ 値が正しい形式か
- ✅ Environment: Production にチェックが入っているか
- ✅ 環境変数を変更した後、再デプロイしたか

---

### ステップ4: Resend Dashboardで確認

Resend Dashboardでメールの送信状況を確認します。

**確認方法**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Emails」
2. 送信されたメールの一覧が表示されます

**確認ポイント**:
- ✅ メールが送信されているか（一覧に表示されているか）
- ✅ メールのステータス（送信成功、失敗など）
- ✅ エラーメッセージが表示されていないか

**もしメールが送信されていない場合**:
- Vercelのログでエラーが発生していないか確認
- 環境変数が正しく設定されているか確認

**もしメールが送信されているが届かない場合**:
- メールアドレスが正しいか確認
- 迷惑メールフォルダを確認
- メールアドレスのドメインが正しいか確認

---

## よくある原因と解決方法

### 原因1: Webhookが届いていない

**症状**: Stripe Dashboard → Webhook → 「最新のイベント」タブにイベントが表示されない

**確認事項**:
1. 実際に決済が完了したか確認
2. Stripe Dashboardのモードが「本番モード」になっているか確認
3. 監視するイベントに `checkout.session.completed` が選択されているか確認
4. WebhookエンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認

**解決方法**:
1. Webhookエンドポイントの設定を確認
2. 必要に応じて、新しいWebhookエンドポイントを作成

---

### 原因2: 環境変数が設定されていない

**症状**: Vercel Dashboard → Functions → `/api/webhooks/stripe` のログに「⚠️ RESEND_API_KEYが設定されていません」などのメッセージが表示される

**確認事項**:
1. Vercel Dashboard → Settings → Environment Variables で環境変数を確認
2. `RESEND_API_KEY`、`RESEND_FROM_EMAIL`、`ADMIN_EMAIL` が設定されているか確認

**解決方法**:
1. 不足している環境変数を追加
2. 環境変数を変更した後、再デプロイ

---

### 原因3: Resend APIキーが間違っている

**症状**: Vercel Dashboard → Functions → `/api/webhooks/stripe` のログに「❌ Resendメール送信エラー」が表示される

**確認事項**:
1. Resend Dashboard → API Keys でAPIキーを確認
2. Vercel Dashboard → Settings → Environment Variables で `RESEND_API_KEY` の値を確認
3. 値が一致しているか確認

**解決方法**:
1. Resend Dashboardで正しいAPIキーを取得
2. Vercel Dashboard → Settings → Environment Variables で `RESEND_API_KEY` を更新
3. 再デプロイ

---

### 原因4: Webhookシークレットが一致していない

**症状**: Stripe Dashboard → Webhook → 「最新のイベント」タブにイベントが表示されるが、レスポンスコードが `400` や `500`

**確認事項**:
1. Stripe Dashboard → Webhook → エンドポイント → 「シークレット」をクリック
2. Vercel Dashboard → Settings → Environment Variables で `STRIPE_WEBHOOK_SECRET` の値を確認
3. 値が一致しているか確認

**解決方法**:
1. Stripe DashboardでWebhookシークレットをコピー
2. Vercel Dashboard → Settings → Environment Variables で `STRIPE_WEBHOOK_SECRET` を更新
3. 再デプロイ

---

## デバッグの優先順位

### 1. 最優先: Stripe DashboardでWebhookイベントを確認

**確認方法**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブを確認

**確認ポイント**:
- ✅ イベントが表示されているか
- ✅ レスポンスコードが `200` か
- ✅ エラーメッセージが表示されていないか

---

### 2. 次に確認: Vercel Dashboardでログを確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認ポイント**:
- ✅ `POST /api/webhooks/stripe` が表示されているか
- ✅ メール送信のログが表示されているか
- ✅ エラーメッセージが表示されていないか

---

### 3. 環境変数を確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 必須の環境変数が設定されているか確認

---

### 4. Resend Dashboardで確認

**確認方法**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Emails」
2. メールが送信されているか確認

---

## 次のステップ

以下の情報を共有してください：

1. **Stripe Dashboard → Webhook → 「最新のイベント」タブ**: イベントが表示されているか、レスポンスコードは何か
2. **Vercel Dashboard → Functions → `/api/webhooks/stripe` のログ**: どのようなログが表示されているか（エラーメッセージがあれば共有）
3. **Vercel Dashboard → Settings → Environment Variables**: `RESEND_API_KEY`、`RESEND_FROM_EMAIL`、`ADMIN_EMAIL` が設定されているか
4. **Resend Dashboard → Emails**: メールが送信されているか、エラーが表示されているか

これらの情報があれば、より具体的な解決方法を提案できます。

