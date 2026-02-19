export default function PageHeader({ eyebrow, title, subtitle, actions }) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-5">
      <div className="max-w-3xl">
        {eyebrow != null && <div className="mb-1 text-[11px] font-semibold tracking-[0.14em] text-text-muted">{eyebrow}</div>}
        <h1 className="font-display text-[36px] font-semibold leading-[1.1] tracking-[-0.02em] text-text-primary">{title}</h1>
        {subtitle != null && <p className="mt-2 text-[14px] font-normal text-text-secondary">{subtitle}</p>}
      </div>
      {actions != null && <div className="flex shrink-0 items-center gap-2">{actions}</div>}
    </div>
  );
}
