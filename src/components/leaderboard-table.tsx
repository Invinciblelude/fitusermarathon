"use client";

import { getHabit } from "@/lib/habits";
import { seededLeaders } from "@/lib/leaderboard";
import { milesCompleted, pointsFor, useRunner } from "@/lib/store";

export function LeaderboardTable() {
  const runner = useRunner();
  const board = [...seededLeaders];
  if (runner) {
    const habit = getHabit(runner.habitId);
    board.push({
      username: runner.username,
      habit: habit?.name ?? "Marathon",
      miles: milesCompleted(runner),
      points: pointsFor(runner),
      isYou: true,
    });
  }
  board.sort((a, b) => b.points - a.points || b.miles - a.miles);
  const rows = board.map((entry, index) => ({ ...entry, rank: index + 1 }));

  return (
    <div className="overflow-hidden border border-line bg-paper">
      <table className="w-full">
        <thead>
          <tr className="border-b border-line bg-mist">
            <th className="px-4 py-4 text-left text-sm font-semibold sm:px-6">Rank</th>
            <th className="px-4 py-4 text-left text-sm font-semibold sm:px-6">Fit User</th>
            <th className="hidden px-4 py-4 text-left text-sm font-semibold sm:table-cell sm:px-6">
              Course
            </th>
            <th className="px-4 py-4 text-right text-sm font-semibold sm:px-6">Miles</th>
            <th className="px-4 py-4 text-right text-sm font-semibold sm:px-6">Points</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((entry) => (
            <tr
              key={`${entry.username}-${entry.rank}`}
              className={`border-b border-line ${entry.isYou ? "bg-white text-black" : "hover:bg-mist"}`}
            >
              <td className="px-4 py-4 sm:px-6">
                <span
                  className={`flex h-8 w-8 items-center justify-center font-display text-sm font-bold ${
                    entry.isYou
                      ? "bg-black text-white"
                      : entry.rank === 1
                        ? "bg-white text-black"
                        : entry.rank <= 3
                          ? "bg-white/15 text-white"
                          : "bg-mist text-muted"
                  }`}
                >
                  {entry.rank}
                </span>
              </td>
              <td className="px-4 py-4 font-medium sm:px-6">
                {entry.username}
                {entry.isYou && (
                  <span className="ml-2 font-display text-xs tracking-[0.14em] uppercase">You</span>
                )}
              </td>
              <td className={`hidden px-4 py-4 sm:table-cell sm:px-6 ${entry.isYou ? "text-black/60" : "text-muted"}`}>
                {entry.habit}
              </td>
              <td className="px-4 py-4 text-right sm:px-6">{entry.miles}</td>
              <td className="px-4 py-4 text-right font-mono sm:px-6">
                {entry.points.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
