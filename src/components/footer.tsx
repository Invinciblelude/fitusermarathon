import { BrandLockup } from "./logo";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/10">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-10 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <BrandLockup compact />
        <p className="text-sm text-muted">
          Fitness doesn&apos;t have to be hard. The best is in you.
        </p>
        <p className="text-sm text-muted">
          <Link href="/join" className="text-white hover:text-white/70">
            Join
          </Link>
          {" · "}
          <Link href="/flyer" className="text-white hover:text-white/70">
            Flyer
          </Link>
          {" · "}
          <Link href="/check-in" className="text-white hover:text-white/70">
            Check in
          </Link>
        </p>
      </div>
    </footer>
  );
}
