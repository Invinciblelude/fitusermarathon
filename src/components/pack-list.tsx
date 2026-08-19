import { formatRunDay } from "@/lib/events";
import { getHabit } from "@/lib/habits";
import type { PublicSignup } from "@/lib/signups";

interface PackListProps {
  people: PublicSignup[];
}

export function PackList({ people }: PackListProps) {
  return (
    <div id="pack" className="fu-card overflow-hidden">
      <div className="border-b border-line px-6 py-5 sm:px-8">
        <p className="fu-kicker">The list</p>
        <h2 className="fu-display mt-2 text-2xl font-semibold">
          {people.length} Fit User{people.length === 1 ? "" : "s"} in
        </h2>
        <p className="mt-2 text-sm text-muted">
          Names only. This is who said yes. Share the page and grow the pack.
        </p>
      </div>
      <ul className="divide-y divide-line">
        {people.map((person) => {
          const habit = getHabit(person.habitId);
          return (
            <li key={person.id} className="flex items-start justify-between gap-4 px-6 py-4 sm:px-8">
              <div>
                <p className="font-medium">
                  {person.name}
                  {person.isCoach ? (
                    <span className="ml-2 font-display text-xs tracking-[0.14em] text-white/50 uppercase">
                      Coach
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-muted">
                  {habit?.name ?? "Marathon"}
                  {person.eventDate ? ` · ${formatRunDay(person.eventDate)}` : ""}
                </p>
              </div>
              <span className="font-display text-xs tracking-[0.14em] uppercase text-white/60">
                {person.kind === "youth" ? "Free" : "$100"}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
