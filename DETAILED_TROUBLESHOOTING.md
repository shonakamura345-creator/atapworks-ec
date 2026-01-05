# 再デプロイ後も問題が解決しない場合の詳細デバッグ

## 確認すべきこと

再デプロイしたにも関わらず問題が解決しない場合、以下の点を確認してください。

---

## ステップ1: デプロイが正常に完了したか確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → 「Deployments」タブ
2. 最新のデプロイメントを確認

**確認ポイント**：
- ✅ ステータスが「Ready」になっているか
- ❌ 「Error」になっていないか
- ❌ 「Building」のままになっていないか
- ⏳ デプロイ時刻が環境変数を変更した後の時刻か

**デプロイが失敗している場合**：
- エラーログを確認
- エラーメッセージを共有してください

---

## ステップ2: 環境変数が正しく設定されているか再確認

Vercel Dashboard → Settings → Environment Variables で以下を確認：

1. **`NEXT_PUBLIC_BASE_URL`**
   - 値: `https://atapworks.co.jp`
   - `http://localhost:3000` ではないか確認
   - Environment: Production にチェックが入っているか確認

2. **`STRIPE_SECRET_KEY`**
   - 設定されているか確認
   - 値の形式（`sk_test_...` または `sk_live_...`）を確認

3. **`STRIPE_WEBHOOK_SECRET`**
   - 設定されているか確認
   - 値の形式（`whsec_...`）を確認

4. **`RESEND_API_KEY`**
   - 設定されているか確認

5. **`RESEND_FROM_EMAIL`**
   - 設定されているか確認

6. **`ADMIN_EMAIL`**
   - 設定されているか確認

**重要**: 環境変数を変更した場合、必ず「Save」をクリックして保存してください。

---

## ステップ3: VercelのFunctionsログを詳細に確認

### `/api/checkout` のログ

1. Vercel Dashboard → 「Functions」タブ
2. `/api/checkout` を選択
3. ログを確認

**確認ポイント**：
- エラーメッセージが表示されていないか
- 「Stripe Checkout Session作成エラー」などのエラーがないか
- リクエストが正常に処理されているか（ステータスコード `200`）

**エラーが表示されている場合**：
- エラーメッセージの内容を確認
- エラーメッセージを共有してください

### `/api/webhooks/stripe` のログ

1. Vercel Dashboard → 「Functions」タブ
2. `/api/webhooks/stripe` を選択
3. ログを確認

**確認ポイント**：
- Webhookが受信されているか
- エラーメッセージが表示されていないか
- 「📧 顧客への注文確認メールを送信します」などのログが表示されているか
- 「✅ 顧客へのメール送信処理が完了しました」などのログが表示されているか

**Webhookが受信されていない場合**：
- Stripe DashboardのWebhookイベントを確認
- Webhookエンドポイントが正しく設定されているか確認

---

## ステップ4: ブラウザのコンソールでエラーを確認

1. サイト（`https://atapworks.co.jp`）にアクセス
2. F12キーを押して開発者ツールを開く
3. Consoleタブを開く
4. エラーが表示されていないか確認

**確認ポイント**：
- 赤いエラーメッセージが表示されていないか
- 「Failed to fetch」などのエラーがないか

5. Networkタブを開く
6. テスト購入を試みる
7. `/api/checkout` のリクエストを確認

**確認ポイント**：
- リクエストが成功しているか（ステータスコード `200`）
- レスポンスに `sessionId` が含まれているか
- エラーレスポンス（`400` や `500`）が返されていないか

---

## ステップ5: Stripe DashboardのWebhookイベントを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイント（`adventurous-oasis` など）をクリック
3. 「最新のイベント」タブを確認

**確認ポイント**：
- イベントが表示されているか
- イベントが表示されていない場合、Webhookが届いていない
- イベントが表示されている場合：
  - レスポンスコードが `200` か確認
  - レスポンスコードが `400` や `500` の場合、エラーの詳細を確認
  - 「レスポンス本文」をクリックしてエラーメッセージを確認

---

## よくある問題と解決方法

### 問題1: 環境変数が正しく保存されていない

**症状**: 環境変数を変更したが、再デプロイしても反映されない

**確認方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. `NEXT_PUBLIC_BASE_URL` の値を確認
3. 値が `https://atapworks.co.jp` になっているか確認
4. Environment: Production にチェックが入っているか確認

**解決方法**:
1. 環境変数を再度編集
2. 値を確認してから「Save」をクリック
3. 再デプロイ

### 問題2: デプロイが失敗している

**症状**: デプロイが「Error」のままになっている

**確認方法**:
1. Vercel Dashboard → Deployments
2. 最新のデプロイメントのステータスを確認
3. エラーログを確認

**解決方法**:
1. エラーログを確認
2. エラーを修正
3. 再デプロイ

### 問題3: キャッシュの問題

**症状**: 環境変数を変更したが、古い値が使われ続けている

**解決方法**:
1. ブラウザのキャッシュをクリア（Ctrl+Shift+Delete / Cmd+Shift+Delete）
2. または、シークレットウィンドウでテスト
3. または、別のブラウザでテスト

### 問題4: 複数の環境変数が設定されている

**症状**: 同じ環境変数が複数設定されている場合、古い値が優先される可能性がある

**確認方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. 同じキーが複数設定されていないか確認
3. 特に `NEXT_PUBLIC_BASE_URL` が複数設定されていないか確認

**解決方法**:
1. 古い環境変数を削除
2. 正しい値の環境変数のみを残す
3. 再デプロイ

---

## 次のステップ

上記の確認項目をチェックして、以下の情報を共有してください：

1. **Vercel Dashboard → Deployments**: 最新のデプロイメントのステータス
2. **Vercel Dashboard → Functions → `/api/checkout`**: ログにエラーが表示されているか
3. **Vercel Dashboard → Functions → `/api/webhooks/stripe`**: ログにWebhookが表示されているか
4. **Stripe Dashboard → Webhook → エンドポイント → 最新のイベント**: イベントが表示されているか、エラーが発生しているか
5. **ブラウザのConsole**: エラーが表示されているか

これらの情報があれば、より具体的な解決方法を提案できます。

