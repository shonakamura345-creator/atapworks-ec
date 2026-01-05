# テスト前の最終確認チェックリスト

## 目的

メールが届かない問題を解決するために、テスト前にすべての設定を確認します。

---

## チェックリスト

### ✅ 1. Vercelのビルド状況

- [x] Vercel Dashboardでビルドが成功している（「Ready」状態）
- [x] エラーが表示されていない

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブを確認
3. 最新のデプロイメントが「Ready」になっていることを確認

---

### ⏳ 2. 環境変数の確認（最重要）

以下の環境変数がVercelに正しく設定されているか確認します。

#### 2-1. Stripe関連

- [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
  - 形式: `pk_live_...` で始まる
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐⭐⭐⭐

- [ ] `STRIPE_SECRET_KEY`
  - 形式: `sk_live_...` で始まる
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐⭐⭐⭐

- [ ] `STRIPE_WEBHOOK_SECRET`
  - 形式: `whsec_...` で始まる
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐⭐⭐⭐

#### 2-2. Resend関連（メール送信に必須）

- [ ] `RESEND_API_KEY`
  - 形式: `re_...` で始まる
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐⭐⭐⭐（メール送信に必須）

- [ ] `RESEND_FROM_EMAIL`
  - 形式: メールアドレス（例: `onboarding@resend.dev` または `info@atapworks.co.jp`）
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐⭐⭐⭐（メール送信に必須）

- [ ] `ADMIN_EMAIL`
  - 形式: メールアドレス（例: `info.shokenchikushi@gmail.com`）
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐⭐⭐（管理者通知に必要）

#### 2-3. その他

- [ ] `NEXT_PUBLIC_BASE_URL`
  - 形式: `https://atapworks.co.jp`
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐⭐⭐⭐（注文完了画面に必要）

- [ ] `NEXT_PUBLIC_GA_ID`（オプション）
  - 形式: `G-XXXXXXXXXX`
  - 確認方法: Vercel Dashboard → Settings → Environment Variables
  - 重要度: ⭐⭐（Google Analytics用、メール送信には不要）

**確認手順**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. 上記の環境変数がすべて設定されているか確認
3. 各環境変数の値が正しい形式か確認
4. Environment: Production にチェックが入っているか確認

---

### ⏳ 3. Stripe Webhookの確認

Stripe DashboardでWebhookが正しく設定されているか確認します。

- [ ] Webhookエンドポイントが作成されている
- [ ] エンドポイントURLが正しい: `https://atapworks.co.jp/api/webhooks/stripe`
- [ ] 監視するイベントに `checkout.session.completed` が選択されている
- [ ] Stripe Dashboardのモードが「本番モード」になっている
- [ ] WebhookシークレットがVercelの環境変数 `STRIPE_WEBHOOK_SECRET` と一致している

**確認手順**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイント（`adventurous-oasis` など）をクリック
3. エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認
4. 「監視するイベント」タブで `checkout.session.completed` が選択されているか確認
5. 「シークレット」をクリックして、Vercelの `STRIPE_WEBHOOK_SECRET` と一致しているか確認

---

### ⏳ 4. Resend Webhookの設定（新規追加）

Resend DashboardでWebhookを設定します（メール送信の詳細な追跡のため）。

- [ ] Resend DashboardでWebhookが作成されている
- [ ] エンドポイントURLが正しい: `https://atapworks.co.jp/api/webhooks/resend`
- [ ] 監視するイベントが選択されている:
  - `email.sent`
  - `email.delivered`
  - `email.bounced`
  - `email.complained`
  - `email.delivery_delayed`

**設定手順**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「Webhooks」
2. 「Create Webhook」をクリック
3. エンドポイントURL: `https://atapworks.co.jp/api/webhooks/resend`
4. イベントを選択（上記の5つ）
5. 「Create Webhook」をクリック

---

### ⏳ 5. Resend Dashboardの確認

Resend DashboardでAPIキーとドメインの設定を確認します。

- [ ] Resend APIキーが有効か確認
- [ ] `RESEND_FROM_EMAIL` で使用しているドメインが検証されているか確認
  - `onboarding@resend.dev` を使用している場合: 検証不要（デフォルトドメイン）
  - `info@atapworks.co.jp` を使用している場合: ドメインが検証されている必要がある

**確認手順**:
1. [Resend Dashboard](https://resend.com/dashboard) → 「API Keys」
2. APIキーが有効か確認
3. [Resend Dashboard](https://resend.com/dashboard) → 「Domains」
4. カスタムドメインを使用している場合、ドメインが検証されているか確認

---

### ⏳ 6. コードの最終確認

メール送信処理のコードが正しく実装されているか確認します。

- [ ] `app/lib/email.ts` で `RESEND_API_KEY` がチェックされている
- [ ] `app/lib/email.ts` でエラーハンドリングが実装されている
- [ ] `app/api/webhooks/stripe/route.ts` でメール送信処理が呼び出されている
- [ ] `app/api/webhooks/stripe/route.ts` でエラーハンドリングが実装されている

**確認方法**:
- コードは既に実装済み（確認済み）

---

## テスト手順（すべての確認が完了したら）

### ステップ1: テスト購入を実行

1. サイト（`https://atapworks.co.jp`）にアクセス
2. 商品をカートに追加
3. カートページに移動
4. 「レジに進む」をクリック

### ステップ2: チェックアウト情報を入力

1. フォームに必要事項を入力：
   - お名前: 任意（例: `テスト 太郎`）
   - メールアドレス: **実際にメールを受信できるメールアドレス**（重要！）
   - 電話番号: 任意（例: `090-1234-5678`）
   - 郵便番号: 任意（例: `100-0001`）
   - 都道府県: 任意（例: `東京都`）
   - 市区町村: 任意（例: `千代田区`）
   - 番地: 任意（例: `千代田1-1-1`）
   - 建物名: 任意（例: `テストビル 101`）

### ステップ3: 決済を完了

1. 「支払い」ボタンをクリック
2. Stripe Checkoutページで決済を完了
3. 注文完了画面が表示されることを確認

### ステップ4: ログを確認

#### 4-1. Stripe DashboardでWebhookイベントを確認（最優先）

**まず、StripeからWebhookが送信されているか確認します。**

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイント（`adventurous-oasis` など）をクリック
3. 「最新のイベント」タブを確認

**確認ポイント**:
- ✅ イベントが表示されているか
- ✅ イベントが表示されていない場合、Webhookが送信されていない可能性
- ✅ イベントが表示されている場合：
  - レスポンスコードが `200` か確認
  - レスポンスコードが `400` や `500` の場合、エラーの詳細を確認

**もしイベントが表示されていない場合**:
- Webhookエンドポイントの設定を確認
- 監視するイベントに `checkout.session.completed` が選択されているか確認
- Stripe Dashboardのモードが「本番モード」になっているか確認

---

#### 4-2. Vercel Dashboardでログを確認

**Stripe Dashboardにイベントが表示されている場合、Vercel Dashboardでログを確認します。**

**確認方法（方法1: Deploymentsから）**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブをクリック
3. 最新のデプロイメントをクリック
4. 「Functions」タブをクリック
5. `/api/webhooks/stripe` を選択
6. ログを確認

**確認方法（方法2: プロジェクトのFunctionsから）**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Functions」タブをクリック（左側のメニュー）
3. `/api/webhooks/stripe` を選択
4. ログを確認

**確認ポイント**:
- ✅ `POST /api/webhooks/stripe` が表示されているか
- ✅ エラーメッセージが表示されていないか
- ✅ メール送信のログが表示されているか

**もしログが表示されない場合**:
- 正しいデプロイメントを確認しているか
- 正しいFunctionを選択しているか
- ログの時間範囲を確認（最新のログが表示されているか）

**確認すべきログ**:
```
📧 顧客への注文確認メールを送信します:
  顧客メールアドレス: [メールアドレス]
  RESEND_API_KEY: re_xxxxx...
  RESEND_FROM_EMAIL: onboarding@resend.dev
✅ メール送信成功: {"id":"..."}
✅ 顧客へのメール送信処理が完了しました
📧 管理者への通知メールを送信します
  管理者メールアドレス: info.shokenchikushi@gmail.com
✅ 管理者通知メール送信成功: {"id":"..."}
✅ 管理者へのメール送信処理が完了しました
```

#### 4-3. Resend Webhookのログを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Functions」タブ → `/api/webhooks/resend` を選択
3. 最新のログを確認

**確認すべきログ**:
```
📧 Resend Webhook受信:
  イベントタイプ: email.sent
✅ メールが送信されました
  メールID: [メールID]
  送信先: [メールアドレス]
```

#### 4-4. Stripe Dashboardで確認（再確認）

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブを確認
4. イベントが表示されているか確認
5. レスポンスコードが `200` か確認

#### 4-5. Resend Dashboardで確認

1. [Resend Dashboard](https://resend.com/dashboard) → 「Emails」
2. メールが送信されているか確認
3. メールのステータスを確認（送信成功、失敗など）

### ステップ5: メールの受信確認

1. 顧客のメールアドレスでメールが届いているか確認
2. 管理者のメールアドレス（`info.shokenchikushi@gmail.com`）でメールが届いているか確認
3. 迷惑メールフォルダも確認

---

## 問題が発生した場合の対処

### 問題1: メールが届かない

**確認事項**:
1. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを確認
2. エラーメッセージが表示されていないか確認
3. `RESEND_API_KEY` が設定されているか確認
4. `RESEND_FROM_EMAIL` が設定されているか確認
5. Resend Dashboard → Emails でメールが送信されているか確認

**解決方法**:
- エラーメッセージの内容に応じて対処
- 環境変数が設定されていない場合、設定して再デプロイ

### 問題2: Webhookが届いていない

**確認事項**:
1. Stripe Dashboard → Webhook → エンドポイント → 「最新のイベント」タブを確認
2. イベントが表示されていない場合、Webhookが届いていない
3. Vercel Dashboard → Functions → `/api/webhooks/stripe` のログを確認

**解決方法**:
1. Stripe DashboardでWebhookエンドポイントの設定を確認
2. エンドポイントURLが正しいか確認
3. 監視するイベントに `checkout.session.completed` が選択されているか確認

### 問題3: 注文完了画面が表示されない

**確認事項**:
1. `NEXT_PUBLIC_BASE_URL` が `https://atapworks.co.jp` に設定されているか確認
2. Vercel Dashboard → Settings → Environment Variables で確認

**解決方法**:
1. `NEXT_PUBLIC_BASE_URL` を `https://atapworks.co.jp` に設定
2. 再デプロイ

---

## 優先順位

### 最優先（テスト前に必須）

1. ✅ Vercelのビルド状況（完了）
2. ⏳ 環境変数の確認（最重要）
3. ⏳ Stripe Webhookの確認
4. ⏳ Resend Webhookの設定

### 次に確認

5. ⏳ Resend Dashboardの確認
6. ⏳ コードの最終確認（完了）

---

## 次のステップ

1. **環境変数の確認**（最重要）
2. **Stripe Webhookの確認**
3. **Resend Webhookの設定**
4. **Resend Dashboardの確認**
5. **テスト購入を実行**
6. **ログを確認**
7. **メールの受信確認**

すべての確認が完了したら、テスト購入を実行してください。

