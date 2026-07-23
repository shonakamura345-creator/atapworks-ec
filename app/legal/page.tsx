import type { Metadata } from "next";
import LegalContent from "./LegalContent";

export const metadata: Metadata = {
  title: "特定商取引法に基づく表記 | Sho建築士 公式サイト",
  description:
    "株式会社ATAP Works が運営する「Sho建築士」オンラインストアの特定商取引法に基づく表記。販売事業者・運営責任者・所在地・支払い方法・返品についてご案内します。",
  alternates: {
    canonical: "/legal",
  },
};

export default function LegalPage() {
  return <LegalContent />;
}
