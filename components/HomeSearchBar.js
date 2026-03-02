"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function HomeSearchBar() {
  const router = useRouter();
  const [q, setQ] = useState("");

  function go(e) {
    e?.preventDefault?.();
    const query = q.trim();
    router.push(query ? `/applications?q=${encodeURIComponent(query)}` : "/applications");
  }

  return (
    <form onSubmit={go} className="flex gap-2">
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Пошук по каталогу (назва, громада, категорія)…"
        className="h-11 flex-1 rounded-xl border border-white/10 bg-black/20 px-3 text-sm text-white placeholder:text-white/40 outline-none"
      />
      <button
        type="submit"
        className="h-11 rounded-xl bg-white px-4 text-sm font-semibold text-black hover:bg-white/90"
      >
        Шукати
      </button>
    </form>
  );
}