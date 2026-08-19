import { logos } from "@/lib/brand";
import Image from "next/image";

export function ShirtMockup() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="relative border border-white/20 bg-mist px-8 py-10">
        <svg viewBox="0 0 280 300" className="h-auto w-full" aria-hidden>
          <path
            d="M70 70 L40 92 L58 132 L78 118 V250 Q78 268 96 268 H184 Q202 268 202 250 V118 L222 132 L240 92 L210 70 L188 86 H92 Z"
            fill="#050505"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <path
            d="M92 86 L108 48 H172 L188 86"
            fill="#050505"
            stroke="#ffffff"
            strokeWidth="2"
          />
          <path d="M108 48 Q140 62 172 48" fill="none" stroke="#ffffff" strokeWidth="2" />
        </svg>
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <div className="mt-8 flex w-[52%] flex-col items-center">
            <Image
              src={logos.mark}
              alt=""
              width={80}
              height={80}
              className="h-10 w-10"
            />
            <Image
              src={logos.wordmarkWhite}
              alt="Fit User wordmark on pack shirt"
              width={232}
              height={70}
              className="mt-2 h-auto w-full"
            />
            <p className="mt-2 font-display text-[9px] tracking-[0.42em] text-white/70 uppercase">
              Marathon
            </p>
          </div>
        </div>
      </div>
      <p className="mt-3 text-center font-display text-xs tracking-[0.18em] text-muted uppercase">
        $100 pack shirt · black + white
      </p>
    </div>
  );
}
