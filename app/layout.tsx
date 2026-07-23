import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Montserrat } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { CartProvider } from "./contexts/CartContext";
import GoogleAnalytics from "./components/GoogleAnalytics";

const siteUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atapworks.co.jp";

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
  metadataBase: new URL(siteUrl),
  title: "Sho建築士 公式サイト | 建築を、動画・SNS・旅で伝える一級建築士",
  description:
    "一級建築士Sho建築士（中村奨）の公式サイト。建築動画の制作、企業SNS運用、建築ツアー、登壇・監修のご依頼はこちらから。TikTok累計約8,000万回再生・SNS総フォロワー15万人超。書籍『建物は物理学である』も販売中。",
  keywords:
    "Sho建築士, 中村奨, 一級建築士, 建築動画, SNS運用代行, 建築ツアー, 登壇, 建物は物理学である",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sho建築士 公式サイト",
    description:
      "建築動画・SNS運用・建築ツアー・登壇のご依頼はこちら。誰もが憧れる建築業界を目指して。",
    type: "website",
    locale: "ja_JP",
    url: siteUrl,
    siteName: "Sho建築士",
    images: [
      {
        url: "/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sho建築士（一級建築士 中村奨）",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sho建築士 公式サイト",
    description:
      "建築を、動画・SNS・旅で伝える一級建築士。仕事・コラボのご相談はこちらから。",
    images: ["/hero.jpg"],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

// 構造化データ（JSON-LD）: Person / Organization / WebSite / Book
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: "株式会社ATAP Works",
      legalName: "株式会社ATAP Works",
      alternateName: "Sho建築士オンラインストア",
      url: siteUrl,
      email: "info.shokenchikushi@gmail.com",
      description:
        "建築に関するメディアの企画・制作・運営（建築動画制作、企業SNS運用代行、建築ツアー、登壇・監修）を行う会社。",
      address: {
        "@type": "PostalAddress",
        postalCode: "150-0002",
        addressRegion: "東京都",
        addressLocality: "渋谷区",
        streetAddress: "渋谷2-19-19 ワコー宮益坂ビル5階",
        addressCountry: "JP",
      },
      founder: { "@id": `${siteUrl}/#person` },
      sameAs: [
        "https://www.youtube.com/@sho_kenchikushi",
        "https://www.tiktok.com/@kenchikushi_sho",
        "https://www.instagram.com/sho_kenchikushi/",
        "https://x.com/sho_kenchikushi",
        "https://voicy.jp/channel/3464",
      ],
    },
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "中村奨",
      alternateName: "Sho建築士",
      jobTitle: "一級建築士",
      url: siteUrl,
      image: `${siteUrl}/hero.jpg`,
      worksFor: { "@id": `${siteUrl}/#organization` },
      knowsAbout: ["建築", "建築設計", "建築動画", "SNS運用", "都市開発", "建築ツアー"],
      sameAs: [
        "https://www.youtube.com/@sho_kenchikushi",
        "https://www.tiktok.com/@kenchikushi_sho",
        "https://www.instagram.com/sho_kenchikushi/",
        "https://x.com/sho_kenchikushi",
        "https://voicy.jp/channel/3464",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Sho建築士 公式サイト",
      inLanguage: "ja",
      publisher: { "@id": `${siteUrl}/#organization` },
    },
    {
      "@type": "Book",
      name: "建物は物理学である",
      author: { "@id": `${siteUrl}/#person` },
      inLanguage: "ja",
    },
  ],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
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
