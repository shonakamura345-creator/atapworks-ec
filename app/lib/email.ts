/**
 * 注文確認メールを送信する関数
 * Resendを使用してメールを送信します
 */

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
};

type ShippingInfo = {
  name: string;
  phone: string;
  postalCode: string;
  prefecture: string;
  city: string;
  address: string;
  building: string;
};

type SendOrderConfirmationEmailParams = {
  customerEmail: string;
  customerName: string;
  orderItems: OrderItem[];
  totalAmount: number;
  shippingInfo: ShippingInfo;
  orderId: string;
};

export async function sendOrderConfirmationEmail({
  customerEmail,
  customerName,
  orderItems,
  totalAmount,
  shippingInfo,
  orderId,
}: SendOrderConfirmationEmailParams) {
  // Resend APIキーが設定されていない場合は、コンソールにログを出力するだけ
  if (!process.env.RESEND_API_KEY) {
    console.error("⚠️ RESEND_API_KEYが設定されていません。メールは送信されません。");
    console.log("📧 メール送信（開発モード）:");
    console.log("送信先:", customerEmail);
    console.log("件名: ご注文ありがとうございます");
    console.log("注文ID:", orderId);
    return;
  }

  try {
    // Resendを動的にインポート（利用可能な場合のみ）
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 注文内容のHTMLを作成
    const itemsHtml = orderItems
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">¥${item.price.toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .order-info { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Sho建築士 オンラインストア</h1>
            </div>
            <div class="content">
              <p>${customerName} 様</p>
              <p>この度は、Sho建築士オンラインストアをご利用いただき、誠にありがとうございます。</p>
              
              <div class="order-info">
                <h2>ご注文内容</h2>
                <p><strong>注文番号:</strong> ${orderId.slice(-12)}</p>
                <p style="font-size: 11px; color: #888;">（注文ID: ${orderId}）</p>
                
                <table>
                  <thead>
                    <tr style="background-color: #f0f0f0;">
                      <th style="padding: 10px; text-align: left;">商品名</th>
                      <th style="padding: 10px; text-align: right;">数量</th>
                      <th style="padding: 10px; text-align: right;">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                
                <div class="total">
                  合計金額: ¥${totalAmount.toLocaleString()}
                </div>
              </div>
              
              <div class="order-info">
                <h2>配送先情報</h2>
                <p>
                  〒${shippingInfo.postalCode}<br>
                  ${shippingInfo.prefecture} ${shippingInfo.city} ${shippingInfo.address} ${shippingInfo.building}<br>
                  ${shippingInfo.name} 様<br>
                  TEL: ${shippingInfo.phone}
                </p>
              </div>
              
              <p>商品は2〜3日で発送いたします。</p>
              <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
              
              <p>今後ともよろしくお願いいたします。</p>
              <p>Sho建築士オンラインストア</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    console.log("📧 Resendでメールを送信します:");
    console.log("  From:", fromEmail);
    console.log("  To:", customerEmail);
    console.log("  Subject: ご注文ありがとうございます - Sho建築士オンラインストア");
    console.log("  RESEND_API_KEY:", process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : "未設定");
    console.log("  RESEND_FROM_EMAIL:", fromEmail);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: "ご注文ありがとうございます - Sho建築士オンラインストア",
      html,
    });

    if (error) {
      console.error("❌ Resendメール送信エラー:", JSON.stringify(error, null, 2));
      console.error("❌ エラーの種類:", error?.name || "不明");
      console.error("❌ エラーメッセージ:", error?.message || "不明");
      // エラーを再スローしない（Webhookを成功させるため）
      return;
    }

    console.log("✅ メール送信成功:", JSON.stringify(data, null, 2));
    console.log("✅ メールID:", data?.id || "不明");
  } catch (error: any) {
    console.error("❌ メール送信に失敗しました:", error?.message || error);
    console.error("エラー詳細:", JSON.stringify(error, null, 2));
    // メール送信に失敗しても注文処理は続行（エラーはログに記録される）
  }
}

/**
 * 管理者に注文通知メールを送信する関数
 */
type SendShippingNotificationEmailParams = {
  customerEmail: string;
  customerName: string;
  orderItems: OrderItem[];
  totalAmount: number;
  shippingInfo: ShippingInfo;
  orderId: string;
  trackingNumber: string;
  estimatedDeliveryDate: string;
  customMessage?: string;
};

/**
 * 発送完了メールを送信する関数
 */
