"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { IconMenu, IconClose } from "./Icons";

const LINKS = [
  { href: "/explore", label: "Explore" },
  { href: "/dashboard", label: "Investor dashboard" },
  { href: "/builder", label: "Builder dashboard" },
];

export default function Nav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 bg-ink/90 backdrop-blur border-b border-lineSoft">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 flex items-center justify-between h-16">
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-7 h-7 rounded-full border-[1.5px] border-teal flex items-center justify-center">
            <div className="w-[7px] h-[7px] rounded-full bg-teal" />
          </div>
          <span className="font-display font-bold text-[16px]">OSHEN</span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-2 rounded-lg text-[13.5px] font-medium transition-colors ${
                pathname === l.href ? "bg-ink3 text-bone" : "text-boneDim hover:text-bone hover:bg-ink3/60"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/apply"
            className="ml-2 px-4 py-2 rounded-lg bg-teal hover:bg-teal2 text-ink text-[13.5px] font-semibold transition-colors"
          >
            Apply as a builder
          </Link>
        </nav>

        <button className="md:hidden p-2 rounded-lg hover:bg-ink3 transition-colors" onClick={() => setOpen(!open)}>
          {open ? <IconClose width="20" height="20" /> : <IconMenu width="20" height="20" />}
        </button>
      </div>

      {open && (
        <div className="md:hidden border-t border-lineSoft px-5 py-3 flex flex-col gap-1">
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`px-3 py-2.5 rounded-lg text-sm font-medium ${
                pathname === l.href ? "bg-ink3 text-bone" : "text-boneDim"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <Link
            href="/apply"
            onClick={() => setOpen(false)}
            className="mt-1 px-3 py-2.5 rounded-lg bg-teal text-ink text-sm font-semibold text-center"
          >
            Apply as a builder
          </Link>
        </div>
      )}
    </header>
  );
}
