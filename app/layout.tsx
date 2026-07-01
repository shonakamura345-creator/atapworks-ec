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
  title: "Sho建築士 オンラインストア | 書籍『建物は物理学である』出版記念",
  description: "書籍『建物は物理学である』の出版記念特設サイト。建築と物理学の関係を深く探求した書籍とオリジナルグッズを販売。全国ツアースケジュールも掲載。",
  keywords: "建築, 物理学, 書籍, Sho建築士, 建物は物理学である, オンラインストア",
  openGraph: {
    title: "Sho建築士 オンラインストア",
    description: "書籍『建物は物理学である』の出版記念特設サイト",
    type: "website",
    locale: "ja_JP",
    siteName: "Sho建築士 オンラインストア",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sho建築士 オンラインストア",
    description: "書籍『建物は物理学である』の出版記念特設サイト",
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
