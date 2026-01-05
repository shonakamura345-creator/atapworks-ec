# Webhookのログが表示されない問題のデバッグ

## 問題

Webhookを設定したが、Vercel DashboardのログにWebhookに関するログが一切表示されない。

---

## 確認手順

### ステップ1: Stripe DashboardでWebhookイベントを確認

まず、StripeからWebhookが送信されているか確認します。

**確認方法**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **右上で「本番モード」になっているか確認**
3. 「開発者」→「Webhook」をクリック
4. エンドポイント（`adventurous-oasis` など）をクリック
5. 「最新のイベント」タブを確認

**確認ポイント**:
- ✅ イベントが表示されているか
- ✅ イベントが表示されていない場合、Webhookが送信されていない
- ✅ イベントが表示されている場合：
  - レスポンスコードが `200` か確認
  - レスポンスコードが `400` や `500` の場合、エラーの詳細を確認
  - 「レスポンス本文」をクリックしてエラーメッセージを確認

---

### ステップ2: Vercel Dashboardでログを確認

Vercel DashboardでWebhookのログを確認します。

**確認方法（方法1: Deploymentsから）**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブをクリック
3. 最新のデプロイメントをクリック
4. 「Functions」タブをクリック
5. `/api/webhooks/stripe` を選択
6. ログを確認

**確認方法（方法2: プロジェクトのFunctionsから）**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Functions」タブをクリック（左側のメニュー）
3. `/api/webhooks/stripe` を選択
4. ログを確認

**確認すべきログ**:
- ✅ `POST /api/webhooks/stripe` が表示されているか
- ✅ エラーメッセージが表示されていないか
- ✅ メール送信のログが表示されているか

---

### ステップ3: Webhookエンドポイントの設定を確認

Stripe DashboardでWebhookエンドポイントの設定を確認します。

**確認項目**:
1. **エンドポイントURL**: `https://atapworks.co.jp/api/webhooks/stripe`
   - 正しいURLになっているか確認
   - `http://` ではなく `https://` になっているか確認

2. **監視するイベント**: `checkout.session.completed`
   - このイベントが選択されているか確認

3. **Stripe Dashboardのモード**: 「本番モード」
   - 右上で「本番モード」になっているか確認

4. **Webhookシークレット**: Vercelの `STRIPE_WEBHOOK_SECRET` と一致しているか
   - Stripe Dashboard → Webhook → エンドポイント → 「シークレット」をクリック
   - Vercel Dashboard → Settings → Environment Variables → `STRIPE_WEBHOOK_SECRET` と一致しているか確認

---

### ステップ4: テストイベントを送信

Stripe Dashboardからテストイベントを送信して、Webhookが届くか確認します。

**手順**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「テスト送信」または「Send test event」ボタンをクリック
4. イベントタイプ: `checkout.session.completed` を選択
5. 「送信」をクリック
6. Vercel Dashboardのログを確認

**確認ポイント**:
- ✅ テストイベントが送信されたか
- ✅ Vercel Dashboardのログに `POST /api/webhooks/stripe` が表示されるか
- ✅ エラーメッセージが表示されていないか

---

## よくある原因と解決方法

### 原因1: Webhookが送信されていない

**症状**: Stripe Dashboard → Webhook → 「最新のイベント」タブにイベントが表示されない

**確認事項**:
1. 実際に決済が完了したか確認
2. Stripe Dashboardのモードが「本番モード」になっているか確認
3. 監視するイベントに `checkout.session.completed` が選択されているか確認

**解決方法**:
1. テスト購入を実行
2. Stripe Dashboard → Webhook → 「最新のイベント」タブを確認
3. イベントが表示されない場合、Webhookエンドポイントの設定を確認

---

### 原因2: WebhookエンドポイントURLが間違っている

**症状**: Stripe Dashboard → Webhook → 「最新のイベント」タブにイベントが表示されるが、レスポンスコードが `400` や `500`

**確認事項**:
1. エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認
2. `http://` ではなく `https://` になっているか確認

**解決方法**:
1. Stripe Dashboard → Webhook → エンドポイント → 「設定」をクリック
2. エンドポイントURLを `https://atapworks.co.jp/api/webhooks/stripe` に設定
3. 「保存」をクリック

---

### 原因3: Webhookシークレットが一致していない

**症状**: Stripe Dashboard → Webhook → 「最新のイベント」タブにイベントが表示されるが、レスポンスコードが `400` や `500`

**確認事項**:
1. Stripe Dashboard → Webhook → エンドポイント → 「シークレット」をクリック
2. Vercel Dashboard → Settings → Environment Variables → `STRIPE_WEBHOOK_SECRET` と一致しているか確認

**解決方法**:
1. Stripe DashboardでWebhookシークレットをコピー
2. Vercel Dashboard → Settings → Environment Variables → `STRIPE_WEBHOOK_SECRET` を更新
3. 再デプロイ

---

### 原因4: Vercelのログの見方が間違っている

**症状**: ログが表示されない

**確認事項**:
1. 正しいデプロイメントを確認しているか
2. 正しいFunctionを選択しているか
3. ログの時間範囲を確認（最新のログが表示されているか）

**解決方法**:
1. Vercel Dashboard → プロジェクト → 「Deployments」タブ
2. 最新のデプロイメントをクリック
3. 「Functions」タブをクリック
4. `/api/webhooks/stripe` を選択
5. ログを確認

---

### 原因5: Webhookが届いているが、エラーで処理が失敗している

**症状**: Vercel Dashboardのログに `POST /api/webhooks/stripe` が表示されるが、エラーメッセージが表示される

**確認事項**:
1. エラーメッセージの内容を確認
2. 環境変数が正しく設定されているか確認

**解決方法**:
1. エラーメッセージの内容に応じて対処
2. 環境変数が設定されていない場合、設定して再デプロイ

---

## デバッグの優先順位

### 1. 最優先: Stripe DashboardでWebhookイベントを確認

**確認方法**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブを確認

**確認ポイント**:
- ✅ イベントが表示されているか
- ✅ イベントが表示されていない場合、Webhookが送信されていない
- ✅ イベントが表示されている場合、レスポンスコードを確認

---

### 2. 次に確認: Vercel Dashboardでログを確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認ポイント**:
- ✅ `POST /api/webhooks/stripe` が表示されているか
- ✅ エラーメッセージが表示されていないか

---

### 3. テストイベントを送信

**確認方法**:
1. Stripe Dashboard → Webhook → エンドポイント → 「テスト送信」をクリック
2. イベントタイプ: `checkout.session.completed` を選択
3. 「送信」をクリック
4. Vercel Dashboardのログを確認

---

## 次のステップ

1. **Stripe DashboardでWebhookイベントを確認**（最優先）
2. **Vercel Dashboardでログを確認**
3. **テストイベントを送信**
4. **問題が特定できたら、対応方法を実行**

まず、**Stripe DashboardでWebhookイベントを確認**してください。これが最も重要です。

もしStripe Dashboardにイベントが表示されていない場合、Webhookが送信されていない可能性があります。その場合、Webhookエンドポイントの設定を確認してください。

もしStripe Dashboardにイベントが表示されているが、Vercel Dashboardのログに表示されない場合、WebhookエンドポイントURLやWebhookシークレットの設定を確認してください。

