# Webhook連携状況の確認方法

## 確認すべきポイント

### ローカル環境

1. ✅ Stripe CLIが実行されているか
2. ✅ 開発サーバーが起動しているか
3. ✅ ポート番号が一致しているか
4. ✅ `.env.local` に `STRIPE_WEBHOOK_SECRET` が設定されているか
5. ✅ Webhookが実際に受信されているか（ログを確認）

### デプロイ先（Vercel）

1. ⏳ Stripe DashboardでWebhookエンドポイントが作成されているか
2. ⏳ エンドポイントURLが正しいか
3. ⏳ 監視するイベントが選択されているか
4. ⏳ Vercelの環境変数に `STRIPE_WEBHOOK_SECRET` が設定されているか
5. ⏳ 実際にWebhookが受信されているか（Vercelのログを確認）

---

## ローカル環境での確認手順

### 1. 現在の状況を確認

以下のコマンドで、Webhookが正しく動作しているか確認：

```bash
# テストイベントを送信
stripe trigger checkout.session.completed
```

### 2. 開発サーバーのログを確認

開発サーバーが実行されているターミナルで、以下のようなログが表示されているか確認：

```
POST /api/webhooks/stripe 200 in XXXms
📧 顧客への注文確認メールを送信します: ...
✅ 顧客へのメール送信処理が完了しました
📧 管理者への通知メールを送信します
✅ 管理者へのメール送信処理が完了しました
```

**ログが表示されている場合**: ✅ ローカル環境でのWebhookは正常に動作しています

**ログが表示されていない場合**: ❌ 設定に問題がある可能性があります

---

## デプロイ先（Vercel）での確認手順

### 1. Stripe Dashboardで確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **右上で「本番モード」になっているか確認**
3. 「開発者」→「Webhook」をクリック
4. エンドポイント一覧を確認

**確認ポイント**:
- ✅ エンドポイントが作成されているか
- ✅ URLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか
- ✅ 監視するイベントに `checkout.session.completed` が選択されているか

### 2. Vercelの環境変数を確認

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. 「Settings」→「Environment Variables」をクリック
4. `STRIPE_WEBHOOK_SECRET` が設定されているか確認

**確認ポイント**:
- ✅ `STRIPE_WEBHOOK_SECRET` が存在するか
- ✅ Environment: Production にチェックが入っているか

### 3. Vercelのログを確認

1. Vercel Dashboard → プロジェクト → 「Functions」タブ
2. `/api/webhooks/stripe` を選択
3. ログを確認

**ログが表示されている場合**: ✅ Webhookは届いている

**ログが表示されていない場合**: ❌ Webhookが届いていない可能性があります

---

## よくある問題

### 問題1: ローカルでログが表示されない

**原因**:
- `stripe listen` が実行されていない
- ポート番号が一致していない
- `.env.local` に `STRIPE_WEBHOOK_SECRET` が設定されていない

**解決方法**:
1. `stripe listen --forward-to localhost:3001/api/webhooks/stripe` を実行
2. 表示されたシークレットを `.env.local` に追加
3. 開発サーバーを再起動
4. テストを再実行

### 問題2: デプロイ先でWebhookが届かない

**原因**:
- Webhookエンドポイントが作成されていない
- エンドポイントURLが間違っている
- 環境変数が設定されていない
- 環境変数を変更した後、再デプロイしていない

**解決方法**:
1. Stripe Dashboardでエンドポイントを確認・作成
2. Vercelの環境変数を確認・設定
3. 環境変数を変更した場合は、再デプロイ

---

## 確認チェックリスト

### ローカル環境

- [ ] Stripe CLIがインストールされている
- [ ] `stripe listen` が実行されている
- [ ] 開発サーバーが起動している
- [ ] ポート番号が一致している（開発サーバーと `stripe listen`）
- [ ] `.env.local` に `STRIPE_WEBHOOK_SECRET` が設定されている
- [ ] `stripe trigger checkout.session.completed` を実行した後、開発サーバーのログにWebhookが表示される

### デプロイ先（Vercel）

- [ ] Stripe Dashboardで「本番モード」になっている
- [ ] Webhookエンドポイントが作成されている
- [ ] エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっている
- [ ] 監視するイベントに `checkout.session.completed` が選択されている
- [ ] Vercelの環境変数に `STRIPE_WEBHOOK_SECRET` が設定されている
- [ ] 環境変数を変更した後、再デプロイした
- [ ] テスト購入後にVercelのログにWebhookが表示される

---

## 次のステップ

### ローカル環境が動作している場合

→ デプロイ先（Vercel）の設定に進みます。

詳細は `WEBHOOK_SETUP_GUIDE.md` の「デプロイ先（Vercel）での設定」セクションを参照してください。

### デプロイ先が動作していない場合

→ `WEBHOOK_TROUBLESHOOTING.md` を参照して、トラブルシューティングを行います。

