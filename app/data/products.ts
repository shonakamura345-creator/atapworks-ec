export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  images?: string[]; // 複数画像対応
  isAvailable?: boolean; // 購入可能かどうか（デフォルト: true）
};

export const products: Product[] = [
  {
    id: "book",
    name: "書籍『建物は物理学である』",
    price: 1870,
    description: "建築と物理学の関係を深く探求した書籍です。",
    image: "/IMG_1824.PNG",
  },
  {
    id: "scale",
    name: "Sho建築士刻印入り三角スケール",
    price: 1100,
    description: "建築士であれば誰もが使う必需品をSho建築士刻印入りでグッズにしました。1/100、1/200、1/20、1/50、1/250、1/300の縮尺のメモリが入っています。模型を作る時や図面を読み取る時にこの縮尺に合わせて読み取ってください。",
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

