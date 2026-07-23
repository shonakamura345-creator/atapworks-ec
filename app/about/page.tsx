import type { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "会社情報 | 株式会社ATAP Works（Sho建築士）",
  description:
    "株式会社ATAP Works（屋号：Sho建築士オンラインストア）の会社情報。代表者・所在地・事業内容をご案内します。一級建築士Sho建築士（中村奨）が運営。",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
