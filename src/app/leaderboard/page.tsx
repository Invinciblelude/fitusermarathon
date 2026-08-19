import { ArmsMark } from "@/components/logo";
import { LivePackList } from "@/components/live-pack-list";
import { YourMiles } from "@/components/your-miles";
import { listPublicSignups } from "@/lib/signup-store";

export default async function LeaderboardPage() {
  const pack = await listPublicSignups();

  return (
    <div className="relative">
      <div className="fu-watermark pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-4xl space-y-10 px-4 py-12 sm:px-6">
        <div>
          <ArmsMark className="h-12 w-12" />
          <h1 className="fu-display mt-4 text-3xl font-semibold">The pack</h1>
          <p className="mt-2 text-muted">Who signed up. Miles are yours when you check in.</p>
        </div>
        <YourMiles />
        <LivePackList initialPack={pack} />
      </div>
    </div>
  );
}
