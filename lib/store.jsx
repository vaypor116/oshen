"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { INITIAL_LISTINGS } from "./data";

const OshenContext = createContext(null);
const STORAGE_KEY = "oshen_state_v1";

export function OshenProvider({ children }) {
  const [listings, setListings] = useState(INITIAL_LISTINGS);
  const [portfolio, setPortfolio] = useState([]); // [{ listingId, amount, investedAt }]
  const [toast, setToast] = useState("");
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.listings) setListings(parsed.listings);
        if (parsed.portfolio) setPortfolio(parsed.portfolio);
      }
    } catch (e) {
      // ignore corrupt storage
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify({ listings, portfolio }));
    } catch (e) {
      // storage may be unavailable — app still works for this session
    }
  }, [listings, portfolio, loaded]);

  const showToast = useCallback((text) => {
    setToast(text);
    setTimeout(() => setToast((t) => (t === text ? "" : t)), 2800);
  }, []);

  function invest(listingId, amount) {
    setListings((prev) =>
      prev.map((l) => (l.id === listingId ? { ...l, raised: Math.min(l.target, l.raised + amount) } : l))
    );
    setPortfolio((prev) => {
      const existing = prev.find((p) => p.listingId === listingId);
      if (existing) {
        return prev.map((p) => (p.listingId === listingId ? { ...p, amount: p.amount + amount } : p));
      }
      return [...prev, { listingId, amount, investedAt: new Date().toISOString() }];
    });
    showToast("Investment confirmed");
  }

  function voteOnPhase(listingId, phaseId, decision) {
    setListings((prev) =>
      prev.map((l) => {
        if (l.id !== listingId) return l;
        let releasedThisRound = false;
        const phases = l.phases.map((p) => {
          if (p.id !== phaseId) return p;
          const votes = { ...p.votes };
          votes[decision] = votes[decision] + 1;
          const totalVotes = votes.approve + votes.reject;
          let status = p.status;
          // Demo threshold: once 3+ votes are in and approvals are the majority, release the phase.
          if (totalVotes >= 3 && votes.approve > votes.reject) {
            status = "released";
            releasedThisRound = true;
          }
          return { ...p, votes, status, voters: [...p.voters, decision] };
        });
        if (releasedThisRound) {
          const nextLocked = phases.findIndex((p) => p.status === "locked");
          if (nextLocked !== -1) phases[nextLocked] = { ...phases[nextLocked], status: "active" };
        }
        return { ...l, phases };
      })
    );
    showToast(decision === "approve" ? "Vote to release recorded" : "Vote to hold recorded");
  }

  function advancePhase(listingId) {
    // Manual fallback: unlock the next locked phase once the current one is released.
    setListings((prev) =>
      prev.map((l) => {
        if (l.id !== listingId) return l;
        const phases = [...l.phases];
        const releasedIdx = phases.findIndex((p) => p.status === "released");
        const nextLocked = phases.findIndex((p) => p.status === "locked");
        if (nextLocked !== -1 && releasedIdx !== -1) {
          phases[nextLocked] = { ...phases[nextLocked], status: "active" };
        }
        return { ...l, phases };
      })
    );
  }

  function submitApplication(app) {
    const id = `l${listings.length + 1}`;
    const newListing = {
      id,
      name: app.name,
      category: app.category,
      location: app.location || "Nigeria",
      founder: "You",
      tagline: app.tagline,
      description: app.description,
      target: app.target,
      raised: 0,
      roiType: app.roiType,
      roiTerms: app.roiTerms,
      oshenScore: null, // under review
      status: "review",
      phases: app.phases.map((p, i) => ({
        id: `p${i + 1}`,
        title: p.title,
        amount: p.amount,
        status: "locked",
        description: p.description,
        videoNote: app.videoNote || "Founder video note pending upload.",
        votes: { approve: 0, reject: 0 },
        voters: [],
      })),
    };
    setListings((prev) => [newListing, ...prev]);
    showToast("Application submitted for vetting");
    return id;
  }

  function approveApplication(listingId, score) {
    setListings((prev) =>
      prev.map((l) =>
        l.id === listingId
          ? { ...l, status: "funding", oshenScore: score, phases: l.phases.map((p, i) => (i === 0 ? { ...p, status: "locked" } : p)) }
          : l
      )
    );
    showToast("Vetting complete — listing is now live");
  }

  function requestMentorship(listingId, topic) {
    showToast(`Mentorship request sent — a consultant will reach out about: "${topic}"`);
  }

  const value = {
    listings,
    portfolio,
    invest,
    voteOnPhase,
    advancePhase,
    submitApplication,
    approveApplication,
    requestMentorship,
    toast,
    showToast,
  };

  return <OshenContext.Provider value={value}>{children}</OshenContext.Provider>;
}

export function useOshen() {
  const ctx = useContext(OshenContext);
  if (!ctx) throw new Error("useOshen must be used within OshenProvider");
  return ctx;
}
