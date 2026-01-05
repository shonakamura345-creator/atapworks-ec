# 決済方法の追加について

## 現在の設定

現在、**クレジットカード決済のみ**が有効になっています。

```typescript
payment_method_types: ["card"]
```

## 追加可能な決済方法

Stripe Checkoutでは、以下の決済方法を追加できます：

### 1. **PayPay（ペイペイ）**
- `payment_method_types: ["card", "link"]`
- 日本で人気の決済方法
- Stripe Link経由でPayPayが利用可能

### 2. **銀行振込（Bank Transfer）**
- `payment_method_types: ["customer_balance"]`
- `payment_method_options: { customer_balance: { funding_type: "bank_transfer" } }`
- 銀行振込での支払い
- 入金確認まで時間がかかる場合あり

### 3. **コンビニ決済（Konbini）**
- `payment_method_types: ["customer_balance"]`
- `payment_method_options: { customer_balance: { funding_type: "konbini" } }`
- セブンイレブン、ファミリーマート、ローソンなど
- 支払期限あり（通常7日間）

### 4. **Apple Pay / Google Pay**
- `payment_method_types: ["card", "link"]`
- モバイル決済
- 対応デバイスでのみ表示

## 推奨設定

日本市場向けには、以下の組み合わせがおすすめです：

```typescript
payment_method_types: ["card", "link"]
```

これにより：
- ✅ クレジットカード決済
- ✅ PayPay決済
- ✅ Apple Pay / Google Pay（対応デバイス）

が利用可能になります。

## 実装方法

どの決済方法を追加しますか？

1. **PayPay + Apple Pay / Google Pay**（推奨）
2. **銀行振込**
3. **コンビニ決済**
4. **すべて追加**

希望を教えてください。実装いたします。

