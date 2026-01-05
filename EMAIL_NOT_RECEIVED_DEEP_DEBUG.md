# メールが届かない問題の徹底的な原因追求

## 問題の確認

購入は完了したが、メールが届かない。

この問題を解決するために、段階的に原因を追求します。

---

## 原因追求の手順

### ステップ1: Webhookが届いているか確認

メールが届かない場合、まずWebhookが届いているかを確認する必要があります。

#### 1-1. Stripe Dashboardで確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) にログイン
2. **右上で「本番モード」になっているか確認**
3. 「開発者」→「Webhook」をクリック
4. エンドポイント（`adventurous-oasis` など）をクリック
5. 「最新のイベント」タブを確認

**確認ポイント**：
- ✅ イベントが表示されているか
- ✅ イベントが表示されていない場合、Webhookが届いていない
- ✅ イベントが表示されている場合：
  - レスポンスコードが `200` か確認
  - レスポンスコードが `400` や `500` の場合、エラーの詳細を確認
  - 「レスポンス本文」をクリックしてエラーメッセージを確認

#### 1-2. Vercel Dashboardで確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Functions」タブをクリック
3. `/api/webhooks/stripe` を選択
4. ログを確認

**確認ポイント**：
- ✅ Webhookが受信されているか（ログに `POST /api/webhooks/stripe` が表示されているか）
- ✅ エラーメッセージが表示されていないか
- ✅ メール送信のログが表示されているか（「📧 顧客への注文確認メールを送信します」など）

**Webhookが届いていない場合**：
- Webhookエンドポイントが正しく設定されていない可能性があります
- `WEBHOOK_NOT_RECEIVED_DEBUG.md` を参照してください

**Webhookが届いている場合**：
- 次のステップ（メール送信処理）を確認してください

---

### ステップ2: メール送信処理のログを確認

Webhookが届いている場合、メール送信処理でエラーが発生している可能性があります。

#### 2-1. Vercel Dashboardでログを確認

1. Vercel Dashboard → Functions → `/api/webhooks/stripe` を選択
2. ログを詳しく確認

**確認すべきログ**：

**正常な場合**：
```
📧 顧客への注文確認メールを送信します: [メールアドレス]
✅ 顧客へのメール送信処理が完了しました
📧 管理者への通知メールを送信します
✅ 管理者へのメール送信処理が完了しました
```

**エラーが発生している場合**：
```
❌ Resendメール送信エラー: [エラーメッセージ]
❌ 管理者へのメール送信でエラーが発生しました: [エラーメッセージ]
⚠️ RESEND_API_KEYが設定されていません。メールは送信されません。
⚠️ ADMIN_EMAILが設定されていません。管理者通知は送信されません。
```

#### 2-2. エラーメッセージの内容を確認

エラーメッセージが表示されている場合、その内容を確認してください。

**よくあるエラー**：

1. **`RESEND_API_KEYが設定されていません`**
   - 原因: 環境変数 `RESEND_API_KEY` が設定されていない
   - 解決方法: Vercel Dashboard → Settings → Environment Variables で `RESEND_API_KEY` を設定

2. **`ADMIN_EMAILが設定されていません`**
   - 原因: 環境変数 `ADMIN_EMAIL` が設定されていない
   - 解決方法: Vercel Dashboard → Settings → Environment Variables で `ADMIN_EMAIL` を設定

3. **`Resendメール送信エラー`**
   - 原因: Resend APIキーが間違っている、またはResendの設定に問題がある
   - 解決方法: Resend APIキーを確認、Resend Dashboardでメールの送信状況を確認

---

### ステップ3: 環境変数の確認

メール送信に必要な環境変数が正しく設定されているか確認します。

#### 3-1. Vercel Dashboardで環境変数を確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 以下の環境変数が設定されているか確認：

**必須の環境変数**：
- ✅ `RESEND_API_KEY` = `re_...`（ResendのAPIキー）
- ✅ `RESEND_FROM_EMAIL` = `onboarding@resend.dev` または `info@atapworks.co.jp` など
- ✅ `ADMIN_EMAIL` = `info.shokenchikushi@gmail.com`

**確認ポイント**：
- ✅ 各環境変数が存在するか
- ✅ 値が正しいか（特に `RESEND_API_KEY` が `re_` で始まる形式か）
- ✅ Environment: Production にチェックが入っているか
- ✅ 環境変数を変更した後、再デプロイしたか

#### 3-2. 環境変数の値が正しいか確認

**RESEND_API_KEY**：
- 形式: `re_...` で始まる文字列
- 確認方法: Resend Dashboard → API Keys で確認

**RESEND_FROM_EMAIL**：
- 形式: メールアドレス（例: `onboarding@resend.dev` または `info@atapworks.co.jp`）
- 確認方法: Resend Dashboard → Domains で確認（カスタムドメインの場合）

**ADMIN_EMAIL**：
- 形式: メールアドレス（例: `info.shokenchikushi@gmail.com`）
- 確認方法: 正しいメールアドレスが設定されているか確認

---

### ステップ4: Resend Dashboardで確認

Resend Dashboardでメールの送信状況を確認します。

#### 4-1. Resend Dashboardにログイン

