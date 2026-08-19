"use client";

import { useSyncExternalStore } from "react";
import { TOTAL_DAYS } from "./course";

export type CheckInStatus = "done" | "almost" | "missed";

export interface MarathonRunner {
  username: string;
  habitId: string;
  why: string;
  startDate: string;
  checkIns: Record<string, CheckInStatus>;
}

const STORAGE_KEY = "fituser_marathon_runner";
const listeners = new Set<() => void>();

function emitChange() {
  listeners.forEach((listener) => listener());
}

export function subscribeRunner(listener: () => void) {
  listeners.add(listener);
  window.addEventListener("storage", listener);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", listener);
  };
}

export function getRunnerSnapshot(): string | null {
  return localStorage.getItem(STORAGE_KEY);
}

export function parseRunner(raw: string | null): MarathonRunner | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as MarathonRunner;
  } catch {
    return null;
  }
}

export function getRunner(): MarathonRunner | null {
  if (typeof window === "undefined") return null;
  return parseRunner(localStorage.getItem(STORAGE_KEY));
}

export function useRunner(): MarathonRunner | null {
  const raw = useSyncExternalStore(subscribeRunner, getRunnerSnapshot, () => null);
  return parseRunner(raw);
}

export function saveRunner(runner: MarathonRunner): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(runner));
  emitChange();
}

export function startMarathon(input: {
  username: string;
  habitId: string;
  why: string;
}): MarathonRunner {
  const runner: MarathonRunner = {
    username: input.username.trim(),
    habitId: input.habitId,
    why: input.why.trim(),
    startDate: new Date().toISOString().slice(0, 10),
    checkIns: {},
  };
  saveRunner(runner);
  return runner;
}

export function setCheckIn(day: number, status: CheckInStatus): MarathonRunner | null {
  const runner = getRunner();
  if (!runner) return null;
  runner.checkIns[String(day)] = status;
  saveRunner(runner);
  return runner;
}

export function daysOnCourse(runner: MarathonRunner, now = new Date()): number {
  const start = new Date(`${runner.startDate}T00:00:00`);
  const today = new Date(now);
  today.setHours(0, 0, 0, 0);
  const diff = Math.floor((today.getTime() - start.getTime()) / 86400000) + 1;
  return Math.min(Math.max(diff, 1), TOTAL_DAYS);
}

export function milesCompleted(runner: MarathonRunner): number {
  return Object.values(runner.checkIns).filter((status) => status === "done").length;
}

export function currentStreak(runner: MarathonRunner, currentDay: number): number {
  let streak = 0;
  for (let day = currentDay; day >= 1; day -= 1) {
    if (runner.checkIns[String(day)] === "done") streak += 1;
    else break;
  }
  return streak;
}

export function pointsFor(runner: MarathonRunner): number {
  const done = Object.values(runner.checkIns).filter((s) => s === "done").length;
  const almost = Object.values(runner.checkIns).filter((s) => s === "almost").length;
  return done * 100 + almost * 40 + currentStreak(runner, daysOnCourse(runner)) * 15;
}