export async function sendShippingNotificationEmail({
  customerEmail,
  customerName,
  orderItems,
  totalAmount,
  shippingInfo,
  orderId,
  trackingNumber,
  estimatedDeliveryDate,
  customMessage,
}: SendShippingNotificationEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.error("⚠️ RESEND_API_KEYが設定されていません。メールは送信されません。");
    console.log("📧 発送メール送信（開発モード）:");
    console.log("送信先:", customerEmail);
    console.log("件名: 商品を発送しました");
    console.log("注文ID:", orderId);
    console.log("追跡番号:", trackingNumber);
    return { success: false, error: "RESEND_API_KEY not configured" };
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    // 注文内容のHTMLを作成
    const itemsHtml = orderItems
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">¥${item.price.toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    // 日本郵便の追跡URLを生成
    const trackingUrl = `https://trackings.post.japanpost.jp/services/srv/search/?requestNo1=${trackingNumber}&search.x=0&search.y=0`;

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #1a1a1a; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .shipping-info { background-color: #e8f5e9; padding: 20px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #4caf50; }
            .order-info { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
            .tracking-button { display: inline-block; background-color: #4caf50; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 10px 0; }
            .custom-message { background-color: #fff3cd; padding: 15px; margin: 20px 0; border-radius: 8px; border-left: 4px solid #ffc107; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>📦 商品を発送しました</h1>
            </div>
            <div class="content">
              <p>${customerName} 様</p>
              <p>ご注文いただいた商品を発送いたしました。</p>
              
              <div class="shipping-info">
                <h2>📬 配送情報</h2>
                <p>
                  <strong>配送業者:</strong> 日本郵便<br>
                  <strong>追跡番号:</strong> ${trackingNumber}<br>
                  <strong>お届け予定日:</strong> ${estimatedDeliveryDate}
                </p>
                <p>
                  <a href="${trackingUrl}" class="tracking-button" target="_blank">
                    配送状況を確認する
                  </a>
                </p>
              </div>
              
              ${customMessage ? `
              <div class="custom-message">
                <p>${customMessage.replace(/\n/g, '<br>')}</p>
              </div>
              ` : ''}
              
              <div class="order-info">
                <h2>ご注文内容</h2>
                <p><strong>注文番号:</strong> ${orderId.slice(-12)}</p>
                <p style="font-size: 11px; color: #888;">（注文ID: ${orderId}）</p>
                
                <table>
                  <thead>
                    <tr style="background-color: #f0f0f0;">
                      <th style="padding: 10px; text-align: left;">商品名</th>
                      <th style="padding: 10px; text-align: right;">数量</th>
                      <th style="padding: 10px; text-align: right;">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                
                <div class="total">
                  合計金額: ¥${totalAmount.toLocaleString()}
                </div>
              </div>
              
              <div class="order-info">
                <h2>配送先</h2>
                <p>
                  〒${shippingInfo.postalCode}<br>
                  ${shippingInfo.prefecture} ${shippingInfo.city} ${shippingInfo.address} ${shippingInfo.building}<br>
                  ${shippingInfo.name} 様<br>
                  TEL: ${shippingInfo.phone}
                </p>
              </div>
              
              <p>ご不明な点がございましたら、お気軽にお問い合わせください。</p>
              <p>この度はご注文いただき、誠にありがとうございました。</p>
              
              <p>Sho建築士オンラインストア</p>
            </div>
          </div>
        </body>
      </html>
    `;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    console.log("📧 Resendで発送通知メールを送信します:");
    console.log("  From:", fromEmail);
    console.log("  To:", customerEmail);
    console.log("  Subject: 商品を発送しました - Sho建築士オンラインストア");
    console.log("  追跡番号:", trackingNumber);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: customerEmail,
      subject: "📦 商品を発送しました - Sho建築士オンラインストア",
      html,
    });

    if (error) {
      console.error("❌ Resend発送通知メール送信エラー:", JSON.stringify(error, null, 2));
      return { success: false, error: error.message };
    }

    console.log("✅ 発送通知メール送信成功:", JSON.stringify(data, null, 2));
    return { success: true, emailId: data?.id };
  } catch (error: any) {
    console.error("❌ 発送通知メール送信に失敗しました:", error?.message || error);
    return { success: false, error: error?.message || "Unknown error" };
  }
}

export async function sendAdminNotificationEmail({
  customerEmail,
  customerName,
  orderItems,
  totalAmount,
  shippingInfo,
  orderId,
}: SendOrderConfirmationEmailParams) {
  const adminEmail = process.env.ADMIN_EMAIL;
  
  if (!adminEmail) {
    console.log("⚠️ ADMIN_EMAILが設定されていません。管理者通知は送信されません。");
    return;
  }

  if (!process.env.RESEND_API_KEY) {
    console.error("⚠️ RESEND_API_KEYが設定されていません。管理者通知メールは送信されません。");
    console.log("📧 管理者通知メール（開発モード）:");
    console.log("送信先:", adminEmail);
    console.log("件名: 新しい注文が入りました");
    console.log("注文ID:", orderId);
    return;
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(process.env.RESEND_API_KEY);

    const itemsHtml = orderItems
      .map(
        (item) => `
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #eee;">${item.name}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">${item.quantity}</td>
        <td style="padding: 10px; border-bottom: 1px solid #eee; text-align: right;">¥${item.price.toLocaleString()}</td>
      </tr>
    `
      )
      .join("");

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background-color: #dc2626; color: white; padding: 20px; text-align: center; }
            .content { background-color: #f9f9f9; padding: 20px; }
            .order-info { background-color: white; padding: 20px; margin: 20px 0; border-radius: 8px; }
            table { width: 100%; border-collapse: collapse; margin: 20px 0; }
            .total { font-size: 18px; font-weight: bold; text-align: right; margin-top: 20px; }
            .alert { background-color: #fef3c7; border-left: 4px solid #f59e0b; padding: 15px; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🛒 新しい注文が入りました</h1>
            </div>
            <div class="content">
              <div class="alert">
                <strong>注文番号:</strong> ${orderId.slice(-12)}<br>
                <span style="font-size: 11px; color: #666;">注文ID: ${orderId}</span><br>
                <strong>注文日時:</strong> ${new Date().toLocaleString("ja-JP")}
              </div>
              
              <div class="order-info">
                <h2>お客様情報</h2>
                <p>
                  <strong>お名前:</strong> ${customerName} 様<br>
                  <strong>メールアドレス:</strong> ${customerEmail}
                </p>
              </div>
              
              <div class="order-info">
                <h2>注文内容</h2>
                <table>
                  <thead>
                    <tr style="background-color: #f0f0f0;">
                      <th style="padding: 10px; text-align: left;">商品名</th>
                      <th style="padding: 10px; text-align: right;">数量</th>
                      <th style="padding: 10px; text-align: right;">金額</th>
                    </tr>
                  </thead>
                  <tbody>
                    ${itemsHtml}
                  </tbody>
                </table>
                
                <div class="total">
                  合計金額: ¥${totalAmount.toLocaleString()}
                </div>
              </div>
              
              <div class="order-info">
                <h2>配送先情報</h2>
                <p>
                  〒${shippingInfo.postalCode}<br>
                  ${shippingInfo.prefecture} ${shippingInfo.city} ${shippingInfo.address} ${shippingInfo.building}<br>
                  ${shippingInfo.name} 様<br>
                  TEL: ${shippingInfo.phone}
                </p>
              </div>
              
              <p style="margin-top: 30px; padding-top: 20px; border-top: 2px solid #eee;">
                Stripe Dashboardで詳細を確認: <a href="https://dashboard.stripe.com/payments">https://dashboard.stripe.com/payments</a>
              </p>
            </div>
          </div>
        </body>
      </html>
    `;

    const fromEmail = process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev";
    console.log("📧 Resendで管理者通知メールを送信します:");
    console.log("  From:", fromEmail);
    console.log("  To:", adminEmail);
    console.log("  Subject: 🛒 新しい注文が入りました - 注文ID:", orderId);
    console.log("  RESEND_API_KEY:", process.env.RESEND_API_KEY ? `${process.env.RESEND_API_KEY.substring(0, 10)}...` : "未設定");
    console.log("  RESEND_FROM_EMAIL:", fromEmail);
    console.log("  ADMIN_EMAIL:", adminEmail);

    const { data, error } = await resend.emails.send({
      from: fromEmail,
      to: adminEmail,
      subject: `🛒 新しい注文が入りました - 注文ID: ${orderId}`,
      html,
    });

    if (error) {
      console.error("❌ Resend管理者通知メール送信エラー:", JSON.stringify(error, null, 2));
      console.error("❌ エラーの種類:", error?.name || "不明");
      console.error("❌ エラーメッセージ:", error?.message || "不明");
      // エラーを再スローしない（Webhookを成功させるため）
      return;
    }

    console.log("✅ 管理者通知メール送信成功:", JSON.stringify(data, null, 2));
    console.log("✅ メールID:", data?.id || "不明");
  } catch (error: any) {
    console.error("❌ 管理者通知メール送信に失敗しました:", error?.message || error);
    console.error("エラー詳細:", JSON.stringify(error, null, 2));
    // 管理者通知に失敗しても注文処理は続行（エラーはログに記録される）
  }
}


