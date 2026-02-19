const variantClasses = {
  blue: "bg-blue-tint text-blue border-border",
  pink: "bg-secondary-tint text-secondary border-border",
  orange: "bg-orange-tint text-orange border-border",
  green: "bg-green-tint text-green border-border",
  neutral: "bg-surface-2 text-text-secondary border-border",
  new: "bg-pink text-white",
};

export default function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-sm border px-3 py-1 text-[11px] font-semibold tracking-[0.02em] ${variantClasses[variant] ?? variantClasses.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
