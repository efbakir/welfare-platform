const variants = {
  primary: "bg-blue text-white shadow-[var(--shadow-blue)] hover:bg-blue-dark hover:-translate-y-px hover:shadow-md",
  pink: "bg-secondary text-white shadow-[0_8px_22px_rgba(192,11,108,0.24)] hover:bg-secondary-dark hover:-translate-y-px",
  outline: "bg-white text-text-primary shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:bg-gray-50 hover:-translate-y-px",
  ghost: "bg-transparent text-text-secondary hover:bg-gray-100 hover:text-text-primary",
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
