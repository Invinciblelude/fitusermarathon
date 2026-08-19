"use client";

import { SHIRT_USD, RUN_USD, YOUTH_MAX_AGE, shirtSizes, type ShirtSize } from "@/lib/commit";
import { addCommitment, useCommitments } from "@/lib/commit-store";
import { useMemo, useState } from "react";
import { CommitmentCard } from "./commitment-card";

type Track = "pack" | "youth";

export function CommitForm() {
  const commitments = useCommitments();
  const mine = commitments[0];
  const [showAnother, setShowAnother] = useState(false);
  const [track, setTrack] = useState<Track>("pack");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [shirtSize, setShirtSize] = useState<ShirtSize>("L");
  const [age, setAge] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [guardianEmail, setGuardianEmail] = useState("");
  const [why, setWhy] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [error, setError] = useState("");

  const youthAge = Number(age);
  const isYouthAgeValid = Number.isInteger(youthAge) && youthAge > 0 && youthAge < 16;

  const pledgeCopy = useMemo(() => {
    if (track === "youth") {
      return `I am the parent or guardian. Coaching for this athlete (under 16) is free. No $100 shirt and no $10 run contribution.`;
    }
    return `I commit to the Fit User pack: I will buy the $100 shirt, and I will contribute $10 each time I come run. That money encourages the coach to keep showing up for me.`;
  }, [track]);

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError("");
    if (!name.trim()) {
      setError("Name is required.");
      return;
    }
    if (track === "pack" && !email.trim()) {
      setError("Email is required.");
      return;
    }
    if (!agreed) {
      setError("Check the commitment box to lock it in.");
      return;
    }
    if (track === "youth") {
      if (!isYouthAgeValid) {
        setError(`Youth coaching is for ages 1–${YOUTH_MAX_AGE}. Enter the athlete’s age.`);
        return;
      }
      if (!guardianName.trim() || !guardianEmail.trim()) {
        setError("A parent or guardian name and email are required.");
        return;
      }
      addCommitment({
        kind: "youth",
        name: name.trim(),
        email: guardianEmail.trim(),
        age: youthAge,
        guardianName: guardianName.trim(),
        guardianEmail: guardianEmail.trim(),
        why: why.trim(),
      });
      setShowAnother(false);
      setAgreed(false);
      setName("");
      setWhy("");
      return;
    }
    addCommitment({
      kind: "pack",
      name: name.trim(),
      email: email.trim(),
      shirtSize,
      why: why.trim(),
    });
    setShowAnother(false);
    setAgreed(false);
    setName("");
    setWhy("");
  }

  if (mine && !showAnother) {
    return (
      <div className="space-y-4">
        <CommitmentCard commitment={mine} />
        <button
          type="button"
          onClick={() => setShowAnother(true)}
          className="text-sm font-medium text-white hover:text-white/70"
        >
          Commit another person →
        </button>
      </div>
    );
  }

  const selectedCard = "border-white bg-white text-black";
  const idleCard = "border-line hover:border-white/40";

  return (
    <form onSubmit={handleSubmit} className="fu-card space-y-6 p-6 sm:p-8">
      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setTrack("pack")}
          className={`rounded-xl border p-4 text-left ${track === "pack" ? selectedCard : idleCard}`}
        >
          <p className="fu-kicker">16 and up</p>
          <p className="mt-1 font-semibold">${SHIRT_USD} shirt + ${RUN_USD} per run</p>
          <p className="mt-1 text-sm text-muted">Your money on the table. That’s the commitment.</p>
        </button>
        <button
          type="button"
          onClick={() => setTrack("youth")}
          className={`rounded-xl border p-4 text-left ${track === "youth" ? selectedCard : idleCard}`}
        >
          <p className="fu-kicker">Under 16</p>
          <p className="mt-1 font-semibold">Coaching is free</p>
          <p className="mt-1 text-sm text-muted">Parent or guardian signs. No shirt fee. No run fee.</p>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="commit-name">
          {track === "youth" ? "Athlete name" : "Your name"}
        </label>
        <input
          id="commit-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          className="fu-input"
        />
      </div>

      {track === "pack" ? (
        <>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="commit-email">
              Email
            </label>
            <input
              id="commit-email"
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
              className="fu-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="shirt-size">
              Shirt size
            </label>
            <select
              id="shirt-size"
              value={shirtSize}
              onChange={(event) => setShirtSize(event.target.value as ShirtSize)}
              className="fu-input"
            >
              {shirtSizes.map((size) => (
                <option key={size} value={size}>
                  {size}
                </option>
              ))}
            </select>
          </div>
        </>
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="athlete-age">
              Athlete age
            </label>
            <input
              id="athlete-age"
              type="number"
              min={1}
              max={YOUTH_MAX_AGE}
              value={age}
              onChange={(event) => setAge(event.target.value)}
              required
              className="fu-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="guardian-name">
              Parent or guardian name
            </label>
            <input
              id="guardian-name"
              value={guardianName}
              onChange={(event) => setGuardianName(event.target.value)}
              required
              className="fu-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-ink" htmlFor="guardian-email">
              Parent or guardian email
            </label>
            <input
              id="guardian-email"
              type="email"
              value={guardianEmail}
              onChange={(event) => setGuardianEmail(event.target.value)}
              required
              className="fu-input"
            />
          </div>
        </>
      )}

      <div>
        <label className="block text-sm font-medium text-ink" htmlFor="commit-why">
          Why you’re locking in (optional)
        </label>
        <textarea
          id="commit-why"
          rows={3}
          value={why}
          onChange={(event) => setWhy(event.target.value)}
          placeholder="I want the pack to hold me to this."
          className="fu-input"
        />
      </div>

      <label className="flex gap-3 border border-line bg-mist p-4 text-sm text-ink">
        <input
          type="checkbox"
          checked={agreed}
          onChange={(event) => setAgreed(event.target.checked)}
          className="mt-1"
        />
        <span>{pledgeCopy}</span>
      </label>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <button type="submit" className="fu-btn w-full">
        {track === "pack" ? `Commit · $${SHIRT_USD} shirt` : "Commit · free youth coaching"}
      </button>
      <p className="text-center text-xs text-muted">
        This is a signed promise on this device. Shirt and run money are collected in person or by the
        method the coach names at the group run.
      </p>
    </form>
  );
}
