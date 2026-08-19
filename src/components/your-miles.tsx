"use client";

import { getHabit } from "@/lib/habits";
import { currentStreak, daysOnCourse, milesCompleted, useRunner } from "@/lib/store";
import { TOTAL_DAYS } from "@/lib/course";
import Link from "next/link";

export function YourMiles() {
  const runner = useRunner();
  if (!runner) {
    return (
      <div className="fu-card p-6">
        <p className="text-muted">Join and check in to put miles next to your name.</p>
        <Link href="/join" className="fu-btn-sm mt-4 inline-block">
          Join the pack
        </Link>
      </div>
    );
  }

  const habit = getHabit(runner.habitId);
  const day = daysOnCourse(runner);

  return (
    <div className="fu-card p-6">
      <p className="fu-kicker">Your miles</p>
      <h2 className="fu-display mt-2 text-2xl font-semibold">{runner.username}</h2>
      <p className="mt-2 text-muted">
        {habit?.name} · Day {day}/{TOTAL_DAYS} · {milesCompleted(runner)} miles ·{" "}
        {currentStreak(runner, day)}-day streak
      </p>
      <Link href="/check-in" className="mt-4 inline-block text-sm text-white/70 hover:text-white">
        Today’s check-in →
      </Link>
    </div>
  );
}
