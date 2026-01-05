# 本番環境オープン前チェックリスト

## ✅ 必須項目

### 1. Stripe本番キーの設定

#### 1-1. Stripe本番キーの取得
1. [Stripe Dashboard](https://dashboard.stripe.com/)にログイン
2. 右上の「テストモード」を「本番モード」に切り替え
3. 「開発者」→「API キー」から以下を取得：
   - **公開可能キー** (`pk_live_...`) 
   - **シークレットキー** (`sk_live_...`)

#### 1-2. Vercel環境変数の設定
Vercelダッシュボード → プロジェクト → Settings → Environment Variables に以下を設定：

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
```

⚠️ **重要**: テストキー（`pk_test_`, `sk_test_`）ではない、本番キー（`pk_live_`, `sk_live_`）を設定してください。

---

### 2. Stripe Webhookの設定

#### 2-1. Webhookエンドポイントの作成
1. Stripe Dashboard → 「開発者」→「Webhook」
2. 「エンドポイントを追加」をクリック
3. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
4. **監視するイベント**: `checkout.session.completed` を選択
5. 「エンドポイントを追加」をクリック

#### 2-2. Webhook署名シークレットの取得
1. 作成したWebhookエンドポイントをクリック
2. 「署名シークレットを表示」をクリック
3. `whsec_...` をコピー

#### 2-3. Vercel環境変数の設定
```
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
```

#### 2-4. Webhookの動作確認
- テストモードでWebhookをテストすることを推奨
- Stripe Dashboard → Webhook → エンドポイント → 「送信をテスト」で動作確認

---

### 3. メール送信（Resend）の設定

#### 3-1. Resend APIキーの取得
1. [Resend Dashboard](https://resend.com/)にログイン
2. API Keysから本番用APIキーを取得（`re_...`）

#### 3-2. ドメイン認証（推奨）
- `atapworks.co.jp` ドメインを認証することで、送信元メールアドレスを設定可能
- 未認証の場合、Resendのデフォルトドメインを使用（例: `onboarding@resend.dev`）

#### 3-3. Vercel環境変数の設定
```
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=info@atapworks.co.jp
ADMIN_EMAIL=info.shokenchikushi@gmail.com
```

⚠️ **注意**: 
- ドメイン認証をしていない場合、`RESEND_FROM_EMAIL`はResendのデフォルトドメインを使用してください。
- `ADMIN_EMAIL`には管理者（あなた）のメールアドレスを設定してください。購入時に通知が送信されます。

---

### 4. ベースURLの設定

既に設定済みですが、確認してください：

```
NEXT_PUBLIC_BASE_URL=https://atapworks.co.jp
```

---

### 5. Google Analyticsの設定（オプション・推奨）

#### 5-1. Google Analytics測定IDの取得
1. [Google Analytics](https://analytics.google.com/)でプロパティを作成
2. 測定ID (`G-...`) を取得

#### 5-2. Vercel環境変数の設定
```
NEXT_PUBLIC_GA_ID=G-xxxxxxxxxx
```

#### 5-3. 計測の確認
- 本番環境でアクセスした後、Google Analyticsでリアルタイムレポートを確認
- ページビューやイベントが記録されているか確認

---

## 🔍 動作確認チェックリスト

### 購入フローの確認

#### ✅ テスト購入の実行
1. **本番環境でテスト購入を実行**
   - Stripe Dashboard → 「支払い」→「テスト支払いを作成」でテストカードを使用
   - または、実際の少額購入（例: 100円）でテスト

2. **確認項目**:
   - ✅ チェックアウトページが正しく表示される
   - ✅ Stripeの決済フォームが表示される
   - ✅ 決済が完了する
   - ✅ サクセスページにリダイレクトされる
   - ✅ **注文確認メールが顧客に送信される**
   - ✅ Stripe Dashboardで決済が記録される

#### ✅ メール通知の確認
購入完了後、以下を確認：

1. **顧客への注文確認メール**
   - 送信先: 購入時に入力したメールアドレス
   - 件名: 「ご注文ありがとうございます - Sho建築士オンラインストア」
   - 内容: 注文詳細、配送先情報が含まれているか確認

2. **管理者への通知メール**
   - 送信先: `ADMIN_EMAIL`に設定したメールアドレス
   - 件名: 「🛒 新しい注文が入りました - 注文ID: [注文ID]」
   - 内容: 注文詳細、お客様情報、配送先情報が含まれているか確認
   - ⚠️ **重要**: `ADMIN_EMAIL`が設定されていない場合、管理者への通知は送信されません

3. **メール送信ログの確認**
   - Resend Dashboard → Emailsで送信ログを確認
   - エラーがないか確認

#### ✅ Webhookの動作確認
1. Stripe Dashboard → Webhook → エンドポイント
2. 最新のイベントを確認
3. `checkout.session.completed` イベントが受信されているか確認
4. レスポンスステータスが `200` か確認

#### ✅ Google Analyticsの確認（設定している場合）
1. Google Analytics → リアルタイム → 概要
2. 本番サイトにアクセスして、リアルタイムで計測されるか確認
3. 購入完了ページへのアクセスが記録されるか確認

---

## 📋 デプロイ後の最終確認

### 環境変数の再確認
Vercelダッシュボードで以下がすべて設定されているか確認：

- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (本番キー: `pk_live_...`)
- [ ] `STRIPE_SECRET_KEY` (本番キー: `sk_live_...`)
- [ ] `STRIPE_WEBHOOK_SECRET` (`whsec_...`)
- [ ] `NEXT_PUBLIC_BASE_URL` (`https://atapworks.co.jp`)
- [ ] `RESEND_API_KEY` (`re_...`)
- [ ] `RESEND_FROM_EMAIL` (例: `info@atapworks.co.jp`)
- [ ] `ADMIN_EMAIL` (管理者のメールアドレス: `info.shokenchikushi@gmail.com`)
- [ ] `NEXT_PUBLIC_GA_ID` (オプション: `G-...`)

### 再デプロイ
環境変数を追加/変更した後は、Vercelダッシュボードで「Redeploy」を実行してください。

---

## 🚨 重要な注意事項

### Stripeのテストモードと本番モード
- **テストモード**: テストキー（`pk_test_`, `sk_test_`）を使用、実際の決済は発生しない
- **本番モード**: 本番キー（`pk_live_`, `sk_live_`）を使用、実際の決済が発生する

⚠️ **本番環境では必ず本番キーを使用してください。**

### メール送信について
- `RESEND_API_KEY`が設定されていない場合、メール送信はコンソールログに出力されるだけで、実際には送信されません
- 本番環境では必ず`RESEND_API_KEY`を設定してください

### 購入時の動作
1. 顧客がチェックアウトを完了
2. Stripeが決済を処理
3. StripeがWebhookを送信（`checkout.session.completed`）
4. Webhookエンドポイントがメール送信を実行
5. 顧客に注文確認メールが送信される

---

## ✅ 最終チェック

本番環境をオープンする前に、以下をすべて確認してください：

- [ ] すべての環境変数が本番用に設定されている
- [ ] Stripe Webhookが正しく設定され、動作している
- [ ] テスト購入でメール送信が正常に動作している
- [ ] Google Analytics（設定している場合）が正常に動作している
- [ ] サイト全体が正常に表示される（スマホ・PC）
- [ ] 決済フローが正常に動作する

---

## 📞 トラブルシューティング

### メールが送信されない場合
1. Resend DashboardでAPIキーが有効か確認
2. Vercelのログを確認（Functions → Logs）
3. Webhookのログを確認（Stripe Dashboard → Webhook → エンドポイント → イベント）

### Webhookが動作しない場合
1. WebhookエンドポイントURLが正しいか確認
2. `STRIPE_WEBHOOK_SECRET`が正しく設定されているか確認
3. Stripe DashboardでWebhookのイベントログを確認

### Google Analyticsが計測されない場合
1. `NEXT_PUBLIC_GA_ID`が正しく設定されているか確認
2. ブラウザの開発者ツールでネットワークタブを確認（`gtag`へのリクエストがあるか）
3. Google Analyticsのリアルタイムレポートを確認

