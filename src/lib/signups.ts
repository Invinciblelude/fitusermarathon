export type SignupKind = "pack" | "youth";

export interface Signup {
  id: string;
  name: string;
  email: string;
  habitId: string;
  kind: SignupKind;
  shirtSize?: string;
  age?: number;
  guardianName?: string;
  eventDate: string | null;
  why: string;
  createdAt: string;
}

export interface PublicSignup {
  id: string;
  name: string;
  habitId: string;
  kind: SignupKind;
  eventDate: string | null;
  createdAt: string;
  isCoach?: boolean;
}

export const COACH: PublicSignup = {
  id: "coach-vince",
  name: "Vince",
  habitId: "skip",
  kind: "pack",
  eventDate: null,
  createdAt: "2026-08-19",
  isCoach: true,
};

export function toPublicSignup(signup: Signup): PublicSignup {
  return {
    id: signup.id,
    name: signup.name,
    habitId: signup.habitId,
    kind: signup.kind,
    eventDate: signup.eventDate,
    createdAt: signup.createdAt.slice(0, 10),
  };
}
