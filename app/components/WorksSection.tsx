import Link from "next/link";
import Image from "next/image";
import { workServices } from "../data/works";

// 実績の数字（社会的証明）
const stats: { num: string; label: string; href?: string }[] = [
  { num: "約8,000万", label: "TikTok建築解説 累計再生数" },
  { num: "15万超", label: "SNS総フォロワー数" },
  { num: "5,500部", label: "著書『建物は物理学である』（第3刷）" },
  { num: "40件超", label: "企業・自治体タイアップ実績" },
  { num: "15回超", label: "建築ツアー・ウォーク主催" },
  {
    num: "14拠点",
    label: "建築学生コミュニティ「TONKAN」新規立ち上げ参画",
    href: "https://const-career.com/tonkan/",
  },
];

export default function WorksSection() {
  return (
    <section id="works" className="bg-base py-24">
      <div className="mx-auto max-w-6xl px-6">
        {/* 数字（社会的証明） */}
        <p className="text-center text-sm text-ink-sub mb-5">
          「建築は、伝え方次第でもっと多くの人に届く」——その手応えを、数字でお見せします。
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-20">
          {stats.map((s) => {
            const inner = (
              <>
                <div className="font-num text-ocean text-4xl font-bold leading-none">
                  {s.num}
                </div>
                <div className="text-xs text-ink-sub mt-3">{s.label}</div>
              </>
            );
            const cardClass =
              "bg-surface border-soft shadow-soft rounded-2xl px-6 py-8 text-center";
            return s.href ? (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`${cardClass} transition-all hover:-translate-y-0.5 hover:shadow-soft-lg`}
              >
                {inner}
              </a>
            ) : (
              <div key={s.label} className={cardClass}>
                {inner}
              </div>
            );
          })}
        </div>

        {/* 見出し */}
        <div className="mb-12 md:flex md:items-end md:justify-between gap-6">
          <div>
            <div className="eyebrow">WORKS</div>
            <h2 className="font-head text-3xl md:text-4xl font-bold text-ink mt-3">
              ご依頼いただけること
            </h2>
          </div>
          <p className="text-sm text-ink-sub max-w-md mt-4 md:mt-0 leading-relaxed">
            「建築の魅力を、もっと多くの人に届けたい」。その課題に、企画から制作・発信まで伴走します。料金は個別見積もりのため、まずはご相談ください。
          </p>
        </div>

        {/* 4サービス */}
        <div className="grid gap-6 md:grid-cols-2">
          {workServices.map((w) => (
            <Link
              key={w.id}
              href="#contact"
              className="group flex flex-col overflow-hidden rounded-3xl bg-surface border-soft shadow-soft transition-all hover:-translate-y-1 hover:shadow-soft-lg"
            >
              {w.video ? (
                <div className="relative aspect-[16/8] w-full overflow-hidden">
                  <div
                    aria-hidden
                    className="absolute inset-0 scale-125 bg-cover bg-center blur-xl"
                    style={{ backgroundImage: `url(${w.poster})` }}
                  />
                  <video
                    src={w.video}
                    poster={w.poster}
                    autoPlay
                    muted
                    loop
                    playsInline
                    aria-label={w.imageAlt}
                    className="relative z-10 mx-auto h-full w-auto"
                  />
                </div>
              ) : w.image ? (
                <div className="relative aspect-[16/8] w-full overflow-hidden">
                  <Image
                    src={w.image}
                    alt={w.imageAlt ?? w.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                    style={{ objectPosition: w.imagePosition }}
                  />
                </div>
              ) : null}
              <div className="flex flex-1 flex-col p-8">
                <div className="font-num text-ocean text-lg font-bold">{w.no}</div>
                <h3 className="font-head mt-2 text-xl font-bold text-ink">
                  {w.title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-ink-sub">
                  {w.description}
                </p>
                <div className="mt-5 rounded-r-xl border-l-2 border-ocean bg-base px-4 py-2.5 text-xs leading-relaxed text-ink">
                  <span className="font-semibold text-ocean">実績：</span>
                  {w.proof}
                </div>
                <div className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-ocean">
                  {w.cta}
                  <span className="transition-transform group-hover:translate-x-1" aria-hidden>
                    →
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
