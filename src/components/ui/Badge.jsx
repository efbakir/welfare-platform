const variantClasses = {
  blue: "bg-blue-tint text-blue",
  pink: "bg-secondary-tint text-secondary",
  orange: "bg-orange-tint text-orange",
  green: "bg-green-tint text-green",
  neutral: "bg-[#ececec] text-text-secondary",
  new: "bg-pink text-white",
};

export default function Badge({ children, variant = "neutral", className = "" }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-extrabold tracking-wide ${variantClasses[variant] ?? variantClasses.neutral} ${className}`}
    >
      {children}
    </span>
  );
}
