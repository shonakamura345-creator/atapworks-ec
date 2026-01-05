# 管理者へのメールが届かない問題の修正

## 問題

購入者へのメールは送られるが、管理者への「注文がありましたよ」という確認メールが届かない。

---

## 確認手順

### ステップ1: Vercel Dashboardでログを確認（最優先）

管理者メール送信のログを確認してください。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認すべきログ**:

#### 正常な場合:
```
📧 管理者への通知メールを送信します
  管理者メールアドレス: info.shokenchikushi@gmail.com
  顧客メールアドレス: [メールアドレス]
  注文ID: [セッションID]
📧 Resendで管理者通知メールを送信します:
  From: onboarding@resend.dev
  To: info.shokenchikushi@gmail.com
  Subject: 🛒 新しい注文が入りました - 注文ID: [セッションID]
  RESEND_API_KEY: re_xxxxx...
  RESEND_FROM_EMAIL: onboarding@resend.dev
  ADMIN_EMAIL: info.shokenchikushi@gmail.com
✅ 管理者通知メール送信成功: {"id":"..."}
✅ メールID: [メールID]
✅ 管理者へのメール送信処理が完了しました
```

#### エラーの場合:
```
⚠️ ADMIN_EMAILが設定されていません。管理者通知は送信されません。
または
❌ Resend管理者通知メール送信エラー: [エラーメッセージ]
```

---

### ステップ2: 環境変数を確認

`ADMIN_EMAIL` 環境変数が正しく設定されているか確認してください。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `ADMIN_EMAIL` を探す
3. 値が `info.shokenchikushi@gmail.com` になっているか確認

**確認ポイント**:
- ✅ `ADMIN_EMAIL` が存在するか
- ✅ 値が `info.shokenchikushi@gmail.com` になっているか
- ✅ Environment: Production にチェックが入っているか
- ✅ 環境変数を変更した後、再デプロイしたか

---

### ステップ3: Resend Dashboardで確認

Resend Dashboardで管理者メールが送信されているか確認してください。

**確認方法**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Emails」
2. 送信されたメールの一覧を確認
3. 管理者メール（`info.shokenchikushi@gmail.com` 宛）が送信されているか確認

**確認ポイント**:
- ✅ 管理者メールが送信されているか
- ✅ メールのステータス（送信成功、失敗など）
- ✅ エラーメッセージが表示されていないか

---

## よくある原因と解決方法

### 原因1: ADMIN_EMAIL環境変数が設定されていない

**症状**: Vercel Dashboardのログに「⚠️ ADMIN_EMAILが設定されていません。管理者通知は送信されません。」と表示される

**確認方法**:
1. Vercel Dashboard → Settings → Environment Variables で `ADMIN_EMAIL` を確認
2. 環境変数が存在しない場合、追加が必要

**解決方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 「Add New」をクリック
3. 以下の情報を入力：
   - **Key**: `ADMIN_EMAIL`
   - **Value**: `info.shokenchikushi@gmail.com`
   - **Environment**: Production にチェック
4. 「Save」をクリック
5. **再デプロイ**（重要！）

---

### 原因2: ADMIN_EMAILの値が間違っている

**症状**: Vercel Dashboardのログに管理者メール送信のログが表示されるが、メールが届かない

**確認方法**:
1. Vercel Dashboard → Settings → Environment Variables で `ADMIN_EMAIL` の値を確認
2. 値が `info.shokenchikushi@gmail.com` になっているか確認

**解決方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `ADMIN_EMAIL` を探す
3. 「編集」をクリック
4. 値を `info.shokenchikushi@gmail.com` に修正
5. 「Save」をクリック
6. **再デプロイ**（重要！）

---

### 原因3: 管理者メール送信処理でエラーが発生している

**症状**: Vercel Dashboardのログに「❌ Resend管理者通知メール送信エラー」が表示される

**確認方法**:
1. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを確認
2. エラーメッセージの内容を確認

**解決方法**:
1. エラーメッセージの内容に応じて対処
2. Resend Dashboard → Emails でメールの送信状況を確認

---

### 原因4: 管理者メールが送信されているが届かない

**症状**: Resend Dashboardで管理者メールが送信されているが、メールが届かない

**確認方法**:
1. Resend Dashboard → Emails で管理者メールが送信されているか確認
2. メールのステータスを確認

**解決方法**:
1. メールアドレスが正しいか確認
2. 迷惑メールフォルダを確認
3. メールアドレスのドメインが正しいか確認

---

## 設定手順（ADMIN_EMAILが設定されていない場合）

### ステップ1: Vercel Dashboardで環境変数を追加

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 「Add New」をクリック
3. 以下の情報を入力：
   - **Key**: `ADMIN_EMAIL`
   - **Value**: `info.shokenchikushi@gmail.com`
   - **Environment**: Production にチェック（Preview、Developmentにもチェックすることを推奨）
4. 「Save」をクリック

### ステップ2: 再デプロイ

環境変数を追加した後、**再デプロイ**が必要です。

**再デプロイ方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ
3. 最新のデプロイメントの「...」メニュー → 「Redeploy」
4. または、GitHubにプッシュ（自動デプロイ）

### ステップ3: テスト購入を再実行

1. サイトでテスト購入を実行
2. Vercel Dashboardのログを確認
3. 管理者メールが届くか確認

---

## 確認手順のまとめ

1. ⏳ **Vercel Dashboardでログを確認**（最優先）
   - 管理者メール送信のログが表示されているか
   - エラーメッセージが表示されていないか

2. ⏳ **環境変数を確認**
   - `ADMIN_EMAIL` が設定されているか
   - 値が `info.shokenchikushi@gmail.com` になっているか

3. ⏳ **Resend Dashboardで確認**
   - 管理者メールが送信されているか
   - メールのステータスを確認

---

## 次のステップ

以下の情報を共有してください：

1. **Vercel Dashboard → Functions → `/api/webhooks/stripe` のログ**: 管理者メール送信のログが表示されているか（エラーメッセージがあれば共有）
2. **Vercel Dashboard → Settings → Environment Variables**: `ADMIN_EMAIL` が設定されているか、値は何か
3. **Resend Dashboard → Emails**: 管理者メールが送信されているか、エラーが表示されているか

これらの情報があれば、より具体的な解決方法を提案できます。

---

## まとめ

管理者へのメールが届かない原因は、主に以下のいずれかです：

1. ⏳ **`ADMIN_EMAIL` 環境変数が設定されていない**
2. ⏳ **`ADMIN_EMAIL` の値が間違っている**
3. ⏳ **管理者メール送信処理でエラーが発生している**
4. ⏳ **管理者メールが送信されているが届かない**

まず、**Vercel Dashboardでログを確認**して、どの原因かを特定してください。

