"use client";

import { useState } from "react";
import { MIN_INVESTMENT, CATEGORY_LABELS, ROI_LABELS, naira } from "@/lib/data";
import { useOshen } from "@/lib/store";
import ScoreBadge from "./ScoreBadge";
import PhaseTracker from "./PhaseTracker";
import { IconClose, IconPlay } from "./Icons";

export default function ListingModal({ listing, onClose }) {
  const { invest } = useOshen();
  const [step, setStep] = useState("detail"); // detail | invest | confirm
  const [amount, setAmount] = useState(MIN_INVESTMENT);
  const [kycChecked, setKycChecked] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!listing) return null;
  const pct = Math.min(100, Math.round((listing.raised / listing.target) * 100));
  const remaining = listing.target - listing.raised;

  function handleInvest() {
    if (amount < MIN_INVESTMENT || !kycChecked) return;
    setSubmitting(true);
    setTimeout(() => {
      invest(listing.id, Math.min(amount, remaining));
      setSubmitting(false);
      setStep("confirm");
    }, 900);
  }

  return (
    <div className="fixed inset-0 z-40 flex items-end sm:items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative w-full sm:max-w-lg max-h-[90vh] overflow-y-auto no-scrollbar bg-ink2 border border-lineSoft rounded-t-2xl sm:rounded-2xl p-6 animate-riseIn">
        <button onClick={onClose} className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-ink3 text-boneFaint hover:text-bone transition-colors">
          <IconClose width="16" height="16" />
        </button>

        {step === "detail" && (
          <>
            <div className="flex items-start justify-between gap-3 pr-8 mb-1">
              <h2 className="font-display font-semibold text-lg">{listing.name}</h2>
              <ScoreBadge score={listing.oshenScore} />
            </div>
            <p className="text-[12.5px] text-boneFaint mb-4">
              {listing.location} · Founder: {listing.founder}
            </p>

            <p className="text-[13.5px] leading-relaxed text-boneDim mb-5">{listing.description}</p>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <InfoBlock label="Category" value={CATEGORY_LABELS[listing.category]} />
              <InfoBlock label="Return type" value={ROI_LABELS[listing.roiType]} />
            </div>

            <div className="bg-ink3 border border-lineSoft rounded-xl p-3.5 mb-5">
              <span className="font-mono text-[10px] uppercase tracking-wide text-boneFaint">Return terms</span>
              <p className="text-[13px] mt-1">{listing.roiTerms}</p>
            </div>

            <div className="mb-5">
              <div className="h-2 rounded-full bg-ink3 overflow-hidden">
                <div className="h-full bg-teal rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <div className="flex items-center justify-between mt-1.5 text-[12.5px]">
                <span className="text-bone font-medium">{naira(listing.raised)} raised ({pct}%)</span>
                <span className="text-boneFaint">Target {naira(listing.target)}</span>
              </div>
            </div>

            <div className="mb-5">
              <span className="font-mono text-[10px] uppercase tracking-wide text-boneFaint mb-2 block">
                Disbursement phases
              </span>
              <PhaseTracker phases={listing.phases} compact />
            </div>

            <div className="flex items-center gap-2 bg-ink3 border border-dashed border-lineSoft rounded-xl px-3.5 py-3 mb-5 text-[12px] text-boneDim">
              <IconPlay width="16" height="16" className="text-teal2 shrink-0" />
              Founder video walkthrough — explains why each phase needs its amount before it unlocks. (Playback not wired up in this prototype.)
            </div>

            {remaining > 0 ? (
              <button
                onClick={() => setStep("invest")}
                className="w-full bg-teal hover:bg-teal2 text-ink font-semibold py-3 rounded-xl transition-colors"
              >
                Invest from {naira(MIN_INVESTMENT)}
              </button>
            ) : (
              <div className="w-full text-center bg-ink3 border border-lineSoft text-boneDim py-3 rounded-xl text-sm">
                Fully funded — now in phased execution
              </div>
            )}
          </>
        )}

        {step === "invest" && (
          <>
            <h2 className="font-display font-semibold text-lg mb-1">Invest in {listing.name}</h2>
            <p className="text-boneDim text-[12.5px] mb-5">
              Minimum {naira(MIN_INVESTMENT)}. Funds only reach the founder in phases you can vote on.
            </p>

            <label className="text-[11.5px] font-bold text-boneDim mb-1.5 block">Amount (₦)</label>
            <input
              type="number"
              min={MIN_INVESTMENT}
              step={5000}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="w-full bg-ink3 border border-line focus:border-teal rounded-lg px-3 py-2.5 text-sm outline-none transition-colors mb-2"
            />
            {amount < MIN_INVESTMENT && (
              <p className="text-danger text-[11.5px] mb-3">Minimum investment is {naira(MIN_INVESTMENT)}.</p>
            )}
            <div className="flex gap-2 mb-5">
              {[50000, 100000, 250000, 500000].map((v) => (
                <button
                  key={v}
                  onClick={() => setAmount(v)}
                  className="flex-1 py-1.5 rounded-lg border border-lineSoft hover:border-teal text-[12px] transition-colors"
                >
                  {naira(v)}
                </button>
              ))}
            </div>

            <label className="flex items-start gap-2.5 bg-ink3 border border-lineSoft rounded-lg px-3.5 py-3 mb-5 cursor-pointer">
              <input
                type="checkbox"
                checked={kycChecked}
                onChange={(e) => setKycChecked(e.target.checked)}
                className="mt-0.5 accent-teal"
              />
              <span className="text-[12px] text-boneDim leading-relaxed">
                I confirm my identity has been verified (mock BVN check for this prototype — no real verification
                happens here).
              </span>
            </label>

            <div className="flex gap-2">
              <button
                onClick={() => setStep("detail")}
                className="flex-1 py-3 rounded-xl border border-lineSoft text-sm text-boneDim hover:text-bone transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleInvest}
                disabled={amount < MIN_INVESTMENT || !kycChecked || submitting}
                className="flex-1 py-3 rounded-xl bg-teal hover:bg-teal2 disabled:opacity-40 text-ink font-semibold text-sm transition-colors flex items-center justify-center gap-2"
              >
                {submitting && <span className="spinner" />}
                Confirm investment
              </button>
            </div>
          </>
        )}

        {step === "confirm" && (
          <div className="text-center py-6">
            <div className="w-14 h-14 rounded-full bg-verifiedDim border-[1.5px] border-verified flex items-center justify-center mx-auto mb-4 text-verified">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            </div>
            <h2 className="font-display font-semibold text-lg mb-1.5">You're in.</h2>
            <p className="text-boneDim text-[13px] mb-6 leading-relaxed">
              Your investment in {listing.name} is confirmed. Track it, and vote on phase releases, from your
              dashboard.
            </p>
            <button
              onClick={onClose}
              className="w-full bg-teal hover:bg-teal2 text-ink font-semibold py-3 rounded-xl transition-colors"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="bg-ink3 border border-lineSoft rounded-lg px-3 py-2.5">
      <span className="font-mono text-[9.5px] uppercase tracking-wide text-boneFaint block mb-0.5">{label}</span>
      <span className="text-[13px] font-medium">{value}</span>
    </div>
  );
}
