import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-white p-6 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-slate-900 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-slate-700 mb-4">
          ページが見つかりません
        </h2>
        <p className="text-slate-600 mb-8">
          お探しのページは存在しないか、移動した可能性があります。
        </p>
        <Link
          href="/"
          className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          ホームに戻る
        </Link>
      </div>
    </main>
  );
}

