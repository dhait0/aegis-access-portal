type StatCardProps = {
  label: string;
  value: string;
  delta: string;
  tone: "amber" | "emerald" | "rose" | "sky";
};

export function StatCard({ label, value, delta, tone }: StatCardProps) {
  return (
    <article className={`stat-card stat-card--${tone}`}>
      <p className="eyebrow">{label}</p>
      <div className="stat-card__row">
        <h2>{value}</h2>
        <span className="stat-chip">{delta}</span>
      </div>
    </article>
  );
}
