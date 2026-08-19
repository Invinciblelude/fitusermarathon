"use client";

import {
  formatRunDay,
  isoDate,
  isGroupRunDate,
  monthCells,
  SCHEDULE_BLURB,
  upcomingGroupRuns,
} from "@/lib/events";
import { useMemo, useState } from "react";

interface PackCalendarProps {
  selected: string | null;
  onSelect: (date: string) => void;
}

export function PackCalendar({ selected, onSelect }: PackCalendarProps) {
  const today = isoDate(new Date());
  const [cursor, setCursor] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });

  const runs = useMemo(() => upcomingGroupRuns(16), []);
  const cells = monthCells(cursor.year, cursor.month);
  const label = new Date(cursor.year, cursor.month, 1).toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  return (
    <div id="calendar" className="fu-card p-6 sm:p-8">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="fu-kicker">Group runs</p>
          <h2 className="fu-display mt-2 text-2xl font-semibold">{label}</h2>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            className="fu-btn-ghost !px-3 !py-2 !text-xs"
            onClick={() =>
              setCursor((current) => {
                const date = new Date(current.year, current.month - 1, 1);
                return { year: date.getFullYear(), month: date.getMonth() };
              })
            }
          >
            Prev
          </button>
          <button
            type="button"
            className="fu-btn-ghost !px-3 !py-2 !text-xs"
            onClick={() =>
              setCursor((current) => {
                const date = new Date(current.year, current.month + 1, 1);
                return { year: date.getFullYear(), month: date.getMonth() };
              })
            }
          >
            Next
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted">
        {SCHEDULE_BLURB} Tap a highlighted day, then sign up. $10 if you’re 16+.
        Under 16 is free.
      </p>
      <div className="mt-6 grid grid-cols-7 gap-px bg-line text-center font-display text-[10px] tracking-[0.16em] uppercase text-muted">
        {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
          <div key={day} className="bg-black py-2">
            {day}
          </div>
        ))}
        {cells.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} className="min-h-12 bg-black" />;
          }
          const isRun = isGroupRunDate(date);
          const isToday = date === today;
          const isSelected = date === selected;
          const dayNumber = Number(date.slice(8));
          return (
            <button
              key={date}
              type="button"
              disabled={!isRun}
              onClick={() => onSelect(date)}
              className={`min-h-12 bg-black text-sm ${
                isSelected
                  ? "bg-white font-semibold text-black"
                  : isRun
                    ? "text-white hover:bg-white hover:text-black"
                    : "text-white/25"
              } ${isToday && !isSelected ? "ring-1 ring-inset ring-white/40" : ""}`}
            >
              {dayNumber}
            </button>
          );
        })}
      </div>
      <ul className="mt-6 space-y-2 text-sm">
        {runs.slice(0, 6).map((run) => (
          <li key={run.date}>
            <button
              type="button"
              onClick={() => onSelect(run.date)}
              className={`w-full border px-4 py-3 text-left ${
                selected === run.date
                  ? "border-white bg-white text-black"
                  : "border-line hover:border-white/40"
              }`}
            >
              <span className="font-medium">{formatRunDay(run.date)}</span>
              <span className={selected === run.date ? "text-black/60" : "text-muted"}>
                {" "}
                · {run.time} · {run.place}
              </span>
            </button>
          </li>
        ))}
      </ul>
      <a href="/api/calendar" className="mt-6 inline-block text-sm text-white/70 hover:text-white">
        Add pack runs to your phone calendar →
      </a>
    </div>
  );
}
