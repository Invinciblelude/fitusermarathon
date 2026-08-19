import { GROUP_RUN_PLACE, GROUP_RUN_TITLE, icsStamp, upcomingGroupRuns } from "@/lib/events";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const runs = upcomingGroupRuns(18);
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Fit User LLC//Group Runs//EN",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    `X-WR-CALNAME:${GROUP_RUN_TITLE}`,
  ];
  for (const run of runs) {
    lines.push(
      "BEGIN:VEVENT",
      `UID:${run.date}-${run.time.replace(/\s/g, "")}@fit-user`,
      `DTSTAMP:${now}`,
      `DTSTART:${icsStamp(run.date, run.time)}`,
      `DTEND:${icsStamp(run.date, run.time, 1)}`,
      `SUMMARY:${GROUP_RUN_TITLE} · ${run.time}`,
      `DESCRIPTION:$10 in person if 16+. Under 16 free. ${GROUP_RUN_PLACE}.`,
      `LOCATION:${GROUP_RUN_PLACE}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return new NextResponse(lines.join("\r\n"), {
    headers: {
      "Content-Type": "text/calendar; charset=utf-8",
      "Content-Disposition": 'attachment; filename="fit-user-group-runs.ics"',
    },
  });
}
