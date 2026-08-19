import { habits } from "@/lib/habits";
import { isGroupRunDate } from "@/lib/events";
import { shirtSizes } from "@/lib/commit";
import { addSignup, listPublicSignups } from "@/lib/signup-store";
import { toPublicSignup, type SignupKind } from "@/lib/signups";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

export async function GET() {
  const signups = await listPublicSignups();
  return NextResponse.json({ signups, count: signups.length });
}

export async function POST(request: Request) {
  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: "Invalid signup." }, { status: 400 });
  }

  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim().toLowerCase();
  const habitId = String(body.habitId ?? "");
  const kind = body.kind === "youth" ? "youth" : "pack";
  const why = String(body.why ?? "").trim();
  const eventDateRaw = body.eventDate ? String(body.eventDate) : null;
  const shirtSize = body.shirtSize ? String(body.shirtSize) : undefined;
  const guardianName = body.guardianName ? String(body.guardianName).trim() : undefined;
  const age = body.age ? Number(body.age) : undefined;

  if (name.length < 2) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A real email is required." }, { status: 400 });
  }
  if (!habits.some((habit) => habit.id === habitId)) {
    return NextResponse.json({ error: "Pick a habit course." }, { status: 400 });
  }
  if (eventDateRaw && !isGroupRunDate(eventDateRaw)) {
    return NextResponse.json({ error: "Pick a group run on the calendar." }, { status: 400 });
  }
  if (kind === "pack" && shirtSize && !shirtSizes.includes(shirtSize as (typeof shirtSizes)[number])) {
    return NextResponse.json({ error: "Pick a shirt size." }, { status: 400 });
  }
  if (kind === "youth") {
    if (!Number.isInteger(age) || !age || age < 1 || age > 15) {
      return NextResponse.json({ error: "Youth coaching is for ages 1–15." }, { status: 400 });
    }
    if (!guardianName) {
      return NextResponse.json({ error: "Parent or guardian name is required." }, { status: 400 });
    }
  }

  try {
    const signup = await addSignup({
      name,
      email,
      habitId,
      kind: kind as SignupKind,
      shirtSize: kind === "pack" ? shirtSize : undefined,
      age: kind === "youth" ? age : undefined,
      guardianName: kind === "youth" ? guardianName : undefined,
      eventDate: eventDateRaw,
      why,
    });
    return NextResponse.json({ signup: toPublicSignup(signup) });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Could not save signup.";
    return NextResponse.json({ error: message }, { status: 409 });
  }
}
