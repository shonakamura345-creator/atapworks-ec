# メールが届かない場合のトラブルシューティング

## 確認手順

### 1. Vercelのログを確認

1. Vercel Dashboard → プロジェクトを選択
2. 「Functions」タブをクリック
3. 「Logs」をクリック
4. 最新のWebhookログを確認

以下のログが表示されているか確認：
- ✅ `📧 顧客への注文確認メールを送信します:`
- ✅ `📧 Resendでメールを送信します:`
- ✅ `✅ メール送信成功:`
- ❌ `⚠️ RESEND_API_KEYが設定されていません`
- ❌ `❌ メール送信エラー:`

### 2. 環境変数の確認

Vercel Dashboard → Settings → Environment Variables で以下が設定されているか確認：

- [ ] `RESEND_API_KEY` が設定されているか
- [ ] `RESEND_FROM_EMAIL` が設定されているか
- [ ] `ADMIN_EMAIL` が設定されているか（管理者通知用）

### 3. Stripe Webhookの確認

1. Stripe Dashboard → 「開発者」→「Webhook」
2. エンドポイントをクリック
3. 「最新のイベント」タブで、最新の `checkout.session.completed` イベントを確認
4. レスポンスコードが `200` か確認
5. レスポンス本文を確認（エラーメッセージがないか）

### 4. Resend Dashboardの確認

1. [Resend Dashboard](https://resend.com/) にログイン
2. 「Emails」タブをクリック
3. 送信履歴を確認
4. エラーがないか確認

---

## よくある問題と解決方法

### 問題1: `RESEND_API_KEYが設定されていません`

**原因**: Vercelの環境変数に `RESEND_API_KEY` が設定されていない

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables
2. `RESEND_API_KEY` を追加
3. Resend DashboardからAPIキーを取得して設定
4. 再デプロイ

---

### 問題2: `RESEND_FROM_EMAIL` が正しく設定されていない

**原因**: 送信元メールアドレスが正しく設定されていない、またはドメイン認証がされていない

**解決方法**:
1. ドメイン認証をしていない場合: `onboarding@resend.dev` を使用
2. ドメイン認証をしている場合: `info@atapworks.co.jp` などを使用
3. Vercelの環境変数を更新
4. 再デプロイ

---

### 問題3: Webhookが実行されていない

**原因**: Stripe Webhookが正しく設定されていない、またはイベントが送信されていない

**解決方法**:
1. Stripe Dashboard → Webhook → エンドポイントを確認
2. エンドポイントURLが `https://atapworks.co.jp/api/webhooks/stripe` になっているか確認
3. 監視するイベントに `checkout.session.completed` が選択されているか確認
4. テストイベントを送信して動作確認

---

### 問題4: メールがスパムフォルダに届いている

**原因**: メールがスパムとして判定されている

**解決方法**:
1. スパムフォルダを確認
2. ドメイン認証を行う（SPF、DKIM、DMARCレコードの設定）
3. Resend Dashboardでドメイン認証を設定

---

## デバッグ方法

### ログの確認方法

Vercelのログで以下のメッセージを確認：

```
📧 顧客への注文確認メールを送信します: [メールアドレス]
📧 Resendでメールを送信します:
  From: [送信元メール]
  To: [送信先メール]
  Subject: [件名]
✅ メール送信成功: [送信結果]
```

エラーがある場合：

```
❌ メール送信エラー: [エラー内容]
⚠️ RESEND_API_KEYが設定されていません
❌ Resendメール送信エラー: [エラー詳細]
```

---

## テスト方法

### テスト購入で確認

1. テスト購入を実行
2. Vercelのログを確認
3. Stripe DashboardのWebhookログを確認
4. Resend Dashboardの送信履歴を確認
5. メールボックス（受信トレイとスパムフォルダ）を確認

---

## サポートが必要な場合

以下の情報を確認してください：

1. Vercelのログ（エラーメッセージ）
2. Stripe DashboardのWebhookログ
3. Resend Dashboardの送信履歴
4. 環境変数の設定状況（キー名のみ、値は記載しない）

