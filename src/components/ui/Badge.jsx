const variantClasses = {
  blue: "bg-blue-tint text-blue",
  pink: "bg-secondary-tint text-secondary",
  orange: "bg-orange-tint text-orange",
  green: "bg-green-tint text-green",
  neutral: "bg-[rgba(255,255,255,0.7)] text-text-secondary",
  new: "bg-pink text-white",
};

export default function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border border-[rgba(255,255,255,0.75)] px-3 py-1 text-[11px] font-semibold tracking-[0.02em] ${variantClasses[variant] ?? variantClasses.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
