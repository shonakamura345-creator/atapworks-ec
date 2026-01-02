# デプロイ手順

## 1. Vercelへのデプロイ

Next.jsアプリはVercelが最も簡単にデプロイできます。

1. [Vercel](https://vercel.com/)にアクセスしてアカウントを作成/ログイン
2. "Add New Project"をクリック
3. GitHubリポジトリを選択（または直接コードをアップロード）
4. プロジェクト設定で以下を確認：
   - Framework Preset: Next.js
   - Root Directory: `./`（デフォルト）
5. "Deploy"をクリック

## 2. 本番環境変数の設定

Vercelのダッシュボードで、プロジェクト → Settings → Environment Variables に以下を設定：

### 必須の環境変数

```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_xxxxxxxxxxxxx
STRIPE_SECRET_KEY=sk_live_xxxxxxxxxxxxx
STRIPE_WEBHOOK_SECRET=whsec_xxxxxxxxxxxxx
NEXT_PUBLIC_BASE_URL=https://atapworks.co.jp
RESEND_API_KEY=re_xxxxxxxxxxxxx
RESEND_FROM_EMAIL=info@atapworks.co.jp
```

### オプションの環境変数

```
NEXT_PUBLIC_GA_ID=G-xxxxxxxxxx
```

## 3. Stripe本番キーの取得

1. [Stripe Dashboard](https://dashboard.stripe.com/)にログイン
2. 右上の「テストモード」を「本番モード」に切り替え
3. 「開発者」→「API キー」から以下を取得：
   - **公開可能キー** (`pk_live_...`) → `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **シークレットキー** (`sk_live_...`) → `STRIPE_SECRET_KEY`

## 4. Stripe Webhookの設定

1. Stripe Dashboard → 「開発者」→「Webhook」
2. 「エンドポイントを追加」をクリック
3. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
4. 監視するイベント: `checkout.session.completed` を選択
5. 「エンドポイントを追加」をクリック
6. 「署名シークレットを表示」をクリックして `whsec_...` をコピー
7. これを `STRIPE_WEBHOOK_SECRET` に設定

## 5. Resendの設定

1. [Resend Dashboard](https://resend.com/)で本番用APIキーを取得
2. 送信元メールアドレスを設定（ドメイン認証が必要な場合あり）
3. `RESEND_API_KEY` と `RESEND_FROM_EMAIL` を設定

## 6. Google Analyticsの設定（オプション）

1. [Google Analytics](https://analytics.google.com/)でプロパティを作成
2. 測定ID (`G-...`) を取得
3. `NEXT_PUBLIC_GA_ID` に設定

## 7. robots.txtの更新

`public/robots.txt` と `app/sitemap.ts` は既に `atapworks.co.jp` に設定されています。

## 8. 再デプロイ

環境変数を追加/変更した後は、Vercelダッシュボードで「Redeploy」を実行してください。


