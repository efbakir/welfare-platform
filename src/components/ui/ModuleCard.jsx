import { Link } from "react-router-dom";
import Badge from "./Badge";

const accentBarColors = {
  blue: "bg-blue",
  pink: "bg-pink",
  orange: "bg-orange",
  green: "bg-green",
};

const iconBgColors = {
  blue: "bg-blue-tint",
  pink: "bg-pink-tint",
  orange: "bg-orange-tint",
  green: "bg-green-tint",
};

function ModuleCardBody({
  accent,
  icon,
  image,
  badge,
  title,
  description,
  statNumber,
  statLabel,
  ctaLabel,
  ctaIcon,
  children,
  className,
}) {
  return (
    <div
      className={`group relative flex cursor-pointer flex-col gap-4 overflow-hidden rounded-2xl bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_10px_32px_rgb(0,0,0,0.05)] ${className}`}
      style={{ borderRadius: "var(--radius-2xl)" }}
    >
      <div className={`absolute left-4 right-4 top-0 h-1 rounded-full ${accentBarColors[accent] ?? accentBarColors.blue}`} />
      {image ? (
        <img src={image} alt={title} className="h-40 w-full rounded-2xl object-cover" />
      ) : (
        <div className="flex items-start justify-between gap-3">
          <div className={`flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-3xl ${iconBgColors[accent] ?? iconBgColors.blue}`}>
            {icon}
          </div>
          {badge != null && <Badge variant={badge.variant}>{badge.label}</Badge>}
        </div>
      )}
      {image && badge != null && <Badge variant={badge.variant}>{badge.label}</Badge>}
      <div>
        <div className="mb-1 font-display text-lg font-bold tracking-tight text-text-primary">{title}</div>
        {description != null && <div className="text-sm leading-relaxed text-text-secondary">{description}</div>}
      </div>
      {statNumber != null && (
        <div className="flex items-baseline gap-1.5">
          <span className="font-display text-[30px] font-bold tracking-tight text-text-primary">{statNumber}</span>
          {statLabel != null && <span className="text-sm font-semibold text-text-muted">{statLabel}</span>}
        </div>
      )}
      {children}
      {ctaLabel != null && (
        <div className="mt-auto flex items-center gap-1 text-sm font-semibold text-blue transition-[gap] duration-150 group-hover:gap-2">
          {ctaLabel}
          {ctaIcon ?? (
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          )}
        </div>
      )}
    </div>
  );
}

export default function ModuleCard({ to, ...props }) {
  if (to) {
    return (
      <Link to={to} className="block">
        <ModuleCardBody {...props} />
      </Link>
    );
  }

  return <ModuleCardBody {...props} />;
}
