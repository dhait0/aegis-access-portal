type QueueRowProps = {
  user: string;
  access: string;
  reason: string;
  status: string;
};

export function QueueRow({ user, access, reason, status }: QueueRowProps) {
  return (
    <article className="queue-row">
      <div className="queue-row__meta">
        <h3>{user}</h3>
        <p>{access}</p>
        <span>{reason}</span>
      </div>
      <span className="queue-row__status">{status}</span>
    </article>
  );
}
