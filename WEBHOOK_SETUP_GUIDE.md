# Stripe Webhook連携ガイド

## Webhookの仕組み

Stripe Webhookは、決済が完了したときに自動的にあなたのサーバー（Next.js APIルート）に通知を送信する機能です。

```
購入完了 → Stripe → Webhook送信 → Next.js API → メール送信
```

---

## ローカル開発環境での設定

### 1. Stripe CLIをインストール

```bash
# macOS
brew install stripe/stripe-cli/stripe

# または公式サイトからダウンロード
# https://stripe.com/docs/stripe-cli
```

### 2. Stripe CLIにログイン

```bash
stripe login
```

ブラウザが開くので、Stripeアカウントでログインします。

### 3. ローカルでWebhookを転送

開発サーバーを起動した状態で、別のターミナルで実行：

```bash
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

このコマンドで：
- ローカルにWebhookが転送される
- **Webhook署名シークレットが表示される**（`whsec_...`で始まる）
- このシークレットを `.env.local` に設定する必要がある

### 4. 環境変数を設定

`.env.local` ファイルに追加：

```env
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx  # stripe listenで表示された値
```

### 5. 開発サーバーを再起動

```bash
npm run dev
```

---

## デプロイ先（Vercel）での設定

### 1. Stripe DashboardでWebhookエンドポイントを作成

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **右上で「本番モード」に切り替え**（重要！）
3. 「開発者」→「Webhook」をクリック
4. 「エンドポイントを追加」をクリック
5. 以下の情報を入力：
   - **エンドポイントURL**: `https://atapworks.co.jp/api/webhooks/stripe`
   - **監視するイベント**: `checkout.session.completed` を選択
6. 「エンドポイントを追加」をクリック

### 2. Webhook署名シークレットを取得

1. 作成したエンドポイントをクリック
2. 「署名シークレット」セクションの「表示」をクリック
3. `whsec_...` で始まる値をコピー

⚠️ **重要**: このシークレットは一度しか表示されないので、必ずコピーして保存してください。

### 3. Vercelの環境変数を設定

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. 「Settings」→「Environment Variables」をクリック
4. 以下の環境変数を追加：

   **Key**: `STRIPE_WEBHOOK_SECRET`
   **Value**: `whsec_...`（Stripe Dashboardからコピーした値）
   **Environment**: `Production` にチェック（必要に応じて `Preview` も）

5. 「Save」をクリック

### 4. 再デプロイ

環境変数を変更した後は、必ず再デプロイが必要です：

1. Vercel Dashboard → 「Deployments」
2. 最新のデプロイメントの「...」→「Redeploy」

または、GitHubにプッシュすると自動的に再デプロイされます。

---

## ローカルとデプロイ先の違い

| 項目 | ローカル | デプロイ先（Vercel） |
|------|----------|---------------------|
| **Webhook URL** | `localhost:3000/api/webhooks/stripe` | `https://atapworks.co.jp/api/webhooks/stripe` |
| **Webhookシークレット** | Stripe CLIで生成（`stripe listen`） | Stripe Dashboardで生成 |
| **設定方法** | `.env.local` に設定 | Vercel Dashboardの環境変数に設定 |
| **テスト方法** | Stripe CLIで送信 | Stripe Dashboardの「送信をテスト」 |

---

## よくある問題と解決方法

### 問題1: ローカルでは動くが、デプロイ先で動かない

**原因:**
- Vercelの環境変数 `STRIPE_WEBHOOK_SECRET` が設定されていない
- 環境変数を変更した後、再デプロイしていない
- テストモードと本番モードが混在している

**解決方法:**
1. Vercel Dashboardで環境変数を確認
2. Stripe Dashboardで「本番モード」のWebhookエンドポイントが作成されているか確認
3. 環境変数を設定した後、必ず再デプロイ

---

### 問題2: Webhookが届かない

**原因:**
- WebhookエンドポイントURLが間違っている
- イベント（`checkout.session.completed`）が選択されていない
- ドメインが正しく設定されていない

**解決方法:**
1. Stripe Dashboard → Webhook → エンドポイントを確認
2. URLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認
3. 監視するイベントに `checkout.session.completed` が選択されているか確認

---

### 問題3: 署名検証エラー

**原因:**
- `STRIPE_WEBHOOK_SECRET` の値が間違っている
- ローカル用とデプロイ先用のシークレットを混同している

