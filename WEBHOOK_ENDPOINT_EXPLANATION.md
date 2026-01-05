# WebhookエンドポイントURLについて

## 重要なポイント

**WebhookエンドポイントURLはブラウザで開くものではありません。**

このURLは、Stripeのサーバーがイベント（決済完了など）を送信する先のURLです。

- ❌ ブラウザで `https://atapworks.co.jp/api/webhooks/stripe` を開いても、何も表示されません（正常です）
- ✅ StripeのサーバーがこのURLにHTTPリクエストを送信します
- ✅ あなたのNext.jsアプリケーション（Vercel）がこのリクエストを受信して処理します

---

## テスト送信ボタンの場所

### ステップ1: Stripe Dashboardに移動

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. 左上のメニューから「**開発者**」をクリック
3. 「**Webhook**」をクリック

### ステップ2: エンドポイントを選択

1. エンドポイント一覧が表示されます
2. エンドポイント名（`adventurous-oasis` など）をクリック
3. エンドポイントの詳細ページが開きます

### ステップ3: テスト送信を実行

エンドポイントの詳細ページで：

1. ページの上部（タイトル「adventurous-oasis」の下）にボタンがあります
2. 「**送信をテスト**」というボタンをクリック
3. または、ページの右上に「**送信をテスト**」ボタンがあります

見つからない場合：
- ページを少しスクロールしてみてください
- ブラウザの検索機能（Ctrl+F / Cmd+F）で「送信をテスト」を検索

---

## テスト送信の手順

### 方法1: Stripe Dashboardからテスト送信

1. Stripe Dashboard → 開発者 → Webhook → エンドポイントをクリック
2. 「送信をテスト」ボタンをクリック
3. イベントタイプを選択：
   - 「イベントタイプを選択」から `checkout.session.completed` を選択
4. 「送信」ボタンをクリック

### 方法2: 実際にテスト購入

1. サイト（`https://atapworks.co.jp`）で商品をカートに追加
2. チェックアウトページでテストカードを使用：
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 未来の日付（例: 12/25）
   - CVC: 任意の3桁（例: 123）
3. 購入を完了
4. Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」タブで確認

---

## WebhookエンドポイントURLが正しいか確認する方法

### ブラウザで開く方法（開けません）

❌ **ブラウザで `https://atapworks.co.jp/api/webhooks/stripe` を開いても何も表示されません**

これは正常です。WebhookエンドポイントはPOSTリクエストを処理するAPIエンドポイントで、ブラウザからGETリクエストでアクセスしても何も返しません。

### 正しく動作しているか確認する方法

1. **Stripe Dashboardからテスト送信**
   - Stripe Dashboard → Webhook → エンドポイント → 「送信をテスト」
   - イベントが送信される
   - 「最新のイベント」タブで確認
   - レスポンスコードが `200` になっているか確認

2. **Vercelのログを確認**
   - Vercel Dashboard → Functions → `/api/webhooks/stripe`
   - ログにWebhookが受信されたことが表示される

3. **実際にテスト購入**
   - サイトでテスト購入を実行
   - Stripe Dashboard → Webhook → 「最新のイベント」で確認
   - Vercelのログで確認

---

## エンドポイントURLが正しいかどうか

✅ **`https://atapworks.co.jp/api/webhooks/stripe` は正しいURLです**

- ドメイン: `atapworks.co.jp` ✅
- パス: `/api/webhooks/stripe` ✅
- プロトコル: `https://` ✅

このURLがStripe Dashboardに設定されていれば、問題ありません。

---

## まとめ

- ❌ WebhookエンドポイントURLをブラウザで開く必要はありません（開けません）
- ✅ Stripe Dashboard → 開発者 → Webhook → エンドポイント → 「送信をテスト」でテストできます
- ✅ 実際にテスト購入を実行しても確認できます
- ✅ VercelのログでWebhookが受信されたことを確認できます

---

## 次のステップ

1. Stripe Dashboard → 開発者 → Webhook → エンドポイント（`adventurous-oasis`）をクリック
2. 「送信をテスト」ボタンを探す（ページ上部または右上）
3. テスト送信を実行
4. 「最新のイベント」タブで結果を確認

