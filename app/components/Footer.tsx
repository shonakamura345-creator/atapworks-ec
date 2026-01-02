import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-blue-100 bg-white py-12">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {/* サイト情報 */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">Sho建築士</h3>
            <p className="text-sm text-slate-600">
              公式オンラインストア
            </p>
          </div>

          {/* リンク */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">リンク</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#home" className="text-slate-600 hover:text-slate-900">
                  HOME
                </a>
              </li>
              <li>
                <a href="#schedule" className="text-slate-600 hover:text-slate-900">
                  SCHEDULE
                </a>
              </li>
              <li>
                <a href="#goods" className="text-slate-600 hover:text-slate-900">
                  GOODS
                </a>
              </li>
              <li>
                <a href="#contact" className="text-slate-600 hover:text-slate-900">
                  CONTACT
                </a>
              </li>
            </ul>
          </div>

          {/* お問い合わせ */}
          <div>
            <h3 className="font-bold text-slate-900 mb-4">お問い合わせ</h3>
            <p className="text-sm text-slate-600 mb-3">
              ご質問やお問い合わせは
              <br />
              公式LINEからお気軽に
            </p>
            <a
              href="https://lin.ee/nnqRfjX"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-blue-600 hover:text-blue-700"
            >
              LINEでお問い合わせ
            </a>
          </div>
        </div>

        {/* 返品・交換について */}
        <div className="border-t border-blue-100 pt-8 mt-8">
          <h3 className="font-bold text-slate-900 mb-4">返品・交換について</h3>
          <p className="text-sm text-slate-600">
            不良品を除き、返品・交換はお受けできかねます。商品到着後、すぐにご確認ください。不良品の場合は、到着後7日以内にご連絡ください。
          </p>
        </div>

        {/* リンク */}
        <div className="border-t border-blue-100 pt-8 mt-8 flex flex-wrap gap-4 text-sm">
          <Link
            href="/about"
            className="text-blue-600 hover:text-blue-700"
          >
            会社情報
          </Link>
          <span className="text-slate-400">|</span>
          <Link
            href="/legal"
            className="text-blue-600 hover:text-blue-700"
          >
            特定商取引法に基づく表記
          </Link>
        </div>

        {/* コピーライト */}
        <div className="border-t border-blue-100 pt-8 mt-8 text-center">
          <p className="text-sm text-slate-600">
            © {new Date().getFullYear()} Sho建築士. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

