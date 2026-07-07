type TimelineProps = {
  title: string;
  detail: string;
  time: string;
};

export function Timeline({ title, detail, time }: TimelineProps) {
  return (
    <li className="timeline-item">
      <span className="timeline-item__dot" aria-hidden="true" />
      <div>
        <p className="timeline-item__title">{title}</p>
        <p className="timeline-item__detail">{detail}</p>
      </div>
      <span className="timeline-item__time">{time}</span>
    </li>
  );
}
