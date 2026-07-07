type AuditEntryProps = {
  title: string;
  detail: string;
  time: string;
};

export function AuditEntry({ title, detail, time }: AuditEntryProps) {
  return (
    <li className="audit-entry">
      <span className="audit-entry__dot" aria-hidden="true" />
      <div>
        <p className="audit-entry__title">{title}</p>
        <p className="audit-entry__detail">{detail}</p>
      </div>
      <span className="audit-entry__time">{time}</span>
    </li>
  );
}
