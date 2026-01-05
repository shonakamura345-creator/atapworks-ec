# 環境変数の最終確認ガイド

## 目的

メール送信に必要な環境変数がすべて正しく設定されているか確認します。

---

## 確認手順

### ステップ1: Vercel Dashboardにアクセス

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクト（`atapworks-store` など）を選択
3. 「Settings」タブをクリック
4. 「Environment Variables」をクリック

---

## 必須の環境変数（メール送信に必要）

### 1. RESEND_API_KEY ⭐⭐⭐⭐⭐

**確認項目**:
- [ ] 環境変数が存在する
- [ ] 値が `re_` で始まる
- [ ] Environment: Production にチェックが入っている

**取得方法**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「API Keys」
2. APIキーをコピー
3. Vercel Dashboard → Settings → Environment Variables で設定

**形式**: `re_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ`

---

### 2. RESEND_FROM_EMAIL ⭐⭐⭐⭐⭐

**確認項目**:
- [ ] 環境変数が存在する
- [ ] 値がメールアドレスの形式になっている
- [ ] Environment: Production にチェックが入っている

**設定値**:
- デフォルトドメイン: `onboarding@resend.dev`
- カスタムドメイン: `info@atapworks.co.jp`（ドメインが検証されている必要がある）

**確認方法**:
1. Resend Dashboard → 「Domains」
2. カスタムドメインを使用している場合、ドメインが検証されているか確認

---

### 3. ADMIN_EMAIL ⭐⭐⭐⭐

**確認項目**:
- [ ] 環境変数が存在する
- [ ] 値がメールアドレスの形式になっている
- [ ] Environment: Production にチェックが入っている

**設定値**: `info.shokenchikushi@gmail.com`

---

### 4. NEXT_PUBLIC_BASE_URL ⭐⭐⭐⭐⭐

**確認項目**:
- [ ] 環境変数が存在する
- [ ] 値が `https://atapworks.co.jp` になっている
- [ ] Environment: Production にチェックが入っている

**設定値**: `https://atapworks.co.jp`

⚠️ **重要**: `http://localhost:3000` になっていないか確認してください。

---

### 5. STRIPE_SECRET_KEY ⭐⭐⭐⭐⭐

**確認項目**:
- [ ] 環境変数が存在する
- [ ] 値が `sk_live_` で始まる（本番キー）
- [ ] Environment: Production にチェックが入っている

**形式**: `sk_live_...`

⚠️ **重要**: `sk_test_` で始まるテストキーではなく、`sk_live_` で始まる本番キーを使用してください。

---

### 6. STRIPE_WEBHOOK_SECRET ⭐⭐⭐⭐⭐

**確認項目**:
- [ ] 環境変数が存在する
- [ ] 値が `whsec_` で始まる
- [ ] Environment: Production にチェックが入っている
- [ ] Stripe DashboardのWebhookシークレットと一致している

**形式**: `whsec_...`

**確認方法**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「シークレット」をクリック
4. Vercelの `STRIPE_WEBHOOK_SECRET` と一致しているか確認

---

### 7. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ⭐⭐⭐⭐⭐

**確認項目**:
- [ ] 環境変数が存在する
- [ ] 値が `pk_live_` で始まる（本番キー）
- [ ] Environment: Production にチェックが入っている

**形式**: `pk_live_...`

⚠️ **重要**: `pk_test_` で始まるテストキーではなく、`pk_live_` で始まる本番キーを使用してください。

---

## オプションの環境変数

### NEXT_PUBLIC_GA_ID ⭐⭐

**確認項目**:
- [ ] 環境変数が存在する（オプション）
- [ ] 値が `G-` で始まる
- [ ] Environment: Production にチェックが入っている

**設定値**: `G-XXXXXXXXXX`（Google Analytics Measurement ID）

⚠️ **注意**: メール送信には不要です。Google Analytics用です。

---

## 環境変数の確認チェックリスト

### メール送信に必須

- [ ] `RESEND_API_KEY` - `re_` で始まる
- [ ] `RESEND_FROM_EMAIL` - メールアドレス形式
- [ ] `ADMIN_EMAIL` - メールアドレス形式
- [ ] `NEXT_PUBLIC_BASE_URL` - `https://atapworks.co.jp`

### Stripe決済に必須

- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` - `pk_live_` で始まる
- [ ] `STRIPE_SECRET_KEY` - `sk_live_` で始まる
- [ ] `STRIPE_WEBHOOK_SECRET` - `whsec_` で始まる

### オプション

- [ ] `NEXT_PUBLIC_GA_ID` - `G-` で始まる（Google Analytics用）

---

## 環境変数を修正した場合

環境変数を追加・変更した場合、**再デプロイが必要**です。

**再デプロイ方法**:
1. Vercel Dashboard → プロジェクト
2. 「Deployments」タブ
3. 最新のデプロイメントの「...」メニュー → 「Redeploy」
4. または、GitHubにプッシュ（自動デプロイ）

---

## よくある問題

### 問題1: 環境変数が設定されていない

**症状**: Vercel Dashboard → Functions → `/api/webhooks/stripe` のログに「⚠️ RESEND_API_KEYが設定されていません」と表示される

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. 不足している環境変数を追加
3. 再デプロイ

### 問題2: 環境変数の値が間違っている

**症状**: メール送信でエラーが発生する

**解決方法**:
1. 環境変数の値を確認
2. 正しい値に修正
3. 再デプロイ

### 問題3: Environment: Production にチェックが入っていない

**症状**: 環境変数が本番環境で使用されない

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. 各環境変数の「Environment」で「Production」にチェック
3. 再デプロイ

---

## まとめ

1. **Vercel Dashboard → Settings → Environment Variables** で環境変数を確認
2. **必須の環境変数がすべて設定されているか確認**
3. **各環境変数の値が正しい形式か確認**
4. **Environment: Production にチェックが入っているか確認**
5. **環境変数を変更した場合、再デプロイ**

すべての環境変数が正しく設定されていることを確認してから、テスト購入を実行してください。

