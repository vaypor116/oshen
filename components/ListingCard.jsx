"use client";

import { CATEGORY_LABELS, ROI_LABELS, naira } from "@/lib/data";
import ScoreBadge from "./ScoreBadge";

export default function ListingCard({ listing, onOpen }) {
  const pct = Math.min(100, Math.round((listing.raised / listing.target) * 100));

  return (
    <button
      onClick={() => onOpen(listing)}
      className="text-left bg-ink2 border border-lineSoft hover:border-teal rounded-2xl p-5 transition-colors flex flex-col gap-3.5 animate-riseIn"
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="font-display font-semibold text-[15px]">{listing.name}</div>
          <div className="text-[12px] text-boneFaint">{listing.location}</div>
        </div>
        <ScoreBadge score={listing.oshenScore} size="sm" />
      </div>

      <p className="text-[13px] text-boneDim leading-relaxed">{listing.tagline}</p>

      <div className="flex items-center gap-2 flex-wrap">
        <span className="text-[10.5px] font-mono uppercase tracking-wide px-2 py-1 rounded-full bg-ink3 border border-lineSoft text-boneDim">
          {CATEGORY_LABELS[listing.category]}
        </span>
        <span className="text-[10.5px] font-mono uppercase tracking-wide px-2 py-1 rounded-full bg-ink3 border border-lineSoft text-gold2">
          {ROI_LABELS[listing.roiType]}
        </span>
      </div>

      <div>
        <div className="h-1.5 rounded-full bg-ink3 overflow-hidden">
          <div className="h-full bg-teal rounded-full" style={{ width: `${pct}%` }} />
        </div>
        <div className="flex items-center justify-between mt-1.5 text-[11.5px]">
          <span className="text-bone font-medium">{naira(listing.raised)} raised</span>
          <span className="text-boneFaint">of {naira(listing.target)}</span>
        </div>
      </div>
    </button>
  );
}
