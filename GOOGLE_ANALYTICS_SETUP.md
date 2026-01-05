# Google Analytics（GA）の設定方法

## NEXT_PUBLIC_GA_ID とは

`NEXT_PUBLIC_GA_ID` は、Google Analyticsの測定ID（Measurement ID）です。

Google Analyticsを使用して、ウェブサイトのアクセス数、ページビュー、ユーザーの行動などを分析できます。

---

## Google Analyticsアカウントの作成（未作成の場合）

### ステップ1: Google Analyticsアカウントを作成

1. [Google Analytics](https://analytics.google.com/) にアクセス
2. Googleアカウントでログイン
3. 「測定を開始」をクリック

### ステップ2: アカウントを作成

1. **アカウント名**を入力（例: `ATAP Works`）
2. **アカウントのデータ共有設定**を選択（必要に応じて）
3. 「次へ」をクリック

### ステップ3: プロパティを作成

1. **プロパティ名**を入力（例: `atapworks.co.jp`）
2. **レポートのタイムゾーン**を選択（日本時間: `(GMT+09:00) 日本標準時`）
3. **通貨**を選択（日本円: `JPY`）
4. 「次へ」をクリック

### ステップ4: ビジネス情報を入力

1. **業種**を選択（例: 「小売」など）
2. **ビジネスの規模**を選択
3. **Google Analyticsの使用目的**を選択（必要に応じて）
4. 「作成」をクリック

### ステップ5: 利用規約に同意

1. 利用規約を確認
2. 必要に応じてチェックボックスを選択
3. 「同意する」をクリック

---

## 測定ID（GA ID）の取得

### ステップ1: データストリームを作成

1. Google Analyticsのホーム画面で「**管理**」（歯車アイコン）をクリック
2. 「**データストリーム**」をクリック
3. 「**ストリームを追加**」をクリック
4. 「**ウェブ**」を選択

### ステップ2: ウェブストリームの設定

1. **ウェブサイトのURL**を入力：`https://atapworks.co.jp`
2. **ストリーム名**を入力（例: `atapworks.co.jp`）
3. 「**ストリームを作成**」をクリック

### ステップ3: 測定IDを取得

1. 作成したストリームをクリック
2. **測定ID**が表示されます（`G-XXXXXXXXXX` の形式）
   - 例: `G-1234567890`
3. この測定IDをコピー

⚠️ **重要**: 測定IDは `G-` で始まる文字列です（例: `G-1234567890`）。

---

## Vercelの環境変数に設定

### ステップ1: Vercel Dashboardに移動

1. [Vercel Dashboard](https://vercel.com/dashboard) にログイン
2. プロジェクトを選択
3. 「Settings」タブをクリック
4. 左側のメニューから「Environment Variables」をクリック

### ステップ2: 環境変数を追加

1. 「Add New」をクリック
2. 以下の情報を入力：
   - **Key**: `NEXT_PUBLIC_GA_ID`
   - **Value**: コピーした測定ID（`G-XXXXXXXXXX` の形式）
     - 例: `G-1234567890`
   - **Environment**: 「Production」にチェック（必要に応じて「Preview」にもチェック）
3. 「Save」をクリック

### ステップ3: 再デプロイ

環境変数を追加した後、必ず再デプロイしてください：

1. Vercel Dashboard → 「Deployments」タブ
2. 最新のデプロイメントの「...」→「Redeploy」
3. 再デプロイが完了するのを待つ

---

## 確認方法

### ステップ1: サイトにアクセス

1. サイト（`https://atapworks.co.jp`）にアクセス
2. ページをいくつか閲覧

### ステップ2: Google Analyticsで確認

1. [Google Analytics](https://analytics.google.com/) にログイン
2. 左側のメニューから「**レポート**」→「**リアルタイム**」をクリック
3. 現在アクセスしているユーザーが表示されるか確認

**注意**: リアルタイムレポートに表示されるまで、数分かかる場合があります。

---

## Google Analyticsで確認できる情報

Google Analyticsを使用すると、以下の情報を確認できます：

- **リアルタイム**: 現在アクセスしているユーザー数
- **ユーザー**: 訪問者数、新規ユーザー、リピーター
- **集客**: どこからアクセスしているか（検索エンジン、直接アクセス、SNSなど）
- **エンゲージメント**: ページビュー数、セッション時間、離脱率
- **コンバージョン**: 目標達成数（例: 購入完了数）

---

## トラブルシューティング

### 問題1: 測定IDが取得できない

**原因**: データストリームが作成されていない

**解決方法**:
1. Google Analytics → 管理 → データストリーム
2. 「ストリームを追加」をクリック
3. ウェブストリームを作成
4. 測定IDを取得

### 問題2: データが表示されない

**確認事項**:
- ✅ `NEXT_PUBLIC_GA_ID` が正しく設定されているか
- ✅ 環境変数を変更した後、再デプロイしたか
- ✅ 測定IDの形式が正しいか（`G-XXXXXXXXXX` の形式）

**解決方法**:
1. Vercel Dashboard → Settings → Environment Variables で `NEXT_PUBLIC_GA_ID` を確認
2. 値が正しいか確認（`G-` で始まる形式）
3. 環境変数を変更した場合は、再デプロイ
4. ブラウザの開発者ツール（F12）→ Networkタブで、Google Analyticsへのリクエストが送信されているか確認

### 問題3: リアルタイムレポートに表示されない

**原因**: データの反映に時間がかかっている、または設定が間違っている

**解決方法**:
1. 数分待ってから再度確認
2. ブラウザの開発者ツール（F12）→ Consoleタブでエラーがないか確認
3. Networkタブで、Google Analyticsへのリクエストが送信されているか確認

---

## まとめ

### 設定手順のまとめ

1. **Google Analyticsアカウントを作成**（未作成の場合）
2. **データストリームを作成**
3. **測定ID（`G-XXXXXXXXXX`）を取得**
4. **Vercelの環境変数に設定**
   - Key: `NEXT_PUBLIC_GA_ID`
   - Value: 測定ID（`G-XXXXXXXXXX`）
5. **再デプロイ**
6. **Google Analyticsで確認**

---

## 参考リンク

- [Google Analytics公式サイト](https://analytics.google.com/)
- [Google Analyticsヘルプ](https://support.google.com/analytics)
- [Google Analytics 4（GA4）ドキュメント](https://developers.google.com/analytics/devguides/collection/ga4)

---

## 注意事項

- 測定IDは `G-` で始まる形式です（例: `G-1234567890`）
- 環境変数を変更した後は、必ず再デプロイしてください
- データの反映には数分かかる場合があります
- リアルタイムレポートで確認する場合は、サイトにアクセスしてから数分待ってください

