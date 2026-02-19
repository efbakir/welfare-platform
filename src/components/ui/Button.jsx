const variants = {
  primary: "bg-blue text-white border border-blue hover:bg-blue-dark",
  pink: "bg-secondary text-white border border-secondary hover:bg-secondary-dark",
  outline: "bg-surface text-text-primary border border-border hover:bg-surface-2",
  ghost: "bg-transparent text-text-secondary border border-transparent hover:bg-surface-2 hover:text-text-primary",
  white: "bg-surface text-text-primary border border-border hover:bg-surface-2",
};

const sizes = {
  sm: "px-4 py-2 text-xs",
  md: "px-5 py-2.5 text-[13px]",
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
      className={`inline-flex cursor-pointer items-center justify-center gap-1.5 rounded-md font-body font-medium tracking-[0.01em] shadow-[var(--shadow-xs)] transition-colors duration-200 ${variants[variant] ?? variants.primary} ${sizes[size] ?? sizes.md} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
