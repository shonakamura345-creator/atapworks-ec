# Webhookが受信されない問題のデバッグ

## 問題の確認

VercelのFunctionsログで `/api/webhooks/stripe` にWebhookが表示されていない。

これは、StripeからWebhookが届いていないことを意味します。

---

## 確認すべきこと

### ステップ1: Stripe DashboardでWebhookエンドポイントを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **右上でモードを確認**（「テストモード」or「本番モード」）
3. 「開発者」→「Webhook」をクリック
4. エンドポイント一覧を確認

**確認ポイント**：
- ✅ エンドポイントが作成されているか
- ✅ エンドポイント名（`adventurous-oasis` など）をクリック
- ✅ エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか
- ✅ 監視するイベントに `checkout.session.completed` が選択されているか
- ✅ エンドポイントのステータスが「アクティブ」になっているか

**問題が見つかった場合**：
- エンドポイントが作成されていない場合は、作成
- URLが間違っている場合は、修正
- イベントが選択されていない場合は、選択
- ステータスが「無効」になっている場合は、有効化

---

### ステップ2: Stripe Dashboardからテスト送信を実行

1. Stripe Dashboard → 開発者 → Webhook → エンドポイントをクリック
2. ページの上部または右上にある「**送信をテスト**」ボタンを探す
3. 見つからない場合：
   - ページをスクロールしてみる
   - ブラウザの検索機能（Cmd+F）で「送信をテスト」を検索
4. 「送信をテスト」ボタンをクリック
5. イベントタイプを選択：
   - `checkout.session.completed` を選択
6. 「送信」ボタンをクリック

**確認ポイント**：
- テスト送信が成功したか
- Vercel Dashboard → Functions → `/api/webhooks/stripe` のログにWebhookが表示されるか
- Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」タブにイベントが表示されるか
- レスポンスコードが `200` になっているか

---

### ステップ3: Stripe DashboardのモードとVercelの環境変数を確認

**重要なポイント**：

- Stripe Dashboardが「**テストモード**」の場合、テストモードのWebhookエンドポイントが必要
- Stripe Dashboardが「**本番モード**」の場合、本番モードのWebhookエンドポイントが必要
- Vercelの環境変数 `STRIPE_SECRET_KEY` がテストキー（`sk_test_...`）の場合、テストモードのWebhookエンドポイントが必要
- Vercelの環境変数 `STRIPE_SECRET_KEY` が本番キー（`sk_live_...`）の場合、本番モードのWebhookエンドポイントが必要

**確認方法**：

1. Stripe Dashboardの右上でモードを確認
2. Vercel Dashboard → Settings → Environment Variables → `STRIPE_SECRET_KEY` の値を確認
   - `sk_test_...` → テストキー
   - `sk_live_...` → 本番キー
3. Stripe Dashboardのモードと `STRIPE_SECRET_KEY` の形式が一致しているか確認

**一致していない場合**：
- Stripe Dashboardでテストモード/本番モードに切り替える
- または、Vercelの環境変数 `STRIPE_SECRET_KEY` を変更する
- Webhookエンドポイントを正しいモードで作成/確認する

---

### ステップ4: Stripe DashboardのWebhookイベントを確認

1. Stripe Dashboard → 開発者 → Webhook → エンドポイントをクリック
2. 「最新のイベント」タブを確認

**確認ポイント**：
- イベントが表示されているか
- イベントが表示されていない場合、Webhookが届いていない
- イベントが表示されている場合：
  - レスポンスコードが `200` か確認
  - レスポンスコードが `400` や `500` の場合、エラーの詳細を確認
  - 「レスポンス本文」をクリックしてエラーメッセージを確認

---

## よくある問題と解決方法

### 問題1: Webhookエンドポイントが作成されていない

**症状**: Stripe Dashboard → Webhook → エンドポイント一覧が空

**解決方法**:
1. Stripe Dashboard → 開発者 → Webhook
2. 「エンドポイントを追加」をクリック
3. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
4. 監視するイベント: `checkout.session.completed` を選択
5. 「エンドポイントを追加」をクリック
6. 署名シークレットを取得
7. Vercelの環境変数 `STRIPE_WEBHOOK_SECRET` に設定
8. 再デプロイ

### 問題2: WebhookエンドポイントURLが間違っている

**症状**: エンドポイントが作成されているが、URLが間違っている

**解決方法**:
1. Stripe Dashboard → Webhook → エンドポイントをクリック
2. 「送信先を編集」をクリック
3. エンドポイントURLを `https://atapworks.co.jp/api/webhooks/stripe` に修正
4. 保存

### 問題3: 監視するイベントが選択されていない

**症状**: エンドポイントは作成されているが、イベントが選択されていない

**解決方法**:
1. Stripe Dashboard → Webhook → エンドポイントをクリック
2. 「送信先を編集」をクリック
3. 監視するイベントに `checkout.session.completed` を選択
4. 保存

### 問題4: テストモードと本番モードが一致していない

**症状**: テストモードでWebhookエンドポイントを作成したが、本番環境で動作しない（またはその逆）

**解決方法**:
1. Stripe Dashboardの右上でモードを確認
2. Vercelの環境変数 `STRIPE_SECRET_KEY` の形式を確認
3. Stripe Dashboardのモードと `STRIPE_SECRET_KEY` の形式が一致するように調整
4. 正しいモードでWebhookエンドポイントを作成/確認
5. 正しいモードの署名シークレットを取得
6. Vercelの環境変数 `STRIPE_WEBHOOK_SECRET` に設定
7. 再デプロイ

### 問題5: Webhookエンドポイントが無効になっている

**症状**: エンドポイントのステータスが「無効」になっている

**解決方法**:
1. Stripe Dashboard → Webhook → エンドポイントをクリック
2. ステータスを確認
3. 無効になっている場合は、有効化

---

## 確認チェックリスト

### Stripe Dashboard
- [ ] 右上でモードを確認（テストモード or 本番モード）
- [ ] 開発者 → Webhook → エンドポイントが作成されている
- [ ] エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっている
- [ ] 監視するイベントに `checkout.session.completed` が選択されている
- [ ] エンドポイントのステータスが「アクティブ」になっている
- [ ] 「送信をテスト」ボタンからテスト送信を実行
- [ ] テスト送信後、「最新のイベント」タブにイベントが表示される
- [ ] レスポンスコードが `200` になっている

### Vercel
- [ ] 環境変数 `STRIPE_SECRET_KEY` の形式を確認（`sk_test_...` or `sk_live_...`）
- [ ] Stripe Dashboardのモードと `STRIPE_SECRET_KEY` の形式が一致している
- [ ] 環境変数 `STRIPE_WEBHOOK_SECRET` が設定されている
- [ ] `STRIPE_WEBHOOK_SECRET` の値が正しいモードの署名シークレットになっている

---

## 次のステップ

1. Stripe Dashboard → 開発者 → Webhook → エンドポイントを確認
2. エンドポイントが作成されているか、正しく設定されているか確認
3. 「送信をテスト」ボタンからテスト送信を実行
4. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを確認
5. Webhookが受信されているか確認

特に重要なのは：
- **Stripe DashboardのモードとVercelの環境変数 `STRIPE_SECRET_KEY` の形式が一致しているか**
- **Webhookエンドポイントが正しいモードで作成されているか**
- **テスト送信でWebhookが受信されるか**

確認結果を共有していただければ、より具体的な解決方法を提案できます。

