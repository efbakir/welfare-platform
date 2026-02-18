export function Card({ children, className = "", ...props }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl bg-white shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 hover:shadow-[0_10px_32px_rgb(0,0,0,0.05)] ${className}`}
      style={{ borderRadius: "var(--radius-2xl)" }}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`flex items-start justify-between gap-3 px-7 pt-7 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }) {
  return <div className={`p-7 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`mt-3 px-7 pb-7 pt-3 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }) {
  return <div className={`font-display text-base font-bold tracking-tight text-text-primary ${className}`}>{children}</div>;
}

export function CardSubtitle({ children, className = "" }) {
  return <div className={`text-sm text-text-secondary ${className}`}>{children}</div>;
}
