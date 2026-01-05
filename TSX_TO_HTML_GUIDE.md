# TSXからHTMLへの変換について

## 結論

**はい、同じ見た目のHTMLサイトに変換できます。ただし、一部の機能は動作しなくなります。**

---

## Next.jsの静的エクスポート機能

Next.jsには、TSXファイルを静的なHTMLファイルに変換する機能があります。

### 方法1: Next.jsの静的エクスポート（推奨）

#### 設定方法

1. `next.config.ts` を編集：

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // 静的エクスポートを有効化
  images: {
    unoptimized: true, // 画像の最適化を無効化（静的エクスポート用）
  },
};

export default nextConfig;
```

2. ビルドコマンドを実行：

```bash
npm run build
```

3. `out` フォルダにHTMLファイルが生成されます

#### 生成されるファイル

- `out/index.html` - トップページ
- `out/store/[id]/index.html` - 商品詳細ページ
- `out/cart/index.html` - カートページ
- など、すべてのページがHTMLファイルとして生成されます

---

## ⚠️ 動作しなくなる機能

静的HTMLに変換すると、以下の機能は動作しなくなります：

### 1. 動的な機能（Reactの状態管理）

- ❌ カート機能（商品の追加・削除）
- ❌ スクロールアニメーション（一部）
- ❌ フォームの動的バリデーション

### 2. サーバーサイド機能

- ❌ Stripe決済（APIルートが動作しない）
- ❌ メール送信（Webhookが動作しない）
- ❌ 商品の動的読み込み

### 3. ミニゲーム

- ❌ ミニゲーム（ReactコンポーネントとCanvas APIが必要）

---

## ✅ 動作する機能

- ✅ ページの表示（見た目）
- ✅ 画像の表示
- ✅ リンクの遷移
- ✅ 基本的なCSSアニメーション
- ✅ 静的なコンテンツ

---

## 変換方法の選択肢

### オプション1: 完全に静的なHTML（機能制限あり）

**メリット:**
- サーバー不要
- どこでもホスティング可能
- 高速

**デメリット:**
- カート機能が動作しない
- 決済機能が動作しない
- ミニゲームが動作しない

### オプション2: Next.jsのまま（現在の状態）

**メリット:**
- すべての機能が動作する
- 動的な機能が使える
- 決済機能が動作する

**デメリット:**
- サーバーが必要（Vercelなど）

---

## 推奨事項

**現在のサイトは、決済機能やミニゲームがあるため、Next.jsのまま運用することをお勧めします。**

もし完全に静的なHTMLが必要な場合（例：別の用途で使う、アーカイブなど）は、静的エクスポート機能を使用できます。

---

## 実際の変換手順（必要な場合）

### 1. next.config.tsを編集

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
```

### 2. ビルド

```bash
npm run build
```

### 3. 生成されたHTMLファイルを確認

```bash
ls -la out/
```

### 4. ローカルで確認

```bash
# 静的ファイルサーバーを起動（例：Python）
cd out
python3 -m http.server 8000
```

ブラウザで `http://localhost:8000` にアクセス

---

## 注意事項

- 静的エクスポート後は、決済機能やカート機能は動作しません
- ミニゲームも動作しません
- 見た目は同じですが、機能は制限されます

