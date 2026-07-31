"use client";

import { useState } from "react";
import { Palette } from "lucide-react";

type AccentColor = "emerald" | "cyan" | "amber";

export function ThemeCustomizer() {
  const [activeAccent, setActiveAccent] = useState<AccentColor>("emerald");

  const changeAccent = (accent: AccentColor) => {
    setActiveAccent(accent);
    const root = document.documentElement;
    const body = document.body;

    const glow = accent === "emerald" ? "#34d399" : accent === "cyan" ? "#38bdf8" : "#fbbf24";
    const core = accent === "emerald" ? "#10b981" : accent === "cyan" ? "#0284c7" : "#d97706";

    root.style.setProperty("--color-emerald-glow", glow);
    root.style.setProperty("--color-emerald-core", core);
    body.style.setProperty("--color-emerald-glow", glow);
    body.style.setProperty("--color-emerald-core", core);
  };

  return (
    <div className="fixed top-20 right-4 z-40 md:top-6 md:right-6">
      <div className="flex items-center gap-1.5 rounded-full border border-line bg-ink-soft/90 px-3 py-1.5 backdrop-blur-md shadow-xl">
        <Palette className="h-3.5 w-3.5 text-cream-dim mr-1" />
        <button
          onClick={() => changeAccent("emerald")}
          className={`h-4 w-4 rounded-full bg-[#34d399] transition-transform hover:scale-125 ${
            activeAccent === "emerald" ? "ring-2 ring-cream scale-110" : ""
          }`}
          title="Emerald Glow"
          aria-label="Emerald Glow theme accent"
        />
        <button
          onClick={() => changeAccent("cyan")}
          className={`h-4 w-4 rounded-full bg-[#38bdf8] transition-transform hover:scale-125 ${
            activeAccent === "cyan" ? "ring-2 ring-cream scale-110" : ""
          }`}
          title="Electric Cyan"
          aria-label="Electric Cyan theme accent"
        />
        <button
          onClick={() => changeAccent("amber")}
          className={`h-4 w-4 rounded-full bg-[#fbbf24] transition-transform hover:scale-125 ${
            activeAccent === "amber" ? "ring-2 ring-cream scale-110" : ""
          }`}
          title="Amber Gold"
          aria-label="Amber Gold theme accent"
        />
      </div>
    </div>
  );
}
