# Stripeのテストキーと本番キーの違い

## 重要なポイント

**Stripeのキーがテストキー（`sk_test_...`）のままだと、本番環境では問題があります。**

---

## テストキーと本番キーの違い

### テストキー（`sk_test_...`）
- テスト環境で使用
- テストカードで決済ができる
- 実際の決済は発生しない
- テストモードのWebhookエンドポイントが必要

### 本番キー（`sk_live_...`）
- 本番環境で使用
- 実際のカードで決済ができる
- 実際の決済が発生する
- 本番モードのWebhookエンドポイントが必要

---

## 問題点

### 問題1: 本番環境でテストキーを使用している

**症状**:
- テストカードでは動作するが、実際のカードではエラーが発生する可能性がある
- 実際の決済ができない

**解決方法**:
1. Stripe Dashboardで本番モードのAPIキーを取得
2. Vercel Dashboard → Settings → Environment Variables
3. `STRIPE_SECRET_KEY` を本番キー（`sk_live_...`）に変更
4. 再デプロイ

### 問題2: テストモードと本番モードでWebhookエンドポイントが別々

**症状**:
- 本番環境でWebhookが動作しない
- メールが届かない

**解決方法**:
1. Stripe Dashboardで本番モードに切り替え
2. 本番モードでWebhookエンドポイントを作成
3. 本番モードのWebhook署名シークレットを取得
4. Vercelの環境変数 `STRIPE_WEBHOOK_SECRET` を本番モードのシークレットに更新
5. 再デプロイ

---

## 注文完了画面が表示されない問題との関係

**直接の関係は薄いかもしれませんが、本番環境で正常に動作させるには本番キーが必要です。**

注文完了画面が表示されない問題は、主に以下の原因が考えられます：
1. 環境変数 `NEXT_PUBLIC_BASE_URL` が設定されていない
2. デプロイが失敗している
3. コードに問題がある

ただし、本番環境で動作させるには、Stripeのキーも本番キーに変更する必要があります。

---

## 確認事項

### 1. 現在使用しているキーを確認

Vercel Dashboard → Settings → Environment Variables → `STRIPE_SECRET_KEY` の値：
- `sk_test_...` → テストキー（本番環境では問題あり）
- `sk_live_...` → 本番キー（正常）

### 2. Stripe Dashboardでモードを確認

Stripe Dashboardの右上で：
- 「テストモード」→ テストキーを使用中
- 「本番モード」→ 本番キーを使用すべき

---

## 本番キーに変更する手順

### ステップ1: Stripe Dashboardで本番キーを取得

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. 右上で「**本番モード**」に切り替え（テストモードから本番モードに）
3. 「開発者」→「API キー」をクリック
4. 「公開可能キー」と「シークレットキー」を確認
5. シークレットキー（`sk_live_...`）をコピー

### ステップ2: Vercelの環境変数を更新

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `STRIPE_SECRET_KEY` を選択
3. Valueを本番キー（`sk_live_...`）に変更
4. Save
5. 再デプロイ

### ステップ3: 公開可能キーも更新（必要に応じて）

1. Vercel Dashboard → Settings → Environment Variables
2. `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` を確認
3. Stripe Dashboardの本番モードの公開可能キー（`pk_live_...`）に更新
4. Save
5. 再デプロイ

---

## まとめ

- ❌ テストキーのままだと、本番環境では問題が発生する可能性がある
- ✅ 本番環境では本番キー（`sk_live_...`）を使用する必要がある
- ✅ Webhookエンドポイントも本番モードで作成する必要がある
- ✅ 注文完了画面が表示されない問題とは直接関係ないかもしれないが、本番環境で動作させるには本番キーが必要

---

## 推奨事項

1. **まず注文完了画面の問題を解決**（環境変数 `NEXT_PUBLIC_BASE_URL` を確認）
2. **その後に本番キーに変更**（本番環境で動作させるために必要）

ただし、実際に本番環境で動作させる場合は、両方とも必要です。

