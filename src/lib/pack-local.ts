import { COACH, type PublicSignup, type Signup, toPublicSignup } from "./signups";

const PUBLIC_KEY = "fituser_pack_public";

function readLocal(): PublicSignup[] {
  if (typeof window === "undefined") return [];
  try {
    const parsed = JSON.parse(localStorage.getItem(PUBLIC_KEY) ?? "[]") as PublicSignup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function mergePack(...lists: PublicSignup[][]): PublicSignup[] {
  const map = new Map<string, PublicSignup>();
  for (const list of lists) {
    for (const person of list) map.set(person.id, person);
  }
  const all = [...map.values()];
  return [...all.filter((person) => person.isCoach), ...all.filter((person) => !person.isCoach)];
}

export function loadLocalPack(): PublicSignup[] {
  return mergePack([COACH], readLocal());
}

export function saveLocalSignup(input: Omit<Signup, "id" | "createdAt">): PublicSignup {
  const signup: Signup = {
    ...input,
    id: `fu_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
    email: input.email.trim().toLowerCase(),
    name: input.name.trim(),
  };
  const publicRow = toPublicSignup(signup);
  const next = mergePack(readLocal(), [publicRow]);
  localStorage.setItem(PUBLIC_KEY, JSON.stringify(next.filter((person) => !person.isCoach)));
  return publicRow;
}
