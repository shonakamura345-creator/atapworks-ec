import Image from "next/image";

export default function AboutSection() {
  return (
    <section id="about" className="bg-base py-24">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 lg:grid-cols-2 lg:gap-14">
        {/* 写真（登壇） */}
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[28px] shadow-soft-lg">
          <Image
            src="/about-talk.jpg"
            alt="Sho建築士 トークイベント登壇の様子"
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
            style={{ objectPosition: "50% 35%" }}
          />
        </div>

        {/* テキスト */}
        <div>
          <div className="eyebrow">ABOUT</div>
          <h2 className="font-head mt-3 text-3xl font-bold text-ink md:text-4xl">
            Sho建築士について
          </h2>
          <p className="mt-6 text-sm leading-relaxed text-ink-sub">
            中村奨。一級建築士／建築クリエイター。明治大学建築学科を卒業後、住宅メーカー・建設コンサルタント・工務店で設計と現場の両方を経験し、独立。設計者として培った専門性を土台に、現在はSNSで建築の面白さを発信し、建築解説動画は累計約8,000万回再生、著書『建物は物理学である』は第3刷を重ねています。
          </p>
          <p className="mt-4 text-sm leading-relaxed text-ink-sub">
            建築学生カフェTONKAN公式アンバサダー、小中高での出張授業、海外都市計画コンペ入選など、活動は世代も国境も越えて広がっています。根っこにあるのは、ひとつの願い——建築を、若い世代が憧れる場所にしたい。専門家にしか伝わらなかった建築の魅力を、もっと多くの人へ。その実現を、ともに進めてくれる仲間を探しています。
          </p>
        </div>
      </div>
    </section>
  );
}
