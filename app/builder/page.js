"use client";

import { useState } from "react";
import { useOshen } from "@/lib/store";
import { naira, MENTOR_TOPICS } from "@/lib/data";
import PhaseTracker from "@/components/PhaseTracker";
import ScoreBadge from "@/components/ScoreBadge";
import { IconMentor } from "@/components/Icons";
import Link from "next/link";

export default function BuilderDashboardPage() {
  const { listings, requestMentorship } = useOshen();
  // Demo: "your" listings are the ones founded by "You" (from /apply) plus one seed example.
  const mine = listings.filter((l) => l.founder === "You" || l.id === "l1");
  const [mentorOpenFor, setMentorOpenFor] = useState(null);
  const [topic, setTopic] = useState(MENTOR_TOPICS[0]);

  function sendMentorRequest(listingId) {
    requestMentorship(listingId, topic);
    setMentorOpenFor(null);
  }

  return (
    <main className="max-w-4xl mx-auto px-5 sm:px-6 py-10">
      <h1 className="font-display font-bold text-2xl mb-1">Builder dashboard</h1>
      <p className="text-boneDim text-[13.5px] mb-7">
        Track disbursement per phase, and request mentorship if something&rsquo;s off track.
      </p>

      {mine.length === 0 ? (
        <div className="text-center py-20 bg-ink2 border border-lineSoft rounded-2xl">
          <p className="text-boneDim text-sm mb-4">You don&rsquo;t have a listing yet.</p>
          <Link href="/apply" className="inline-block bg-teal hover:bg-teal2 text-ink font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors">
            Apply as a builder
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-5">
          {mine.map((l) => {
            const released = l.phases.filter((p) => p.status === "released").reduce((s, p) => s + p.amount, 0);
            return (
              <div key={l.id} className="bg-ink2 border border-lineSoft rounded-2xl p-5 animate-riseIn">
                <div className="flex items-start justify-between gap-3 mb-1">
                  <div>
                    <div className="font-display font-semibold text-[15px]">{l.name}</div>
                    <div className="text-[12px] text-boneFaint">{l.location}</div>
                  </div>
                  <ScoreBadge score={l.oshenScore} size="sm" />
                </div>

                <div className="grid grid-cols-2 gap-3 my-4">
                  <MiniStat label="Raised" value={naira(l.raised)} />
                  <MiniStat label="Released to you" value={naira(released)} />
                </div>

                <PhaseTracker phases={l.phases} />

                <div className="mt-4">
                  {mentorOpenFor === l.id ? (
                    <div className="bg-ink3 border border-lineSoft rounded-xl p-3.5">
                      <span className="text-[11.5px] font-bold text-boneDim mb-1.5 block">What's going on?</span>
                      <select
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        className="w-full bg-ink4 border border-line focus:border-teal rounded-lg px-2.5 py-2 text-[12.5px] outline-none mb-3 transition-colors"
                      >
                        {MENTOR_TOPICS.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                      <div className="flex gap-2">
                        <button onClick={() => setMentorOpenFor(null)} className="flex-1 py-2 rounded-lg border border-lineSoft text-[12.5px] text-boneDim transition-colors">
                          Cancel
                        </button>
                        <button onClick={() => sendMentorRequest(l.id)} className="flex-1 py-2 rounded-lg bg-gold hover:bg-gold2 text-ink text-[12.5px] font-semibold transition-colors">
                          Send request
                        </button>
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => setMentorOpenFor(l.id)}
                      className="flex items-center gap-2 text-[12.5px] px-3.5 py-2 rounded-lg border border-lineSoft hover:border-gold text-boneDim hover:text-gold2 transition-colors"
                    >
                      <IconMentor width="15" height="15" />
                      Request mentorship
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}

function MiniStat({ label, value }) {
  return (
    <div className="bg-ink3 border border-lineSoft rounded-lg px-3 py-2.5">
      <span className="font-mono text-[9.5px] uppercase tracking-wide text-boneFaint block mb-0.5">{label}</span>
      <span className="text-[13.5px] font-semibold">{value}</span>
    </div>
  );
}
