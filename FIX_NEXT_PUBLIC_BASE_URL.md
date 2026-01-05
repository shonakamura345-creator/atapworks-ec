# NEXT_PUBLIC_BASE_URLの修正方法

## 問題の発見

`NEXT_PUBLIC_BASE_URL` が `http://localhost:3000` になっています。

これが注文完了画面が表示されない原因です！

---

## 問題の説明

`NEXT_PUBLIC_BASE_URL` は、Stripe Checkoutから戻る際のリダイレクト先URLに使用されます。

- ❌ 現在の値: `http://localhost:3000`（ローカル開発用）
- ✅ 正しい値: `https://atapworks.co.jp`（本番環境用）

現在の値が `http://localhost:3000` になっているため、Stripe Checkoutから戻る際に `http://localhost:3000/checkout/success` にリダイレクトしようとしますが、これは本番環境では存在しないため、注文完了画面が表示されません。

---

## 修正手順

### ステップ1: Vercel Dashboardに移動

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. 「Settings」タブをクリック
4. 左側のメニューから「Environment Variables」をクリック

### ステップ2: NEXT_PUBLIC_BASE_URLを修正

1. `NEXT_PUBLIC_BASE_URL` を探す（検索ボックスで検索できます）
2. クリックして編集
3. Valueを `https://atapworks.co.jp` に変更
4. 「Save」をクリック

または、新しい環境変数として追加：

1. 「Add New」をクリック
2. Key: `NEXT_PUBLIC_BASE_URL`
3. Value: `https://atapworks.co.jp`
4. Environment: Production にチェック（必要に応じて Preview にもチェック）
5. 「Save」をクリック

### ステップ3: 再デプロイ

環境変数を変更した後、必ず再デプロイしてください：

1. Vercel Dashboard → 「Deployments」タブ
2. 最新のデプロイメントの「...」（三点メニュー）をクリック
3. 「Redeploy」を選択
4. 再デプロイが完了するのを待つ

---

## 環境別の設定

### ローカル開発環境

`.env.local` ファイルに：
```env
NEXT_PUBLIC_BASE_URL=http://localhost:3000
```

### 本番環境（Vercel）

Vercel Dashboard → Environment Variables:
```
Key: NEXT_PUBLIC_BASE_URL
Value: https://atapworks.co.jp
Environment: Production
```

---

## 確認方法

修正後、テスト購入を実行：

1. サイト（`https://atapworks.co.jp`）でテスト購入を試す
2. テストカードを使用：
   - カード番号: `4242 4242 4242 4242`
   - 有効期限: 未来の日付（例: 12/25）
   - CVC: 任意の3桁（例: 123）
3. 購入を完了
4. 注文完了画面（`https://atapworks.co.jp/checkout/success`）が表示されるか確認

---

## まとめ

- ✅ 問題の原因: `NEXT_PUBLIC_BASE_URL` が `http://localhost:3000` になっている
- ✅ 解決方法: `https://atapworks.co.jp` に変更
- ✅ 環境変数を変更した後、必ず再デプロイ

この修正で、注文完了画面が正しく表示されるはずです！

