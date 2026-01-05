# Webhookが届かない場合のトラブルシューティング

## 確認手順

### 1. Stripe DashboardでWebhookエンドポイントを確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **右上で「本番モード」になっているか確認**（テストモードの場合、テスト用のWebhookが設定されている可能性があります）
3. 「開発者」→「Webhook」をクリック
4. エンドポイント一覧を確認

---

## よくある問題と解決方法

### 問題1: Webhookエンドポイントが作成されていない

**確認方法:**
- Stripe Dashboard → 開発者 → Webhook
- エンドポイント一覧が空、または `https://atapworks.co.jp/api/webhooks/stripe` がない

**解決方法:**
1. 「エンドポイントを追加」をクリック
2. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
3. 監視するイベント: `checkout.session.completed` を選択
4. 「エンドポイントを追加」をクリック

---

### 問題2: テストモードと本番モードの違い

**確認方法:**
- Stripe Dashboardの右上で「テストモード」になっているか「本番モード」になっているか確認

**解決方法:**
- **本番モードでWebhookエンドポイントを作成**してください
- テストモードと本番モードでは、Webhookエンドポイントが別々に管理されます

---

### 問題3: WebhookエンドポイントURLが間違っている

**確認方法:**
- Stripe Dashboard → 開発者 → Webhook → エンドポイントをクリック
- 「エンドポイントURL」を確認

**正しいURL:**
```
https://atapworks.co.jp/api/webhooks/stripe
```

**間違ったURLの例:**
- `http://atapworks.co.jp/api/webhooks/stripe`（httpはダメ、httpsが必要）
- `https://atapworks-store.vercel.app/api/webhooks/stripe`（Vercelのデフォルトドメインはダメ）
- 末尾にスラッシュがある（`/api/webhooks/stripe/`）

**解決方法:**
1. エンドポイントを削除
2. 正しいURLで新しく作成

---

### 問題4: 監視するイベントが選択されていない

**確認方法:**
- Stripe Dashboard → 開発者 → Webhook → エンドポイントをクリック
- 「監視するイベント」を確認

**必要なイベント:**
- ✅ `checkout.session.completed`

**解決方法:**
1. エンドポイントをクリック
2. 「監視するイベント」セクションで `checkout.session.completed` にチェック
3. 保存

---

### 問題5: Webhook署名シークレットが設定されていない

**確認方法:**
- Vercel Dashboard → Settings → Environment Variables
- `STRIPE_WEBHOOK_SECRET` が設定されているか確認

**解決方法:**
1. Stripe Dashboard → 開発者 → Webhook → エンドポイントをクリック
2. 「署名シークレット」の「表示」をクリック
3. `whsec_...` で始まる値をコピー
4. Vercel Dashboard → Settings → Environment Variables
5. `STRIPE_WEBHOOK_SECRET` を追加（値: `whsec_...`）
6. 再デプロイ

---

### 問題6: ドメインが正しく設定されていない

**確認方法:**
- `https://atapworks.co.jp` にアクセスしてサイトが表示されるか確認

**解決方法:**
- ドメインが正しくVercelに設定されているか確認
- Vercel Dashboard → Settings → Domains で確認

---

## Webhookのテスト方法

### 方法1: Stripe Dashboardからテストイベントを送信

1. Stripe Dashboard → 開発者 → Webhook
2. エンドポイントをクリック
3. 「送信をテスト」をクリック
4. `checkout.session.completed` を選択
5. 「送信」をクリック
6. Vercelのログを確認

### 方法2: 実際にテスト購入を実行

1. テストカード（4242 4242 4242 4242）で購入
2. Stripe Dashboard → 開発者 → Webhook → エンドポイント
3. 「最新のイベント」タブを確認
4. イベントが表示されているか確認
5. イベントをクリックして詳細を確認
6. レスポンスコードが `200` か確認

---

## 確認チェックリスト

Webhookが届かない場合、以下を確認してください：

- [ ] Stripe Dashboardで「本番モード」になっているか
- [ ] Webhookエンドポイントが作成されているか
- [ ] エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか
- [ ] 監視するイベントに `checkout.session.completed` が選択されているか
- [ ] Vercelの環境変数に `STRIPE_WEBHOOK_SECRET` が設定されているか
- [ ] `STRIPE_WEBHOOK_SECRET` の値が正しいか（Stripe Dashboardからコピーした値）
- [ ] 環境変数を変更した後、再デプロイしたか
- [ ] `https://atapworks.co.jp` にアクセスしてサイトが表示されるか

---

## デバッグ方法

### Stripe Dashboardでイベントを確認

1. Stripe Dashboard → 開発者 → Webhook
2. エンドポイントをクリック
3. 「最新のイベント」タブを確認
4. イベントが表示されているか確認

**イベントが表示されている場合:**
- レスポンスコードを確認
- レスポンス本文を確認（エラーメッセージがないか）

**イベントが表示されていない場合:**
- Webhookエンドポイントが正しく設定されていない
- 購入が完了していない（チェックアウトがキャンセルされたなど）

### Vercelのログを確認

1. Vercel Dashboard → プロジェクト → Functions → Logs
2. `/api/webhooks/stripe` に関連するログを確認

**ログが表示されている場合:**
- Webhookは届いている
- 処理中にエラーが発生している可能性

**ログが表示されていない場合:**
- Webhookが届いていない
- エンドポイントURLが間違っている可能性

---

## 正しい設定手順（再設定）

もしWebhookが正しく動作していない場合、以下の手順で再設定してください：

### 1. Stripe DashboardでWebhookエンドポイントを作成

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **右上で「本番モード」に切り替え**
3. 「開発者」→「Webhook」をクリック
4. 「エンドポイントを追加」をクリック
5. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
6. 監視するイベント: `checkout.session.completed` を選択
7. 「エンドポイントを追加」をクリック

### 2. Webhook署名シークレットを取得

1. 作成したエンドポイントをクリック
2. 「署名シークレット」の「表示」をクリック
3. `whsec_...` で始まる値をコピー

### 3. Vercelの環境変数を設定

1. Vercel Dashboard → プロジェクト → Settings → Environment Variables
2. `STRIPE_WEBHOOK_SECRET` を追加（値: コピーした `whsec_...` の値）
3. Environment: Production にチェック
4. Save

### 4. 再デプロイ

1. Vercel Dashboard → Deployments
2. 最新のデプロイメントの「...」→「Redeploy」

### 5. テスト

1. Stripe Dashboard → Webhook → エンドポイント → 「送信をテスト」
2. `checkout.session.completed` を選択して送信
3. Vercelのログを確認

