import { FlyerSheet } from "@/components/flyer-sheet";
import { PrintButton } from "@/components/print-button";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fit User flyer · Natomas pack",
  description:
    "One-page Fit User flyer for Natomas. Tue/Thu 6pm, Saturday 6am, North Natomas Regional Park.",
};

export default function FlyerPage() {
  return (
    <div>
      <div className="fu-no-print mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-4 px-4 py-8 sm:px-6">
        <div>
          <p className="fu-kicker">Hand this to people</p>
          <h1 className="fu-display mt-2 text-3xl font-semibold">Flyer</h1>
        </div>
        <div className="flex flex-wrap gap-3">
          <PrintButton />
          <Link href="/join" className="fu-btn-sm">
            Join the pack
          </Link>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 pb-12 sm:px-6">
        <FlyerSheet />
      </div>
    </div>
  );
}