1. [Resend Dashboard](https://resend.com/emails) にログイン
2. 左側のメニューから「**Emails**」をクリック
3. 送信されたメールの一覧が表示されます

#### 4-2. メールの送信状況を確認

**確認ポイント**：
- ✅ メールが送信されているか（一覧に表示されているか）
- ✅ メールのステータス（送信成功、失敗など）
- ✅ エラーメッセージが表示されていないか

**メールが送信されていない場合**：
- Vercelのログでエラーが発生していないか確認
- 環境変数が正しく設定されているか確認

**メールが送信されているが届かない場合**：
- メールアドレスが正しいか確認
- 迷惑メールフォルダを確認
- メールアドレスのドメインが正しいか確認

---

### ステップ5: コードの確認

メール送信処理のコードを確認して、問題がないか確認します。

#### 5-1. メール送信処理の確認

`app/lib/email.ts` と `app/api/webhooks/stripe/route.ts` を確認：

**確認ポイント**：
- ✅ `RESEND_API_KEY` が設定されているかチェックしているか
- ✅ エラーハンドリングが正しく実装されているか
- ✅ エラーが発生した場合、ログに出力されているか

#### 5-2. エラーログの確認

Vercel Dashboard → Functions → `/api/webhooks/stripe` のログで、以下のようなエラーが表示されていないか確認：

- `RESEND_API_KEYが設定されていません`
- `ADMIN_EMAILが設定されていません`
- `Resendメール送信エラー`
- `管理者へのメール送信でエラーが発生しました`

---

## よくある原因と解決方法

### 原因1: Webhookが届いていない

**症状**: Vercel Dashboard → Functions → `/api/webhooks/stripe` のログにWebhookが表示されない

**確認方法**:
1. Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」タブを確認
2. イベントが表示されていない場合、Webhookが届いていない

**解決方法**:
1. Stripe DashboardでWebhookエンドポイントが正しく設定されているか確認
2. エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認
3. 監視するイベントに `checkout.session.completed` が選択されているか確認
4. Stripe DashboardのモードとVercelの環境変数 `STRIPE_SECRET_KEY` の形式が一致しているか確認

---

### 原因2: 環境変数が設定されていない

**症状**: Vercel Dashboard → Functions → `/api/webhooks/stripe` のログに「⚠️ RESEND_API_KEYが設定されていません」などのメッセージが表示される

**確認方法**:
1. Vercel Dashboard → Settings → Environment Variables で環境変数を確認
2. `RESEND_API_KEY`、`RESEND_FROM_EMAIL`、`ADMIN_EMAIL` が設定されているか確認

**解決方法**:
1. 不足している環境変数を追加
2. 環境変数を変更した後、再デプロイ

---

### 原因3: Resend APIキーが間違っている

**症状**: Vercel Dashboard → Functions → `/api/webhooks/stripe` のログに「❌ Resendメール送信エラー」が表示される

**確認方法**:
1. Resend Dashboard → API Keys でAPIキーを確認
2. Vercel Dashboard → Settings → Environment Variables で `RESEND_API_KEY` の値を確認
3. 値が一致しているか確認

**解決方法**:
1. Resend Dashboardで正しいAPIキーを取得
2. Vercel Dashboard → Settings → Environment Variables で `RESEND_API_KEY` を更新
3. 再デプロイ

---

### 原因4: RESEND_FROM_EMAILが間違っている

**症状**: Resend Dashboard → Emails でメールが送信されていない、またはエラーが表示される

**確認方法**:
1. Vercel Dashboard → Settings → Environment Variables で `RESEND_FROM_EMAIL` の値を確認
2. Resend Dashboard → Domains でドメインが検証されているか確認（カスタムドメインの場合）

**解決方法**:
1. `RESEND_FROM_EMAIL` の値を確認
2. カスタムドメインを使用している場合、ドメインが検証されているか確認
3. デフォルトドメイン（`onboarding@resend.dev`）を使用している場合、その値が正しいか確認
4. 値を修正した後、再デプロイ

---

### 原因5: メールアドレスが間違っている

**症状**: メールが送信されているが届かない

**確認方法**:
1. Resend Dashboard → Emails でメールが送信されているか確認
2. 送信先のメールアドレスが正しいか確認

**解決方法**:
1. メールアドレスが正しいか確認
2. 迷惑メールフォルダを確認
3. メールアドレスのドメインが正しいか確認

---

### 原因6: メール送信処理でエラーが発生しているが、エラーがログに表示されていない

**症状**: Webhookは届いているが、メール送信のログが表示されない

**確認方法**:
1. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを詳しく確認
2. エラーメッセージが表示されていないか確認

**解決方法**:
1. コードを確認して、エラーハンドリングが正しく実装されているか確認
2. 必要に応じて、エラーログを追加

---

## デバッグ手順のまとめ

### 1. Webhookが届いているか確認

- Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」タブ
- Vercel Dashboard → Functions → `/api/webhooks/stripe` のログ

### 2. メール送信処理のログを確認

- Vercel Dashboard → Functions → `/api/webhooks/stripe` のログ
- エラーメッセージが表示されていないか確認

### 3. 環境変数を確認

- Vercel Dashboard → Settings → Environment Variables
- `RESEND_API_KEY`、`RESEND_FROM_EMAIL`、`ADMIN_EMAIL` が設定されているか確認

### 4. Resend Dashboardで確認

- Resend Dashboard → Emails
- メールが送信されているか確認
- エラーメッセージが表示されていないか確認

### 5. コードを確認

- `app/lib/email.ts` と `app/api/webhooks/stripe/route.ts` を確認
- エラーハンドリングが正しく実装されているか確認

---

## 次のステップ

上記の確認項目をチェックして、以下の情報を共有してください：

1. **Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」タブ**: イベントが表示されているか、エラーが発生しているか
2. **Vercel Dashboard → Functions → `/api/webhooks/stripe` のログ**: どのようなログが表示されているか（エラーメッセージがあれば共有）
3. **Vercel Dashboard → Settings → Environment Variables**: `RESEND_API_KEY`、`RESEND_FROM_EMAIL`、`ADMIN_EMAIL` が設定されているか
4. **Resend Dashboard → Emails**: メールが送信されているか、エラーが表示されているか

これらの情報があれば、より具体的な解決方法を提案できます。