**解決方法:**
1. Stripe Dashboard → Webhook → エンドポイント → 署名シークレットを再確認
2. Vercelの環境変数が正しい値になっているか確認
3. 本番モードのWebhookエンドポイントのシークレットを使っているか確認

---

## テスト方法

### ローカルでのテスト

1. 開発サーバーを起動：
   ```bash
   npm run dev
   ```

2. 別のターミナルでStripe CLIを起動：
   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

3. Stripe CLIからテストイベントを送信：
   ```bash
   stripe trigger checkout.session.completed
   ```

4. 開発サーバーのログを確認（メール送信のログが表示されるはず）

---

### デプロイ先でのテスト

#### 方法1: Stripe Dashboardからテスト送信

1. Stripe Dashboard → Webhook → エンドポイントをクリック
2. 「送信をテスト」をクリック
3. `checkout.session.completed` を選択
4. 「送信」をクリック
5. Vercel Dashboard → Functions → Logs でログを確認

#### 方法2: 実際にテスト購入

1. サイトでテストカード（`4242 4242 4242 4242`）で購入
2. Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」を確認
3. イベントが表示されているか確認
4. レスポンスコードが `200` か確認

---

## デバッグ方法

### 1. Vercelのログを確認

1. Vercel Dashboard → プロジェクト → 「Functions」タブ
2. `/api/webhooks/stripe` を選択
3. ログを確認

**ログが表示されている場合:**
- Webhookは届いている
- 処理中にエラーが発生している可能性

**ログが表示されていない場合:**
- Webhookが届いていない
- エンドポイントURLが間違っている可能性

---

### 2. Stripe Dashboardでイベントを確認

1. Stripe Dashboard → Webhook → エンドポイントをクリック
2. 「最新のイベント」タブを確認
3. イベントが表示されているか確認

**イベントが表示されている場合:**
- レスポンスコードを確認（`200` が正常）
- レスポンス本文を確認（エラーメッセージがないか）

**イベントが表示されていない場合:**
- Webhookエンドポイントが正しく設定されていない
- 購入が完了していない

---

## チェックリスト

### ローカル環境

- [ ] Stripe CLIがインストールされている
- [ ] `stripe listen` でローカル転送が動作している
- [ ] `.env.local` に `STRIPE_WEBHOOK_SECRET` が設定されている
- [ ] 開発サーバーが起動している
- [ ] テストイベントを送信して動作確認した

### デプロイ先（Vercel）

- [ ] Stripe Dashboardで「本番モード」になっている
- [ ] Webhookエンドポイントが作成されている
- [ ] エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっている
- [ ] 監視するイベントに `checkout.session.completed` が選択されている
- [ ] Vercelの環境変数に `STRIPE_WEBHOOK_SECRET` が設定されている
- [ ] 環境変数を設定した後、再デプロイした
- [ ] テスト送信で動作確認した

---

## 完全な設定手順（初回設定）

### ステップ1: ローカル環境の設定

```bash
# 1. Stripe CLIをインストール（未インストールの場合）
brew install stripe/stripe-cli/stripe

# 2. Stripe CLIにログイン
stripe login

# 3. 開発サーバーを起動（別のターミナル）
npm run dev

# 4. Webhookを転送（別のターミナル）
stripe listen --forward-to localhost:3000/api/webhooks/stripe

# 5. 表示されたシークレットを .env.local に追加
# STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

### ステップ2: デプロイ先（Vercel）の設定

1. **Stripe Dashboardでエンドポイントを作成**
   - 本番モードに切り替え
   - エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
   - イベント: `checkout.session.completed`

2. **シークレットをコピー**
   - Stripe Dashboard → Webhook → エンドポイント → 署名シークレット

3. **Vercelに環境変数を設定**
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: コピーしたシークレット
   - Environment: Production

4. **再デプロイ**
   - Vercel Dashboard → Deployments → Redeploy

5. **テスト**
   - Stripe Dashboard → Webhook → 送信をテスト

---

## まとめ

- **ローカル**: Stripe CLIで転送、`.env.local`でシークレットを設定
- **デプロイ先**: Stripe Dashboardでエンドポイント作成、Vercelで環境変数を設定
- **テスト**: ローカルは `stripe trigger`、デプロイ先はStripe Dashboardの「送信をテスト」
- **デバッグ**: VercelのログとStripe Dashboardのイベント履歴を確認

