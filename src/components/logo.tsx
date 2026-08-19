import { logos } from "@/lib/brand";
import Image from "next/image";
import Link from "next/link";

interface BrandLockupProps {
  href?: string;
  compact?: boolean;
}

export function BrandLockup({ href = "/", compact = false }: BrandLockupProps) {
  const inner = (
    <>
      <Image
        src={logos.mark}
        alt=""
        width={80}
        height={80}
        className="h-9 w-9"
        priority
      />
      <Image
        src={logos.wordmarkWhite}
        alt="Fit User"
        width={232}
        height={70}
        className="h-7 w-auto sm:h-8"
        priority
      />
      {!compact && (
        <span className="hidden border-l border-white/20 pl-3 font-display text-[11px] font-semibold tracking-[0.32em] text-white/55 uppercase sm:block">
          Get fit
        </span>
      )}
    </>
  );

  if (!href) {
    return <span className="flex items-center gap-3">{inner}</span>;
  }

  return (
    <Link href={href} className="flex items-center gap-3">
      {inner}
    </Link>
  );
}

export function ArmsMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <Image
      src={logos.mark}
      alt=""
      width={80}
      height={80}
      className={className}
      aria-hidden
    />
  );
}
