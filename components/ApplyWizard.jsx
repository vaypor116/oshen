"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CATEGORIES, ROI_TYPES, naira } from "@/lib/data";
import { useOshen } from "@/lib/store";

const STEPS = ["basics", "returns", "phases", "video", "review"];

export default function ApplyWizard() {
  const router = useRouter();
  const { submitApplication, approveApplication, showToast } = useOshen();
  const [stepIndex, setStepIndex] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [vetting, setVetting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "agritech",
    location: "",
    tagline: "",
    description: "",
    target: 3000000,
    roiType: "revenue-share",
    roiTerms: "",
    phases: [
      { title: "Setup & sourcing", amount: 750000, description: "" },
      { title: "First production run", amount: 750000, description: "" },
      { title: "Distribution scale-up", amount: 750000, description: "" },
      { title: "Market expansion", amount: 750000, description: "" },
    ],
    videoNote: "",
  });

  const step = STEPS[stepIndex];
  const goNext = () => setStepIndex((i) => Math.min(i + 1, STEPS.length - 1));
  const goBack = () => setStepIndex((i) => Math.max(i - 1, 0));

  function updatePhase(i, patch) {
    setForm((f) => ({ ...f, phases: f.phases.map((p, idx) => (idx === i ? { ...p, ...patch } : p)) }));
  }

  const phaseTotal = form.phases.reduce((sum, p) => sum + Number(p.amount || 0), 0);

  const canContinue = {
    basics: form.name.trim() && form.tagline.trim() && form.description.trim(),
    returns: form.roiTerms.trim(),
    phases: phaseTotal > 0,
    video: true,
    review: true,
  }[step];

  function handleSubmit() {
    setSubmitted(true);
    const id = submitApplication({ ...form, target: phaseTotal });
    setVetting(true);
    setTimeout(() => {
      const score = 65 + Math.floor(Math.random() * 25); // demo vetting score
      approveApplication(id, score);
      router.push("/builder");
    }, 1800);
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto text-center py-20 px-6">
        {vetting ? (
          <>
            <div className="spinner mx-auto mb-5" style={{ width: 28, height: 28, borderWidth: 3 }} />
            <h2 className="font-display font-semibold text-lg mb-2">Vetting your application</h2>
            <p className="text-boneDim text-[13.5px] leading-relaxed">
              In production this checks business registration, phase reasonableness, and founder identity. For this
              prototype, it's simulated.
            </p>
          </>
        ) : null}
      </div>
    );
  }

  return (
    <div className="max-w-lg mx-auto px-5 sm:px-6 py-10">
      <div className="flex items-center gap-2 mb-8">
        {STEPS.map((s, i) => (
          <div
            key={s}
            className={`h-1.5 flex-1 rounded-full transition-colors ${
              i === stepIndex ? "bg-teal" : i < stepIndex ? "bg-verified" : "bg-lineSoft"
            }`}
          />
        ))}
      </div>

      <div className="bg-ink2 border border-lineSoft rounded-2xl p-6 sm:p-8 animate-riseIn">
        {step === "basics" && (
          <Shell title="Tell us about the business" sub="What you're building and who it's for.">
            <Field label="Business name">
              <input
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                placeholder="e.g. Kaduna Solar Works"
                className="input"
              />
            </Field>
            <Field label="Category">
              <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="input">
                {CATEGORIES.map((c) => (
                  <option key={c.id} value={c.id}>{c.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Location">
              <input
                value={form.location}
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="e.g. Kaduna, Nigeria"
                className="input"
              />
            </Field>
            <Field label="One-line pitch">
              <input
                value={form.tagline}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                placeholder="What you do, in one sentence"
                className="input"
              />
            </Field>
            <Field label="Full description">
              <textarea
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
                rows={4}
                placeholder="What you're building, who buys it, and what this raise is for"
                className="input resize-none"
              />
            </Field>
          </Shell>
        )}

        {step === "returns" && (
          <Shell title="What return are you offering?" sub="Pick the structure, then explain the terms plainly.">
            <Field label="Return type">
              <select value={form.roiType} onChange={(e) => setForm({ ...form, roiType: e.target.value })} className="input">
                {ROI_TYPES.map((r) => (
                  <option key={r.id} value={r.id}>{r.label}</option>
                ))}
              </select>
            </Field>
            <Field label="Terms, in plain language">
              <textarea
                value={form.roiTerms}
                onChange={(e) => setForm({ ...form, roiTerms: e.target.value })}
                rows={3}
                placeholder="e.g. 6% of monthly revenue paid to investors for 30 months"
                className="input resize-none"
              />
            </Field>
          </Shell>
        )}

        {step === "phases" && (
          <Shell title="Break the raise into phases" sub="At least four. Funds release one phase at a time.">
            {form.phases.map((p, i) => (
              <div key={i} className="mb-4 pb-4 border-b border-lineSoft last:border-0 last:pb-0 last:mb-0">
                <span className="font-mono text-[10px] uppercase tracking-wide text-boneFaint mb-1.5 block">
                  Phase {i + 1}
                </span>
                <input
                  value={p.title}
                  onChange={(e) => updatePhase(i, { title: e.target.value })}
                  className="input mb-2"
                  placeholder="Phase title"
                />
                <input
                  type="number"
                  value={p.amount}
                  onChange={(e) => updatePhase(i, { amount: Number(e.target.value) })}
                  className="input mb-2"
                  placeholder="Amount (₦)"
                />
                <textarea
                  value={p.description}
                  onChange={(e) => updatePhase(i, { description: e.target.value })}
                  rows={2}
                  placeholder="What this phase covers and how you'll know it's done"
                  className="input resize-none"
                />
              </div>
            ))}
            <p className="text-[12.5px] text-boneDim mt-2">
              Total raise target: <span className="text-bone font-semibold">{naira(phaseTotal)}</span>
            </p>
          </Shell>
        )}

        {step === "video" && (
          <Shell title="Founder video note" sub="In production, you'd record a short video per phase justifying the amount. For this prototype, write what you'd say.">
            <Field label="What would you tell investors?">
              <textarea
                value={form.videoNote}
                onChange={(e) => setForm({ ...form, videoNote: e.target.value })}
                rows={5}
                placeholder="Explain why you need this amount, phase by phase..."
                className="input resize-none"
              />
            </Field>
          </Shell>
        )}

        {step === "review" && (
          <div>
            <h2 className="font-display font-semibold text-lg mb-1">Ready to submit</h2>
            <p className="text-boneDim text-[12.5px] mb-5">
              This goes to OSHEN for vetting before it's listed publicly.
            </p>
            <div className="space-y-2 mb-6">
              <ReviewRow label="Business" value={form.name} />
              <ReviewRow label="Pitch" value={form.tagline} />
              <ReviewRow label="Return" value={form.roiTerms} />
              <ReviewRow label="Total raise" value={naira(phaseTotal)} />
              <ReviewRow label="Phases" value={`${form.phases.length} phases`} />
            </div>
            <button
              onClick={handleSubmit}
              className="w-full bg-teal hover:bg-teal2 text-ink font-semibold py-3 rounded-xl transition-colors"
            >
              Submit for vetting
            </button>
          </div>
        )}

        {step !== "review" && (
          <div className="flex items-center justify-between mt-7">
            <button onClick={goBack} disabled={stepIndex === 0} className="text-boneFaint hover:text-bone text-sm disabled:opacity-0 transition-colors">
              Back
            </button>
            <button
              onClick={goNext}
              disabled={!canContinue}
              className="bg-teal hover:bg-teal2 disabled:opacity-40 text-ink font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
            >
              Continue
            </button>
          </div>
        )}
      </div>

      <style jsx global>{`
        .input {
          width: 100%;
          background: #1e2e3a;
          border: 1px solid #2b3f4d;
          border-radius: 8px;
          padding: 10px 12px;
          font-size: 13.5px;
          color: #eaf2f0;
          outline: none;
          transition: border-color 0.15s ease;
        }
        .input:focus {
          border-color: #2fb8a6;
        }
        .input::placeholder {
          color: #5e706c;
        }
      `}</style>
    </div>
  );
}

function Shell({ title, sub, children }) {
  return (
    <div>
      <h2 className="font-display font-semibold text-lg mb-1">{title}</h2>
      <p className="text-boneDim text-[12.5px] mb-5">{sub}</p>
      {children}
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="mb-4 last:mb-0">
      <label className="text-[11.5px] font-bold text-boneDim mb-1.5 block">{label}</label>
      {children}
    </div>
  );
}

function ReviewRow({ label, value }) {
  return (
    <div className="flex items-start justify-between gap-4 bg-ink3 border border-lineSoft rounded-lg px-4 py-3">
      <span className="font-mono text-[10px] uppercase tracking-wide text-boneFaint mt-0.5 whitespace-nowrap">
        {label}
      </span>
      <span className="text-sm text-right">{value}</span>
    </div>
  );
}
