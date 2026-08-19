import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { COACH, toPublicSignup, type PublicSignup, type Signup } from "./signups";

const DATA_DIR = path.join(process.cwd(), "data");
const FILE = path.join(DATA_DIR, "signups.json");

async function readAll(): Promise<Signup[]> {
  try {
    const raw = await readFile(FILE, "utf8");
    const parsed = JSON.parse(raw) as Signup[];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

async function writeAll(signups: Signup[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  await writeFile(FILE, JSON.stringify(signups, null, 2), "utf8");
}

export async function listPublicSignups(): Promise<PublicSignup[]> {
  const signups = await readAll();
  return [COACH, ...signups.map(toPublicSignup)];
}

export async function addSignup(input: Omit<Signup, "id" | "createdAt">): Promise<Signup> {
  const signups = await readAll();
  const email = input.email.trim().toLowerCase();
  if (signups.some((signup) => signup.email === email)) {
    throw new Error("That email is already on the pack list.");
  }
  const signup: Signup = {
    ...input,
    email,
    name: input.name.trim(),
    id: `fu_${Date.now().toString(36)}`,
    createdAt: new Date().toISOString(),
  };
  await writeAll([signup, ...signups]);
  return signup;
}
