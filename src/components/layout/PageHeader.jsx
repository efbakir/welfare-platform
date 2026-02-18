export default function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div>
        {eyebrow != null && <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-blue">{eyebrow}</div>}
        <h1 className="font-display text-[30px] font-bold leading-tight tracking-tight text-text-primary">{title}</h1>
        {subtitle != null && <p className="mt-1 text-sm font-medium text-text-secondary">{subtitle}</p>}
      </div>
      {actions != null && <div className="flex shrink-0 items-center gap-2.5">{actions}</div>}
    </div>
  );
}
