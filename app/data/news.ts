export type NewsItem = {
  id: string;
  date: string; // YYYY-MM-DD形式
  title: string;
  content: string;
  category?: "重要" | "お知らせ" | "更新";
  link?: string; // オプショナルなリンクURL
  linkLabel?: string; // リンクのラベル（デフォルト: "詳細はこちら"）
};

export const newsItems: NewsItem[] = [
  {
    id: "reprint3-2026-01-27",
    date: "2026-01-27",
    title: "書籍第3刷決定",
    content: "1月27日第3刷決定",
    category: "お知らせ",
  },
  {
    id: "kindle-2026-01-22",
    date: "2026-01-22",
    title: "Kindle版販売開始",
    content: "",
    category: "お知らせ",
    link: "https://www.amazon.co.jp/%E5%BB%BA%E7%89%A9%E3%81%AF%E7%89%A9%E7%90%86%E5%AD%A6%E3%81%A7%E3%81%82%E3%82%8B-Sho%E5%BB%BA%E7%AF%89%E5%A3%AB-ebook/dp/B0GGX99B3T/ref=tmm_kin_swatch_0",
    linkLabel: "Amazonで購入",
  },
  {
    id: "event-2026-01-09",
    date: "2026-01-09",
    title: "書店での出版イベントの詳細が決定しました。",
    content: "",
    category: "お知らせ",
    link: "https://store.kinokuniya.co.jp/event/1767864970/",
    linkLabel: "詳細はこちら",
  },
  {
    id: "reprint2-2026-01-05",
    date: "2026-01-05",
    title: "書籍第2刷決定",
    content: "1月5日第2刷決定",
    category: "お知らせ",
  },
  // 今後、ページ更新情報などを追加していきます
];

// 日付順（新しい順）でソート
export function getSortedNews(): NewsItem[] {
  return [...newsItems].sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

