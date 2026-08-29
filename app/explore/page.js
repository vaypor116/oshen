"use client";

import { useState } from "react";
import { useOshen } from "@/lib/store";
import { CATEGORIES, ROI_TYPES } from "@/lib/data";
import ListingCard from "@/components/ListingCard";
import ListingModal from "@/components/ListingModal";

export default function ExplorePage() {
  const { listings } = useOshen();
  const [category, setCategory] = useState("all");
  const [roiType, setRoiType] = useState("all");
  const [activeId, setActiveId] = useState(null);

  const visible = listings.filter(
    (l) =>
      l.status !== "review" &&
      (category === "all" || l.category === category) &&
      (roiType === "all" || l.roiType === roiType)
  );
  const active = listings.find((l) => l.id === activeId) || null;

  return (
    <main className="max-w-6xl mx-auto px-5 sm:px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Explore investments</h1>
      <p className="text-boneDim text-[13.5px] mb-6">Vetted builders, open for community investment right now.</p>

      <div className="flex gap-2 mb-7 flex-wrap">
        <select value={category} onChange={(e) => setCategory(e.target.value)} className="filter-select">
          <option value="all">All categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.id} value={c.id}>{c.label}</option>
          ))}
        </select>
        <select value={roiType} onChange={(e) => setRoiType(e.target.value)} className="filter-select">
          <option value="all">All return types</option>
          {ROI_TYPES.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </div>

      {visible.length === 0 ? (
        <div className="text-center py-20 text-boneFaint text-sm">No listings match those filters.</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {visible.map((l) => (
            <ListingCard key={l.id} listing={l} onOpen={(listing) => setActiveId(listing.id)} />
          ))}
        </div>
      )}

      {active && <ListingModal listing={active} onClose={() => setActiveId(null)} />}

      <style jsx global>{`
        .filter-select {
          background: #1e2e3a;
          border: 1px solid #2b3f4d;
          border-radius: 10px;
          padding: 8px 12px;
          font-size: 13px;
          color: #eaf2f0;
          outline: none;
        }
        .filter-select:focus {
          border-color: #2fb8a6;
        }
      `}</style>
    </main>
  );
}
