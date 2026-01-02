export type Product = {
  id: string;
  name: string;
  price: number;
  description?: string;
  image?: string;
  images?: string[]; // 複数画像対応
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
    description: "建築士のための専用三角スケールです。",
    image: "/スクリーンショット 2026-01-01 17.55.51.png",
  },
  {
    id: "sticker",
    name: "ステッカー3枚セット",
    price: 600,
    description: "オリジナルデザインのステッカー3枚セットです。",
    image: "/kakunin.jpg",
    images: ["/kakunin.jpg", "/スクリーンショット 2026-01-01 22.34.48.png"],
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

