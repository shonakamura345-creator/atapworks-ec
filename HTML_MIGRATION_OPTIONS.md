# HTML移行の選択肢と課題

## 現状の機能とHTML移行時の対応

### ✅ HTML移行後も動作する機能

1. **ページの表示（見た目）**
   - ✅ すべてのページのHTML/CSS
   - ✅ 画像の表示
   - ✅ リンクの遷移

2. **基本的なJavaScript機能**
   - ✅ スクロールアニメーション（Vanilla JSで実装可能）
   - ✅ フォームの基本バリデーション（Vanilla JSで実装可能）

---

### ⚠️ HTML移行で課題がある機能

#### 1. カート機能

**現状**: Reactの状態管理（`CartContext`）を使用

**HTML移行時の選択肢:**

**オプションA: LocalStorageを使用（推奨）**
- ブラウザのLocalStorageにカート情報を保存
- Vanilla JavaScriptで実装
- ✅ サーバー不要
- ✅ 機能を保てる

**オプションB: 外部サービスを使用**
- カート機能を外部サービス（例: Snipcart）に移行
- ✅ 機能を保てる
- ❌ 追加コストがかかる可能性

---

#### 2. Stripe決済

**現状**: Next.jsのAPIルート（`app/api/checkout/route.ts`）を使用

**HTML移行時の選択肢:**

**オプションA: Stripe Checkout（推奨）**
- Stripe Checkoutのホスト型ページを使用
- カート情報をStripeに直接送信
- ✅ サーバーサイドのAPIルートが不要
- ✅ セキュリティが高い
- ✅ 機能を保てる

**実装方法:**
```javascript
// HTML + Vanilla JS
fetch('https://api.stripe.com/v1/checkout/sessions', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_...',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    // カート情報
  })
})
```

⚠️ **注意**: シークレットキーをクライアント側に置くのはセキュリティリスクがあります。

**オプションB: サーバーレス関数を使用**
- Vercel Functions、Netlify Functions、AWS Lambdaなど
- HTMLサイト + サーバーレス関数の組み合わせ
- ✅ 機能を保てる
- ✅ サーバー管理が不要

**オプションC: 外部の決済処理サービス**
- 完全に外部サービスに移行
- ✅ サーバー不要
- ❌ 追加コストがかかる可能性

---

#### 3. メール送信（Webhook）

**現状**: Next.jsのAPIルート（`app/api/webhooks/stripe/route.ts`）を使用

**HTML移行時の選択肢:**

**オプションA: サーバーレス関数を使用（推奨）**
- Vercel Functions、Netlify Functionsなど
- Webhookエンドポイントをサーバーレス関数として実装
- ✅ 機能を保てる
- ✅ サーバー管理が不要

**オプションB: StripeのWebhook機能を活用**
- Stripe DashboardでWebhookを設定
- 外部サービス（Zapier、Make.comなど）でメール送信
- ✅ サーバー不要
- ❌ 追加コストがかかる可能性

---

#### 4. ミニゲーム

**現状**: Reactコンポーネント（`RunningGame.tsx`）を使用

**HTML移行時の選択肢:**

**オプションA: Vanilla JavaScriptで再実装（推奨）**
- Canvas APIはVanilla JSでも使用可能
- Reactの状態管理をVanilla JSに置き換え
- ✅ 機能を保てる
- ⚠️ 実装に時間がかかる

**オプションB: 外部のゲームエンジンを使用**
- Phaser.js、PixiJSなど
- ✅ 機能を保てる
- ⚠️ ライブラリの追加が必要

---

## 推奨アプローチ: ハイブリッド方式

### 構成

1. **フロントエンド**: 静的HTML + Vanilla JavaScript
2. **バックエンド**: サーバーレス関数（Vercel Functionsなど）

### メリット

- ✅ フロントエンドは静的HTML（シンプル）
- ✅ サーバーレス関数で動的機能を実現
- ✅ サーバー管理が不要
- ✅ すべての機能を保てる
- ✅ コストが低い（使用量ベース）

### デメリット

- ⚠️ サーバーレス関数の実装が必要
- ⚠️ 移行作業に時間がかかる

---

## 完全に静的なHTMLにする場合

### 動作しなくなる機能

- ❌ カート機能（LocalStorageで代替可能）
- ❌ Stripe決済（外部サービスで代替可能）
- ❌ メール送信（外部サービスで代替可能）
- ❌ ミニゲーム（Vanilla JSで再実装可能）

### 代替手段

すべての機能を外部サービスやVanilla JavaScriptで実装することで、完全に静的なHTMLでも機能を保てますが、実装コストが高くなります。

---

## 移行の手順（ハイブリッド方式の場合）

### 1. フロントエンドを静的HTMLに変換

1. Next.jsの静的エクスポート機能を使用
2. ReactコンポーネントをVanilla JavaScriptに変換
3. カート機能をLocalStorageベースに変更

### 2. サーバーレス関数を実装

1. Stripe決済用のAPI（Vercel Functionsなど）
2. Webhook処理用のAPI
3. メール送信用のAPI

### 3. 統合

1. HTMLからサーバーレス関数を呼び出す
2. テスト
3. デプロイ

---

## コスト比較

### 現在（Next.js on Vercel）

- ✅ 無料プランで十分
- ✅ 自動デプロイ
- ✅ すべての機能が動作

### ハイブリッド方式（静的HTML + サーバーレス関数）

- ✅ 無料プランで十分（Vercel Functions）
- ✅ 静的HTMLはどこでもホスティング可能
- ✅ すべての機能が動作

### 完全に静的なHTML + 外部サービス

- ⚠️ 外部サービスのコストがかかる可能性
- ⚠️ 実装コストが高い

---

## 推奨事項

**現状のNext.jsのまま運用することをお勧めします。**

理由：
1. ✅ すべての機能が既に動作している
2. ✅ メンテナンスが簡単
3. ✅ Vercelで無料でホスティング可能
4. ✅ 自動デプロイ
5. ✅ サーバー管理が不要（Vercelが管理）

**HTML移行のメリット:**
- よりシンプルなホスティング（静的ファイルのみ）
- より高速（CDN配信）

**HTML移行のデメリット:**
- 実装コストが高い
- 機能の一部を再実装する必要がある
- メンテナンスが複雑になる可能性

---

## 質問

HTML移行を検討されている理由を教えてください：

1. ホスティングコストを削減したい？
2. よりシンプルな構成にしたい？
3. 特定のホスティングサービスを使いたい？
4. その他の理由？

理由に応じて、最適な移行方法を提案できます。

