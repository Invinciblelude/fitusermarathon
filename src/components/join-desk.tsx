"use client";

import { PackCalendar } from "@/components/pack-calendar";
import { PackList } from "@/components/pack-list";
import { SignupForm } from "@/components/signup-form";
import { upcomingGroupRuns } from "@/lib/events";
import { loadLocalPack, mergePack } from "@/lib/pack-local";
import type { PublicSignup } from "@/lib/signups";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface JoinDeskProps {
  initialPack: PublicSignup[];
}

export function JoinDesk({ initialPack }: JoinDeskProps) {
  const searchParams = useSearchParams();
  const firstRun = upcomingGroupRuns(1)[0]?.date ?? null;
  const [selected, setSelected] = useState<string | null>(
    searchParams.get("run") || firstRun,
  );
  const [pack, setPack] = useState(initialPack);

  useEffect(() => {
    setPack(mergePack(initialPack, loadLocalPack()));
  }, [initialPack]);

  function handleJoined(person: PublicSignup) {
    setPack((current) => {
      if (current.some((entry) => entry.id === person.id)) return current;
      const coach = current.filter((entry) => entry.isCoach);
      const rest = current.filter((entry) => !entry.isCoach && entry.id !== person.id);
      return [...coach, person, ...rest];
    });
  }

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.05fr_0.95fr]">
      <div className="space-y-8">
        <PackCalendar selected={selected} onSelect={setSelected} />
        <PackList people={pack} />
      </div>
      <SignupForm eventDate={selected} onJoined={handleJoined} />
    </div>
  );
}
