export function SearchInput({ placeholder = "Search…", className = "", ...props }) {
  return (
    <div
      className={`flex min-w-[220px] cursor-pointer items-center gap-2 rounded-full border border-border bg-bg px-3.5 py-1.5 text-[13px] text-text-muted transition-all duration-[140ms] hover:border-blue hover:shadow-[0_0_0_3px_var(--color-blue-glow)] focus-within:border-blue focus-within:shadow-[0_0_0_3px_var(--color-blue-glow)] ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="shrink-0 opacity-50">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
      <input
        type="text"
        placeholder={placeholder}
        className="flex-1 border-none bg-transparent outline-none placeholder:text-text-muted"
        {...props}
      />
    </div>
  );
}

export function TextInput({ className = "", ...props }) {
  return (
    <input
      className={`w-full rounded-md border border-border-dark bg-surface px-4 py-2 font-body text-[13px] text-text-primary outline-none placeholder:text-text-muted focus:border-blue focus:ring-2 focus:ring-blue-glow ${className}`}
      style={{ borderRadius: "var(--radius-md)" }}
      {...props}
    />
  );
}
