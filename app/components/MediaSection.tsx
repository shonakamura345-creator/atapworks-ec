// 発信チャンネルのハブ
const channels = [
  {
    label: "YOUTUBE",
    name: "Sho建築士",
    note: "建築解説のロング動画",
    url: "https://www.youtube.com/@sho_kenchikushi",
  },
  {
    label: "INSTAGRAM",
    name: "リール / 投稿",
    note: "建築ショート動画の本拠地",
    url: "https://www.instagram.com/sho_kenchikushi/",
  },
  {
    label: "VOICY",
    name: "音声ラジオ",
    note: "建築業界の働き方・裏話を毎日",
    url: "https://voicy.jp/channel/3464",
  },
  {
    label: "TIKTOK",
    name: "ショート動画",
    note: "建築解説 累計約8,000万回再生",
    url: "https://www.tiktok.com/@kenchikushi_sho",
  },
  {
    label: "X (Twitter)",
    name: "@sho_kenchikushi",
    note: "日々の発信・お知らせ",
    url: "https://x.com/sho_kenchikushi",
  },
  {
    label: "公式LINE",
    name: "最新情報を受け取る",
    note: "イベント・近くの開催を通知",
    url: "https://lin.ee/nnqRfjX",
  },
];

export default function MediaSection() {
  return (
    <section id="media" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 md:flex md:items-end md:justify-between md:gap-6">
          <div>
            <div className="eyebrow">MEDIA</div>
            <h2 className="font-head mt-3 text-3xl font-bold text-ink md:text-4xl">
              発信チャンネル
            </h2>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-sub md:mt-0">
            建築の面白さを、毎日それぞれの場所で届けています。気になる入口からどうぞ。
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {channels.map((c) => (
            <a
              key={c.label}
              href={c.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-2xl border-soft bg-surface p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-soft-md"
            >
              <div className="font-num text-xs font-bold tracking-[0.12em] text-ocean">
                {c.label}
              </div>
              <h3 className="font-head mt-1.5 text-base font-bold text-ink">
                {c.name}
              </h3>
              <p className="mt-1 text-sm text-ink-sub">{c.note}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
