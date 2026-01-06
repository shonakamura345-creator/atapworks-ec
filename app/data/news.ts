export type NewsItem = {
  id: string;
  date: string; // YYYY-MM-DD形式
  title: string;
  content: string;
  category?: "重要" | "お知らせ" | "更新";
};

export const newsItems: NewsItem[] = [
  {
    id: "reprint-2026-01-05",
    date: "2026-01-05",
    title: "書籍増刷決定",
    content: "1月5日増刷決定",
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

