"use client";

import { useState } from "react";
import { naira } from "@/lib/data";
import { useOshen } from "@/lib/store";

const REASONS = [
  "Founder update matches what was promised",
  "Milestone evidence looks credible",
  "Not enough detail to judge yet",
  "Timeline has slipped without explanation",
];

export default function VotePanel({ listing, phase }) {
  const { voteOnPhase } = useOshen();
  const [reason, setReason] = useState(REASONS[0]);
  const [voted, setVoted] = useState(null);

  const totalVotes = phase.votes.approve + phase.votes.reject;

  function cast(decision) {
    voteOnPhase(listing.id, phase.id, decision);
    setVoted(decision);
  }

  return (
    <div className="bg-goldDim border border-gold rounded-xl p-4 mt-2">
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-wide text-gold2">Community vote needed</span>
        <span className="font-mono text-[11px] text-boneDim">{totalVotes}/3 votes in</span>
      </div>
      <p className="text-[13px] mb-3">
        Release <span className="font-semibold">{naira(phase.amount)}</span> for &ldquo;{phase.title}&rdquo;?
      </p>

      {voted ? (
        <p className="text-[12.5px] text-boneDim">
          You voted to <b className="text-bone">{voted === "approve" ? "release" : "hold"}</b> this phase. Waiting on
          the rest of the community.
        </p>
      ) : (
        <>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="w-full bg-ink3 border border-line focus:border-teal rounded-lg px-2.5 py-2 text-[12.5px] outline-none mb-3 transition-colors"
          >
            {REASONS.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </select>
          <div className="flex gap-2">
            <button
              onClick={() => cast("reject")}
              className="flex-1 py-2 rounded-lg border border-danger text-danger text-[12.5px] font-semibold hover:bg-dangerDim transition-colors"
            >
              Hold funds
            </button>
            <button
              onClick={() => cast("approve")}
              className="flex-1 py-2 rounded-lg bg-teal hover:bg-teal2 text-ink text-[12.5px] font-semibold transition-colors"
            >
              Approve release
            </button>
          </div>
        </>
      )}
    </div>
  );
}
