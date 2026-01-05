# 環境変数の実際の値の設定方法

## ⚠️ 重要：例（xxxxxxxxxxxxx）をそのまま使わないでください

環境変数の設定では、**実際の値**を設定する必要があります。
例（`pk_live_xxxxxxxxxxxxx`など）は「ここに実際の値が入ります」という意味のプレースホルダーです。

---

## 設定する環境変数と値の取得方法

### ✅ すぐに設定できる環境変数（既に決まっている値）

以下の環境変数は、すぐに設定できます：

1. **NEXT_PUBLIC_BASE_URL**
   ```
   https://atapworks.co.jp
   ```
   → これをそのままコピー&ペースト

2. **ADMIN_EMAIL**
   ```
   info.shokenchikushi@gmail.com
   ```
   → これをそのままコピー&ペースト

3. **RESEND_FROM_EMAIL**（ドメイン認証をしていない場合）
   ```
   onboarding@resend.dev
   ```
   → Resendのデフォルトドメイン（または `info@atapworks.co.jp` など）

---

### 📝 取得が必要な環境変数（各サービスから取得）

以下の環境変数は、各サービスのダッシュボードから取得する必要があります：

#### 1. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

**取得方法：**
1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. 右上の「テストモード」を「**本番モード**」に切り替え
3. 「開発者」→「API キー」をクリック
4. 「公開可能キー」の「コピー」をクリック
5. 例: `pk_live_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefghijklmnopqrstuvwxyz`

**設定値：**
```
pk_live_51AbCdEfGhIjKlMnOpQrStUvWxYz...（実際にコピーした値）
```

---

#### 2. STRIPE_SECRET_KEY

**取得方法：**
1. Stripe Dashboard → 「開発者」→「API キー」
2. 「シークレットキー」の「表示」をクリック（確認画面が表示されます）
3. 「表示」をクリックして「コピー」をクリック
4. 例: `sk_live_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefghijklmnopqrstuvwxyz`

**設定値：**
```
sk_live_51AbCdEfGhIjKlMnOpQrStUvWxYz...（実際にコピーした値）
```

⚠️ **重要**: `pk_test_` や `sk_test_` で始まるテストキーではなく、`pk_live_` や `sk_live_` で始まる**本番キー**を使用してください。

---

#### 3. STRIPE_WEBHOOK_SECRET

**取得方法：**
1. Stripe Dashboard → 「開発者」→「Webhook」
2. 「エンドポイントを追加」をクリック（まだ作成していない場合）
3. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
4. 監視するイベント: `checkout.session.completed` を選択
5. 「エンドポイントを追加」をクリック
6. 作成したエンドポイントをクリック
7. 「署名シークレット」の「表示」をクリック
8. `whsec_...` で始まる値をコピー
9. 例: `whsec_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

**設定値：**
```
whsec_1234567890abcdefghijklmnopqrstuvwxyz...（実際にコピーした値）
```

---

#### 4. RESEND_API_KEY

**取得方法：**
1. [Resend Dashboard](https://resend.com/) にログイン
2. 「API Keys」をクリック
3. 「Create API Key」をクリック（まだ作成していない場合）
4. 名前を入力（例: "Production"）
5. 「Create」をクリック
6. 表示されたAPIキーをコピー（この画面でしか表示されません）
7. 例: `re_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

**設定値：**
```
re_1234567890abcdefghijklmnopqrstuvwxyz...（実際にコピーした値）
```

---

#### 5. NEXT_PUBLIC_GA_ID（オプション：Google Analyticsを設定する場合のみ）

**取得方法：**
1. [Google Analytics](https://analytics.google.com/) にログイン
2. 「管理」（左下の歯車アイコン）をクリック
3. 「プロパティを作成」または既存のプロパティを選択
4. 「プロパティ設定」をクリック
5. 「測定ID」をコピー
6. 例: `G-1234567890`

**設定値：**
```
G-1234567890（実際にコピーした値）
```

---

## 📋 設定チェックリスト

Vercelで環境変数を設定する際のチェックリスト：

- [ ] **NEXT_PUBLIC_BASE_URL**: `https://atapworks.co.jp`（そのまま設定）
- [ ] **ADMIN_EMAIL**: `info.shokenchikushi@gmail.com`（そのまま設定）
- [ ] **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**: Stripe Dashboardから取得（`pk_live_...`で始まる）
- [ ] **STRIPE_SECRET_KEY**: Stripe Dashboardから取得（`sk_live_...`で始まる）
- [ ] **STRIPE_WEBHOOK_SECRET**: Stripe Dashboardから取得（`whsec_...`で始まる）
- [ ] **RESEND_API_KEY**: Resend Dashboardから取得（`re_...`で始まる）
- [ ] **RESEND_FROM_EMAIL**: `info@atapworks.co.jp` または `onboarding@resend.dev`
- [ ] **NEXT_PUBLIC_GA_ID**: Google Analyticsから取得（`G-...`で始まる、オプション）

---

## ⚠️ よくある間違い

### ❌ 間違いの例
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_xxxxxxxxxxxxx
```
→ `xxxxxxxxxxxxx` をそのまま使っている（これはダメ）

### ✅ 正しい例
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY = pk_live_51AbCdEfGhIjKlMnOpQrStUvWxYz1234567890abcdefghijklmnopqrstuvwxyz
```
→ 実際にStripe Dashboardからコピーした値を使用

---

## 💡 ヒント

- 各サービスのダッシュボードから値をコピー&ペーストするのが確実です
- 値にはスペースや改行が入らないように注意してください
- テストキー（`pk_test_`, `sk_test_`）ではなく、本番キー（`pk_live_`, `sk_live_`）を使用してください

