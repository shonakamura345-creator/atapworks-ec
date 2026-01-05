# RESEND_FROM_EMAIL の選択肢

## 現在の設定

`RESEND_FROM_EMAIL` = `onboarding@resend.dev`（Resendのデフォルトドメイン）

---

## 選択肢

### オプション1: デフォルトドメインをそのまま使う（簡単・すぐ使える）

**現在の設定**: `onboarding@resend.dev`

**メリット**:
- ✅ すぐに使える（追加の設定不要）
- ✅ DNS設定が不要
- ✅ 検証作業が不要

**デメリット**:
- ❌ `resend.dev` ドメインからメールが送信される（プロフェッショナルではない印象）
- ❌ 送信量に制限がある場合がある
- ❌ ブランドイメージが弱い

**推奨度**: ⭐⭐⭐（動作はするが、本番環境では推奨しない）

---

### オプション2: カスタムドメイン（`atapworks.co.jp`）を使う（推奨）

**推奨設定**: `info@atapworks.co.jp` など

**メリット**:
- ✅ プロフェッショナルな印象（独自ドメインからメールが送信される）
- ✅ ブランドイメージが向上
- ✅ 送信量の制限が緩和される場合がある
- ✅ 顧客からの信頼性が向上

**デメリット**:
- ❌ DNS設定が必要（10-30分程度の作業）
- ❌ ドメインの検証が必要

**推奨度**: ⭐⭐⭐⭐⭐（本番環境では強く推奨）

---

## 推奨事項

**本番環境で運用する予定なら、カスタムドメイン（`atapworks.co.jp`）を使うことを強く推奨します。**

理由：
1. **プロフェッショナル**: 独自ドメインからメールが送信されることで、ブランドイメージが向上
2. **信頼性**: 顧客からの信頼性が向上
3. **送信量**: 送信量の制限が緩和される場合がある

ただし、すぐに動作確認したい場合は、デフォルトドメイン（`onboarding@resend.dev`）のままでも問題ありません。

---

## カスタムドメインを設定する手順

### ステップ1: Resend Dashboardでドメインを追加

1. [Resend Dashboard](https://resend.com/domains) にログイン
2. 左側のメニューから「**Domains**」をクリック
3. 「**Add Domain**」ボタンをクリック
4. ドメイン名を入力：`atapworks.co.jp`
5. 「**Add**」をクリック

### ステップ2: DNSレコードを確認

Resendが提供するDNSレコードを確認：

1. **SPFレコード**
   - タイプ: TXT
   - 名前: `@` または `atapworks.co.jp`
   - 値: `v=spf1 include:resend.com ~all`

2. **DKIMレコード**
   - タイプ: TXT
   - 名前: `resend._domainkey` または `resend._domainkey.atapworks.co.jp`
   - 値: Resendが提供する長い文字列

3. **DMARCレコード**（オプション）
   - タイプ: TXT
   - 名前: `_dmarc` または `_dmarc.atapworks.co.jp`
   - 値: `v=DMARC1; p=none;`

### ステップ3: DNS設定にレコードを追加

1. ドメイン管理画面にログイン（例: お名前.com、ムームードメインなど）
2. DNS設定を開く
3. Resendが提供するレコードを追加：
   - SPFレコード
   - DKIMレコード
   - DMARCレコード（オプション）

### ステップ4: DNSレコードの反映を待つ

DNSレコードの反映には、通常、数分から数時間かかります。

### ステップ5: ドメインを検証

1. Resend Dashboard → Domains → `atapworks.co.jp` をクリック
2. 「**Verify**」ボタンをクリック
3. 検証が完了するのを待つ（通常、数分）

### ステップ6: Vercelの環境変数を更新

1. Vercel Dashboard → Settings → Environment Variables
2. `RESEND_FROM_EMAIL` を選択
3. Valueを `info@atapworks.co.jp` などに変更
4. Save
5. 再デプロイ

---

## デフォルトドメインをそのまま使う場合

現在の設定（`onboarding@resend.dev`）のままで問題ありません。

**確認事項**:
- ✅ Vercel Dashboard → Settings → Environment Variables → `RESEND_FROM_EMAIL` = `onboarding@resend.dev` になっているか確認
- ✅ 環境変数を変更した後、再デプロイしたか確認

---

## まとめ

### すぐに動作確認したい場合

- ✅ デフォルトドメイン（`onboarding@resend.dev`）のまま使用
- ✅ 追加の設定不要
- ✅ すぐにテスト可能

### 本番環境で運用する場合（推奨）

- ✅ カスタムドメイン（`atapworks.co.jp`）を設定
- ✅ DNS設定が必要（10-30分程度）
- ✅ プロフェッショナルな印象

---

## 推奨される手順

1. **まず、デフォルトドメイン（`onboarding@resend.dev`）で動作確認**
   - メール送信が正常に動作するか確認
   - 注文完了画面が表示されるか確認

2. **動作確認が完了したら、カスタムドメイン（`atapworks.co.jp`）を設定**
   - DNS設定を追加
   - ドメインを検証
   - `RESEND_FROM_EMAIL` を更新

この手順で、まず動作確認をしてから、プロフェッショナルな設定に移行できます。

