# 開発サーバーの起動方法（クイックガイド）

## エラー: package.json が見つからない

このエラーは、プロジェクトディレクトリにいない場合に発生します。

### 解決方法

プロジェクトディレクトリに移動してから、開発サーバーを起動してください：

```bash
cd /Users/shonakamura/atapworks-store
npm run dev
```

---

## 完全な手順

### 1. プロジェクトディレクトリに移動

```bash
cd /Users/shonakamura/atapworks-store
```

### 2. 開発サーバーを起動

```bash
npm run dev
```

### 3. ブラウザで確認

開発サーバーが起動すると、以下のようなメッセージが表示されます：

```
▲ Next.js 16.1.1 (Turbopack)
- Local:         http://localhost:3000
- Network:       http://0.0.0.0:3000

✓ Ready in XXXms
```

ブラウザで `http://localhost:3000` にアクセスして確認してください。

---

## よくあるエラーと解決方法

### エラー1: package.json が見つからない

**原因**: プロジェクトディレクトリにいない

**解決方法**:
```bash
cd /Users/shonakamura/atapworks-store
npm run dev
```

### エラー2: Port 3000 is in use

**原因**: 既に開発サーバーが起動している

**解決方法**:
1. 実行中の開発サーバーを停止（`Ctrl + C`）
2. または、別のポートを使用（自動的にポート3001などが使用されます）

### エラー3: Unable to acquire lock

**原因**: 前回の開発サーバーが正常に終了していない

**解決方法**:
```bash
# .next フォルダを削除
rm -rf .next

# 開発サーバーを再起動
npm run dev
```

---

## クイックコマンド一覧

```bash
# プロジェクトディレクトリに移動
cd /Users/shonakamura/atapworks-store

# 開発サーバーを起動
npm run dev

# 開発サーバーを停止
Ctrl + C

# ビルド
npm run build

# 本番サーバーを起動（ビルド後）
npm start
```

