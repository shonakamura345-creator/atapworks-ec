# Webhook設定のデプロイについて

## 重要なポイント

**GitHubにプッシュする必要はありません。**

Webhookエンドポイントの設定は以下の2つで構成されています：

1. **Stripe Dashboardでの設定**（エンドポイントの作成）
   - これはStripe側の設定なので、コードの変更は不要

2. **Vercelの環境変数設定**（`STRIPE_WEBHOOK_SECRET`）
   - これはVercel側の設定なので、GitHubにプッシュする必要はありません
   - Vercel Dashboardで環境変数を設定した後、**再デプロイするだけで反映されます**

---

## 必要な作業

### 1. Vercel Dashboardで環境変数を設定（既に完了）

- ✅ Key: `STRIPE_WEBHOOK_SECRET`
- ✅ Value: 署名シークレット（`whsec_...`）
- ✅ Environment: Production

### 2. 再デプロイ（これからやること）

Vercel Dashboardで再デプロイ：

1. Vercel Dashboard → プロジェクト → 「Deployments」タブ
2. 最新のデプロイメントの「...」（三点メニュー）をクリック
3. 「Redeploy」を選択
4. 再デプロイが完了するのを待つ

---

## GitHubにプッシュが必要な場合

以下の場合のみ、GitHubにプッシュが必要です：

- ✅ コードを変更した場合（例: `app/api/webhooks/stripe/route.ts` を編集）
- ✅ 新しいファイルを追加した場合
- ✅ 設定ファイルを変更した場合

**今回のWebhookエンドポイント設定は、コードの変更ではないので、プッシュは不要です。**

---

## 確認方法

再デプロイが完了したら、テストできます：

### Stripe Dashboardからテスト送信

1. Stripe Dashboard → Webhook → エンドポイント（`adventurous-oasis`）をクリック
2. 上部の「送信をテスト」をクリック
3. `checkout.session.completed` を選択
4. 「送信」をクリック
5. Vercel Dashboard → Functions → Logs でログを確認

---

## まとめ

- ❌ GitHubにプッシュする必要はありません
- ✅ Vercel Dashboardで環境変数を設定済み
- ✅ 再デプロイするだけ

詳細は `WEBHOOK_SETUP_GUIDE.md` を参照してください。

