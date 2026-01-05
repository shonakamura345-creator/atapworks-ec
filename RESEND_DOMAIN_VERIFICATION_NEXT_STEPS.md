# Resendドメイン検証後の次のステップ

## 完了したこと

- ✅ Resend Dashboardでドメイン（`atapworks.co.jp`）を追加
- ✅ DNSレコードを設定

---

## 次のステップ

### ステップ1: ドメインの検証を待つ

DNSレコードを設定した後、Resendがドメインを検証するまで待つ必要があります。

**確認方法**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Domains」
2. `atapworks.co.jp` をクリック
3. ドメインのステータスを確認

**確認ポイント**:
- ✅ 「Verified」または「検証済み」と表示されているか
- ✅ 「Pending」または「検証中」と表示されている場合、検証が完了するまで待つ（通常数分〜数時間）

**検証が完了するまで**:
- 通常、数分〜数時間かかります
- DNSレコードの反映には時間がかかる場合があります
- 最大24時間かかる場合もあります

---

### ステップ2: RESEND_FROM_EMAILを更新

ドメインが検証されたら、`RESEND_FROM_EMAIL` を `info@atapworks.co.jp` に変更します。

**手順**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `RESEND_FROM_EMAIL` を探す
3. 「編集」をクリック
4. 値を `info@atapworks.co.jp` に変更
5. 「Save」をクリック

**確認ポイント**:
- ✅ 値が `info@atapworks.co.jp` になっているか
- ✅ Environment: Production にチェックが入っているか

---

### ステップ3: 再デプロイ

環境変数を変更した後、**再デプロイ**が必要です。

**再デプロイ方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ
3. 最新のデプロイメントの「...」メニュー → 「Redeploy」
4. または、GitHubにプッシュ（自動デプロイ）

---

### ステップ4: テスト購入を実行

ドメインが検証され、環境変数を更新して再デプロイした後、テスト購入を実行してください。

**テスト手順**:
1. サイト（`https://atapworks.co.jp`）でテスト購入を実行
2. **実際のカード**で決済を完了
3. 注文完了画面が表示されることを確認
4. **顧客へのメール**が届くか確認
5. **管理者へのメール**（`info.shokenchikushi@gmail.com`）が届くか確認

---

## 確認手順

### 1. ドメインの検証状況を確認

1. [Resend Dashboard](https://resend.com/dashboard) → 「Domains」
2. `atapworks.co.jp` をクリック
3. ドメインのステータスを確認

**確認ポイント**:
- ✅ 「Verified」または「検証済み」と表示されているか
- ✅ エラーメッセージが表示されていないか

---

### 2. 環境変数を確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `RESEND_FROM_EMAIL` の値を確認

**確認ポイント**:
- ✅ 値が `info@atapworks.co.jp` になっているか
- ✅ Environment: Production にチェックが入っているか

---

### 3. Vercel Dashboardでログを確認

テスト購入を実行した後、Vercel Dashboardでログを確認してください。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認すべきログ**:
```
📧 Resendで管理者通知メールを送信します:
  From: info@atapworks.co.jp
  To: info.shokenchikushi@gmail.com
✅ 管理者通知メール送信成功: {"id":"..."}
✅ 管理者へのメール送信処理が完了しました
```

---

### 4. Resend Dashboardで確認

テスト購入を実行した後、Resend Dashboardで確認してください。

**確認方法**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Emails」
2. 送信されたメールの一覧を確認
3. 管理者メール（`info.shokenchikushi@gmail.com` 宛）が送信されているか確認

**確認ポイント**:
- ✅ 管理者メールが送信されているか
- ✅ メールのステータスが「送信成功」になっているか
- ✅ エラーメッセージが表示されていないか

---

## ドメイン検証が完了するまでの待ち時間

**通常の待ち時間**:
- 数分〜数時間
- DNSレコードの反映には時間がかかる場合があります

**最大待ち時間**:
- 最大24時間かかる場合もあります

**確認方法**:
- Resend Dashboard → Domains → `atapworks.co.jp` をクリック
- ドメインのステータスを定期的に確認

---

## まとめ

### 完了したこと

- ✅ Resend Dashboardでドメインを追加
- ✅ DNSレコードを設定

### 次のステップ

1. ⏳ **ドメインの検証を待つ**（数分〜数時間）
2. ⏳ **RESEND_FROM_EMAILを `info@atapworks.co.jp` に変更**
3. ⏳ **再デプロイ**
4. ⏳ **テスト購入を実行**
5. ⏳ **管理者メールが届くか確認**

---

## 重要なポイント

### ドメイン検証が完了するまで

- ⏳ ドメインが検証されるまで待つ必要があります
- ⏳ 検証が完了するまで、管理者メールは送信できません
- ⏳ 検証が完了したら、`RESEND_FROM_EMAIL` を更新して再デプロイしてください

### ドメイン検証が完了したら

1. ✅ `RESEND_FROM_EMAIL` を `info@atapworks.co.jp` に変更
2. ✅ 再デプロイ
3. ✅ テスト購入を実行
4. ✅ 管理者メールが届くか確認

---

## 次のアクション

1. **Resend Dashboardでドメインの検証状況を確認**
2. **検証が完了したら、`RESEND_FROM_EMAIL` を更新**
3. **再デプロイ**
4. **テスト購入を実行**

まず、**Resend Dashboardでドメインの検証状況を確認**してください。

検証が完了したら、`RESEND_FROM_EMAIL` を `info@atapworks.co.jp` に変更して、再デプロイしてください。

