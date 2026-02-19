const circleBg = {
  blue: "bg-blue",
  pink: "bg-pink",
  orange: "bg-orange",
  green: "bg-green",
};

const trendClasses = {
  up: "bg-green-tint text-green",
  down: "bg-red-tint text-red",
  flat: "bg-[#ececec] text-text-muted",
};

export default function StatCard({ icon, trend = "flat", trendLabel, number, label, sub, accent = "blue" }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-border bg-surface p-6 shadow-[var(--shadow-sm)]">
      <div className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-xl opacity-[0.06] ${circleBg[accent] ?? circleBg.blue}`} />
      <div className="relative flex items-center justify-between pb-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#f4f6fb] text-2xl">{icon}</div>
        {trendLabel != null && <span className={`inline-flex items-center gap-0.5 rounded-sm px-3 py-1 text-xs font-semibold ${trendClasses[trend] ?? trendClasses.flat}`}>{trendLabel}</span>}
      </div>
      <div className="relative font-display text-[34px] font-bold leading-none tracking-tight text-text-primary">{number}</div>
      <div className="relative mt-1 text-sm font-medium text-text-secondary">{label}</div>
      {sub != null && <div className="relative mt-3 text-xs text-text-muted">{sub}</div>}
    </div>
  );
}
