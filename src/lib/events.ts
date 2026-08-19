export const GROUP_RUN_PLACE = "North Natomas Regional Park";
export const GROUP_RUN_TITLE = "Fit User group run";
export const SCHEDULE_BLURB =
  "Tue and Thu 6:00 PM after work. Saturday 6:00 AM. Never 9–5.";

/** After-work pack runs, plus one early Saturday. Not during work hours. */
export const GROUP_RUN_SLOTS = [
  { weekday: 2, time: "6:00 PM" },
  { weekday: 4, time: "6:00 PM" },
  { weekday: 6, time: "6:00 AM" },
] as const;

export interface GroupRun {
  date: string;
  title: string;
  time: string;
  place: string;
  weekday: string;
}

const WEEKDAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export function isoDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function parseIsoDate(value: string): Date {
  const [year, month, day] = value.split("-").map(Number);
  return new Date(year, month - 1, day);
}

export function formatRunDay(value: string): string {
  return parseIsoDate(value).toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
}

function startOfDay(date: Date): Date {
  const next = new Date(date);
  next.setHours(0, 0, 0, 0);
  return next;
}

export function slotForDate(value: string) {
  const date = parseIsoDate(value);
  if (Number.isNaN(date.getTime())) return undefined;
  return GROUP_RUN_SLOTS.find((slot) => slot.weekday === date.getDay());
}

export function upcomingGroupRuns(count = 18, from = new Date()): GroupRun[] {
  const cursor = startOfDay(from);
  const runs: GroupRun[] = [];
  for (let step = 0; step < 400 && runs.length < count; step += 1) {
    const date = isoDate(cursor);
    const slot = slotForDate(date);
    if (slot) {
      runs.push({
        date,
        title: GROUP_RUN_TITLE,
        time: slot.time,
        place: GROUP_RUN_PLACE,
        weekday: WEEKDAYS[cursor.getDay()],
      });
    }
    cursor.setDate(cursor.getDate() + 1);
  }
  return runs;
}

export function isGroupRunDate(value: string, from = new Date()): boolean {
  if (!slotForDate(value)) return false;
  return startOfDay(parseIsoDate(value)).getTime() >= startOfDay(from).getTime();
}

export function monthCells(year: number, month: number): (string | null)[] {
  const first = new Date(year, month, 1);
  const startPad = first.getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (string | null)[] = [];
  for (let index = 0; index < startPad; index += 1) cells.push(null);
  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push(isoDate(new Date(year, month, day)));
  }
  while (cells.length % 7 !== 0) cells.push(null);
  return cells;
}

export function icsStamp(date: string, time: string, addHours = 0): string {
  const isPm = time.includes("PM");
  const [hourPart, minutePart] = time.replace(/ AM| PM/g, "").split(":");
  let hour = Number(hourPart);
  if (isPm && hour !== 12) hour += 12;
  if (!isPm && hour === 12) hour = 0;
  hour += addHours;
  const day = date.replace(/-/g, "");
  return `${day}T${String(hour).padStart(2, "0")}${minutePart}00`;
}
