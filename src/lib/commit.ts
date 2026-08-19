export const SHIRT_USD = 100;
export const RUN_USD = 10;
export const YOUTH_MAX_AGE = 15;

export const shirtSizes = ["XS", "S", "M", "L", "XL", "2XL", "3XL"] as const;

export type ShirtSize = (typeof shirtSizes)[number];
export type CommitmentKind = "pack" | "youth";

export interface RunVisit {
  id: string;
  date: string;
  amount: number;
}

export interface Commitment {
  id: string;
  kind: CommitmentKind;
  name: string;
  email: string;
  shirtSize?: ShirtSize;
  age?: number;
  guardianName?: string;
  guardianEmail?: string;
  why: string;
  agreedAt: string;
  shirtPaid: boolean;
  runs: RunVisit[];
}

export function shirtDue(commitment: Commitment): number {
  return commitment.kind === "pack" && !commitment.shirtPaid ? SHIRT_USD : 0;
}

export function runDue(commitment: Commitment): number {
  return commitment.kind === "pack" ? RUN_USD : 0;
}

export function totalContributed(commitment: Commitment): number {
  const shirt = commitment.kind === "pack" && commitment.shirtPaid ? SHIRT_USD : 0;
  const runs = commitment.runs.reduce((sum, visit) => sum + visit.amount, 0);
  return shirt + runs;
}
