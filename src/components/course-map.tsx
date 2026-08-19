import { miles, phases, type CoursePhase } from "@/lib/course";

const phaseOrder: CoursePhase[] = ["start", "rhythm", "wall", "kick"];

interface CourseMapProps {
  currentDay?: number;
  completedDays?: number[];
}

export function CourseMap({ currentDay, completedDays = [] }: CourseMapProps) {
  return (
    <div className="space-y-8">
      {phaseOrder.map((phase) => {
        const phaseMiles = miles.filter((mile) => mile.phase === phase);
        const meta = phases[phase];
        return (
          <section key={phase}>
            <div className="mb-3 flex flex-wrap items-end justify-between gap-2">
              <div>
                <p className="fu-kicker">{meta.range}</p>
                <h3 className="fu-display text-lg font-semibold">{meta.name}</h3>
              </div>
              <p className="max-w-md text-sm text-muted">{meta.copy}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {phaseMiles.map((mile) => {
                const isCurrent = currentDay === mile.day;
                const isDone = completedDays.includes(mile.day);
                return (
                  <div
                    key={mile.day}
                    className={`flex h-12 min-w-12 items-center justify-center border px-3 font-display text-sm font-semibold ${
                      isCurrent
                        ? "border-white bg-white text-black"
                        : isDone
                          ? "border-white/40 bg-white/10 text-white"
                          : "border-line bg-black text-muted"
                    }`}
                    title={`${mile.title} — ${mile.coachNote}`}
                  >
                    {mile.mileLabel}
                  </div>
                );
              })}
            </div>
          </section>
        );
      })}
    </div>
  );
}
