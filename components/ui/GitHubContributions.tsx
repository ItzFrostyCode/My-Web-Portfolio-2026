"use client";

import { useState, useEffect } from "react";
import { ExternalLink } from "lucide-react";
import { socials } from "@/content/socials";

type Year = "2026" | "2025";

const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function GitHubContributions() {
  const [selectedYear, setSelectedYear] = useState<Year>("2026");
  const [totalCount, setTotalCount] = useState<number>(0);
  const [weeksData, setWeeksData] = useState<number[][]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const githubLink = socials.find((s) => s.id === "github")?.href || "https://github.com/ItzFrostyCode";

  useEffect(() => {
    let active = true;
    async function fetchLiveGitHubData() {
      setLoading(true);
      try {
        const res = await fetch(`/api/github?year=${selectedYear}`);
        if (res.ok) {
          const data = await res.json();
          if (active && data) {
            setTotalCount(data.totalContributions ?? 0);
            if (data.weeks && data.weeks.length > 0) setWeeksData(data.weeks);
          }
        }
      } catch {
        // Silent fallback
      } finally {
        if (active) setLoading(false);
      }
    }
    fetchLiveGitHubData();
    return () => {
      active = false;
    };
  }, [selectedYear]);

  const getColorClass = (level: number) => {
    switch (level) {
      case 1:
        return "bg-emerald-glow/25 border border-emerald-glow/30";
      case 2:
        return "bg-emerald-glow/55";
      case 3:
        return "bg-emerald-glow";
      case 4:
        return "bg-emerald-glow shadow-[0_0_8px_rgba(52,211,153,0.85)]";
      default:
        return "bg-ink-soft/80 border border-line/40";
    }
  };

  return (
    <div className="w-full rounded-3xl border border-line bg-ink-soft/90 p-6 sm:p-8 shadow-2xl backdrop-blur-xl space-y-6">
      {/* Header Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2 font-mono text-xs text-cream-dim">
            {/* GitHub SVG Logo Icon */}
            <svg className="h-4 w-4 fill-cream" viewBox="0 0 24 24">
              <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
            </svg>
            <span>GitHub contributions</span>
          </div>
          <h3 className="display text-2xl text-cream sm:text-3xl transition-opacity duration-300">
            {totalCount} {totalCount === 1 ? "contribution" : "contributions"} in {selectedYear}
          </h3>
        </div>

        <div className="flex items-center gap-4">
          {/* Year Switcher Pills */}
          <div className="flex items-center rounded-full border border-line bg-ink p-1 font-mono text-xs">
            {(["2026", "2025"] as Year[]).map((y) => (
              <button
                key={y}
                onClick={() => setSelectedYear(y)}
                className={`rounded-full px-3 py-1 transition-all ${
                  selectedYear === y
                    ? "bg-cream text-ink font-bold shadow-md"
                    : "text-cream-dim hover:text-cream"
                }`}
              >
                {y}
              </button>
            ))}
          </div>

          {/* View Profile Link */}
          <a
            href={githubLink}
            target="_blank"
            rel="noreferrer"
            className="hidden sm:flex items-center gap-1 font-mono text-xs text-cream-dim hover:text-emerald-glow transition-colors"
          >
            <span>View profile</span>
            <ExternalLink className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Heatmap Grid Section */}
      <div className="overflow-x-auto pb-2">
        <div className="min-w-[680px] space-y-2">
          {/* Month Labels */}
          <div className="flex text-[0.65rem] font-mono text-cream-dim pl-8 justify-between pr-2">
            {months.map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>

          {/* Grid Area with Day Labels */}
          <div className="flex gap-2">
            <div className="flex flex-col justify-between text-[0.6rem] font-mono text-cream-dim pr-1 py-1">
              <span>Mon</span>
              <span>Wed</span>
              <span>Fri</span>
            </div>

            {/* 52 Columns x 7 Rows Matrix */}
            <div className={`flex flex-1 gap-1 transition-opacity duration-300 ${loading ? "opacity-40" : "opacity-100"}`}>
              {(weeksData.length > 0
                ? weeksData
                : Array.from({ length: 52 }, () => Array(7).fill(0))
              ).map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-1 flex-1">
                  {week.map((level, dIdx) => (
                    <div
                      key={dIdx}
                      className={`aspect-square w-full rounded-[3px] transition-colors duration-300 ${getColorClass(
                        level
                      )}`}
                    />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Footer Legend */}
      <div className="flex items-center justify-end gap-2 font-mono text-[0.65rem] text-cream-dim">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <span className="h-2.5 w-2.5 rounded-[2px] bg-ink-soft border border-line/40" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-glow/25 border border-emerald-glow/30" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-glow/55" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-glow" />
          <span className="h-2.5 w-2.5 rounded-[2px] bg-emerald-glow shadow-[0_0_8px_rgba(52,211,153,0.85)]" />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
