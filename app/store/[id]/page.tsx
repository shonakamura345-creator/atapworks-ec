import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getProductById } from "../../data/products";
import AddToCartButton from "./AddToCartButton";
import ProductImageGallery from "./ProductImageGallery";
import ShareButtons from "./ShareButtons";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function ProductDetailPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(id);

  if (!product) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://atapworks.co.jp";
  const productUrl = `${baseUrl}/store/${id}`;

  return (
    <main className="min-h-screen bg-white p-6">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/#goods"
          className="mb-6 inline-block text-sm text-slate-600 hover:text-slate-900"
        >
          ← 商品一覧に戻る
        </Link>

        <div className="grid gap-8 md:grid-cols-2">
          {/* 商品画像エリア */}
          <div>
            {product.images && product.images.length > 0 ? (
              <ProductImageGallery
                images={product.images}
                productName={product.name}
              />
            ) : product.image ? (
              <div className="aspect-square rounded-2xl bg-slate-100 overflow-hidden relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-2xl bg-slate-100 flex items-center justify-center">
                <div className="text-slate-400 text-center">
                  <p className="text-sm">商品画像</p>
                  <p className="text-xs mt-2">（画像を追加予定）</p>
                </div>
              </div>
            )}
          </div>

          {/* 商品情報 */}
          <div>
            <h1 className="text-3xl font-bold text-slate-900">
              {product.name}
            </h1>
            <div className="mt-4 text-2xl font-semibold text-slate-900">
              ¥{product.price.toLocaleString()}
            </div>

            {product.description && (
              <p className="mt-6 text-slate-600">{product.description}</p>
            )}

            <div className="mt-8">
              <AddToCartButton product={product} />
            </div>

            <ShareButtons productName={product.name} productUrl={productUrl} />

            <div className="mt-8 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <h3 className="font-semibold text-slate-900 mb-2">
                注意事項
              </h3>
              <ul className="text-sm text-slate-600 space-y-2">
                <li>• <span className="font-semibold">発送目安：</span>2〜3日</li>
                <li>• <span className="font-semibold">送料：</span>300円（3000円以上で送料無料）</li>
                <li>• <span className="font-semibold">返品・交換：</span>不良品を除き、返品・交換はお受けできかねます。商品到着後、すぐにご確認ください。不良品の場合は、到着後7日以内にご連絡ください。</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

