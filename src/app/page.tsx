import { ArmsPanel, BrandLook, BrandMarquee } from "@/components/brand-media";
import { ShirtMockup } from "@/components/shirt-mockup";
import { logos } from "@/lib/brand";
import { habits } from "@/lib/habits";
import Image from "next/image";
import Link from "next/link";

const featured = [
  {
    id: "couch",
    kicker: "Get fit",
    title: "Move a little every day",
    copy: "The couch isn’t the enemy. Never getting up is. Ten minutes counts.",
  },
  {
    id: "late",
    kicker: "Sleep",
    title: "Protect the night",
    copy: "You can’t out-hustle a wrecked night. Sleep is the recovery mile.",
  },
  {
    id: "skip",
    kicker: "Show up",
    title: "Help the next person",
    copy: "Better together than alone. Buy the shirt. Come run. Pull someone with you.",
  },
];

export default function Home() {
  return (
    <div>
      <section className="grid min-h-[calc(100vh-4.25rem)] lg:grid-cols-2">
        <div className="relative flex flex-col justify-center overflow-hidden px-6 py-16 sm:px-10 lg:px-16">
          <div className="fu-watermark pointer-events-none absolute inset-0" />
          <div className="relative max-w-xl">
            <Image
              src={logos.wordmarkWhite}
              alt="Fit User"
              width={580}
              height={174}
              className="h-12 w-auto sm:h-16"
              priority
            />
            <p className="fu-kicker mt-8">Vince · Fit User LLC</p>
            <h1 className="fu-display mt-4 text-4xl font-semibold sm:text-6xl">
              Get fit. Sleep. Help others get healthy.
            </h1>
            <p className="mt-6 text-lg text-muted">
              Fitness doesn&apos;t have to be hard. Pick one habit. Check in for 26 days.
              The $100 shirt and $10 group runs keep a coach in the game — including
              this one.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/join" className="fu-btn">
                Join the pack
              </Link>
              <Link href="/flyer" className="fu-btn-ghost">
                Flyer
              </Link>
            </div>
          </div>
        </div>
        <ArmsPanel light line="Are you up for a challenge" />
      </section>

      <BrandMarquee />

      <section className="grid gap-px bg-line lg:grid-cols-3">
        {featured.map((item) => {
          const habit = habits.find((entry) => entry.id === item.id);
          return (
            <Link
              key={item.id}
              href={`/join?habit=${item.id}`}
              className="group bg-black p-8 transition-colors hover:bg-white hover:text-black"
            >
              <p className="fu-kicker group-hover:text-black/45">{item.kicker}</p>
              <h2 className="fu-display mt-4 text-3xl font-semibold">{item.title}</h2>
              <p className="mt-3 text-sm text-muted group-hover:text-black/60">{item.copy}</p>
              <p className="mt-6 font-display text-xs tracking-[0.18em] uppercase">
                {habit?.name} →
              </p>
            </Link>
          );
        })}
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <ArmsPanel line="Better together than alone" />
        <div>
          <p className="fu-kicker">The pack</p>
          <h2 className="fu-display mt-3 text-3xl font-semibold sm:text-5xl">
            Natomas. 26 days. Show up.
          </h2>
          <p className="mt-5 text-lg text-muted">
            One habit, a daily check-in, and in-person coaching funded by the shirt.
            You get fit. Kids under 16 coach free. Tuesday and Thursday 6pm,
            Saturday 6am, North Natomas Regional Park.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link href="/join" className="fu-btn">
              Join the pack
            </Link>
            <Link href="/flyer" className="fu-btn-ghost">
              Flyer
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-white text-black">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
          <p className="font-display text-xs tracking-[0.28em] text-black/50 uppercase">
            What’s running you?
          </p>
          <h2 className="fu-display mt-3 text-3xl font-semibold">
            Eight courses. One start line.
          </h2>
          <div className="mt-10 grid gap-px bg-black/15 sm:grid-cols-2">
            {habits.map((habit) => (
              <Link
                key={habit.id}
                href={`/join?habit=${habit.id}`}
                className="group flex items-start gap-4 bg-white p-5 transition-colors hover:bg-black hover:text-white"
              >
                <Image
                  src={logos.mark}
                  alt=""
                  width={48}
                  height={48}
                  className="mt-0.5 h-10 w-10 shrink-0 invert group-hover:invert-0"
                />
                <span>
                  <h3 className="fu-display text-lg font-semibold">{habit.name}</h3>
                  <p className="mt-1 text-sm text-black/55 group-hover:text-white/55">
                    {habit.fromLabel} → {habit.toLabel}
                  </p>
                  <p className="mt-2 text-sm">{habit.short}</p>
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:px-6 lg:grid-cols-2">
        <div>
          <p className="fu-kicker">Income that keeps the pack alive</p>
          <h2 className="fu-display mt-3 text-3xl font-semibold sm:text-5xl">
            $100 shirt. $10 a run. That’s the model.
          </h2>
          <p className="mt-5 text-lg text-muted">
            No Stripe maze. You commit in person. The shirt locks you in. Each
            group run pays the coach so encouragement doesn’t dry up. Under 16:
            coaching is free. A parent or guardian signs them in.
          </p>
          <Link href="/commit" className="fu-btn mt-8 inline-flex">
            Commit $100
          </Link>
        </div>
        <ShirtMockup />
      </section>

      <section>
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
          <p className="fu-kicker">The look</p>
          <h2 className="fu-display mt-3 text-3xl font-semibold">
            Fit User. Black, white, arms up.
          </h2>
        </div>
        <BrandLook />
      </section>
    </div>
  );
}
