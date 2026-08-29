"use client";

import { naira } from "@/lib/data";
import { IconLock, IconCheck, IconPlay } from "./Icons";

export default function PhaseTracker({ phases, compact = false }) {
  return (
    <div className="flex flex-col gap-2.5">
      {phases.map((p, i) => {
        const isReleased = p.status === "released";
        const isActive = p.status === "active";
        const isAwaiting = p.status === "awaiting_vote";
        const isLocked = p.status === "locked";

        return (
          <div
            key={p.id}
            className={`flex items-start gap-3 rounded-xl border px-3.5 py-3 transition-colors ${
              isReleased
                ? "border-verified bg-verifiedDim"
                : isActive
                ? "border-teal bg-tealDim"
                : isAwaiting
                ? "border-gold bg-goldDim"
                : "border-lineSoft bg-ink3"
            }`}
          >
            <div
              className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 border-[1.5px] ${
                isReleased
                  ? "border-verified text-verified"
                  : isActive
                  ? "border-teal text-teal2"
                  : isAwaiting
                  ? "border-gold text-gold2"
                  : "border-lineSoft text-boneFaint"
              }`}
            >
              {isReleased ? (
                <IconCheck width="14" height="14" />
              ) : isLocked ? (
                <IconLock width="13" height="13" />
              ) : (
                <span className="font-mono text-[11px]">{i + 1}</span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between gap-2 flex-wrap">
                <span className="font-semibold text-[13.5px]">{p.title}</span>
                <span className="font-mono text-[12px] text-boneDim">{naira(p.amount)}</span>
              </div>
              {!compact && <p className="text-[12px] text-boneDim mt-1 leading-relaxed">{p.description}</p>}
              <span
                className={`inline-block mt-1.5 font-mono text-[9.5px] uppercase tracking-wide ${
                  isReleased
                    ? "text-verified"
                    : isActive
                    ? "text-teal2"
                    : isAwaiting
                    ? "text-gold2"
                    : "text-boneFaint"
                }`}
              >
                {isReleased ? "Released" : isActive ? "In progress" : isAwaiting ? "Awaiting community vote" : "Locked"}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
