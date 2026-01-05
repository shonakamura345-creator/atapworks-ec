# Vercelでの環境変数設定手順

## 1. Vercelダッシュボードにアクセス

1. ブラウザで [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. ログイン（GitHubアカウントでログインしている場合が多いです）

## 2. プロジェクトを選択

1. ダッシュボードで `atapworks-store` または該当するプロジェクト名をクリック
2. プロジェクトのページが開きます

## 3. 環境変数の設定画面を開く

1. 上部のタブから **「Settings」** をクリック
2. 左側のメニューから **「Environment Variables」** をクリック

## 4. 環境変数を追加

### 4-1. 各環境変数を1つずつ追加

「Add New」ボタンの横にある入力欄を使用して、以下の環境変数を追加します。

#### 必須の環境変数（順番に追加）

1. **NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY**
   - Key: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - Value: `pk_live_xxxxxxxxxxxxx`（Stripe本番公開キー）
   - Environment: ✅ Production ✅ Preview ✅ Development（すべてにチェック）

2. **STRIPE_SECRET_KEY**
   - Key: `STRIPE_SECRET_KEY`
   - Value: `sk_live_xxxxxxxxxxxxx`（Stripe本番シークレットキー）
   - Environment: ✅ Production ✅ Preview ✅ Development（すべてにチェック）

3. **STRIPE_WEBHOOK_SECRET**
   - Key: `STRIPE_WEBHOOK_SECRET`
   - Value: `whsec_xxxxxxxxxxxxx`（Stripe Webhook署名シークレット）
   - Environment: ✅ Production（本番のみチェック）

4. **NEXT_PUBLIC_BASE_URL**
   - Key: `NEXT_PUBLIC_BASE_URL`
   - Value: `https://atapworks.co.jp`
   - Environment: ✅ Production ✅ Preview ✅ Development（すべてにチェック）

5. **RESEND_API_KEY**
   - Key: `RESEND_API_KEY`
   - Value: `re_xxxxxxxxxxxxx`（Resend APIキー）
   - Environment: ✅ Production ✅ Preview ✅ Development（すべてにチェック）

6. **RESEND_FROM_EMAIL**
   - Key: `RESEND_FROM_EMAIL`
   - Value: `info@atapworks.co.jp`（またはResendのデフォルトドメイン）
   - Environment: ✅ Production ✅ Preview ✅ Development（すべてにチェック）

7. **ADMIN_EMAIL**
   - Key: `ADMIN_EMAIL`
   - Value: `info.shokenchikushi@gmail.com`
   - Environment: ✅ Production ✅ Preview ✅ Development（すべてにチェック）

#### オプションの環境変数

8. **NEXT_PUBLIC_GA_ID**（Google Analyticsを設定する場合のみ）
   - Key: `NEXT_PUBLIC_GA_ID`
   - Value: `G-xxxxxxxxxx`（Google Analytics測定ID）
   - Environment: ✅ Production ✅ Preview ✅ Development（すべてにチェック）

### 4-2. 環境変数の追加方法（詳細）

各環境変数を追加する手順：

1. 「Add New」ボタンの下にある入力欄に：
   - **Key**: 環境変数名（例: `ADMIN_EMAIL`）
   - **Value**: 環境変数の値（例: `info.shokenchikushi@gmail.com`）
   - **Environment**: どの環境で使用するか選択
     - Production（本番環境）
     - Preview（プレビュー環境）
     - Development（開発環境）
   - 通常はすべてにチェックを入れますが、`STRIPE_WEBHOOK_SECRET`は本番環境のみで十分です

2. 「Save」ボタンをクリック

3. 次の環境変数を追加する場合は、同じ手順を繰り返します

## 5. 環境変数の確認

すべての環境変数を追加したら、一覧で以下が表示されているか確認してください：

- ✅ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- ✅ STRIPE_SECRET_KEY
- ✅ STRIPE_WEBHOOK_SECRET
- ✅ NEXT_PUBLIC_BASE_URL
- ✅ RESEND_API_KEY
- ✅ RESEND_FROM_EMAIL
- ✅ ADMIN_EMAIL
- ✅ NEXT_PUBLIC_GA_ID（設定した場合のみ）

## 6. 再デプロイ

環境変数を追加/変更した後は、**必ず再デプロイが必要**です。

### 再デプロイの方法

#### 方法1: 手動で再デプロイ
1. プロジェクトページの「Deployments」タブを開く
2. 最新のデプロイメントの「...」（三点メニュー）をクリック
3. 「Redeploy」を選択
4. 「Redeploy」ボタンをクリック

#### 方法2: 新しいコミットをプッシュ（推奨）
- コードを変更して新しいコミットをプッシュすると、自動的に再デプロイされます
- 環境変数の変更のみの場合は、方法1の手動再デプロイが簡単です

## 7. デプロイの確認

1. デプロイが完了するまで待機（通常1〜3分）
2. デプロイログでエラーがないか確認
3. 本番サイト（`https://atapworks.co.jp`）にアクセスして動作確認

## ⚠️ 重要な注意事項

### 環境変数の命名規則
- `NEXT_PUBLIC_` で始まる環境変数は、ブラウザ側（クライアント側）でも使用できます
- `NEXT_PUBLIC_` がない環境変数は、サーバー側（APIルート）でのみ使用できます

### セキュリティ
- **絶対にGitにコミットしないでください**
- `.env.local` ファイルもGitにコミットされないよう `.gitignore` に含まれています
- シークレットキー（`STRIPE_SECRET_KEY`など）は他人に見せないように注意

### 環境変数の取得方法

- **Stripeキー**: Stripe Dashboard → 開発者 → API キー
- **Stripe Webhook Secret**: Stripe Dashboard → 開発者 → Webhook → エンドポイント → 署名シークレット
- **Resend API Key**: Resend Dashboard → API Keys
- **Google Analytics ID**: Google Analytics → 管理 → プロパティ設定 → 測定ID

## トラブルシューティング

### 環境変数が反映されない場合
1. 環境変数が正しく追加されているか確認
2. 再デプロイを実行しているか確認
3. 環境変数名のタイポがないか確認（大文字小文字も正確に）

### デプロイエラーが発生する場合
1. デプロイログを確認
2. 環境変数の値が正しいか確認（特に引用符やスペースがないか）
3. 必須の環境変数がすべて設定されているか確認

