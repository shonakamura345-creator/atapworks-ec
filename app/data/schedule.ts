export type ScheduleItem = {
  id: string;
  date: string; // YYYY-MM-DD（ソート用）
  dateLabel: string; // 表示用 "2026.02.16 MON"
  location: string;
  venue?: string;
  detailLink?: string;
  /** 申し込みフォームのURL */
  registrationLink?: string;
  /** 終了したイベントの活動報告noteのURL */
  noteLink?: string;
  /** 日程が複数の場合の表示（例: "or 2026.04.5 SUN"） */
  dateLabelSub?: string;
  /** 終了済みイベントか */
  isPast?: boolean;
  /** 延期 */
  isPostponed?: boolean;
};

export const scheduleItems: ScheduleItem[] = [
  {
    id: "2026-02-16-tokyo",
    date: "2026-02-16",
    dateLabel: "2026.02.16 MON",
    location: "東京",
    venue: "紀伊國屋 新宿本店",
    detailLink: "https://store.kinokuniya.co.jp/event/1767864970/",
    // noteLink: "https://note.com/xxx/xxx", // 活動報告noteのURLを追加すると「活動報告はこちら」が表示されます
    isPast: true,
  },
  {
    id: "2026-03-07-hokkaido",
    date: "2026-03-07",
    dateLabel: "2026.03.7 SAT",
    location: "北海道",
    venue: "札幌",
    isPast: true,
  },
  {
    id: "2026-03-20-yokohama",
    date: "2026-03-20",
    dateLabel: "2026.03.20 FRI",
    location: "横浜",
    venue: "希望が丘",
    isPast: true,
  },
  {
    id: "2026-03-21-aichi",
    date: "2026-03-21",
    dateLabel: "2026.03.21 SAT",
    location: "愛知",
    venue: "名古屋",
    isPast: true,
  },
  {
    id: "2026-03-22-tokyo",
    date: "2026-03-22",
    dateLabel: "2026.03.22 SUN",
    location: "東京",
    venue: "御茶ノ水",
    isPostponed: true,
  },
  {
    id: "2026-03-28-miyagi",
    date: "2026-03-28",
    dateLabel: "2026.03.28 SAT",
    location: "宮城",
    venue: "仙台",
    detailLink: "https://www.instagram.com/p/DU5rd_Jknkz/",
    isPast: true,
  },
  {
    id: "2026-04-05-akita",
    date: "2026-04-05",
    dateLabel: "2026.04.5 SUN",
    location: "秋田",
    isPostponed: true,
  },
  {
    id: "2026-04-11-fukuoka",
    date: "2026-04-11",
    dateLabel: "2026.04.11 SAT",
    location: "福岡",
    venue: "赤坂",
    isPast: true,
  },
  {
    id: "2026-04-18-chiba",
    date: "2026-04-18",
    dateLabel: "2026.04.18 SAT",
    location: "千葉",
    venue: "千葉駅",
    isPast: true,
  },
  {
    id: "2026-04-20-fukushima",
    date: "2026-04-20",
    dateLabel: "2026.04.20 MON",
    location: "福島",
    venue: "郡山",
    isPast: true,
  },
  {
    id: "2026-04-25-okayama",
    date: "2026-04-25",
    dateLabel: "2026.04.25 SAT",
    location: "岡山",
    isPast: true,
  },
  {
    id: "2026-04-26-hiroshima",
    date: "2026-04-26",
    dateLabel: "2026.04.26 SUN",
    location: "広島",
    isPast: true,
  },
  {
    id: "2026-05-17-tokyo",
    date: "2026-05-17",
    dateLabel: "2026.05.17 SUN",
    location: "東京",
    venue: "立川",
    detailLink: "https://www.instagram.com/p/DXd-aTSDmr2/",
    registrationLink: "https://docs.google.com/forms/d/e/1FAIpQLSf9cxr4i-mVFzp04F2nQMKc6nYKqij2wDSdUO4lzrXMldcXsQ/viewform",
  },
  {
    id: "2026-06-07-osaka",
    date: "2026-06-07",
    dateLabel: "2026.06.7 SUN",
    location: "大阪",
    venue: "心斎橋",
  },
];

/** 今後のイベント（終了していないもの） */
export function getUpcomingSchedule(): ScheduleItem[] {
  return scheduleItems.filter((item) => !item.isPast);
}

/** 終了したイベント */
export function getPastSchedule(): ScheduleItem[] {
  return scheduleItems.filter((item) => item.isPast);
}
