# Stripe APIバージョンの型エラー修正

## 問題

TypeScriptの型エラーが発生しました：

```
Type error: Type '"2025-11-17.clover"' is not assignable to type '"2025-02-24.acacia"'.
```

## 原因

Stripeパッケージのバージョンが古く、新しいAPIバージョン `"2025-11-17.clover"` の型定義が含まれていません。

## 解決方法

### ステップ1: package.jsonを更新（完了）

`package.json` のStripeパッケージのバージョンを最新に更新しました：

```json
"stripe": "^18.0.0"
```

### ステップ2: 依存関係をインストール

ターミナルで以下を実行してください：

```bash
cd /Users/shonakamura/atapworks-store
npm install
```

これで、最新のStripeパッケージがインストールされ、新しいAPIバージョンの型定義が含まれます。

### ステップ3: 変更をコミットしてプッシュ

```bash
git add package.json package-lock.json
git commit -m "Stripeパッケージを最新バージョンに更新"
git push origin main
```

### ステップ4: Vercelでデプロイの完了を確認

1. [Vercel Dashboard](https://vercel.com/dashboard) → プロジェクト
2. 「Deployments」タブを確認
3. 最新のデプロイメントが「Ready」になっていることを確認

---

## 代替案（型エラーを無視する方法）

もし、Stripeパッケージの更新で問題が解決しない場合、型アサーションを使用する方法もあります：

```typescript
return new Stripe(secretKey, {
  apiVersion: "2025-11-17.clover" as any,
});
```

ただし、この方法は推奨されません。まず、Stripeパッケージの更新を試してください。

---

## まとめ

1. ✅ `package.json` を更新（完了）
2. ⏳ ターミナルで `npm install` を実行
3. ⏳ 変更をコミットしてプッシュ
4. ⏳ Vercelでデプロイの完了を確認

まず、ターミナルで `npm install` を実行してください。

