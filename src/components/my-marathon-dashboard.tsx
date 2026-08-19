"use client";

import { ArmsMark } from "@/components/logo";
import { CommitmentCard } from "@/components/commitment-card";
import { CourseMap } from "@/components/course-map";
import { ProgressRing } from "@/components/progress-ring";
import { TOTAL_DAYS } from "@/lib/course";
import { getHabit } from "@/lib/habits";
import { useCommitments } from "@/lib/commit-store";
import {
  currentStreak,
  daysOnCourse,
  milesCompleted,
  pointsFor,
  useRunner,
} from "@/lib/store";
import Link from "next/link";

export function MyMarathonDashboard() {
  const runner = useRunner();
  const commitments = useCommitments();
  const mine = commitments.find(
    (commitment) =>
      runner && commitment.name.toLowerCase() === runner.username.toLowerCase(),
  ) ?? commitments[0];

  if (!runner) {
    return (
      <div className="fu-card p-12 text-center">
        <ArmsMark className="mx-auto h-14 w-14" />
        <h1 className="fu-display mt-6 text-2xl font-semibold">No marathon on the clock yet</h1>
        <p className="mt-3 text-muted">
          Pick one bad habit. Run 26 days. Finish as a Fit User.
        </p>
        <Link href="/join" className="fu-btn mt-6 inline-block">
          Join the marathon
        </Link>
      </div>
    );
  }

  const habit = getHabit(runner.habitId);
  const day = daysOnCourse(runner);
  const doneDays = Object.entries(runner.checkIns)
    .filter(([, status]) => status === "done")
    .map(([key]) => Number(key));

  return (
    <div className="space-y-10">
      <div className="fu-card flex flex-col gap-8 p-6 sm:flex-row sm:items-center sm:p-8">
        <ProgressRing value={milesCompleted(runner)} max={TOTAL_DAYS} label="Miles done" />
        <div className="flex-1">
          <p className="fu-kicker">
            {runner.username} · Fit User
          </p>
          <h1 className="mt-2 text-3xl font-bold">{habit?.name}</h1>
          <p className="mt-2 text-muted">
            {habit?.fromLabel} → {habit?.toLabel}
          </p>
          {runner.why && <p className="mt-4 text-ink">&ldquo;{runner.why}&rdquo;</p>}
          <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted">
            <span>Day {day} / {TOTAL_DAYS}</span>
            <span>{currentStreak(runner, day)}-day streak</span>
            <span>{pointsFor(runner)} pts</span>
            <span>Started {runner.startDate}</span>
          </div>
          <Link href="/check-in" className="fu-btn-sm mt-6 inline-block">
            Today’s check-in
          </Link>
        </div>
      </div>
      {mine ? (
        <CommitmentCard commitment={mine} />
      ) : (
        <div className="fu-card bg-white/5 p-6 sm:p-8">
          <h2 className="text-xl font-semibold">Take charge with the pack</h2>
          <p className="mt-2 text-muted">
            $100 shirt to lock in. $10 every time you come run. Under 16 coaches free.
          </p>
          <Link href="/commit" className="fu-btn-sm mt-4 inline-block">
            Commit $100
          </Link>
        </div>
      )}
      <CourseMap currentDay={day} completedDays={doneDays} />
    </div>
  );
}
