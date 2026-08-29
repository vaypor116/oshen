"use client";

import { useOshen } from "@/lib/store";
import { naira } from "@/lib/data";
import PhaseTracker from "@/components/PhaseTracker";
import VotePanel from "@/components/VotePanel";
import ScoreBadge from "@/components/ScoreBadge";
import Link from "next/link";

export default function DashboardPage() {
  const { listings, portfolio } = useOshen();

  const holdings = portfolio
    .map((p) => ({ ...p, listing: listings.find((l) => l.id === p.listingId) }))
    .filter((h) => h.listing);

  const totalInvested = holdings.reduce((sum, h) => sum + h.amount, 0);

  return (
    <main className="max-w-4xl mx-auto px-5 sm:px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Your portfolio</h1>
      <p className="text-boneDim text-[13.5px] mb-7">
        Total invested: <span className="text-bone font-semibold">{naira(totalInvested)}</span> across{" "}
        {holdings.length} {holdings.length === 1 ? "business" : "businesses"}
      </p>

      {holdings.length === 0 ? (
        <div className="text-center py-20 bg-ink2 border border-lineSoft rounded-2xl">
          <p className="text-boneDim text-sm mb-4">You haven&rsquo;t invested in anything yet.</p>
          <Link href="/explore" className="inline-block bg-teal hover:bg-teal2 text-ink font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
            Explore investments
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {holdings.map((h) => {
            const awaitingPhase = h.listing.phases.find((p) => p.status === "awaiting_vote");
            return (
              <div key={h.listingId} className="bg-ink2 border border-lineSoft rounded-2xl p-5 animate-riseIn">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <div className="font-display font-semibold text-[15px]">{h.listing.name}</div>
                    <div className="text-[12px] text-boneFaint">{h.listing.location}</div>
                  </div>
                  <ScoreBadge score={h.listing.oshenScore} size="sm" />
                </div>
                <p className="text-[12.5px] text-boneDim mb-4">
                  You&rsquo;ve invested <span className="text-bone font-medium">{naira(h.amount)}</span> ·{" "}
                  {h.listing.roiTerms}
                </p>

                <PhaseTracker phases={h.listing.phases} compact />

                {awaitingPhase && <VotePanel listing={h.listing} phase={awaitingPhase} />}
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
