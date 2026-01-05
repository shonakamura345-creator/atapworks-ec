# HTML移行プラン：機能を保ったまま移行する方法

## 現状の機能分析

### ✅ 既にHTML移行可能な機能

1. **カート機能**
   - ✅ 既にLocalStorageを使用している
   - ✅ Vanilla JavaScriptに変換可能
   - ✅ 機能を完全に保てる

2. **ページ表示**
   - ✅ すべてのページのHTML/CSS
   - ✅ 画像の表示
   - ✅ リンクの遷移

3. **ミニゲーム**
   - ✅ Canvas APIはVanilla JSでも使用可能
   - ⚠️ ReactコンポーネントをVanilla JSに変換する必要がある

---

### ⚠️ サーバーサイド機能（サーバーレス関数が必要）

1. **Stripe決済**
   - 現状: `app/api/checkout/route.ts`
   - 移行: Vercel Functions（サーバーレス関数）

2. **メール送信（Webhook）**
   - 現状: `app/api/webhooks/stripe/route.ts`
   - 移行: Vercel Functions（サーバーレス関数）

---

## 推奨移行方法：ハイブリッド方式

### 構成

```
静的HTMLサイト
├── index.html（トップページ）
├── store/
│   └── [id]/
│       └── index.html（商品詳細）
├── cart.html（カート）
├── checkout.html（チェックアウト）
└── js/
    ├── cart.js（カート機能 - Vanilla JS）
    ├── game.js（ミニゲーム - Vanilla JS）
    └── checkout.js（Stripe決済呼び出し）

サーバーレス関数（Vercel Functions）
├── api/
│   ├── checkout.js（Stripe Checkout Session作成）
│   └── webhooks/
│       └── stripe.js（Webhook処理・メール送信）
```

---

## 移行のメリット

### ✅ 運用上のメリット

1. **デプロイが高速**
   - 静的HTMLはビルド時間が短い
   - 変更の反映が速い

2. **ホスティングの選択肢が広がる**
   - 静的HTMLはどこでもホスティング可能
   - CDN配信で高速

3. **サーバー管理が不要**
   - 静的ファイルはサーバー不要
   - サーバーレス関数は自動スケール

4. **コストが低い**
   - 静的ホスティングは無料または低コスト
   - サーバーレス関数は使用量ベース

### ✅ 機能面のメリット

- ✅ すべての機能を保てる
- ✅ カート機能はLocalStorageで動作
- ✅ Stripe決済はサーバーレス関数で動作
- ✅ メール送信はサーバーレス関数で動作
- ✅ ミニゲームはVanilla JSで動作

---

## 移行手順

### ステップ1: プロジェクト構造の準備

1. 静的HTML用のフォルダ構造を作成
2. サーバーレス関数用のフォルダを作成

### ステップ2: フロントエンドの変換

1. Next.jsのページを静的HTMLに変換
2. ReactコンポーネントをVanilla JavaScriptに変換
   - カート機能
   - ミニゲーム
   - フォームバリデーション

### ステップ3: サーバーレス関数の実装

1. Stripe Checkout用のAPI関数
2. Webhook処理用のAPI関数

### ステップ4: 統合とテスト

1. HTMLからサーバーレス関数を呼び出す
2. テスト
3. デプロイ

---

## 実装の詳細

### 1. カート機能（Vanilla JS）

```javascript
// js/cart.js
class Cart {
  constructor() {
    this.items = this.loadFromStorage();
    this.render();
  }

  loadFromStorage() {
    const saved = localStorage.getItem('atapworks-cart');
    return saved ? JSON.parse(saved) : [];
  }

  saveToStorage() {
    localStorage.setItem('atapworks-cart', JSON.stringify(this.items));
  }

  add(product, quantity = 1) {
    // カートに追加
    // ...
    this.saveToStorage();
    this.render();
  }

  // その他のメソッド...
}
```

### 2. Stripe決済（サーバーレス関数）

```javascript
// api/checkout.js (Vercel Functions)
export default async function handler(req, res) {
  const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
  
  const session = await stripe.checkout.sessions.create({
    // ...
  });
  
  res.json({ sessionId: session.id });
}
```

### 3. ミニゲーム（Vanilla JS）

```javascript
// js/game.js
class RunningGame {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    // ゲームロジック...
  }
  
  // ReactのuseState/useEffectをVanilla JSに変換
}
```

---

## デプロイ方法

### オプション1: Vercel（推奨）

1. 静的HTMLをVercelにデプロイ
2. サーバーレス関数もVercel Functionsとして自動デプロイ
3. 同じドメインで運用可能

### オプション2: Netlify

1. 静的HTMLをNetlifyにデプロイ
2. Netlify Functionsでサーバーレス関数を実装

### オプション3: 静的ホスティング + 別のサーバーレス

1. 静的HTMLはGitHub Pages、Cloudflare Pagesなど
2. サーバーレス関数はVercel Functions、AWS Lambdaなど

---

## 注意事項

### ⚠️ 移行にかかる時間

- フロントエンドの変換: 2-3日
- サーバーレス関数の実装: 1-2日
- テストとデバッグ: 1-2日
- **合計: 約1週間**

### ⚠️ 移行中のダウンタイム

- 移行中は現在のサイトを維持
- 移行完了後に切り替え
- ダウンタイムは最小限に

---

## 次のステップ

移行を進める場合は、以下の順序で実装します：

1. **カート機能のVanilla JS化**（既にLocalStorageを使用しているので簡単）
2. **静的HTMLの生成**（Next.jsの静的エクスポート機能を使用）
3. **サーバーレス関数の実装**（Stripe決済・Webhook）
4. **ミニゲームのVanilla JS化**
5. **統合とテスト**

---

## 質問

HTML移行を進めますか？それとも、まず現在のNext.jsサイトで解決したい具体的な課題があれば教えてください。

