import { PayQr } from "@/components/pay-qr";
import { logos } from "@/lib/brand";
import { GROUP_RUN_PLACE } from "@/lib/events";
import Image from "next/image";

export function FlyerSheet() {
  return (
    <article className="fu-flyer overflow-hidden border border-white bg-black text-white">
      <div className="relative flex h-full flex-col px-7 py-8 sm:px-10 sm:py-9">
        <div className="fu-watermark pointer-events-none absolute inset-0" />
        <div className="relative flex flex-col items-center text-center">
          <Image
            src={logos.arms}
            alt=""
            width={200}
            height={200}
            className="h-20 w-20 sm:h-24 sm:w-24"
            priority
          />
          <Image
            src={logos.wordmarkWhite}
            alt="Fit User"
            width={580}
            height={174}
            className="mt-4 h-9 w-auto sm:h-11"
            priority
          />
          <p className="fu-kicker mt-5">Natomas pack · Sacramento</p>
          <h1 className="fu-display mt-2 text-3xl font-semibold sm:text-5xl">
            Are you up for a challenge?
          </h1>
          <p className="mt-3 max-w-lg text-sm text-white/75 sm:text-base">
            Fitness doesn&apos;t have to be hard. Pick one habit. 26 days. Show up
            with the pack. The best is in you.
          </p>
        </div>

        <div className="relative mt-6 grid gap-px bg-white/20 sm:grid-cols-3">
          <FlyerFact label="When" value="Tue & Thu 6:00 PM" note="Saturday 6:00 AM" />
          <FlyerFact label="Where" value={GROUP_RUN_PLACE} note="Same grass. Every time." />
          <FlyerFact label="Join" value="Name on the list" note="Sign up at the park or on the site." />
        </div>

        <div className="relative mt-px grid gap-px bg-white/20 sm:grid-cols-2">
          <div className="bg-black p-4">
            <p className="fu-kicker">Under 16</p>
            <p className="fu-display mt-1 text-xl font-semibold">Coaching is free</p>
            <p className="mt-1 text-xs text-white/65">Parent or guardian puts them on the list.</p>
          </div>
          <div className="bg-black p-4">
            <p className="fu-kicker">16 and up</p>
            <p className="fu-display mt-1 text-xl font-semibold">$100 shirt · $10 a run</p>
            <p className="mt-1 text-xs text-white/65">Cash App $fituser or cash. That keeps the coach in the game.</p>
          </div>
        </div>

        <div className="relative mt-px border-y border-white/20">
          <PayQr compact />
        </div>

        <div className="relative mt-5 border border-white/20 p-4 sm:p-5">
          <p className="fu-kicker">Want to help</p>
          <p className="fu-display mt-2 text-lg font-semibold sm:text-xl">
            Wear the shirt. Bring four. Be at the park.
          </p>
          <p className="mt-2 text-sm text-white/70">
            Join the list. Thursday 6pm and Saturday 6am. One captain from your
            school — Inderkum, Natomas High, NP3, Discovery, Leroy Greene, Westlake.
            Ask one coach for five minutes. Pull someone with you.
          </p>
        </div>

        <p className="relative mt-auto pt-5 text-center font-display text-[10px] tracking-[0.22em] text-white/50 uppercase">
          Fit User LLC · Vince · Better together than alone
        </p>
      </div>
    </article>
  );
}

function FlyerFact({ label, value, note }: { label: string; value: string; note: string }) {
  return (
    <div className="bg-black p-4 text-center sm:text-left">
      <p className="fu-kicker">{label}</p>
      <p className="fu-display mt-1 text-lg font-semibold">{value}</p>
      <p className="mt-1 text-xs text-white/65">{note}</p>
    </div>
  );
}
