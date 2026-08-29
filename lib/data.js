export const MIN_INVESTMENT = 50000;

export const CATEGORIES = [
  { id: "agritech", label: "AgriTech" },
  { id: "foodtech", label: "Food & Beverage" },
  { id: "retail", label: "Retail & Commerce" },
  { id: "tech", label: "Technology" },
  { id: "manufacturing", label: "Manufacturing" },
  { id: "services", label: "Services" },
];

export const ROI_TYPES = [
  { id: "revenue-share", label: "Revenue share" },
  { id: "fixed-return", label: "Fixed return" },
  { id: "equity-like", label: "Equity-linked" },
];

export const CATEGORY_LABELS = Object.fromEntries(CATEGORIES.map((c) => [c.id, c.label]));
export const ROI_LABELS = Object.fromEntries(ROI_TYPES.map((r) => [r.id, r.label]));

function naira(n) {
  return "₦" + n.toLocaleString("en-NG");
}
export { naira };

function makePhases(amounts, statuses) {
  const titles = ["Setup & sourcing", "First production run", "Distribution scale-up", "Market expansion"];
  return amounts.map((amount, i) => ({
    id: `p${i + 1}`,
    title: titles[i] || `Phase ${i + 1}`,
    amount,
    status: statuses[i], // locked | active | awaiting_vote | released
    description:
      i === 0
        ? "Equipment, raw materials, and initial workspace setup."
        : i === 1
        ? "Run and sell the first batch to confirm unit economics."
        : i === 2
        ? "Expand to additional markets or sales channels."
        : "Scale distribution and lock in repeat demand.",
    videoNote:
      "Founder video: explains exactly why this phase needs this amount before it unlocks.",
    votes: { approve: 0, reject: 0 },
    voters: [],
  }));
}

export const INITIAL_LISTINGS = [
  {
    id: "l1",
    name: "CassavaCore Foods",
    category: "foodtech",
    location: "Kaduna, Nigeria",
    founder: "Amara O.",
    tagline: "Cassava starch for local flour mills, sold on standing contracts.",
    description:
      "CassavaCore processes cassava into food-grade starch for flour mills across Kaduna and Kano. The first anchor buyer is already under a supply agreement — this raise funds the processing equipment and first three months of working capital.",
    target: 6000000,
    raised: 3200000,
    roiType: "revenue-share",
    roiTerms: "6% of monthly revenue paid to investors for 30 months, or until 1.8x is returned.",
    oshenScore: 82,
    status: "in_progress",
    phases: makePhases(
      [1500000, 1800000, 1500000, 1200000],
      ["released", "awaiting_vote", "locked", "locked"]
    ),
  },
  {
    id: "l2",
    name: "FarmPulse Systems",
    category: "agritech",
    location: "Kigali, Rwanda",
    founder: "Eric N.",
    tagline: "Soil-moisture sensors for smallholder irrigation cooperatives.",
    description:
      "FarmPulse builds a low-cost sensor board that tells smallholder cooperatives exactly when to irrigate. Field-tested with three cooperatives already; this raise funds a 500-unit manufacturing run and a distribution partnership.",
    target: 4500000,
    raised: 4500000,
    roiType: "fixed-return",
    roiTerms: "Fixed 14% return, paid out over 18 months from unit sales.",
    oshenScore: 88,
    status: "in_progress",
    phases: makePhases(
      [1200000, 1400000, 1000000, 900000],
      ["released", "released", "active", "locked"]
    ),
  },
  {
    id: "l3",
    name: "Kaduna Solar Works",
    category: "manufacturing",
    location: "Kaduna, Nigeria",
    founder: "Ibrahim S.",
    tagline: "Component assembly for off-grid solar home systems.",
    description:
      "Assembles finished solar panels into complete off-grid home kits for rural distributors. Already has two distributor letters of intent — this raise covers the first assembly batch and quality certification.",
    target: 5000000,
    raised: 1250000,
    roiType: "revenue-share",
    roiTerms: "8% of monthly revenue for 24 months.",
    oshenScore: 74,
    status: "funding",
    phases: makePhases(
      [1500000, 1500000, 1200000, 800000],
      ["locked", "locked", "locked", "locked"]
    ),
  },
  {
    id: "l4",
    name: "Lagos Cold Chain Co.",
    category: "services",
    location: "Lagos, Nigeria",
    founder: "Chidinma A.",
    tagline: "Shared cold storage for market vendors selling perishables.",
    description:
      "Rents out shared cold-storage bays by the day to market vendors who currently lose 20–30% of stock to spoilage. This raise funds the first storage facility build-out near Mile 12 market.",
    target: 8000000,
    raised: 620000,
    roiType: "equity-like",
    roiTerms: "Equity-linked return equivalent to 4% of the business, revisited at year 3.",
    oshenScore: 69,
    status: "funding",
    phases: makePhases(
      [2500000, 2000000, 2000000, 1500000],
      ["locked", "locked", "locked", "locked"]
    ),
  },
];

export const MENTOR_TOPICS = [
  "Cash flow is tighter than the plan assumed",
  "A phase deadline is at risk",
  "Need help renegotiating a supplier",
  "Considering a change in approach — want a second opinion",
];
