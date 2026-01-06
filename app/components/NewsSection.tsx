"use client";

import { getSortedNews } from "../data/news";

export default function NewsSection() {
  const news = getSortedNews();

  if (news.length === 0) {
    return null;
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
  };

  const getCategoryColor = (category?: string) => {
    switch (category) {
      case "重要":
        return "bg-red-100 text-red-800 border-red-200";
      case "お知らせ":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "更新":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-slate-100 text-slate-800 border-slate-200";
    }
  };

  return (
    <section id="news" className="bg-slate-50 py-8 border-b border-slate-200">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex items-center gap-3 mb-4">
          <h2 className="text-xl font-bold text-slate-900">NEWS</h2>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>
        <div className="space-y-3">
          {news.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg border border-slate-200 p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0">
                  <div className="text-sm font-semibold text-slate-600">
                    {formatDate(item.date)}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    {item.category && (
                      <span
                        className={`inline-block px-2 py-0.5 text-xs font-semibold rounded border ${getCategoryColor(
                          item.category
                        )}`}
                      >
                        {item.category}
                      </span>
                    )}
                    <h3 className="text-base font-semibold text-slate-900">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-sm text-slate-600">{item.content}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

