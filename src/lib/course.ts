export type CoursePhase = "start" | "rhythm" | "wall" | "kick";

export interface MileMarker {
  day: number;
  mileLabel: string;
  phase: CoursePhase;
  title: string;
  coachNote: string;
}

export const TOTAL_DAYS = 26;

export const phases: Record<
  CoursePhase,
  { name: string; range: string; copy: string }
> = {
  start: {
    name: "Start line",
    range: "Miles 1–6",
    copy: "Tiny swaps. You’re just getting on the course.",
  },
  rhythm: {
    name: "Finding stride",
    range: "Miles 7–13",
    copy: "The habit starts to feel like a loop, not a dare.",
  },
  wall: {
    name: "The wall",
    range: "Miles 14–20",
    copy: "This is where people quit. We don’t. We shorten the mile.",
  },
  kick: {
    name: "Finish kick",
    range: "Miles 21–26.2",
    copy: "You’re not starting over. You’re finishing.",
  },
};

export const miles: MileMarker[] = [
  {
    day: 1,
    mileLabel: "1",
    phase: "start",
    title: "Pin your start line",
    coachNote: "Name the habit. Don’t dramatize it. Just show up.",
  },
  {
    day: 2,
    mileLabel: "2",
    phase: "start",
    title: "Make it smaller",
    coachNote: "If yesterday felt heavy, cut today’s action in half.",
  },
  {
    day: 3,
    mileLabel: "3",
    phase: "start",
    title: "Same time, same place",
    coachNote: "Cues beat willpower. Attach the swap to something you already do.",
  },
  {
    day: 4,
    mileLabel: "4",
    phase: "start",
    title: "Tell one person",
    coachNote: "Fit User was always better together than alone.",
  },
  {
    day: 5,
    mileLabel: "5",
    phase: "start",
    title: "Expect friction",
    coachNote: "Friction means you left the couch. That’s the point.",
  },
  {
    day: 6,
    mileLabel: "6",
    phase: "start",
    title: "First checkpoint",
    coachNote: "Six days is a week without the myth of Monday.",
  },
  {
    day: 7,
    mileLabel: "7",
    phase: "rhythm",
    title: "Build the loop",
    coachNote: "Do it even if it’s ugly. Ugly still counts.",
  },
  {
    day: 8,
    mileLabel: "8",
    phase: "rhythm",
    title: "Protect the slot",
    coachNote: "Guard 10 minutes like they belong to someone you respect.",
  },
  {
    day: 9,
    mileLabel: "9",
    phase: "rhythm",
    title: "Replace, don’t restrict",
    coachNote: "Empty time fills with the old habit. Put something in the hole.",
  },
  {
    day: 10,
    mileLabel: "10",
    phase: "rhythm",
    title: "Double down on easy",
    coachNote: "Easy miles are how you stay in the race.",
  },
  {
    day: 11,
    mileLabel: "11",
    phase: "rhythm",
    title: "Environment > mood",
    coachNote: "Move the snacks. Move the shoes. Move the charger.",
  },
  {
    day: 12,
    mileLabel: "12",
    phase: "rhythm",
    title: "Proof, not perfection",
    coachNote: "Log it. A sentence is enough. Proof changes identity.",
  },
  {
    day: 13,
    mileLabel: "13",
    phase: "rhythm",
    title: "Halfway energy",
    coachNote: "You’re not new anymore. Don’t restart. Continue.",
  },
  {
    day: 14,
    mileLabel: "14",
    phase: "wall",
    title: "The wall shows up",
    coachNote: "Motivation leaves here. The course does not.",
  },
  {
    day: 15,
    mileLabel: "15",
    phase: "wall",
    title: "Shorten the mile",
    coachNote: "Five minutes. One swap. Then you’re still on course.",
  },
  {
    day: 16,
    mileLabel: "16",
    phase: "wall",
    title: "Use a water station",
    coachNote: "Missed a day? That’s a cup of water. Not a DNF.",
  },
  {
    day: 17,
    mileLabel: "17",
    phase: "wall",
    title: "Bring a pacer",
    coachNote: "Text a Fit User, a sibling, a group chat. Borrow grit.",
  },
  {
    day: 18,
    mileLabel: "18",
    phase: "wall",
    title: "Boredom is a mile too",
    coachNote: "The old habit was entertainment. This one is a vote.",
  },
  {
    day: 19,
    mileLabel: "19",
    phase: "wall",
    title: "Keep the identity",
    coachNote: "You are someone who shows up. Act like it once today.",
  },
  {
    day: 20,
    mileLabel: "20",
    phase: "wall",
    title: "Last hard stretch",
    coachNote: "Twenty down. The kick is pride plus a little stubbornness.",
  },
  {
    day: 21,
    mileLabel: "21",
    phase: "kick",
    title: "Finish-line math",
    coachNote: "Six days left. That’s shorter than a work week.",
  },
  {
    day: 22,
    mileLabel: "22",
    phase: "kick",
    title: "Don’t invent a new plan",
    coachNote: "The plan that got you here is the plan that finishes.",
  },
  {
    day: 23,
    mileLabel: "23",
    phase: "kick",
    title: "Make it social",
    coachNote: "Challenge a friend for the last miles. Bragging rights included.",
  },
  {
    day: 24,
    mileLabel: "24",
    phase: "kick",
    title: "Dress rehearsal",
    coachNote: "Practice the version of this habit you’ll keep in week 5.",
  },
  {
    day: 25,
    mileLabel: "25",
    phase: "kick",
    title: "Penultimate",
    coachNote: "One more sleep until the tape. Stay kind. Stay on course.",
  },
  {
    day: 26,
    mileLabel: "26.2",
    phase: "kick",
    title: "Finish line",
    coachNote: "Do today’s mile. Then take the title: Fit User.",
  },
];

export function getMile(day: number): MileMarker {
  const clamped = Math.min(Math.max(day, 1), TOTAL_DAYS);
  return miles[clamped - 1];
}

export function phaseForDay(day: number): CoursePhase {
  return getMile(day).phase;
}
