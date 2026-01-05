# Resendのテストモード制限とGmailについて

## 質問

Gmailで設定しているからできないみたいなことありますか？

---

## 回答

**Gmailかどうかは直接の原因ではありません。**

問題は、**Resendのテストモードの制限**です。

---

## Resendのテストモードの制限

### 制限内容

Resendのテストモードでは、以下の制限があります：

1. **`from`アドレスが `onboarding@resend.dev` の場合**:
   - **自分のメールアドレス**（Resendアカウントに登録されているメールアドレス）にしか送信できない
   - 他人のメールアドレスに送信しようとすると、エラーが発生する

2. **カスタムドメインを検証した場合**:
   - そのドメインから送信できるようになる
   - 他人のメールアドレスにも送信可能

---

## 現在の状況

### 顧客へのメール（送信成功）

- **送信先**: `sho.nakamura345@gmail.com`（自分のメールアドレス）
- **送信元**: `onboarding@resend.dev`
- **結果**: ✅ 送信成功

### 管理者へのメール（送信失敗）

- **送信先**: `info.shokenchikushi@gmail.com`（他人のメールアドレス）
- **送信元**: `onboarding@resend.dev`
- **結果**: ❌ 送信失敗（エラー: "You can only send testing emails to your own email address"）

---

## Gmailかどうかは関係ない

**重要なポイント**:
- ✅ Gmailかどうかは関係ない
- ✅ 問題は、**Resendアカウントに登録されているメールアドレスかどうか**
- ✅ 現在、`sho.nakamura345@gmail.com` がResendアカウントに登録されているメールアドレス
- ✅ `info.shokenchikushi@gmail.com` は他人のメールアドレスのため、送信できない

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

**ドメイン検証後**:
1. Vercel Dashboard → Settings → Environment Variables
2. `RESEND_FROM_EMAIL` を `info@atapworks.co.jp` に変更
3. 再デプロイ

**メリット**:
- ✅ 他人のメールアドレスにも送信可能
- ✅ プロフェッショナルなメールアドレス（`info@atapworks.co.jp`）から送信できる
- ✅ 本番環境として適切

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

**メリット**:
- ✅ すぐに動作する
- ✅ ドメイン検証が不要

**デメリット**:
- ❌ 一時的な解決策
- ❌ 本番環境では、管理者メールアドレスを `info.shokenchikushi@gmail.com` に戻す必要がある

---

### オプション3: Resendアカウントに管理者メールアドレスを追加

Resendアカウントに `info.shokenchikushi@gmail.com` を追加することもできますが、これは推奨されません。

**理由**:
- Resendアカウントに他人のメールアドレスを追加するのは適切ではない
- セキュリティ上の問題がある可能性

---

## まとめ

### Gmailかどうかは関係ない

- ✅ Gmailかどうかは直接の原因ではない
- ✅ 問題は、**Resendのテストモードの制限**
- ✅ Resendアカウントに登録されているメールアドレスにしか送信できない

### 解決方法

1. ⏳ **Resend Dashboardでドメインを検証**（推奨）
   - カスタムドメイン（`atapworks.co.jp`）を検証
   - `RESEND_FROM_EMAIL` を `info@atapworks.co.jp` に変更

2. ⏳ **管理者メールアドレスを自分のメールアドレスに変更**（一時的）
   - `ADMIN_EMAIL` を `sho.nakamura345@gmail.com` に変更
   - ドメイン検証が完了したら、元に戻す

---

## 推奨される解決方法

**Resend Dashboardでドメインを検証**することを推奨します。

これにより：
- ✅ 他人のメールアドレスにも送信可能
- ✅ プロフェッショナルなメールアドレスから送信できる
- ✅ 本番環境として適切

ドメイン検証が完了するまで、一時的に管理者メールアドレスを自分のメールアドレスに変更することもできます。

