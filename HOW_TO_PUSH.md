# GitHubにプッシュする方法（詳細手順）

## プッシュとは

「プッシュ」とは、ローカル（あなたのMac）の変更をGitHubにアップロードすることです。

---

## 手順

### ステップ1: ターミナルを開く

1. Macの「**ターミナル**」アプリを開きます
   - アプリケーション → ユーティリティ → ターミナル
   - または、Spotlight検索（⌘ + スペース）で「ターミナル」と入力

### ステップ2: プロジェクトディレクトリに移動

以下のコマンドをコピーして、ターミナルに貼り付け、Enterキーを押します：

```bash
cd /Users/shonakamura/atapworks-store
```

### ステップ3: プッシュコマンドを実行

以下のコマンドをコピーして、ターミナルに貼り付け、Enterキーを押します：

```bash
git push origin main
```

**注意**: GitHubの認証情報を求められた場合：
- Username: `shonakamura345-creator`
- Password: Personal Access Token（以前作成したもの）

### ステップ4: 完了を確認

プッシュが成功すると、以下のようなメッセージが表示されます：

```
Enumerating objects: XX, done.
Counting objects: 100% (XX/XX), done.
Delta compression using up to 8 threads
Compressing objects: 100% (XX/XX), done.
Writing objects: 100% (XX/XX), XX bytes | XX.XX KiB/s, done.
Total XX (delta XX), reused 0 (delta 0), pack-reused 0
To https://github.com/shonakamura345-creator/atapworks-ec.git
   [コミットID]..[コミットID]  main -> main
```

---

## エラーが出た場合

### エラー: "Authentication failed"

**原因**: GitHubの認証情報が間違っている

**解決方法**: 
1. Personal Access Tokenを再確認
2. 正しいトークンを入力

### エラー: "Push cannot contain secrets"

**原因**: GitHubのPush Protectionがブロックしている

**解決方法**: 
1. GitHubのリンクから「Allow」をクリック
2. 再度 `git push origin main` を実行

### エラー: "Unable to push"

**原因**: ネットワークエラーや権限の問題

**解決方法**: 
1. インターネット接続を確認
2. 再度 `git push origin main` を実行

---

## まとめ

1. **ターミナルを開く**
2. **`cd /Users/shonakamura/atapworks-store`** を実行
3. **`git push origin main`** を実行
4. **認証情報を入力**（求められた場合）
5. **完了を確認**

これで完了です！

