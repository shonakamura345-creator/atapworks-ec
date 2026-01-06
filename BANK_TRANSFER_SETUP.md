# 銀行振込決済の追加手順

## 現在の状況

- ✅ **実装準備完了**: コード側の実装方法は準備済み
- ⏳ **Stripe審査待ち**: 銀行振込機能を使用するには、Stripeの審査が必要です
- 📝 **注意書き表示中**: チェックアウトページに「2〜3日で対応可能」の注意書きを表示

## Stripe審査について

Stripeで銀行振込（Bank Transfer）を使用するには：

1. **Stripe Dashboardで銀行振込を申請**
   - Settings → Payment methods → Customer balance
   - Bank transfer を有効化しようとすると、審査が必要な場合があります

2. **審査に必要な情報**
   - ビジネス情報
   - 銀行口座情報
   - 運営実績など

3. **審査期間**
   - 通常、数日〜数週間かかることがあります

## 審査通過後の実装手順

審査が通ったら、以下の手順で実装します：

### 1. Stripe Dashboardで銀行振込を有効化

1. https://dashboard.stripe.com にログイン
2. **Settings（設定）** → **Payment methods（支払い方法）**
3. **Customer balance** → **Bank transfer** を有効化

### 2. コードの変更

**ファイル**: `app/api/checkout/route.ts`

```typescript
// 変更前
payment_method_types: ["card"],

// 変更後
payment_method_types: ["card", "customer_balance"],
```

さらに、`payment_method_options` を追加：

```typescript
payment_method_options: {
  customer_balance: {
    funding_type: "bank_transfer",
  },
},
```

### 3. 注意書きの更新

**ファイル**: `app/checkout/page.tsx`

- 「準備中」の注意書きを削除、または
- 「銀行振込が利用可能になりました」に変更

### 4. テスト

1. テスト購入を実行
2. Stripe Checkout画面で銀行振込オプションが表示されることを確認
3. 銀行振込情報が正しく表示されることを確認

### 5. デプロイ

```bash
git add .
git commit -m "銀行振込決済を追加"
git push origin main
```

## 現在の対応

現在は、**クレジットカード決済のみ**が利用可能で、チェックアウトページに銀行振込についての注意書きを表示しています。

審査が通ったら、お知らせください。すぐに対応いたします！

