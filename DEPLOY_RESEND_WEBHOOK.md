# Resend Webhookのデプロイ手順（詳細）

## デプロイとは

「デプロイ」とは、作成したコードを本番環境（実際に動いているサイト）に反映させることです。

この場合、作成した `app/api/webhooks/resend/route.ts` をGitHubにプッシュして、Vercelが自動的にデプロイします。

---

## 具体的な手順

### ステップ1: ターミナルを開く

Macの「ターミナル」アプリを開きます。

### ステップ2: プロジェクトディレクトリに移動

以下のコマンドを実行します：

```bash
cd /Users/shonakamura/atapworks-store
```

### ステップ3: 変更を確認

以下のコマンドを実行して、変更されたファイルを確認します：

```bash
git status
```

以下のような表示が出るはずです：

```
On branch main
Changes not staged for commit:
  modified:   app/lib/email.ts
  modified:   app/api/webhooks/stripe/route.ts
  new file:   app/api/webhooks/resend/route.ts
```

### ステップ4: 変更をステージング（準備）

以下のコマンドを実行して、変更をステージングします：

```bash
git add .
```

これで、すべての変更がデプロイの準備ができました。

### ステップ5: コミット（変更を記録）

以下のコマンドを実行して、変更を記録します：

```bash
git commit -m "Resend Webhookエンドポイントを追加"
```

### ステップ6: GitHubにプッシュ（アップロード）

以下のコマンドを実行して、変更をGitHubにアップロードします：

```bash
git push origin main
```

**注意**: GitHubの認証情報を求められた場合：
- Username: `shonakamura345-creator`
- Password: Personal Access Token（以前作成したもの）

### ステップ7: Vercelが自動デプロイ

GitHubにプッシュすると、Vercelが自動的にデプロイを開始します。

**確認方法**:
1. [Vercel Dashboard](https://vercel.com/dashboard) にアクセス
2. プロジェクトを選択
3. 「Deployments」タブを確認
4. 最新のデプロイメントのステータスを確認（「Building」→「Ready」）

デプロイが完了するまで、通常1〜3分かかります。

---

## デプロイが完了したら

### 1. デプロイの確認

Vercel Dashboardで、最新のデプロイメントが「Ready」になっていることを確認します。

### 2. Resend DashboardでWebhookを設定

1. [Resend Dashboard](https://resend.com/dashboard) にログイン
2. 左側のメニューから「**Webhooks**」をクリック
3. 「**Create Webhook**」をクリック
4. 以下の情報を入力：
   - **Endpoint URL**: `https://atapworks.co.jp/api/webhooks/resend`
   - **Events**（イベント）: 以下のイベントを選択
     - ✅ `email.sent`
     - ✅ `email.delivered`
     - ✅ `email.bounced`
     - ✅ `email.complained`
     - ✅ `email.delivery_delayed`
5. 「**Create Webhook**」をクリック

### 3. テスト

1. サイトでテスト購入を実行
2. Vercel Dashboard → Functions → `/api/webhooks/resend` のログを確認
3. Resend Webhookのイベントが受信されているか確認

---

## トラブルシューティング

### エラー: "nothing to commit, working tree clean"

**原因**: 変更がすでにコミットされている、または変更がない

**解決方法**: 
```bash
git status
```
を実行して、変更がないことを確認します。

### エラー: "Authentication failed"

**原因**: GitHubの認証情報が間違っている

**解決方法**: Personal Access Tokenを再確認してください。

### エラー: "Unable to push"

**原因**: ネットワークエラーや権限の問題

**解決方法**: 
1. インターネット接続を確認
2. GitHubの認証情報を再確認
3. 再度 `git push origin main` を実行

---

## まとめ

デプロイの手順：

1. **ターミナルを開く**
2. **`cd /Users/shonakamura/atapworks-store`** を実行
3. **`git add .`** を実行
4. **`git commit -m "Resend Webhookエンドポイントを追加"`** を実行
5. **`git push origin main`** を実行
6. **Vercel Dashboardでデプロイの完了を確認**
7. **Resend DashboardでWebhookを設定**

これで完了です！

