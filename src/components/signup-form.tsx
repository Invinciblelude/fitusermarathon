"use client";

import { shirtSizes, type ShirtSize } from "@/lib/commit";
import { formatRunDay, slotForDate } from "@/lib/events";
import { habits } from "@/lib/habits";
import { startMarathon } from "@/lib/store";
import type { PublicSignup, SignupKind } from "@/lib/signups";
import { useSearchParams } from "next/navigation";
import { useMemo, useState } from "react";

interface SignupFormProps {
  eventDate: string | null;
  onJoined: (person: PublicSignup) => void;
}

export function SignupForm({ eventDate, onJoined }: SignupFormProps) {
  const searchParams = useSearchParams();
  const preset = searchParams.get("habit") ?? "couch";
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [habitId, setHabitId] = useState(
    habits.some((habit) => habit.id === preset) ? preset : "couch",
  );
  const [kind, setKind] = useState<SignupKind>("pack");
  const [shirtSize, setShirtSize] = useState<ShirtSize>("L");
  const [age, setAge] = useState("");
  const [guardianName, setGuardianName] = useState("");
  const [why, setWhy] = useState("");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);
  const [done, setDone] = useState<PublicSignup | null>(null);

  const selected = useMemo(
    () => habits.find((habit) => habit.id === habitId),
    [habitId],
  );

  async function handleSubmit(formEvent: React.FormEvent) {
    formEvent.preventDefault();
    setError("");
    setPending(true);
    try {
      const response = await fetch("/api/signups", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          habitId,
          kind,
          shirtSize: kind === "pack" ? shirtSize : undefined,
          age: kind === "youth" ? Number(age) : undefined,
          guardianName: kind === "youth" ? guardianName : undefined,
          eventDate,
          why,
        }),
      });
      const payload = (await response.json()) as { signup?: PublicSignup; error?: string };
      if (!response.ok || !payload.signup) {
        setError(payload.error ?? "Could not join.");
        return;
      }
      startMarathon({ username: name, habitId, why });
      setDone(payload.signup);
      onJoined(payload.signup);
    } catch {
      setError("Could not reach the pack list. Try again.");
    } finally {
      setPending(false);
    }
  }

  if (done) {
    return (
      <div id="signup" className="fu-card p-6 sm:p-8">
        <p className="fu-kicker">You’re in</p>
        <h2 className="fu-display mt-2 text-2xl font-semibold">Welcome to the pack, {done.name}.</h2>
        <p className="mt-3 text-muted">
          Your name is on the list. Check in daily. {done.eventDate ? `See you ${formatRunDay(done.eventDate)}.` : "Pick a run on the calendar if you want a group session."}
        </p>
        <p className="mt-4 text-sm text-muted">
          16+: bring $100 for the shirt and $10 each run, in person.
        </p>
      </div>
    );
  }

  const selectedCard = "border-white bg-white text-black";
  const idleCard = "border-line hover:border-white/40";

  return (
    <form id="signup" onSubmit={handleSubmit} className="fu-card space-y-6 p-6 sm:p-8">
      <div>
        <p className="fu-kicker">Signup</p>
        <h2 className="fu-display mt-2 text-2xl font-semibold">Join the pack</h2>
        <p className="mt-2 text-sm text-muted">
          {eventDate
            ? `Group run ${formatRunDay(eventDate)} at ${slotForDate(eventDate)?.time}. Name, email, habit — then you’re on the list.`
            : "Pick a run on the calendar, or join the 26-day course now."}
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => setKind("pack")}
          className={`border p-4 text-left ${kind === "pack" ? selectedCard : idleCard}`}
        >
          <p className="font-semibold">16 and up</p>
          <p className="mt-1 text-sm text-muted">$100 shirt + $10 each group run</p>
        </button>
        <button
          type="button"
          onClick={() => setKind("youth")}
          className={`border p-4 text-left ${kind === "youth" ? selectedCard : idleCard}`}
        >
          <p className="font-semibold">Under 16</p>
          <p className="mt-1 text-sm text-muted">Coaching free. Parent signs.</p>
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="signup-name">
          {kind === "youth" ? "Athlete name" : "Your name"}
        </label>
        <input
          id="signup-name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
          placeholder="This name goes on the public list"
          className="fu-input"
        />
      </div>

      <div>
        <label className="block text-sm font-medium" htmlFor="signup-email">
          {kind === "youth" ? "Parent or guardian email" : "Email"}
        </label>
        <input
          id="signup-email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          required
          placeholder="Stays private. Vince uses this to reach you."
          className="fu-input"
        />
      </div>

      {kind === "pack" ? (
        <div>
          <label className="block text-sm font-medium" htmlFor="signup-size">
            Shirt size
          </label>
          <select
            id="signup-size"
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
      ) : (
        <>
          <div>
            <label className="block text-sm font-medium" htmlFor="signup-age">
              Athlete age
            </label>
            <input
              id="signup-age"
              type="number"
              min={1}
              max={15}
              value={age}
              onChange={(event) => setAge(event.target.value)}
              required
              className="fu-input"
            />
          </div>
          <div>
            <label className="block text-sm font-medium" htmlFor="signup-guardian">
              Parent or guardian name
            </label>
            <input
              id="signup-guardian"
              value={guardianName}
              onChange={(event) => setGuardianName(event.target.value)}
              required
              className="fu-input"
            />
          </div>
        </>
      )}

      <div>
        <p className="text-sm font-medium">Habit course</p>
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {habits.map((habit) => {
            const isSelected = habit.id === habitId;
            return (
              <button
                key={habit.id}
                type="button"
                onClick={() => setHabitId(habit.id)}
                className={`border p-3 text-left text-sm ${
                  isSelected ? selectedCard : idleCard
                }`}
              >
                <p className="font-semibold">{habit.name}</p>
                <p className={`mt-1 text-xs ${isSelected ? "text-black/55" : "text-muted"}`}>
                  {habit.short}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {selected?.caution && (
        <p className="border border-white/20 bg-white/5 p-4 text-sm text-white/80">
          {selected.caution}
        </p>
      )}

      <div>
        <label className="block text-sm font-medium" htmlFor="signup-why">
          Why you’re joining (optional)
        </label>
        <textarea
          id="signup-why"
          rows={2}
          value={why}
          onChange={(event) => setWhy(event.target.value)}
          className="fu-input"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button type="submit" disabled={pending} className="fu-btn w-full disabled:opacity-60">
        {pending ? "Saving…" : "Join the pack"}
      </button>
      <p className="text-center text-xs text-muted">
        Your name and course show on the public list. Email stays off the site.
        Shirt and run money are collected in person.
      </p>
    </form>
  );
}
