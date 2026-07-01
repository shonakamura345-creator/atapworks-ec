import { NextRequest, NextResponse } from "next/server";
import { sendContactInquiryEmail } from "@/app/lib/email";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, company, email, message } = body ?? {};

    // 必須項目チェック
    if (!name || !email) {
      return NextResponse.json(
        { error: "お名前とメールアドレスは必須です。" },
        { status: 400 }
      );
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(String(email))) {
      return NextResponse.json(
        { error: "メールアドレスの形式が正しくありません。" },
        { status: 400 }
      );
    }

    const result = await sendContactInquiryEmail({
      inquiryType: String(inquiryType || "その他"),
      name: String(name),
      company: company ? String(company) : undefined,
      email: String(email),
      message: message ? String(message) : undefined,
    });

    if (!result.success) {
      return NextResponse.json(
        { error: "送信に失敗しました。時間をおいて再度お試しください。" },
        { status: 500 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("お問い合わせAPIエラー:", error instanceof Error ? error.message : error);
    return NextResponse.json(
      { error: "送信に失敗しました。時間をおいて再度お試しください。" },
      { status: 500 }
    );
  }
}
