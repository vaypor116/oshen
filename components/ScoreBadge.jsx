export default function ScoreBadge({ score, size = "md" }) {
  if (score === null || score === undefined) {
    return (
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-ink3 border border-lineSoft text-boneFaint text-[11px] font-mono">
        Under review
      </span>
    );
  }
  const tier = score >= 80 ? "high" : score >= 60 ? "mid" : "low";
  const styles = {
    high: "bg-verifiedDim border-verified text-verified",
    mid: "bg-goldDim border-gold text-gold2",
    low: "bg-dangerDim border-danger text-danger",
  }[tier];
  const sizeCls = size === "sm" ? "text-[10.5px] px-2 py-[3px]" : "text-[11.5px] px-2.5 py-1";
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border font-mono ${styles} ${sizeCls}`}>
      OSHEN Score {score}
    </span>
  );
}
