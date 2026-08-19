"use client";

import { PackList } from "@/components/pack-list";
import { loadLocalPack, mergePack } from "@/lib/pack-local";
import type { PublicSignup } from "@/lib/signups";
import { useEffect, useState } from "react";

export function LivePackList({ initialPack }: { initialPack: PublicSignup[] }) {
  const [pack, setPack] = useState(initialPack);

  useEffect(() => {
    setPack(mergePack(initialPack, loadLocalPack()));
  }, [initialPack]);

  return <PackList people={pack} />;
}
