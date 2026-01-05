# Webhookのポート番号確認

## 現在の状況

開発サーバーが**ポート3001**で起動しています。

```
⚠ Port 3000 is in use by process 41786, using available port 3001 instead.
- Local:         http://localhost:3001
```

## 重要なポイント

`stripe listen` でWebhookを転送する場合、**開発サーバーのポート番号と一致させる必要があります**。

## 対処方法

### オプション1: stripe listenをポート3001に変更（推奨）

`stripe listen` を実行しているターミナルで：

1. `stripe listen` を停止（`Ctrl + C`）
2. ポート3001を指定して再起動：

```bash
stripe listen --forward-to localhost:3001/api/webhooks/stripe
```

3. 新しいシークレットが表示されるので、`.env.local` に追加（または更新）

### オプション2: ポート3000を使用中のプロセスを停止

ポート3000を使用しているプロセスを停止して、開発サーバーをポート3000で起動：

```bash
# プロセス41786を停止（開発サーバーの場合）
# 開発サーバーが実行されているターミナルで Ctrl + C

# または、強制的に停止（注意：他のプロセスかもしれません）
kill 41786
```

その後、開発サーバーを再起動するとポート3000で起動します。

---

## 確認方法

### 1. 開発サーバーのポートを確認

開発サーバーのログで、どのポートで起動しているか確認：

```
- Local:         http://localhost:3001  ← このポート番号を確認
```

### 2. stripe listenのポートを確認

`stripe listen` のコマンドで、どのポートを指定しているか確認：

```bash
stripe listen --forward-to localhost:3001/api/webhooks/stripe
#                                    ^^^^ このポート番号が開発サーバーと一致しているか
```

### 3. テスト実行

ポート番号が一致している状態で、テストを実行：

```bash
stripe trigger checkout.session.completed
```

開発サーバーのログに、Webhookが受信されたことが表示されるはずです。

---

## まとめ

✅ 開発サーバーは起動している（ポート3001）
⏳ `stripe listen` もポート3001に合わせる必要がある
⏳ `.env.local` の `STRIPE_WEBHOOK_SECRET` を更新する必要がある（新しいシークレットが表示される場合）

