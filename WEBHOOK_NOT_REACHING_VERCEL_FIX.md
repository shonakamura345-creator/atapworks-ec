# WebhookがVercelに到達しない問題の修正

## 問題の状況

- ❌ Vercel DashboardのFunctionsタブに `/api/webhooks/stripe` が表示されない
- ❌ Webhookが到達していない
- ❌ Stripe Dashboardでレスポンスコードが `307` になっている
- ✅ ドメインは3つ設定されている：
  - `www.atapworks.co.jp`
  - `atapworks-store-test.vercel.app`
  - `atapworks.co.jp`

## 原因

Vercelのリダイレクト設定で、`www`なしのURLから`www`付きのURLにリダイレクトしている可能性があります。

**問題点**:
- Stripe DashboardのWebhookエンドポイントURL: `https://atapworks.co.jp/api/webhooks/stripe`（`www`なし）
- Vercelのリダイレクト設定で、`www`なしから`www`付きにリダイレクトしている
- リダイレクトが発生すると、Webhookが正常に処理されない

---

## 解決方法

### ステップ1: Vercel Dashboardでリダイレクト設定を確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Domains
2. 各ドメインの設定を確認
3. 「Redirects」タブを確認（もしあれば）

**確認ポイント**:
- ✅ `www`付きから`www`なしへのリダイレクトルールが設定されているか
- ✅ `www`なしから`www`付きへのリダイレクトルールが設定されていないか

---

### ステップ2: Vercel Dashboardでリダイレクト設定を修正

**推奨設定**:
- `www.atapworks.co.jp` → `https://atapworks.co.jp` にリダイレクト（`www`付きから`www`なしへ）
- `atapworks.co.jp` → リダイレクトなし（メインドメイン）

**設定方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Domains
2. `www.atapworks.co.jp` をクリック
3. 「Redirects」タブを確認
4. `www`なしから`www`付きへのリダイレクトルールがあれば削除
5. `www`付きから`www`なしへのリダイレクトルールを設定（推奨）

---

### ステップ3: Webhookエンドポイントを直接テスト

Webhookエンドポイントが正しく動作しているか確認するため、直接テストします。

**テスト方法1: Stripe Dashboardからテスト送信**

1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「テスト送信」または「Send test event」をクリック
4. イベントタイプ: `checkout.session.completed` を選択
5. 「送信」をクリック
6. Vercel Dashboardのログを確認

**テスト方法2: curlで直接テスト**

ターミナルで以下を実行：

```bash
curl -X POST https://atapworks.co.jp/api/webhooks/stripe \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'
```

**確認ポイント**:
- ✅ レスポンスコードが `200` か `400` か（`307`ではない）
- ✅ エラーメッセージが表示されていないか

---

### ステップ4: Vercel Dashboardでログを確認

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブを確認
4. `/api/webhooks/stripe` が表示されているか確認

**もし `/api/webhooks/stripe` が表示されない場合**:
- Webhookが到達していない
- リダイレクトが発生している可能性

---

## 代替案: WebhookエンドポイントURLを `www`付きに変更

もし、Vercelのリダイレクト設定を変更できない場合、Stripe DashboardのWebhookエンドポイントURLを `www`付きに変更することもできます。

**手順**:
1. [Stripe Dashboard](https://dashboard.stripe.com/) → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「送信先を編集」をクリック
4. エンドポイントURLを `https://www.atapworks.co.jp/api/webhooks/stripe` に変更
5. 「保存」をクリック

**注意**: この方法は、Vercelのリダイレクト設定に依存するため、推奨されません。まず、Vercelのリダイレクト設定を修正することを推奨します。

---

## 確認手順

### 1. Vercel Dashboardでリダイレクト設定を確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト → Settings → Domains
2. 各ドメインの設定を確認
3. 「Redirects」タブを確認

### 2. Webhookエンドポイントを直接テスト

1. Stripe Dashboard → Webhook → エンドポイント → 「テスト送信」をクリック
2. Vercel Dashboardのログを確認

### 3. Vercel Dashboardでログを確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブ → 最新のデプロイメントをクリック
3. 「Functions」タブを確認
4. `/api/webhooks/stripe` が表示されているか確認

---

## まとめ

1. ⏳ **Vercel Dashboardでリダイレクト設定を確認**
2. ⏳ **リダイレクト設定を修正**（`www`なしから`www`付きへのリダイレクトを削除）
3. ⏳ **Webhookエンドポイントを直接テスト**
4. ⏳ **Vercel Dashboardでログを確認**

まず、**Vercel Dashboardでリダイレクト設定を確認**してください。

もし、Vercel Dashboardに「Redirects」タブがない場合、`vercel.json` ファイルでリダイレクト設定を確認する必要があります。

