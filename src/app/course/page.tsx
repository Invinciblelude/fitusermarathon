import { ArmsPanel } from "@/components/brand-media";
import { CourseMap } from "@/components/course-map";
import { phases } from "@/lib/course";

export default function CoursePage() {
  return (
    <div>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="fu-watermark pointer-events-none absolute inset-0" />
        <div className="relative mx-auto grid max-w-6xl items-end gap-8 px-4 py-14 sm:px-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div>
            <p className="fu-kicker">26.2 habit miles</p>
            <h1 className="fu-display mt-3 text-3xl font-semibold sm:text-5xl">
              26 days. Same map.
            </h1>
            <p className="mt-3 max-w-2xl text-muted">
              Each day is a mile. The wall shows up around mile 14. Stay. Fitness
              doesn&apos;t have to be hard — quitting at the wall is.
            </p>
          </div>
          <div className="hidden overflow-hidden border border-white/15 lg:block">
            <ArmsPanel line="Stay on the course" />
          </div>
        </div>
      </section>
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="fu-card p-6 sm:p-8">
          <CourseMap />
        </div>
        <div className="mt-8 grid gap-px bg-line sm:grid-cols-2">
          {(Object.keys(phases) as Array<keyof typeof phases>).map((key) => {
            const phase = phases[key];
            return (
              <div key={key} className="bg-black p-6">
                <p className="fu-kicker">{phase.range}</p>
                <h2 className="fu-display mt-2 text-xl font-semibold">{phase.name}</h2>
                <p className="mt-2 text-sm text-muted">{phase.copy}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
