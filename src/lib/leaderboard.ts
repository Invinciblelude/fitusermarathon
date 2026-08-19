export interface LeaderboardEntry {
  rank?: number;
  username: string;
  habit: string;
  miles: number;
  points: number;
  isYou?: boolean;
}

export const seededLeaders: LeaderboardEntry[] = [
  { username: "FitChamp", habit: "Show Up", miles: 24, points: 2680 },
  { username: "IronMind", habit: "Clear Air", miles: 22, points: 2410 },
  { username: "YogaQueen", habit: "Lights Out", miles: 21, points: 2295 },
  { username: "StepItUp", habit: "Couch to Course", miles: 20, points: 2140 },
  { username: "HealthyHabits", habit: "Real Plate", miles: 19, points: 1980 },
  { username: "KlutchTheDev", habit: "Off the Feed", miles: 18, points: 1875 },
  { username: "steveSquats", habit: "Show Up", miles: 17, points: 1760 },
  { username: "MorningGlory", habit: "Lights Out", miles: 16, points: 1620 },
  { username: "Teenah", habit: "Steady Energy", miles: 14, points: 1485 },
  { username: "bookuCakes", habit: "Real Plate", miles: 13, points: 1320 },
];
