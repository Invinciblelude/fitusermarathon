"use client";

import { useSyncExternalStore } from "react";
import {
  RUN_USD,
  type Commitment,
  type RunVisit,
} from "./commit";

const STORAGE_KEY = "fituser_marathon_commitments";
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeCommitments(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getCommitmentsSnapshot(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function parseCommitments(raw: string | null): Commitment[] {
  if (!raw) return [];
  try {
    const parsed = JSON.parse(raw) as Commitment[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function getCommitments(): Commitment[] {
  if (typeof window === "undefined") return [];
  return parseCommitments(localStorage.getItem(STORAGE_KEY));
}

export function useCommitments(): Commitment[] {
  const raw = useSyncExternalStore(
    subscribeCommitments,
    getCommitmentsSnapshot,
    () => null,
  );
  return parseCommitments(raw);
}

export function saveCommitments(commitments: Commitment[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(commitments));
  emitChange();
}

export function addCommitment(
  input: Omit<Commitment, "id" | "agreedAt" | "shirtPaid" | "runs">,
): Commitment {
  const commitment: Commitment = {
    ...input,
    id: `commit_${Date.now()}`,
    agreedAt: new Date().toISOString(),
    shirtPaid: false,
    runs: [],
  };
  saveCommitments([commitment, ...getCommitments()]);
  return commitment;
}

export function markShirtPaid(id: string): void {
  saveCommitments(
    getCommitments().map((commitment) =>
      commitment.id === id ? { ...commitment, shirtPaid: true } : commitment,
    ),
  );
}

export function logGroupRun(id: string): RunVisit | null {
  const commitments = getCommitments();
  const current = commitments.find((commitment) => commitment.id === id);
  if (!current) return null;
  const visit: RunVisit = {
    id: `run_${Date.now()}`,
    date: new Date().toISOString(),
    amount: current.kind === "pack" ? RUN_USD : 0,
  };
  saveCommitments(
    commitments.map((commitment) =>
      commitment.id === id
        ? { ...commitment, runs: [visit, ...commitment.runs] }
        : commitment,
    ),
  );
  return visit;
}
