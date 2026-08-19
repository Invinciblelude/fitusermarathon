"use client";

import { getMile, TOTAL_DAYS } from "@/lib/course";
import { getHabit } from "@/lib/habits";
import {
  currentStreak,
  daysOnCourse,
  milesCompleted,
  setCheckIn,
  useRunner,
  type CheckInStatus,
} from "@/lib/store";
import { ArmsMark } from "./logo";
import Link from "next/link";

const options: { status: CheckInStatus; label: string; hint: string }[] = [
  { status: "done", label: "Mile done", hint: "I did today’s swap." },
  { status: "almost", label: "Showed up", hint: "I did a smaller version." },
  { status: "missed", label: "Water station", hint: "Not today. I’m still on course." },
];

export function CheckInCard() {
  const runner = useRunner();

  if (!runner) {
    return (
      <div className="fu-card p-8 text-center">
        <ArmsMark className="mx-auto h-12 w-12" />
        <p className="mt-4 text-muted">You haven’t pinned a start line yet.</p>
        <Link href="/join" className="fu-btn-sm mt-4 inline-block">
          Join the marathon
        </Link>
      </div>
    );
  }

  const habit = getHabit(runner.habitId);
  const day = daysOnCourse(runner);
  const mile = getMile(day);
  const mission = habit?.dailyMissions[day - 1] ?? "Do the smallest healthy thing you can.";
  const existing = runner.checkIns[String(day)];

  function handleStatus(status: CheckInStatus) {
    setCheckIn(day, status);
  }

  return (
    <div className="space-y-6">
      <div className="fu-card bg-white/5 p-6 sm:p-8">
        <p className="fu-kicker">
          Day {day} of {TOTAL_DAYS} · Mile {mile.mileLabel}
        </p>
        <h1 className="mt-3 text-3xl font-bold">{mile.title}</h1>
        <p className="mt-2 text-muted">{mile.coachNote}</p>
        <p className="mt-6 text-sm text-muted">
          {habit?.name} · {runner.username}
        </p>
      </div>

      <div className="fu-card p-6">
        <h2 className="text-lg font-semibold">Today’s swap</h2>
        <p className="mt-3 text-lg text-ink">{mission}</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          {options.map((option) => {
            const isActive = existing === option.status;
            return (
              <button
                key={option.status}
                type="button"
                onClick={() => handleStatus(option.status)}
                className={`border p-4 text-left transition-colors ${
                  isActive
                    ? "border-white bg-white text-black"
                    : "border-line hover:border-white/40"
                }`}
              >
                <p className="font-semibold">{option.label}</p>
                <p className="mt-1 text-sm text-muted">{option.hint}</p>
              </button>
            );
          })}
        </div>
        <p className="mt-4 text-sm text-muted">
          {milesCompleted(runner)} miles done · {currentStreak(runner, day)}-day streak
        </p>
        <Link href="/my-marathon" className="mt-6 inline-block text-sm text-white/70 hover:text-white">
          See my run →
        </Link>
      </div>
    </div>
  );
}
