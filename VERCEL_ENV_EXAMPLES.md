# Vercel環境変数設定の具体例

## Vercelの環境変数設定画面の入力欄

Vercelの環境変数設定画面には、以下の入力欄があります：

- **Key**: 環境変数名（変数の名前）
- **Value**: 環境変数の値（実際の値）
- **Environment**: どの環境で使用するか（Production, Preview, Development）

---

## 設定例（1つずつ追加）

### 例1: ADMIN_EMAIL

**Key欄に入力:**
```
ADMIN_EMAIL
```

**Value欄に入力:**
```
info.shokenchikushi@gmail.com
```

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

### 例2: NEXT_PUBLIC_BASE_URL

**Key欄に入力:**
```
NEXT_PUBLIC_BASE_URL
```

**Value欄に入力:**
```
https://atapworks.co.jp
```

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

### 例3: NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY

**Key欄に入力:**
```
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
```

**Value欄に入力:**
```
pk_live_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```
（実際にStripe Dashboardからコピーした値）

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

### 例4: STRIPE_SECRET_KEY

**Key欄に入力:**
```
STRIPE_SECRET_KEY
```

**Value欄に入力:**
```
sk_live_51...（実際にStripe Dashboardからコピーした値）
```
⚠️ **注意**: 実際のキーは `sk_live_` で始まる長い文字列です。ここには実際のキーを貼り付けないでください。

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

### 例5: STRIPE_WEBHOOK_SECRET

**Key欄に入力:**
```
STRIPE_WEBHOOK_SECRET
```

**Value欄に入力:**
```
whsec_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```
（実際にStripe Dashboardからコピーした値）

**Environment:**
- ✅ Production（本番環境のみでOK）

→ 「Save」をクリック

---

### 例6: RESEND_API_KEY

**Key欄に入力:**
```
RESEND_API_KEY
```

**Value欄に入力:**
```
re_1234567890abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ
```
（実際にResend Dashboardからコピーした値）

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

### 例7: RESEND_FROM_EMAIL

**Key欄に入力:**
```
RESEND_FROM_EMAIL
```

**Value欄に入力:**
```
info@atapworks.co.jp
```
または
```
onboarding@resend.dev
```
（ドメイン認証をしていない場合は `onboarding@resend.dev`）

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

### 例8: NEXT_PUBLIC_GA_ID（オプション）

**Key欄に入力:**
```
NEXT_PUBLIC_GA_ID
```

**Value欄に入力:**
```
G-1234567890
```
（実際にGoogle Analyticsからコピーした値）

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

## 📋 設定の順番

1つずつ追加していきます：

1. ✅ ADMIN_EMAIL → `info.shokenchikushi@gmail.com`
2. ✅ NEXT_PUBLIC_BASE_URL → `https://atapworks.co.jp`
3. ⏳ NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY → Stripe Dashboardから取得
4. ⏳ STRIPE_SECRET_KEY → Stripe Dashboardから取得
5. ⏳ STRIPE_WEBHOOK_SECRET → Stripe Dashboardから取得
6. ⏳ RESEND_API_KEY → Resend Dashboardから取得
7. ⏳ RESEND_FROM_EMAIL → `info@atapworks.co.jp` または `onboarding@resend.dev`
8. ⏳ NEXT_PUBLIC_GA_ID → Google Analyticsから取得（オプション）

---

## ⚠️ 注意事項

### Key欄について
- **大文字小文字を正確に**入力してください
- アンダースコア（`_`）も正確に入力してください
- 例: `ADMIN_EMAIL`（正しい） / `admin_email`（間違い）

### Value欄について
- **引用符（`"`や`'`）は不要**です。値だけを入力してください
- スペースや改行が入らないように注意してください
- 例: `info.shokenchikushi@gmail.com`（正しい） / `"info.shokenchikushi@gmail.com"`（間違い）

### Environmentについて
- 通常はすべてにチェックを入れます
- `STRIPE_WEBHOOK_SECRET`は本番環境のみでOKです

---

## 💡 ヒント

- 1つずつ追加して「Save」をクリックするのが確実です
- すべて追加したら、一覧で確認してください
- 間違えた場合は、右側の「...」メニューから削除・編集できます

