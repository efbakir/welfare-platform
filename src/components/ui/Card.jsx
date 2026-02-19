export function Card({ children, className = "", interactive = false, ...props }) {
  const resolvedInteractive = interactive || className.includes("cursor-pointer");

  return (
    <div
      className={`overflow-hidden rounded-xl bg-surface shadow-[var(--shadow-sm)] transition-[box-shadow,transform,background-color,border-color] duration-200 ${
        resolvedInteractive ? "hover:-translate-y-px hover:shadow-[var(--shadow-hover)]" : ""
      } ${className}`}
      style={{ borderRadius: "var(--radius-2xl)" }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`flex items-start justify-between gap-3 px-6 pt-6 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }) {
  return <div className={`p-6 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`mt-3 px-6 pb-6 pt-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <div className={`font-display text-base font-bold tracking-tight text-text-primary ${className}`}>{children}</div>;
}

export function CardSubtitle({ children, className = "" }) {
  return <div className={`text-sm text-text-secondary ${className}`}>{children}</div>;
}
