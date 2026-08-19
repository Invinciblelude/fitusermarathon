import { ArmsMark } from "@/components/logo";
import { LeaderboardTable } from "@/components/leaderboard-table";

export default function LeaderboardPage() {
  return (
    <div className="relative">
      <div className="fu-watermark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <ArmsMark className="h-12 w-12" />
        <h1 className="fu-display mt-4 text-3xl font-semibold">Leaderboard</h1>
        <p className="mt-2 text-muted">Miles checked in. Points for showing up.</p>
        <div className="mt-10">
          <LeaderboardTable />
        </div>
      </div>
    </div>
  );
}
