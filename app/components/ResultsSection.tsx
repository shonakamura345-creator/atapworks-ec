// 実績（代表作）セクション：YouTube Shorts を埋め込み
const videos = [
  { id: "pssPzyPad1U", caption: "ルイス・カーン「キンベル美術館」を訪ねて" },
  { id: "Qo5CfjO31BE", caption: "フランク・ゲーリーの建築を読み解く" },
  { id: "5El6b728B4Q", caption: "旧香川県立体育館（船の体育館）の解体" },
];

export default function ResultsSection() {
  return (
    <section id="results" className="bg-surface py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mb-12 md:flex md:items-end md:justify-between md:gap-6">
          <div>
            <div className="eyebrow">SELECTED WORK</div>
            <h2 className="font-head mt-3 text-3xl font-bold text-ink md:text-4xl">
              これまでの仕事
            </h2>
          </div>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ink-sub md:mt-0">
            実際の動画をそのまま掲載。バズ作・建築解説・保存活用の現場から、代表的なものをご紹介します。
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {videos.map((v) => (
            <div key={v.id} className="flex flex-col">
              <div className="overflow-hidden rounded-3xl bg-black shadow-soft">
                <iframe
                  className="block w-full"
                  style={{ aspectRatio: "9 / 16", border: 0 }}
                  src={`https://www.youtube.com/embed/${v.id}`}
                  title={v.caption}
                  loading="lazy"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <p className="mt-3 px-1 text-sm leading-relaxed text-ink-sub">
                {v.caption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
