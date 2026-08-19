import { logos } from "@/lib/brand";
import Image from "next/image";

export function BrandMarquee() {
  const marks = Array.from({ length: 8 }, (_, index) => index);
  return (
    <div className="fu-marquee border-y border-white/10 bg-black">
      <div className="fu-marquee-track">
        {[0, 1].map((copy) => (
          <div key={copy} className="flex min-w-full items-center gap-10 px-6">
            {marks.map((index) => (
              <div key={`${copy}-${index}`} className="flex shrink-0 items-center gap-4">
                <Image
                  src={logos.mark}
                  alt=""
                  width={48}
                  height={48}
                  className="h-8 w-8"
                />
                <Image
                  src={logos.wordmarkWhite}
                  alt="Fit User"
                  width={232}
                  height={70}
                  className="h-7 w-auto"
                />
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ArmsPanel({
  light = false,
  line = "Are you up for a challenge",
}: {
  light?: boolean;
  line?: string;
}) {
  return (
    <div
      className={`relative flex h-full min-h-[420px] flex-col items-center justify-center gap-8 p-10 ${
        light ? "bg-white text-black" : "bg-black text-white"
      }`}
    >
      <Image
        src={logos.arms}
        alt=""
        width={400}
        height={400}
        className={`h-48 w-48 sm:h-64 sm:w-64 ${light ? "invert" : ""}`}
        priority
      />
      <Image
        src={light ? logos.wordmarkBlack : logos.wordmarkWhite}
        alt="Fit User"
        width={580}
        height={174}
        className="h-10 w-auto sm:h-12"
      />
      <p className="fu-display text-center text-xl font-semibold sm:text-2xl">{line}</p>
    </div>
  );
}

export function BrandLook() {
  return (
    <div className="grid grid-cols-2 gap-px bg-line md:grid-cols-4">
      <div className="flex aspect-square items-center justify-center bg-black p-8">
        <Image src={logos.arms} alt="Fit User arms mark" width={240} height={240} className="h-auto w-full max-w-[180px]" />
      </div>
      <div className="flex aspect-square items-center justify-center bg-white p-8">
        <Image src={logos.wordmarkBlack} alt="Fit User" width={400} height={120} className="h-auto w-full" />
      </div>
      <div className="flex aspect-square items-center justify-center bg-black p-8">
        <Image src={logos.wordmarkWhite} alt="Fit User" width={400} height={120} className="h-auto w-full" />
      </div>
      <div className="flex aspect-square items-center justify-center bg-white p-8">
        <Image src={logos.mark} alt="" width={200} height={200} className="h-auto w-2/3 invert" />
      </div>
    </div>
  );
}

export function FramedShot({
  src,
  alt,
  priority = false,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative aspect-[4/5] overflow-hidden border border-white/15 bg-black">
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        className="object-cover object-top"
        sizes="(min-width: 1024px) 40vw, 100vw"
      />
    </div>
  );
}
