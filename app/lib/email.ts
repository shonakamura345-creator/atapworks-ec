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
                <p><strong>注文ID:</strong> ${orderId}</p>
                
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

    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL || "onboarding@resend.dev",
      to: customerEmail,
      subject: "ご注文ありがとうございます - Sho建築士オンラインストア",
      html,
    });

    if (error) {
      console.error("メール送信エラー:", error);
      throw error;
    }

    console.log("✅ メール送信成功:", data);
  } catch (error) {
    console.error("メール送信に失敗しました:", error);
    // メール送信に失敗しても注文処理は続行
  }
}


