# Stripe DashboardでWebhookエンドポイントを設定する手順

## 現在のページ

Stripe Dashboardの「Webhook エンドポイント」設定ページにいます。ここでデプロイ先（Vercel）用のWebhookエンドポイントを作成します。

---

## 設定手順

### ステップ1: エンドポイントを追加

1. ページ上部の「**送信先を追加する**」ボタンをクリック
2. 「**Webhook エンドポイント**」を選択

### ステップ2: エンドポイントURLを入力

**エンドポイントURL**に以下を入力：

```
https://atapworks.co.jp/api/webhooks/stripe
```

⚠️ **重要**:
- `http://` ではなく `https://` を使用
- 末尾にスラッシュ（`/`）を付けない
- ドメインが `atapworks.co.jp` であることを確認

### ステップ3: 監視するイベントを選択

「**監視するイベント**」セクションで：

1. 「**イベントタイプを選択**」または「**すべてのイベントタイプ**」から検索
2. `checkout.session.completed` を選択
   - 検索ボックスに「checkout.session.completed」と入力すると見つかります
3. 選択したイベントがリストに追加されることを確認

### ステップ4: エンドポイントを追加

1. 「**エンドポイントを追加**」ボタンをクリック
2. エンドポイントが作成される

### ステップ5: 署名シークレットを取得

エンドポイントが作成されると、詳細ページが表示されます。

1. 「**署名シークレット**」セクションを探す
2. 「**表示**」ボタンをクリック
3. `whsec_...` で始まる値をコピー
   - 例: `whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

⚠️ **重要**: このシークレットは一度しか表示されないので、必ずコピーして保存してください。

---

## 次のステップ: Vercelの環境変数を設定

取得した署名シークレットを、Vercelの環境変数に設定します。

### 1. Vercel Dashboardに移動

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. 「Settings」→「Environment Variables」をクリック

### 2. 環境変数を追加

1. 「**Key**」に `STRIPE_WEBHOOK_SECRET` を入力
2. 「**Value**」にコピーしたシークレット（`whsec_...`）を貼り付け
3. 「**Environment**」で「Production」にチェック
4. 「**Save**」をクリック

### 3. 再デプロイ

環境変数を追加した後、必ず再デプロイしてください：

1. Vercel Dashboard → 「Deployments」
2. 最新のデプロイメントの「...」→「Redeploy」

---

## 確認事項

### Stripe Dashboardで確認

- ✅ エンドポイントが作成されている
- ✅ URLが `https://atapworks.co.jp/api/webhooks/stripe` になっている
- ✅ 監視するイベントに `checkout.session.completed` が選択されている
- ✅ 署名シークレットをコピーした

### Vercelで確認

- ✅ 環境変数 `STRIPE_WEBHOOK_SECRET` が設定されている
- ✅ Environment: Production にチェックが入っている
- ✅ 環境変数を追加した後、再デプロイした

---

## テスト方法

設定が完了したら、テストできます：

### 方法1: Stripe Dashboardからテスト送信

1. Stripe Dashboard → Webhook → エンドポイントをクリック
2. 「送信をテスト」をクリック
3. `checkout.session.completed` を選択
4. 「送信」をクリック
5. Vercel Dashboard → Functions → Logs でログを確認

### 方法2: 実際にテスト購入

1. サイトでテストカード（`4242 4242 4242 4242`）で購入
2. Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」を確認
3. イベントが表示されているか確認
4. レスポンスコードが `200` か確認

---

## トラブルシューティング

### エンドポイントが作成できない

- URLの形式を確認（`https://` で始まり、末尾にスラッシュがない）
- ドメインが正しく設定されているか確認

### 署名シークレットが表示されない

- エンドポイントの詳細ページを開いているか確認
- 「署名シークレット」セクションをスクロールして探す

### Webhookが届かない

- Vercelの環境変数が正しく設定されているか確認
- 環境変数を変更した後、再デプロイしたか確認
- Stripe DashboardでエンドポイントURLが正しいか確認

---

## まとめ

1. ✅ Stripe Dashboardでエンドポイントを作成
2. ✅ エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
3. ✅ 監視するイベント: `checkout.session.completed`
4. ✅ 署名シークレットをコピー
5. ✅ Vercelの環境変数に設定
6. ✅ 再デプロイ

詳細は `WEBHOOK_SETUP_GUIDE.md` を参照してください。

