# 署名シークレットの取得とVercel設定

## ✅ 現在の状態

Webhookエンドポイントが正常に作成されています！

- ✅ エンドポイント名: `adventurous-oasis`
- ✅ エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
- ✅ リッスン対象: `checkout.session.completed`

---

## 次のステップ: 署名シークレットを取得

### 1. 署名シークレットを表示

画面の「署名シークレット」セクションで：

1. 「**whsec_·················**」の右側にある「**表示**」ボタンをクリック
2. `whsec_...` で始まる完全な値をコピー
   - 例: `whsec_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

⚠️ **重要**: このシークレットは一度しか表示されないことがあります。必ずコピーして保存してください。

---

## ステップ2: Vercelの環境変数に設定

### 1. Vercel Dashboardに移動

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクト（`atapworks-store` など）を選択
3. 「Settings」タブをクリック
4. 左側のメニューから「Environment Variables」をクリック

### 2. 環境変数を追加

1. 「Key」の入力欄に `STRIPE_WEBHOOK_SECRET` を入力
2. 「Value」の入力欄に、コピーしたシークレット（`whsec_...`）を貼り付け
3. 「Environment」で「Production」にチェック（必要に応じて「Preview」にもチェック）
4. 「Save」ボタンをクリック

### 3. 再デプロイ

環境変数を追加した後、必ず再デプロイしてください：

1. Vercel Dashboard → 「Deployments」タブ
2. 最新のデプロイメントの「...」（三点メニュー）をクリック
3. 「Redeploy」を選択
4. 再デプロイが完了するのを待つ

---

## 確認事項

### Stripe Dashboard
- ✅ エンドポイントが作成されている
- ✅ エンドポイントURLが正しい
- ✅ 署名シークレットをコピーした

### Vercel（これからやること）
- ⏳ 環境変数 `STRIPE_WEBHOOK_SECRET` を設定
- ⏳ 再デプロイ

---

## テスト方法

設定が完了したら、テストできます：

### 方法1: Stripe Dashboardからテスト送信

1. Stripe Dashboard → Webhook → エンドポイント（`adventurous-oasis`）をクリック
2. 上部の「送信をテスト」をクリック
3. `checkout.session.completed` を選択
4. 「送信」をクリック
5. Vercel Dashboard → Functions → Logs でログを確認

### 方法2: 実際にテスト購入

1. サイトでテストカード（`4242 4242 4242 4242`）で購入
2. Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」を確認
3. イベントが表示されているか確認
4. レスポンスコードが `200` か確認

---

## まとめ

1. ✅ Webhookエンドポイントを作成済み
2. ⏳ 署名シークレットを表示してコピー
3. ⏳ Vercelの環境変数に設定
4. ⏳ 再デプロイ
5. ⏳ テスト

