"use client";

import Link from "next/link";
import { useOshen } from "@/lib/store";
import { naira } from "@/lib/data";
import { IconArrowRight, IconTrendUp, IconVote, IconMentor } from "@/components/Icons";

export default function LandingPage() {
  const { listings } = useOshen();
  const totalRaised = listings.reduce((sum, l) => sum + l.raised, 0);
  const founders = new Set(listings.map((l) => l.founder)).size;

  return (
    <main>
      <section className="max-w-4xl mx-auto px-5 sm:px-6 pt-16 sm:pt-24 pb-16 text-center">
        <span className="inline-block font-mono text-[11px] uppercase tracking-wide text-teal2 bg-tealDim border border-teal rounded-full px-3 py-1 mb-6">
          Africa&rsquo;s community investment platform
        </span>
        <h1 className="font-display font-bold text-3xl sm:text-5xl leading-tight mb-5">
          Invest in the businesses<br className="hidden sm:block" /> you already believe in.
        </h1>
        <p className="text-boneDim text-[15px] sm:text-lg max-w-2xl mx-auto mb-9 leading-relaxed">
          From as little as {naira(50000)}, back vetted African builders — and keep patronizing what you invest in.
          Funds release in phases you help hold them accountable to, not all at once.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/explore"
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-teal hover:bg-teal2 text-ink font-semibold px-6 py-3.5 rounded-xl transition-colors"
          >
            Explore investments <IconArrowRight width="16" height="16" />
          </Link>
          <Link
            href="/apply"
            className="w-full sm:w-auto flex items-center justify-center gap-2 border border-lineSoft hover:border-teal px-6 py-3.5 rounded-xl transition-colors text-bone font-medium"
          >
            Apply as a builder
          </Link>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-16">
        <div className="grid grid-cols-3 gap-3 sm:gap-6 bg-ink2 border border-lineSoft rounded-2xl p-6 sm:p-8">
          <Stat value={naira(totalRaised)} label="Raised on OSHEN" />
          <Stat value={listings.length} label="Vetted builders" />
          <Stat value={founders + "+"} label="Founders funded" />
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-5 sm:px-6 pb-20">
        <h2 className="font-display font-semibold text-xl sm:text-2xl text-center mb-10">How it works</h2>
        <div className="grid sm:grid-cols-3 gap-5">
          <HowStep
            icon={<IconTrendUp width="20" height="20" />}
            title="Browse vetted builders"
            body="Every listing carries an OSHEN Score from our vetting process, so you know what's been checked before you invest."
          />
          <HowStep
            icon={<IconVote width="20" height="20" />}
            title="Vote on phase releases"
            body="Funds disburse in phases, not all at once. Each founder explains what a phase needs — the community votes to release it."
          />
          <HowStep
            icon={<IconMentor width="20" height="20" />}
            title="Founders get support"
            body="When things get hard, founders can request mentorship from OSHEN's business consultants — before a phase stalls."
          />
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }) {
  return (
    <div className="text-center">
      <div className="font-display font-bold text-lg sm:text-2xl text-bone">{value}</div>
      <div className="text-[11px] sm:text-[12.5px] text-boneFaint mt-1">{label}</div>
    </div>
  );
}

function HowStep({ icon, title, body }) {
  return (
    <div className="bg-ink2 border border-lineSoft rounded-2xl p-6">
      <div className="w-10 h-10 rounded-full bg-tealDim border border-teal flex items-center justify-center text-teal2 mb-4">
        {icon}
      </div>
      <h3 className="font-display font-semibold text-[15px] mb-1.5">{title}</h3>
      <p className="text-[13px] text-boneDim leading-relaxed">{body}</p>
    </div>
  );
}
