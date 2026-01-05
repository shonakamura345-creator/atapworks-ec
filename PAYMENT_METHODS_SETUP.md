# 決済方法追加の設定手順

## 実装完了

コード側の実装は完了しました。以下の決済方法が利用可能になります：

1. ✅ **クレジットカード決済** (`card`)
2. ✅ **PayPay決済** (`link`)
3. ✅ **Apple Pay / Google Pay** (`link`経由)
4. ✅ **コンビニ決済** (`customer_balance` - konbini)
5. ✅ **銀行振込** (`customer_balance` - bank_transfer)

## Stripe Dashboardでの設定が必要

コードの実装だけでは、コンビニ決済と銀行振込が表示されない場合があります。
Stripe Dashboardで以下の設定が必要です：

### 1. Stripe Dashboardにログイン
- https://dashboard.stripe.com にアクセス
- 本番モード（Live Mode）で作業していることを確認

### 2. コンビニ決済の有効化

1. **Settings（設定）** → **Payment methods（支払い方法）** に移動
2. **Customer balance** を探す
3. **Konbini** を有効化
4. 必要に応じて、利用可能なコンビニを選択：
   - セブンイレブン
   - ファミリーマート
   - ローソン
   - セイコーマート
   - ミニストップ

### 3. 銀行振込の有効化

1. 同じ **Payment methods（支払い方法）** 画面で
2. **Customer balance** の中の **Bank transfer** を有効化
3. 必要に応じて、銀行を選択

### 4. 設定の保存

設定を保存すると、次回のCheckout Sessionから反映されます。

## 確認方法

1. テスト購入を実行
2. Stripe Checkout画面で、以下の決済方法が表示されることを確認：
   - クレジットカード
   - PayPay
   - Apple Pay / Google Pay（対応デバイスの場合）
   - コンビニ決済（設定後）
   - 銀行振込（設定後）

## 注意事項

- **コンビニ決済**: 支払期限が設定されます（通常7日間）
- **銀行振込**: 入金確認まで時間がかかる場合があります
- **PayPay**: Stripe Link経由で利用可能（設定は不要）
- **Apple Pay / Google Pay**: 対応デバイスでのみ表示

## トラブルシューティング

もし決済方法が表示されない場合：

1. **Stripe Dashboardで有効化されているか確認**
   - Settings → Payment methods
   - Customer balance → Konbini / Bank transfer

2. **本番モード（Live Mode）で設定しているか確認**
   - テストモードと本番モードの設定は別です

3. **再デプロイ**
   - コードを変更した場合は、再デプロイが必要です

4. **ブラウザキャッシュをクリア**
   - 古いCheckout Sessionが残っている可能性があります

