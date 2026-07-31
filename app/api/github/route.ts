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

    // Extract exact total contributions e.g. "332 contributions" or "49 contributions" or "1 contribution"
    const countMatch = html.match(/([\d,]+)\s+contributions?/i);
    const totalContributions = countMatch ? parseInt(countMatch[1].replace(/,/g, ""), 10) : 0;

    // Parse the 7 day rows (Sundays to Saturdays) from GitHub's <tbody>
    const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
    const trMatches: string[] = [];
    let match;

    while ((match = trRegex.exec(html)) !== null) {
      trMatches.push(match[1]);
    }

    const dayRows = trMatches.filter((tr) => tr.includes("ContributionCalendar-day"));

    // Prepare 52 weeks x 7 days matrix
    const weeks: number[][] = Array.from({ length: 52 }, () => Array(7).fill(0));

    dayRows.slice(0, 7).forEach((rowHtml, dayIdx) => {
      const tdRegex = /data-level="(\d)"/gi;
      let tdMatch;
      let weekIdx = 0;

      while ((tdMatch = tdRegex.exec(rowHtml)) !== null && weekIdx < 52) {
        weeks[weekIdx][dayIdx] = parseInt(tdMatch[1], 10);
        weekIdx++;
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
