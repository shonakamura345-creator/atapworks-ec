"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src="/スクリーンショット 2025-12-31 14.53.42.png"
            alt="SHO建築士"
            width={120}
            height={40}
            className="h-10 w-auto"
            priority
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-8 md:flex">
          <Link
            href="/"
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            HOME
          </Link>
          <Link
            href="/store"
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            SHOP
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            ABOUT
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium text-slate-700 hover:text-slate-900"
          >
            CONTACT
          </Link>
          <button
            className="text-slate-700 hover:text-slate-900"
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
          </button>
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="flex items-center gap-2 text-slate-700 md:hidden"
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

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
          <nav className="flex flex-col px-4 py-4">
            <Link
              href="/"
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              HOME
            </Link>
            <Link
              href="/store"
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              SHOP
            </Link>
            <Link
              href="/about"
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              ABOUT
            </Link>
            <Link
              href="/contact"
              className="py-3 text-sm font-medium text-slate-700 hover:text-slate-900"
              onClick={() => setIsMenuOpen(false)}
            >
              CONTACT
            </Link>
            <button
              className="flex items-center gap-2 py-3 text-left text-sm font-medium text-slate-700 hover:text-slate-900"
              aria-label="Shopping cart"
            >
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
              Cart
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}