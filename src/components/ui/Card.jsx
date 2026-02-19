export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.75)] bg-[linear-gradient(165deg,rgba(255,255,255,0.9)_0%,rgba(250,249,255,0.84)_100%)] shadow-[var(--shadow-sm)] backdrop-blur-md transition-all duration-300 hover:-translate-y-[1px] hover:shadow-[var(--shadow-md)] ${className}`}
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
