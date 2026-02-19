export default function Icon({ name, className = "h-4 w-4" }) {
  if (name === "spark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 3.5 14.3 9l5.2 2.1-5.2 2.1L12 18.5l-2.3-5.3L4.5 11.1 9.7 9 12 3.5Z" />
      </svg>
    );
  }
  if (name === "users") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <circle cx="9" cy="8" r="2.5" />
        <circle cx="16" cy="8.5" r="2" />
        <path d="M4.8 17.5a4.2 4.2 0 0 1 8.4 0" />
        <path d="M13.3 17.5a3.3 3.3 0 0 1 6.4 0" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5.5" width="17" height="15" rx="2.5" />
        <path d="M7 3.5v4M17 3.5v4M3.5 9.5h17" />
      </svg>
    );
  }
  if (name === "wallet") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" />
        <path d="M15 11h5.5v2H15a1 1 0 1 1 0-2Z" />
      </svg>
    );
  }
  if (name === "family") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <circle cx="8" cy="8" r="2.2" />
        <circle cx="16" cy="8" r="2.2" />
        <circle cx="12" cy="6.5" r="1.7" />
        <path d="M4.5 17a3.5 3.5 0 0 1 7 0M12.5 17a3.5 3.5 0 0 1 7 0M8.5 17a3.5 3.5 0 0 1 7 0" />
      </svg>
    );
  }
  if (name === "wellness") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 20s-6.5-3.7-8.5-7.9A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8.5 5.1C18.5 16.3 12 20 12 20Z" />
      </svg>
    );
  }
  if (name === "education") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="m3.5 9.5 8.5-4 8.5 4-8.5 4-8.5-4Z" />
        <path d="M6.5 11v4.5c0 1.4 2.5 2.5 5.5 2.5s5.5-1.1 5.5-2.5V11" />
      </svg>
    );
  }
  if (name === "child") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <circle cx="8" cy="7.5" r="2.2" />
        <path d="M4.5 17a3.8 3.8 0 0 1 7.5 0" />
        <path d="M14 7h5M16.5 4.5v5" />
      </svg>
    );
  }
  if (name === "clock") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="12" r="8.5" />
        <path d="M12 7.5v4.8l3 1.8" />
      </svg>
    );
  }
  if (name === "location") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 21s6.5-6.2 6.5-11a6.5 6.5 0 1 0-13 0c0 4.8 6.5 11 6.5 11Z" />
        <circle cx="12" cy="10" r="2.4" />
      </svg>
    );
  }
  if (name === "user") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19a7 7 0 0 1 14 0" />
      </svg>
    );
  }
  if (name === "search") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-3.5-3.5" />
      </svg>
    );
  }
  if (name === "exclamation") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 8v5" />
        <circle cx="12" cy="17" r="1.25" fill="currentColor" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="8.5" />
    </svg>
  );
}
