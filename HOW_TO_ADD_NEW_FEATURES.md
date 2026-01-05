# 新機能・ツールの追加方法

## 1. 決済方法の追加

### PayPay + Apple Pay / Google Pay を追加する場合

**ファイル**: `app/api/checkout/route.ts`

**変更箇所**: 78行目の `payment_method_types`

```typescript
// 変更前
payment_method_types: ["card"],

// 変更後
payment_method_types: ["card", "link"],
```

これで、PayPayとApple Pay/Google Payが利用可能になります。

---

## 2. 新しい商品の追加

**ファイル**: `app/data/products.ts`

**手順**:
1. `products` 配列に新しい商品オブジェクトを追加
2. 必要な情報を入力：
   - `id`: 商品ID（英数字、ハイフンOK）
   - `name`: 商品名
   - `price`: 価格（円）
   - `description`: 詳細説明文
   - `shortDescription`: 商品一覧用の短い説明文（オプション）
   - `image`: 商品画像パス
   - `images`: 複数画像の配列（オプション）
   - `isAvailable`: 購入可能かどうか（デフォルト: true）

**例**:
```typescript
{
  id: "new-product",
  name: "新しい商品",
  price: 1500,
  shortDescription: "商品一覧で表示する短い説明",
  description: "商品詳細ページで表示する詳細な説明文です。",
  image: "/商品画像.jpg",
  isAvailable: true,
}
```

**注意**:
- 商品画像は `public/` フォルダに配置
- Stripe Dashboardでも商品を作成する必要があります（自動同期なし）

---

## 3. 新しいページ・機能の追加

### 新しいページを作成する場合

**手順**:
1. `app/` フォルダ内に新しいフォルダを作成（例: `app/about/`）
2. その中に `page.tsx` を作成
3. ページのコンテンツを記述

**例**: `app/about/page.tsx`
```typescript
export default function AboutPage() {
  return (
    <main className="min-h-screen bg-white p-6">
      <h1>About Us</h1>
      <p>このページについて</p>
    </main>
  );
}
```

### 新しいAPIエンドポイントを作成する場合

**手順**:
1. `app/api/` フォルダ内に新しいフォルダを作成（例: `app/api/newsletter/`）
2. その中に `route.ts` を作成
3. APIのロジックを記述

**例**: `app/api/newsletter/route.ts`
```typescript
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.json();
  // 処理を記述
  return NextResponse.json({ success: true });
}
```

---

## 4. 共通コンポーネントの追加

**手順**:
1. `app/components/` フォルダに新しいコンポーネントファイルを作成
2. コンポーネントを実装
3. 必要に応じて他のページからインポート

**例**: `app/components/NewsletterForm.tsx`
```typescript
"use client";

export default function NewsletterForm() {
  return (
    <form>
      {/* フォームの内容 */}
    </form>
  );
}
```

---

## デプロイ方法

変更を反映するには：

```bash
cd /Users/shonakamura/atapworks-store
git add .
git commit -m "新機能を追加"
git push origin main
```

プッシュ後、Vercelが自動的にデプロイします。

---

## どのツールを追加したいですか？

1. **決済方法**（PayPay、コンビニ決済など）
2. **新しい商品**
3. **新しいページ・機能**
4. **その他**

具体的に教えてください。実装手順を案内します。

