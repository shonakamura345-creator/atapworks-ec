# Webhook 307リダイレクトエラーの詳細デバッグ

## 問題の状況

- ✅ Stripe DashboardのWebhookエンドポイントURLは正しく設定されている（`https://atapworks.co.jp/api/webhooks/stripe`、`www`なし）
- ❌ しかし、レスポンスコードが `307` になっている
- ❌ Resend Dashboardでメールの送信履歴を確認したが、メールが送信されていない

## 考えられる原因

### 原因1: Vercelの設定でリダイレクトが発生している

Vercelの設定で、`www`なしのURLから`www`付きのURLにリダイレクトしている可能性があります。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Domains
2. ドメインの設定を確認
3. 「Redirects」タブを確認

**解決方法**:
1. Vercel Dashboard → Settings → Domains → 「Redirects」タブ
2. `www`付きから`www`なしへのリダイレクトルールを確認
3. 必要に応じて、リダイレクトルールを削除または修正

---

### 原因2: WebhookがVercelに到達していない

WebhookがVercelのエンドポイントに到達していない可能性があります。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認ポイント**:
- ✅ `POST /api/webhooks/stripe` が表示されているか
- ❌ ログが表示されない場合、Webhookが到達していない

---

### 原因3: Webhookが到達しているが、処理中にエラーが発生している

Webhookが到達しているが、処理中にエラーが発生している可能性があります。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認ポイント**:
- ✅ エラーメッセージが表示されているか
- ✅ メール送信のログが表示されているか

---

### 原因4: 環境変数が正しく設定されていない

環境変数が正しく設定されていない可能性があります。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 以下の環境変数が設定されているか確認：
   - `RESEND_API_KEY`
   - `RESEND_FROM_EMAIL`
   - `ADMIN_EMAIL`
   - `STRIPE_WEBHOOK_SECRET`

---

## デバッグ手順

### ステップ1: Vercel Dashboardでログを確認（最優先）

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認すべきログ**:

#### 正常な場合:
```
POST /api/webhooks/stripe
📧 顧客への注文確認メールを送信します:
  顧客メールアドレス: [メールアドレス]
  RESEND_API_KEY: re_xxxxx...
✅ メール送信成功: {"id":"..."}
✅ 顧客へのメール送信処理が完了しました
```

#### エラーの場合:
```
POST /api/webhooks/stripe
⚠️ RESEND_API_KEYが設定されていません。メールは送信されません。
または
❌ Resendメール送信エラー: [エラーメッセージ]
または
Webhook signature verification failed: [エラーメッセージ]
```

**もしログが表示されない場合**:
- WebhookがVercelに到達していない
- Vercelの設定でリダイレクトが発生している可能性

---

### ステップ2: Vercelのドメイン設定を確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Domains
2. ドメインの設定を確認
3. 「Redirects」タブを確認

**確認ポイント**:
- ✅ `www`付きから`www`なしへのリダイレクトルールが設定されていないか
- ✅ リダイレクトルールがWebhookエンドポイントに影響していないか

---

### ステップ3: 環境変数を確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 以下の環境変数が設定されているか確認：
   - `RESEND_API_KEY` - `re_` で始まる
   - `RESEND_FROM_EMAIL` - メールアドレス形式
   - `ADMIN_EMAIL` - メールアドレス形式
   - `STRIPE_WEBHOOK_SECRET` - `whsec_` で始まる

**確認ポイント**:
- ✅ 各環境変数が存在するか
- ✅ 値が正しい形式か
- ✅ Environment: Production にチェックが入っているか
- ✅ 環境変数を変更した後、再デプロイしたか

---

### ステップ4: Stripe DashboardでWebhookイベントの詳細を確認

**確認方法**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブで、最新のイベントをクリック
4. 「レスポンス本文」をクリックしてエラーメッセージを確認

**確認ポイント**:
- ✅ レスポンスコードが `307` になっている理由
- ✅ エラーメッセージが表示されていないか

---

## 解決方法

### 解決方法1: Vercelのリダイレクト設定を確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Domains
2. 「Redirects」タブを確認
3. `www`付きから`www`なしへのリダイレクトルールを確認
4. 必要に応じて、リダイレクトルールを削除または修正

---

### 解決方法2: Webhookエンドポイントを直接テスト

Webhookエンドポイントが正しく動作しているか確認するため、直接テストします。

**テスト方法**:
1. Stripe Dashboard → Webhook → エンドポイント → 「テスト送信」をクリック
2. イベントタイプ: `checkout.session.completed` を選択
3. 「送信」をクリック
4. Vercel Dashboardのログを確認

---

### 解決方法3: 環境変数を再設定

環境変数が正しく設定されていない場合、再設定します。

**手順**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 各環境変数を確認
3. 必要に応じて、環境変数を再設定
4. 再デプロイ

---

## 次のステップ

以下の情報を共有してください：

1. **Vercel Dashboard → Functions → `/api/webhooks/stripe` のログ**: どのようなログが表示されているか（エラーメッセージがあれば共有）
2. **Vercel Dashboard → Settings → Domains → Redirects**: リダイレクトルールが設定されているか
3. **Vercel Dashboard → Settings → Environment Variables**: `RESEND_API_KEY`、`RESEND_FROM_EMAIL`、`ADMIN_EMAIL`、`STRIPE_WEBHOOK_SECRET` が設定されているか
4. **Stripe Dashboard → Webhook → 最新のイベント → レスポンス本文**: エラーメッセージが表示されているか

これらの情報があれば、より具体的な解決方法を提案できます。

---

## まとめ

1. ⏳ **Vercel Dashboardでログを確認**（最優先）
2. ⏳ **Vercelのドメイン設定を確認**
3. ⏳ **環境変数を確認**
4. ⏳ **Stripe DashboardでWebhookイベントの詳細を確認**

まず、**Vercel Dashboardでログを確認**してください。これが最も重要です。

