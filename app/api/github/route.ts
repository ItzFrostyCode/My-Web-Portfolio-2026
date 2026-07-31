import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const year = searchParams.get("year") || "2026";
    const targetUrl = `https://github.com/users/ItzFrostyCode/contributions?from=${year}-01-01&to=${year}-12-31`;

    const res = await fetch(targetUrl, {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
      },
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch GitHub contributions" }, { status: 500 });
    }

    const html = await res.text();

    // Extract exact total contributions e.g. "329 contributions in 2026"
    const countMatch = html.match(/([\d,]+)\s*[\r\n]*\s*contributions/i);
    const totalContributions = countMatch ? parseInt(countMatch[1].replace(/,/g, ""), 10) : 0;

    // Extract all contribution day cells from GitHub HTML
    const days: { date: string; level: number }[] = [];
    const tdRegex = /<td[^>]*id="contribution-day-component-[^"]*"[^>]*>/gi;
    let match;

    while ((match = tdRegex.exec(html)) !== null) {
      const tdStr = match[0];
      const dateMatch = tdStr.match(/data-date="([^"]+)"/);
      const levelMatch = tdStr.match(/data-level="(\d)"/);
      if (dateMatch && levelMatch) {
        days.push({ date: dateMatch[1], level: parseInt(levelMatch[1], 10) });
      }
    }

    // Sort days chronologically by date
    days.sort((a, b) => a.date.localeCompare(b.date));

    // Map into weeks x 7 days grid
    const totalWeeks = Math.max(52, Math.ceil(days.length / 7));
    const weeks: number[][] = Array.from({ length: totalWeeks }, () => Array(7).fill(0));

    days.forEach((day, idx) => {
      const weekIdx = Math.floor(idx / 7);
      const dayIdx = idx % 7;
      if (weekIdx < totalWeeks) {
        weeks[weekIdx][dayIdx] = day.level;
      }
    });

    return NextResponse.json({
      username: "ItzFrostyCode",
      year,
      totalContributions,
      weeks,
    });
  } catch (error) {
    return NextResponse.json({ error: "Error parsing GitHub data" }, { status: 500 });
  }
}
