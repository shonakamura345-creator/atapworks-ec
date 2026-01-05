# Stripe Webhook APIバージョンの修正手順

## 問題

StripeのWebhookイベントのAPIバージョン（`2025-11-17.clover`）と、コードで使用しているAPIバージョン（`2025-02-24.acacia`）が不一致でした。

## 解決方法

### ステップ1: コード側のAPIバージョンを更新（完了）

コード側のAPIバージョンを `2025-11-17.clover` に更新しました。

**更新したファイル**:
- `app/api/webhooks/stripe/route.ts`
- `app/api/checkout/route.ts`

---

### ステップ2: コードをデプロイ

変更をGitHubにプッシュして、Vercelが自動的にデプロイします。

**手順**:
1. ターミナルで以下を実行：
   ```bash
   cd /Users/shonakamura/atapworks-store
   git add .
   git commit -m "Stripe APIバージョンを2025-11-17.cloverに更新"
   git push origin main
   ```

2. Vercel Dashboardでデプロイの完了を確認

---

### ステップ3: Stripe Dashboardで新しいWebhookエンドポイントを作成

既存のWebhookエンドポイントを削除し、新しいエンドポイントを作成します。

#### 3-1. 既存のWebhookエンドポイントを削除（オプション）

**注意**: 既存のWebhookエンドポイントを削除する前に、Webhookシークレットをメモしておいてください。

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. 既存のエンドポイント（`adventurous-oasis` など）をクリック
3. 「削除」または「Delete」をクリック
4. 確認画面で「削除」をクリック

#### 3-2. 新しいWebhookエンドポイントを作成

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. 「イベントの送信先を作成する」または「Add endpoint」をクリック
3. 以下の情報を入力：

   **イベントの選択**:
   - 「イベントを選択」で `checkout.session.completed` を選択

   **送信先の設定**:
   - **エンドポイントURL**: `https://atapworks.co.jp/api/webhooks/stripe`
   - **APIバージョン**: `2025-11-17.clover` を選択（重要！）
   - **説明**: 任意（例: `Production Webhook`）

4. 「送信先を作成する」または「Create endpoint」をクリック

#### 3-3. Webhookシークレットを取得

1. 作成したWebhookエンドポイントをクリック
2. 「シークレット」または「Signing secret」をクリック
3. シークレットをコピー（`whsec_...` で始まる）

#### 3-4. Vercelの環境変数を更新

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Environment Variables
2. `STRIPE_WEBHOOK_SECRET` を探す
3. 「編集」をクリック
4. 新しいWebhookシークレットを貼り付け
5. 「Save」をクリック
6. **再デプロイ**（重要！）

---

## 確認手順

### 1. コードがデプロイされているか確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブを確認
3. 最新のデプロイメントが「Ready」になっていることを確認

### 2. Webhookエンドポイントが正しく設定されているか確認

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. 新しいWebhookエンドポイントをクリック
3. 以下を確認：
   - エンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`
   - APIバージョン: `2025-11-17.clover`
   - 監視するイベント: `checkout.session.completed`

### 3. テスト購入を実行

1. サイト（`https://atapworks.co.jp`）でテスト購入を実行
2. Stripe Dashboard → Webhook → 「最新のイベント」タブを確認
3. イベントが表示されているか確認
4. レスポンスコードが `200` か確認

### 4. Vercel Dashboardでログを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブ → `/api/webhooks/stripe` を選択
4. ログを確認

**確認すべきログ**:
```
POST /api/webhooks/stripe
📧 顧客への注文確認メールを送信します:
  顧客メールアドレス: [メールアドレス]
✅ メール送信成功: {"id":"..."}
✅ 顧客へのメール送信処理が完了しました
```

---

## まとめ

1. ✅ **コード側のAPIバージョンを更新**（完了）
2. ⏳ **コードをデプロイ**
3. ⏳ **Stripe Dashboardで新しいWebhookエンドポイントを作成**
4. ⏳ **WebhookシークレットをVercelの環境変数に設定**
5. ⏳ **再デプロイ**
6. ⏳ **テスト購入を実行して確認**

まず、コードをデプロイしてから、Stripe Dashboardで新しいWebhookエンドポイントを作成してください。

