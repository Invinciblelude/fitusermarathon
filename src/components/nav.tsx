"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandLockup } from "./logo";

const links = [
  { href: "/join", label: "Join" },
  { href: "/join#pack", label: "Pack" },
  { href: "/check-in", label: "Check in" },
];

export function Nav() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 right-0 left-0 z-50 border-b border-white/10 bg-black/95 backdrop-blur-md">
      <div className="mx-auto flex h-[4.25rem] max-w-6xl items-center justify-between px-4 sm:px-6">
        <BrandLockup compact />
        <div className="hidden items-center gap-7 sm:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`font-display text-xs tracking-[0.18em] uppercase ${
                pathname === link.href ? "text-white" : "text-white/50 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <Link href="/commit" className="fu-btn-sm">
            $100 shirt
          </Link>
        </div>
        <button
          type="button"
          className="border border-white/20 px-3 py-1.5 font-display text-xs tracking-[0.16em] uppercase sm:hidden"
          onClick={() => setIsOpen((open) => !open)}
        >
          Menu
        </button>
      </div>
      {isOpen && (
        <div className="flex flex-col gap-3 border-t border-white/10 px-4 py-4 sm:hidden">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className="font-display text-sm tracking-[0.16em] uppercase"
            >
              {link.label}
            </Link>
          ))}
          <Link href="/commit" onClick={() => setIsOpen(false)} className="fu-btn-sm text-center">
            $100 shirt
          </Link>
        </div>
      )}
    </nav>
  );
}
