"use client";

import { RUN_USD, SHIRT_USD, runDue, shirtDue, totalContributed, type Commitment } from "@/lib/commit";
import { logGroupRun, markShirtPaid } from "@/lib/commit-store";

interface CommitmentCardProps {
  commitment: Commitment;
}

export function CommitmentCard({ commitment }: CommitmentCardProps) {
  const isPack = commitment.kind === "pack";
  const nextRun = runDue(commitment);

  return (
    <div className="fu-card space-y-6 bg-white/5 p-6 sm:p-8">
      <div>
        <p className="fu-kicker">
          {isPack ? "Pack commitment locked" : "Youth coaching locked"}
        </p>
        <h2 className="mt-2 text-2xl font-bold">{commitment.name}</h2>
        <p className="mt-2 text-muted">
          {isPack
            ? `Size ${commitment.shirtSize} shirt. $${SHIRT_USD} to join the pack. $${RUN_USD} every time you come run.`
            : `Age ${commitment.age}. Coaching is free. Parent/guardian: ${commitment.guardianName}.`}
        </p>
        {commitment.why && (
          <p className="mt-3 text-muted">&ldquo;{commitment.why}&rdquo;</p>
        )}
      </div>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Shirt due" value={shirtDue(commitment) ? `$${shirtDue(commitment)}` : "Paid / n/a"} />
        <Stat label="Group runs" value={String(commitment.runs.length)} />
        <Stat label="Contributed" value={`$${totalContributed(commitment)}`} />
      </div>

      <div className="flex flex-wrap gap-3">
        {isPack && !commitment.shirtPaid && (
          <button
            type="button"
            onClick={() => markShirtPaid(commitment.id)}
            className="fu-btn-sm"
          >
            Mark ${SHIRT_USD} shirt collected
          </button>
        )}
        <button
          type="button"
          onClick={() => logGroupRun(commitment.id)}
          className="rounded-full border border-line px-5 py-2 text-sm font-semibold hover:bg-mist"
        >
          {isPack ? `I came and ran · +$${nextRun}` : "I came and ran · free"}
        </button>
      </div>

      {commitment.runs.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold">Run log</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted">
            {commitment.runs.map((visit) => (
              <li key={visit.id} className="flex justify-between border-b border-line pb-2">
                <span>{new Date(visit.date).toLocaleString()}</span>
                <span className="font-medium text-white">${visit.amount}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border border-line bg-black p-4">
      <p className="text-xs tracking-[0.16em] text-muted uppercase">{label}</p>
      <p className="mt-1 text-lg font-semibold">{value}</p>
    </div>
  );
}
