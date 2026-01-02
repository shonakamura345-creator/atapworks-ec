"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useCart } from "../contexts/CartContext";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getTotalItems } = useCart();
  const cartItemCount = getTotalItems();
  const router = useRouter();
  const pathname = usePathname();

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    const anchorId = anchor.replace("#", "");
    
    if (pathname !== "/") {
      // ホームページでない場合、まずホームページに遷移
      router.push("/");
      // ページ遷移後にスクロールするため、少し遅延を入れる
      setTimeout(() => {
        const element = document.getElementById(anchorId);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        } else {
          // 要素が見つからない場合、URLにハッシュを追加して再試行
          window.location.hash = anchorId;
        }
      }, 500);
    } else {
      // ホームページの場合、直接スクロール
      const element = document.getElementById(anchorId);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/スクリーンショット 2025-12-31 14.53.42.png"
            alt="Sho建築士"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <a
            href="#home"
            onClick={(e) => handleAnchorClick(e, "#home")}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            HOME
          </a>
          <a
            href="#schedule"
            onClick={(e) => handleAnchorClick(e, "#schedule")}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            SCHEDULE
          </a>
          <a
            href="#goods"
            onClick={(e) => handleAnchorClick(e, "#goods")}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            GOODS
          </a>
          <a
            href="#contact"
            onClick={(e) => handleAnchorClick(e, "#contact")}
            className="text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
          >
            CONTACT
          </a>
          <Link
            href="/cart"
            className="relative text-slate-700 hover:text-slate-900"
            aria-label="Shopping cart"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button and Cart */}
        <div className="flex items-center gap-4 md:hidden">
          <Link
            href="/cart"
            className="relative text-slate-700 hover:text-slate-900"
            aria-label="Shopping cart"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
            {cartItemCount > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                {cartItemCount}
              </span>
            )}
          </Link>
          <button
            className="flex items-center gap-2 text-slate-700"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col px-4 py-4">
            <a
              href="#home"
              onClick={(e) => handleAnchorClick(e, "#home")}
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              HOME
            </a>
            <a
              href="#schedule"
              onClick={(e) => handleAnchorClick(e, "#schedule")}
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              SCHEDULE
            </a>
            <a
              href="#goods"
              onClick={(e) => handleAnchorClick(e, "#goods")}
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              GOODS
            </a>
            <a
              href="#contact"
              onClick={(e) => handleAnchorClick(e, "#contact")}
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900 cursor-pointer"
            >
              CONTACT
            </a>
            <Link
              href="/cart"
              className="flex items-center gap-2 py-3 text-left text-sm font-medium text-slate-700 hover:text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              <div className="relative">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                {cartItemCount > 0 && (
                  <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">
                    {cartItemCount}
                  </span>
                )}
              </div>
              Cart {cartItemCount > 0 && `(${cartItemCount})`}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}

