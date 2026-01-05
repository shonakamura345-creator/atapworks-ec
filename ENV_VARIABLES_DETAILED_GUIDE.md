# 環境変数の詳細取得ガイド

## 対象の環境変数

以下の3つの環境変数を設定する必要があります：

1. `RESEND_API_KEY` - ResendのAPIキー
2. `RESEND_FROM_EMAIL` - Resendで使用する送信元メールアドレス
3. `ADMIN_EMAIL` - 管理者のメールアドレス（注文通知を受け取るメールアドレス）

---

## 1. RESEND_API_KEY の取得方法

### Resendとは

Resendは、開発者向けのメール送信サービスです。Next.jsアプリケーションからメールを送信するために使用します。

### ステップ1: Resendアカウントを作成（未作成の場合）

1. [Resend公式サイト](https://resend.com/) にアクセス
2. 「Sign Up」または「Get Started」をクリック
3. メールアドレスとパスワードを入力してアカウントを作成
4. メールアドレスを確認（確認メールが届くので、リンクをクリック）

### ステップ2: APIキーを取得

1. [Resend Dashboard](https://resend.com/api-keys) にログイン
2. 左側のメニューから「**API Keys**」をクリック
3. 「**Create API Key**」ボタンをクリック
4. 以下の情報を入力：
   - **Name**: 任意の名前（例: `atapworks-production`）
   - **Permission**: 「**Full Access**」を選択（または必要に応じて「Sending Access」）
5. 「**Add**」ボタンをクリック
6. APIキーが表示されます（`re_...` で始まる文字列）
   - 例: `re_1234567890abcdefghijklmnopqrstuvwxyz`

⚠️ **重要**: APIキーは一度しか表示されません。必ずコピーして安全な場所に保存してください。

### ステップ3: Vercelの環境変数に設定

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. 「Settings」タブをクリック
4. 左側のメニューから「Environment Variables」をクリック
5. 「Add New」をクリック
6. 以下の情報を入力：
   - **Key**: `RESEND_API_KEY`
   - **Value**: コピーしたAPIキー（`re_...` で始まる文字列）
   - **Environment**: 「Production」にチェック（必要に応じて「Preview」にもチェック）
7. 「Save」をクリック

---

## 2. RESEND_FROM_EMAIL の設定方法

### RESEND_FROM_EMAILとは

Resendでメールを送信する際の「送信元」メールアドレスです。顧客に送信される注文確認メールの「From」アドレスとして使用されます。

### ステップ1: ドメインを確認

`RESEND_FROM_EMAIL` には、以下のいずれかの形式を使用できます：

1. **Resendで検証済みのドメインのメールアドレス**（推奨）
   - 例: `info@atapworks.co.jp`（`atapworks.co.jp` がResendで検証済みの場合）
   - 例: `noreply@atapworks.co.jp`

2. **Resendのデフォルトドメイン**（簡単）
   - 例: `onboarding@resend.dev`（Resendが提供するデフォルトドメイン）
   - 注意: このドメインは送信量に制限がある場合があります

### ステップ2: ドメインを検証する（推奨）

**オプションA: カスタムドメインを検証する（推奨）**

1. [Resend Dashboard](https://resend.com/domains) にログイン
2. 左側のメニューから「**Domains**」をクリック
3. 「**Add Domain**」ボタンをクリック
4. ドメイン名を入力（例: `atapworks.co.jp`）
5. 「**Add**」をクリック
6. Resendが提供するDNSレコードを確認：
   - SPFレコード
   - DKIMレコード
   - DMARCレコード（オプション）
7. ドメインのDNS設定にこれらのレコードを追加：
   - ドメイン管理画面（例: お名前.com、ムームードメインなど）にログイン
   - DNS設定を開く
   - Resendが提供するレコードを追加
8. DNSレコードの反映を待つ（通常、数分から数時間）
9. Resend Dashboardで「Verify」をクリック
10. 検証が完了したら、そのドメインのメールアドレスを使用できます
    - 例: `info@atapworks.co.jp`

**オプションB: デフォルトドメインを使用する（簡単）**

1. Resend Dashboardにログイン
2. 左側のメニューから「**API Keys**」をクリック
3. デフォルトドメインが表示されます（例: `onboarding@resend.dev`）
4. このメールアドレスを `RESEND_FROM_EMAIL` に設定

### ステップ3: Vercelの環境変数に設定

1. Vercel Dashboard → Settings → Environment Variables
2. 「Add New」をクリック
3. 以下の情報を入力：
   - **Key**: `RESEND_FROM_EMAIL`
   - **Value**: 送信元メールアドレス
     - カスタムドメインの場合: `info@atapworks.co.jp` など
     - デフォルトドメインの場合: `onboarding@resend.dev` など
   - **Environment**: 「Production」にチェック
4. 「Save」をクリック

---

## 3. ADMIN_EMAIL の設定方法

### ADMIN_EMAILとは

管理者のメールアドレスです。注文が完了した際に、管理者に通知メールが送信されます。

### ステップ1: メールアドレスを決定

管理者のメールアドレスを決定します。

例：
- `info.shokenchikushi@gmail.com`（既に知られているメールアドレス）
- `info@atapworks.co.jp`
- その他のメールアドレス

### ステップ2: Vercelの環境変数に設定

1. Vercel Dashboard → Settings → Environment Variables
2. 「Add New」をクリック
3. 以下の情報を入力：
   - **Key**: `ADMIN_EMAIL`
   - **Value**: 管理者のメールアドレス（例: `info.shokenchikushi@gmail.com`）
   - **Environment**: 「Production」にチェック
4. 「Save」をクリック

---

## 環境変数の設定確認

### 設定後の確認

Vercel Dashboard → Settings → Environment Variables で以下を確認：

- ✅ `RESEND_API_KEY` = `re_...`（ResendのAPIキー）
- ✅ `RESEND_FROM_EMAIL` = `info@atapworks.co.jp` など（送信元メールアドレス）
- ✅ `ADMIN_EMAIL` = `info.shokenchikushi@gmail.com`（管理者のメールアドレス）

### 環境変数の確認方法

1. Vercel Dashboard → Settings → Environment Variables
2. 各環境変数が表示されているか確認
3. 値が正しいか確認（機密情報のため、値は一部のみ表示されます）

---

## 再デプロイ

環境変数を追加/変更した後、必ず再デプロイしてください：

1. Vercel Dashboard → 「Deployments」タブ
2. 最新のデプロイメントの「...」（三点メニュー）をクリック
3. 「Redeploy」を選択
4. 再デプロイが完了するのを待つ

---

## テスト方法

### メール送信のテスト

1. サイト（`https://atapworks.co.jp`）でテスト購入を実行
2. テストカード（`4242 4242 4242 4242`）を使用
3. 購入を完了
4. 以下のメールが届くか確認：
   - **顧客への注文確認メール**: 購入時に入力したメールアドレスに届く
   - **管理者への通知メール**: `ADMIN_EMAIL` に設定したメールアドレスに届く

### Resend Dashboardで確認

1. [Resend Dashboard](https://resend.com/emails) にログイン
2. 左側のメニューから「**Emails**」をクリック
3. 送信されたメールの一覧が表示されます
4. メールのステータス（送信成功、失敗など）を確認

---

## トラブルシューティング

### 問題1: Resend APIキーが取得できない

**原因**: Resendアカウントが作成されていない、またはログインしていない

**解決方法**:
1. Resendアカウントを作成
2. メールアドレスを確認
3. 再度APIキーを取得

### 問題2: メールが届かない

**確認事項**:
- ✅ `RESEND_API_KEY` が正しく設定されているか
- ✅ `RESEND_FROM_EMAIL` が正しく設定されているか
- ✅ `ADMIN_EMAIL` が正しく設定されているか
- ✅ 環境変数を変更した後、再デプロイしたか
- ✅ Resend Dashboard → Emails でメールが送信されているか確認

**解決方法**:
1. Resend Dashboard → Emails でメールの送信状況を確認
2. エラーが表示されている場合、エラーメッセージを確認
3. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを確認
4. エラーメッセージに基づいて修正

### 問題3: ドメインの検証が完了しない

**原因**: DNSレコードが正しく設定されていない、または反映に時間がかかっている

**解決方法**:
1. DNSレコードが正しく設定されているか確認
2. DNSの反映を待つ（通常、数分から数時間）
3. それでも解決しない場合、Resendのサポートに問い合わせ
4. または、一時的にデフォルトドメイン（`onboarding@resend.dev`）を使用

---

## まとめ

### 設定手順のまとめ

1. **RESEND_API_KEY**
   - Resendアカウントを作成
   - Resend Dashboard → API Keys → Create API Key
   - APIキーをコピー
   - Vercelの環境変数に設定

2. **RESEND_FROM_EMAIL**
   - カスタムドメインを検証（推奨）またはデフォルトドメインを使用
   - 送信元メールアドレスを決定
   - Vercelの環境変数に設定

3. **ADMIN_EMAIL**
   - 管理者のメールアドレスを決定
   - Vercelの環境変数に設定

4. **再デプロイ**
   - 環境変数を設定した後、必ず再デプロイ

---

## 参考リンク

- [Resend公式サイト](https://resend.com/)
- [Resend Dashboard](https://resend.com/api-keys)
- [Resendドキュメント](https://resend.com/docs)
- [Vercel Dashboard](https://vercel.com/dashboard)

---

## 注意事項

- APIキーやメールアドレスは機密情報です。漏洩に注意してください
- 環境変数を変更した後は、必ず再デプロイしてください
- テスト時は、テストカード（`4242 4242 4242 4242`）を使用してください
- 本番環境で実際の決済を行う前に、必ずテストを実行してください

