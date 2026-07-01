import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import GoogleAnalytics from "./components/GoogleAnalytics";

// 本文・見出し：Noto Sans JP（統一）/ 数字：Montserrat
const notoSansJP = Noto_Sans_JP({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-num",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Sho建築士 公式サイト | 建築を、動画・SNS・旅で伝える一級建築士",
  description:
    "一級建築士Sho建築士（中村奨）の公式サイト。建築動画の制作、企業SNS運用、建築ツアー、登壇・監修のご依頼はこちらから。TikTok累計約8,000万回再生・SNS総フォロワー15万人超。書籍『建物は物理学である』も販売中。",
  keywords:
    "Sho建築士, 中村奨, 一級建築士, 建築動画, SNS運用代行, 建築ツアー, 登壇, 建物は物理学である",
  openGraph: {
    title: "Sho建築士 公式サイト",
    description:
      "建築動画・SNS運用・建築ツアー・登壇のご依頼はこちら。誰もが憧れる建築業界を目指して。",
    type: "website",
    locale: "ja_JP",
    siteName: "Sho建築士",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sho建築士 公式サイト",
    description:
      "建築を、動画・SNS・旅で伝える一級建築士。仕事・コラボのご相談はこちらから。",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${notoSansJP.variable} ${montserrat.variable} antialiased`}
      >
        <GoogleAnalytics />
        <CartProvider>
          <Header />
          {children}
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
