# 注文完了画面が表示されない問題の解決手順

## 問題の確認

注文完了画面が表示されない場合、以下の可能性があります：

1. 環境変数 `NEXT_PUBLIC_BASE_URL` が設定されていない
2. Stripe Checkout Sessionの作成に失敗している
3. デプロイが失敗している
4. コードに問題がある

---

## 解決手順

### ステップ1: Vercelのデプロイステータスを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブをクリック
3. 最新のデプロイメントのステータスを確認
   - ✅ 「Ready」になっているか
   - ❌ 「Error」や「Building」のままになっていないか

### ステップ2: 環境変数を確認

Vercel Dashboard → Settings → Environment Variables で以下を確認：

**必須の環境変数**：
- ✅ `STRIPE_SECRET_KEY` が設定されているか（`sk_live_...`）
- ✅ `NEXT_PUBLIC_BASE_URL` が設定されているか（`https://atapworks.co.jp`）
- ✅ `STRIPE_WEBHOOK_SECRET` が設定されているか
- ✅ `RESEND_API_KEY` が設定されているか
- ✅ `RESEND_FROM_EMAIL` が設定されているか
- ✅ `ADMIN_EMAIL` が設定されているか

### ステップ3: 環境変数が不足している場合

不足している環境変数を追加：

1. Vercel Dashboard → Settings → Environment Variables
2. 「Add New」をクリック
3. KeyとValueを入力
4. Environment: Production にチェック
5. 「Save」をクリック
6. 再デプロイ（Deployments → 最新のデプロイメント → ... → Redeploy）

### ステップ4: テスト購入を試す

1. サイト（`https://atapworks.co.jp`）でテスト購入を試す
2. テストカードを使用：
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 未来の日付（例: 12/25）
   - CVC: 任意の3桁（例: 123）
3. 注文完了画面が表示されるか確認

### ステップ5: VercelのFunctionsログを確認

1. Vercel Dashboard → 「Functions」タブ
2. `/api/checkout` を選択
3. ログを確認
4. エラーメッセージがあるか確認

---

## よくある原因と解決方法

### 原因1: `NEXT_PUBLIC_BASE_URL` が設定されていない

**症状**: 注文完了画面にリダイレクトされない

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. Key: `NEXT_PUBLIC_BASE_URL`
3. Value: `https://atapworks.co.jp`
4. Environment: Production にチェック
5. Save
6. 再デプロイ

### 原因2: デプロイが失敗している

**症状**: サイト全体が動作しない

**解決方法**:
1. Vercel Dashboard → Deployments でエラーログを確認
2. エラーを修正
3. 再デプロイ

### 原因3: Stripe APIキーが間違っている

**症状**: チェックアウトが失敗する

**解決方法**:
1. Stripe Dashboardで本番モードのAPIキーを確認
2. Vercel Dashboard → Settings → Environment Variables
3. `STRIPE_SECRET_KEY` が本番キー（`sk_live_...`）になっているか確認
4. 間違っている場合は、正しい値を設定
5. 再デプロイ

---

## 確認チェックリスト

- [ ] Vercel Dashboard → Deployments → 最新のデプロイメントが「Ready」になっている
- [ ] Vercel Dashboard → Settings → Environment Variables → `NEXT_PUBLIC_BASE_URL` が設定されている（`https://atapworks.co.jp`）
- [ ] Vercel Dashboard → Settings → Environment Variables → `STRIPE_SECRET_KEY` が設定されている（`sk_live_...`）
- [ ] 環境変数を変更した場合、再デプロイした
- [ ] テスト購入を試して、注文完了画面が表示されるか確認
- [ ] Vercel Dashboard → Functions → `/api/checkout` のログにエラーがない

---

## 次のステップ

上記の確認項目をチェックして、問題が解決したか確認してください。

特に重要なのは：
1. **環境変数 `NEXT_PUBLIC_BASE_URL` が設定されているか**
2. **デプロイが成功しているか**
3. **テスト購入で注文完了画面が表示されるか**

問題が解決しない場合、具体的なエラーメッセージや状況を共有してください。

