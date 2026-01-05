# Vercel環境変数設定 - クイックスタート

## ✅ 両方設定が必要です

**例1（ADMIN_EMAIL）と例2（NEXT_PUBLIC_BASE_URL）の両方**を設定してください。

---

## 🚀 まず設定できる環境変数（すぐに設定可能）

以下の2つは、すぐに設定できます（サービスからキーを取得する必要がありません）：

### 1. ADMIN_EMAIL（例1）

**Key欄:**
```
ADMIN_EMAIL
```

**Value欄:**
```
info.shokenchikushi@gmail.com
```

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

### 2. NEXT_PUBLIC_BASE_URL（例2）

**Key欄:**
```
NEXT_PUBLIC_BASE_URL
```

**Value欄:**
```
https://atapworks.co.jp
```

**Environment:**
- ✅ Production
- ✅ Preview
- ✅ Development

→ 「Save」をクリック

---

## 📝 その後、取得が必要な環境変数

以下の環境変数は、各サービスのダッシュボードからキーを取得してから設定します：

3. NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY → Stripe Dashboardから取得
4. STRIPE_SECRET_KEY → Stripe Dashboardから取得
5. STRIPE_WEBHOOK_SECRET → Stripe Dashboardから取得
6. RESEND_API_KEY → Resend Dashboardから取得
7. RESEND_FROM_EMAIL → `info@atapworks.co.jp` または `onboarding@resend.dev`
8. NEXT_PUBLIC_GA_ID → Google Analyticsから取得（オプション）

---

## 💡 推奨の設定順序

1. **まず例1と例2を設定**（すぐにできる）
   - ADMIN_EMAIL
   - NEXT_PUBLIC_BASE_URL

2. **その後、StripeとResendのキーを取得して設定**
   - Stripe Dashboardからキーを取得
   - Resend Dashboardからキーを取得

3. **最後にGoogle Analytics（オプション）**
   - 設定する場合のみ

---

## ✅ チェックリスト

設定が完了したら、以下がすべてVercelの環境変数一覧に表示されているか確認してください：

- [ ] ADMIN_EMAIL
- [ ] NEXT_PUBLIC_BASE_URL
- [ ] NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- [ ] STRIPE_SECRET_KEY
- [ ] STRIPE_WEBHOOK_SECRET
- [ ] RESEND_API_KEY
- [ ] RESEND_FROM_EMAIL
- [ ] NEXT_PUBLIC_GA_ID（オプション）

