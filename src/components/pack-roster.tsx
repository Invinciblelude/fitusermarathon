"use client";

import { SHIRT_USD, RUN_USD } from "@/lib/commit";
import { useCommitments } from "@/lib/commit-store";

export function PackRoster() {
  const commitments = useCommitments();

  if (commitments.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-line p-6 text-sm text-muted">
        No shirts locked yet. Be the first Fit User to put $100 on the table.
      </p>
    );
  }

  return (
    <ul className="divide-y divide-line overflow-hidden border border-line bg-paper">
      {commitments.map((commitment) => (
        <li key={commitment.id} className="flex items-center justify-between px-4 py-3">
          <div>
            <p className="font-medium">{commitment.name}</p>
            <p className="text-xs text-muted">
              {commitment.kind === "pack"
                ? `Pack shirt ${commitment.shirtSize} · ${commitment.runs.length} runs · $${(commitment.shirtPaid ? SHIRT_USD : 0) + commitment.runs.reduce((sum, visit) => sum + visit.amount, 0)} in`
                : `Youth · free coaching · ${commitment.runs.length} runs`}
            </p>
          </div>
          <span className="font-display text-xs font-semibold tracking-[0.14em] text-white uppercase">
            {commitment.kind === "pack" ? `$${RUN_USD}/run` : "Free"}
          </span>
        </li>
      ))}
    </ul>
  );
}
