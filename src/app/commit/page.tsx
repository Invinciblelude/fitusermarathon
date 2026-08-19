import { ArmsPanel } from "@/components/brand-media";
import { CommitForm } from "@/components/commit-form";
import { LivePackList } from "@/components/live-pack-list";
import { PayQr } from "@/components/pay-qr";
import { ShirtMockup } from "@/components/shirt-mockup";
import { RUN_USD, SHIRT_USD } from "@/lib/commit";
import { listPublicSignups } from "@/lib/signup-store";

export default async function CommitPage() {
  const pack = await listPublicSignups();

  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="fu-watermark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-10 px-4 py-14 sm:px-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="fu-kicker">Pack commitment</p>
            <h1 className="fu-display mt-3 max-w-3xl text-3xl font-semibold sm:text-5xl">
              Buy the shirt. Show up. Pay ${RUN_USD} every time you run.
            </h1>
            <p className="mt-4 max-w-2xl text-lg text-muted">
              This is how the coaching stays alive. ${SHIRT_USD} for the Fit User
              Marathon shirt. Then ${RUN_USD} each group run. Under 16: coaching is
              free. Cash App $fituser or cash at the park.
            </p>
          </div>
          <div className="overflow-hidden border border-white/15">
            <ArmsPanel light line="Buy the shirt. Show up." />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid items-start gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-8">
            <ShirtMockup />
            <div className="grid gap-4">
              <Offer
                title={`$${SHIRT_USD} shirt`}
                copy="One shirt. That’s the lock-in. You’re not browsing fitness — you’re on the pack."
              />
              <Offer
                title={`$${RUN_USD} every group run`}
                copy="You come, you run, you contribute $10. It pays the coach to keep encouraging you."
              />
              <Offer
                title="Under 16 is free"
                copy="Kids don’t buy the shirt and don’t pay per run. A parent or guardian commits them. Coaching is on us."
              />
            </div>
          </div>
          <div className="space-y-8">
            <PayQr />
            <CommitForm />
          </div>
        </div>

        <section className="mt-16">
          <LivePackList initialPack={pack} />
        </section>
      </div>
    </div>
  );
}

function Offer({ title, copy }: { title: string; copy: string }) {
  return (
    <div className="fu-card p-5">
      <h2 className="font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm text-muted">{copy}</p>
    </div>
  );
}
