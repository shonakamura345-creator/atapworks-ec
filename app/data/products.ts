export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string; // 詳細ページ用の説明文
  shortDescription?: string; // 商品一覧ページ用の短い説明文
  image?: string;
  images?: string[]; // 複数画像対応
  isAvailable?: boolean; // 購入可能かどうか（デフォルト: true）
};

export const products: Product[] = [
  {
    id: "book",
    name: "書籍『建物は物理学である』",
    price: 1870,
    description: "建物にまつわる物理学を初心者にもわかりやすく解説した書籍です。",
    image: "/IMG_1824.PNG",
  },
  {
    id: "scale",
    name: "Sho建築士刻印入り三角スケール",
    price: 1100,
    shortDescription: "建築士であれば誰もが使う必需品です",
    description: "建築士であれば誰もが使う必需品をSho建築士刻印入りでグッズにしました。1/100、1/200、1/20、1/50、1/250、1/300の縮尺のメモリが入っています。模型を作るときや、図面を読み取るときに、このメモリに合わせて読み取ってください。",
    image: "/スクリーンショット 2026-01-01 17.55.51.png",
  },
  {
    id: "sticker",
    name: "オリジナルステッカーセット",
    price: 600,
    description: "オリジナルデザインのステッカーセットです。現在準備中",
    image: "/kakunin.jpg",
    images: ["/kakunin.jpg", "/スクリーンショット 2026-01-01 22.34.48.png"],
    isAvailable: false, // 準備中のため購入不可
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

