"use client";

import { useState } from "react";

const inquiryTypes = [
  "建築動画の制作",
  "SNS運用代行",
  "建築ツアーの企画",
  "登壇・出演・監修",
  "その他",
];

const inputClass =
  "w-full rounded-2xl border-soft bg-white px-4 py-3 text-ink focus:border-[#4faddf] focus:outline-none focus:ring-2 focus:ring-[#4faddf]/20";

export default function ContactForm() {
  const [form, setForm] = useState({
    inquiryType: inquiryTypes[0],
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "sending" | "done" | "error">(
    "idle"
  );
  const [errorMsg, setErrorMsg] = useState("");

  const update =
    (key: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "送信に失敗しました。");
      }
      setStatus("done");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "送信に失敗しました。");
    }
  };

  if (status === "done") {
    return (
      <div className="rounded-3xl border-soft bg-surface shadow-soft p-10 text-center">
        <div className="text-4xl mb-4">✅</div>
        <p className="font-head text-xl font-bold text-ink mb-2">
          送信しました。ありがとうございます。
        </p>
        <p className="text-sm text-ink-sub leading-relaxed">
          内容を確認のうえ、追ってご連絡します。
          <br />
          お急ぎの場合は公式LINEからもどうぞ。
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border-soft bg-surface p-6 sm:p-8 shadow-soft text-left"
    >
      <p className="text-sm text-ink-sub mb-6 leading-relaxed">
        まずはざっくりで大丈夫です。内容が固まっていない段階のご相談、情報収集だけのお問い合わせも歓迎します。
      </p>

      <div className="mb-4">
        <label className="block text-sm font-medium text-ink-sub mb-1.5">
          ご用件
        </label>
        <select
          value={form.inquiryType}
          onChange={update("inquiryType")}
          className={inputClass}
        >
          {inquiryTypes.map((t) => (
            <option key={t}>{t}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-ink-sub mb-1.5">
            お名前 <span className="text-ocean">*</span>
          </label>
          <input
            type="text"
            required
            value={form.name}
            onChange={update("name")}
            placeholder="例：田中 太郎"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-ink-sub mb-1.5">
            会社名・団体名
          </label>
          <input
            type="text"
            value={form.company}
            onChange={update("company")}
            placeholder="例：株式会社○○"
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-ink-sub mb-1.5">
          メールアドレス <span className="text-ocean">*</span>
        </label>
        <input
          type="email"
          required
          value={form.email}
          onChange={update("email")}
          placeholder="you@example.com"
          className={inputClass}
        />
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium text-ink-sub mb-1.5">
          内容（任意で時期・概要など）
        </label>
        <textarea
          value={form.message}
          onChange={update("message")}
          rows={4}
          placeholder="やりたいこと・想定時期など、わかる範囲で大丈夫です。"
          className={inputClass}
        />
      </div>

      {status === "error" && (
        <p className="mb-4 text-sm text-red-600">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "sending"}
        className="btn-ocean w-full px-6 py-4 font-semibold disabled:opacity-60"
      >
        {status === "sending" ? "送信中…" : "相談を送る"}
      </button>

      <p className="mt-4 text-center text-sm text-ink-sub">
        気軽な連絡は{" "}
        <a
          href="https://lin.ee/nnqRfjX"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-[#06C755] underline"
        >
          公式LINE
        </a>{" "}
        でもOKです。
      </p>
    </form>
  );
}
