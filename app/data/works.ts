// 仕事・コラボの依頼メニュー（WORKSセクション用）
// 料金は出さず、すべて「まず相談」へ集約する方針

export type WorkService = {
  id: string;
  no: string;
  title: string;
  description: string;
  cta: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  video?: string;
  poster?: string;
  proof: string;
};

export const workServices: WorkService[] = [
  {
    id: "video",
    no: "01",
    title: "建築動画の企画・制作・出演",
    description:
      "建築ショート／ロング動画を、企画から撮影・本人出演まで一貫して制作。Sho建築士の自アカウントでの発信も含め、施設や建物の魅力を「見られる」コンテンツに変えます。",
    cta: "この内容で相談する",
    video: "/works/video-loop.mp4",
    poster: "/works/video-poster.jpg",
    imageAlt: "建築ショート動画（ネパールに集会所を作る）",
    proof: "企業・自治体タイアップ 40件以上",
  },
  {
    id: "sns",
    no: "02",
    title: "企業・ブランドのSNS運用伴走",
    description:
      "建築・住宅・施設に関わる企業SNSを、戦略設計から日々の運用までサポート。「何を、どう発信すれば伝わるか」を、建築の現場と発信の両方を知る視点で組み立てます。",
    cta: "運用について相談する",
    image: "/works/sns.jpg",
    imageAlt: "建築現場で撮影するSho建築士",
    imagePosition: "50% 55%",
    proof: "自アカウントで累計約8,000万回再生・総フォロワー15万超を運用",
  },
  {
    id: "tour",
    no: "03",
    title: "建築ツアーの企画・同行",
    description:
      "名建築や街を巡る建築ツアーを、企画から当日の解説・同行までお引き受け。メディア企画、社員研修、ファン向けイベントなど、目的に合わせて設計します。",
    cta: "ツアーを相談する",
    image: "/works/tour.jpg",
    imageAlt: "建築を見上げるSho建築士",
    imagePosition: "50% 71%",
    proof:
      "主催・引率 通算15回以上（ソウル、プサン、大阪・関西万博、建築ウォークほか）",
  },
  {
    id: "talk",
    no: "04",
    title: "講演・メディア出演・監修",
    description:
      "講演会や出張授業、イベント・メディアへの出演、書籍や記事の建築監修まで。専門性を、その場の参加者・読者に「伝わる言葉」でお届けします。",
    cta: "登壇・出演を相談する",
    image: "/works/school.jpg",
    imageAlt: "小学校の体育館での建築授業",
    imagePosition: "50% 58%",
    proof:
      "横浜市立白根小学校・文京区立湯島小学校・市川市立八幡小学校・新潟県立新潟高等学校・神奈川大学・明治大学ほかで授業・講演／著書出版イベント全国8都市／建築専門誌『ARCHIES』掲載",
  },
];
