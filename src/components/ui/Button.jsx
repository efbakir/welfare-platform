const variants = {
  primary: "bg-[linear-gradient(135deg,var(--color-gradient-start)_0%,var(--color-gradient-end)_100%)] text-white shadow-[var(--shadow-blue)] hover:brightness-105 hover:-translate-y-px hover:shadow-md",
  pink: "bg-[linear-gradient(135deg,var(--color-secondary)_0%,var(--color-blue-mid)_100%)] text-white shadow-[var(--shadow-pink)] hover:brightness-105 hover:-translate-y-px",
  outline: "bg-[rgba(255,255,255,0.86)] text-text-primary shadow-[var(--shadow-xs)] backdrop-blur-sm hover:bg-white hover:-translate-y-px",
  ghost: "bg-transparent text-text-secondary hover:bg-blue-tint hover:text-text-primary",
  white: "bg-white/20 text-white backdrop-blur-sm hover:bg-white/35",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-[18px] py-2.5 text-[13px]",
  icon: "aspect-square p-2",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  ...props
}) {
  return (
    <button
      type={type}
      className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md font-body font-semibold transition-all duration-200 ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
