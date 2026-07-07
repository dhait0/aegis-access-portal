type SignalTileProps = {
  label: string;
  value: string;
  detail: string;
};

export function SignalTile({ label, value, detail }: SignalTileProps) {
  return (
    <article className="signal-tile">
      <p className="signal-tile__label">{label}</p>
      <div className="signal-tile__value">{value}</div>
      <p className="signal-tile__detail">{detail}</p>
    </article>
  );
}
