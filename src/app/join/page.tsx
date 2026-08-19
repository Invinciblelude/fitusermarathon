import { JoinDesk } from "@/components/join-desk";
import { listPublicSignups } from "@/lib/signup-store";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Join the Fit User pack",
  description:
    "Sign up for Tue/Thu 6pm or Saturday 6am group runs and a 26-day habit marathon. $100 shirt, $10 a run, free coaching under 16.",
  openGraph: {
    title: "Join the Fit User pack",
    description:
      "Get fit. Sleep. Help others. Sign up, pick a 6pm or 6am run, and get on the list.",
    images: ["/brand/mark-square.png"],
  },
};

export default async function JoinPage() {
  const pack = await listPublicSignups();

  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <p className="fu-kicker">Share this page</p>
      <h1 className="fu-display mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
        Calendar. Signup. The list.
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-muted">
        Post this link. People pick a 6:00 PM weeknight or 6:00 AM Saturday, join
        with name and email, and they show up on the pack list. Shirt money is in
        person — $100 lock-in, $10 each run. Under 16 coaches free.{" "}
        <Link href="/flyer" className="text-white underline-offset-4 hover:underline">
          Print the flyer
        </Link>
        .
      </p>
      <div className="mt-10">
        <Suspense fallback={<p className="text-muted">Loading the pack…</p>}>
          <JoinDesk initialPack={pack} />
        </Suspense>
      </div>
    </div>
  );
}
