# OSHEN — Africa's Community Investment Platform

Built by Realm Technology | Founded by Rinji Richard John

Invest in vetted African builders from ₦50,000 — and keep patronizing what you invest in.
Funds don't release all at once: founders break a raise into phases, explain each one on
video, and the community votes to release funds phase by phase.

This is a **front-end prototype**. No real payments, KYC, escrow, or database are wired in —
everything runs on mock data held in React state and persisted to your browser's
localStorage only, so it survives a refresh but isn't shared or secure.

## Stack

- Next.js 16 (App Router) + React 18
- Tailwind CSS
- No backend, no auth, no external APIs

## Run it locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Pages

| Route | What it does |
|---|---|
| `/` | Landing page — hero, stats, how it works |
| `/explore` | Browse vetted listings, filter by category/return type, invest |
| `/dashboard` | Investor portfolio — track phases, vote to release funds |
| `/apply` | Builder application — business info, return terms, phase breakdown, video note |
| `/builder` | Builder dashboard — phase tracker, request mentorship |

## What's real vs. mocked

| Feature | Status |
|---|---|
| Browsing, filtering, investing | Fully working UI, backed by in-memory + localStorage state |
| OSHEN Score (vetting) | Mocked — a random score is assigned after a fake "vetting" delay |
| Phase-based disbursement | Fully working logic: locked → active → awaiting vote → released |
| Community voting to release a phase | Working — demo threshold releases a phase once 3 votes are in and approvals lead |
| Founder video justification | Text-only stand-in — no real video upload/playback |
| BVN / identity verification | A checkbox — no real verification happens |
| Mentorship requests | Shows a confirmation toast — no real consultant is contacted |
| Payments (OPay etc.) | Not integrated |

## Next steps for a real version

1. Real database (Supabase/Postgres) instead of localStorage
2. Real KYC (BVN via Smile Identity or similar) before anyone can invest or apply
3. Escrow-backed disbursement — funds should sit with a licensed custodian, not the platform,
   until a phase is approved
4. Legal: this is investment solicitation from the public. In Nigeria that means SEC
   crowdfunding-intermediary registration before real money moves — get a securities lawyer
   involved early, this isn't optional
5. Real video upload/playback for founder phase justifications
6. Payment integration (OPay Business API or similar) for both inbound investment and
   outbound disbursement

## Possible future link to RETNA AI

A RETNA builder who's completed registration and reached the Prototype stage could be a
natural, pre-vetted candidate for an OSHEN listing — worth revisiting once both prototypes
are further along.
