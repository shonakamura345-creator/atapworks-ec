# Resendテストモードの制限と管理者メールが届かない問題の修正

## 問題

ログに以下のエラーメッセージが表示されています：

```
❌ エラーメッセージ: You can only send testing emails to your own email address (sho.nakamura345@gmail.com). To send emails to other recipients, please verify a domain at resend.com/domains, and change the `from` address to an email using this domain.
```

## 原因

Resendのテストモードでは、**自分のメールアドレスにしか送信できません**。

**現在の状況**:
- 顧客へのメール: `sho.nakamura345@gmail.com` → 送信成功（自分のメールアドレス）
- 管理者へのメール: `info.shokenchikushi@gmail.com` → 送信失敗（他人のメールアドレス）

**Resendのテストモードの制限**:
- テストモードでは、自分のメールアドレス（Resendアカウントに登録されているメールアドレス）にしか送信できない
- 他人のメールアドレスに送信しようとすると、このエラーが発生する

---

## 解決方法

### オプション1: Resend Dashboardでドメインを検証（推奨）

カスタムドメイン（`atapworks.co.jp`）を検証して、`info@atapworks.co.jp` からメールを送信できるようにします。

**手順**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Domains」
2. 「Add Domain」をクリック
3. ドメイン名: `atapworks.co.jp` を入力
4. 「Add Domain」をクリック
5. DNSレコードを設定（Resend Dashboardに表示される指示に従う）
6. ドメインが検証されるまで待つ（通常数分〜数時間）

**DNSレコードの設定**:
Resend Dashboardに表示されるDNSレコードを、ドメインのDNS設定に追加する必要があります。

**ドメイン検証後**:
1. Vercel Dashboard → Settings → Environment Variables
2. `RESEND_FROM_EMAIL` を `info@atapworks.co.jp` に変更
3. 再デプロイ

---

### オプション2: 管理者メールアドレスを自分のメールアドレスに変更（一時的な解決策）

テスト目的の場合、管理者メールアドレスを自分のメールアドレスに変更することもできます。

**手順**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `ADMIN_EMAIL` を探す
3. 「編集」をクリック
4. 値を `sho.nakamura345@gmail.com` に変更（自分のメールアドレス）
5. 「Save」をクリック
6. 再デプロイ

**注意**: これは一時的な解決策です。本番環境では、管理者メールアドレスを `info.shokenchikushi@gmail.com` に戻す必要があります。

---

### オプション3: Resendのプランをアップグレード

Resendの有料プランにアップグレードすると、テストモードの制限が解除される可能性があります。

**確認方法**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Settings」→「Billing」
2. 現在のプランを確認
3. 必要に応じて、プランをアップグレード

---

## 405エラーについて

405エラー（Method Not Allowed）は、GETリクエストがWebhookエンドポイントに送信された場合に発生します。

**原因**:
- ブラウザでWebhookエンドポイントURLにアクセスした
- StripeがGETリクエストを送信した（通常はPOSTのみ）

**対処方法**:
- 405エラー自体は問題ありません
- WebhookはPOSTリクエストで正常に動作しています（ログに `POST /api/webhooks/stripe 200` が表示されている）

**必要に応じて、GETリクエストも処理できるようにする**:
コードを修正して、GETリクエストに対して適切なメッセージを返すこともできますが、必須ではありません。

---

## 推奨される解決方法

### ステップ1: Resend Dashboardでドメインを検証（推奨）

1. [Resend Dashboard](https://resend.com/dashboard) → 「Domains」
2. 「Add Domain」をクリック
3. ドメイン名: `atapworks.co.jp` を入力
4. 「Add Domain」をクリック
5. DNSレコードを設定（Resend Dashboardに表示される指示に従う）
6. ドメインが検証されるまで待つ

### ステップ2: RESEND_FROM_EMAILを更新

ドメインが検証されたら：

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `RESEND_FROM_EMAIL` を探す
3. 「編集」をクリック
4. 値を `info@atapworks.co.jp` に変更
5. 「Save」をクリック
6. 再デプロイ

### ステップ3: テスト購入を再実行

1. サイトでテスト購入を実行
2. 管理者メールが届くか確認

---

## 一時的な解決策（ドメイン検証が完了するまで）

ドメイン検証が完了するまで、管理者メールアドレスを自分のメールアドレスに変更することもできます。

**手順**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `ADMIN_EMAIL` を探す
3. 「編集」をクリック
4. 値を `sho.nakamura345@gmail.com` に変更（自分のメールアドレス）
5. 「Save」をクリック
6. 再デプロイ

**注意**: ドメイン検証が完了したら、`ADMIN_EMAIL` を `info.shokenchikushi@gmail.com` に戻してください。

---

## まとめ

### 問題の原因

- Resendのテストモードでは、自分のメールアドレスにしか送信できない
- 管理者メール（`info.shokenchikushi@gmail.com`）は他人のメールアドレスのため、送信できない

### 解決方法

1. ⏳ **Resend Dashboardでドメインを検証**（推奨）
2. ⏳ **RESEND_FROM_EMAILを `info@atapworks.co.jp` に変更**
3. ⏳ **テスト購入を再実行**

または、一時的な解決策として：

1. ⏳ **ADMIN_EMAILを自分のメールアドレスに変更**（一時的）
2. ⏳ **ドメイン検証が完了したら、ADMIN_EMAILを元に戻す**

---

## 405エラーについて

405エラーは問題ありません。WebhookはPOSTリクエストで正常に動作しています。

まず、**Resend Dashboardでドメインを検証**することを推奨します。

