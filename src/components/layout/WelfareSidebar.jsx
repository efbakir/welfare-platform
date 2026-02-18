import { NavLink } from "react-router-dom";
import { usePov } from "../../context/PovContext";

const mainNavItems = [
  { to: "/welfare/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/welfare/wallet", label: "Wallet", icon: "wallet" },
  { to: "/welfare/profile", label: "Profile", icon: "profile" },
  { to: "/welfare/marketplace", label: "Marketplace", icon: "marketplace" },
  { to: "/welfare/inbox", label: "Inbox", icon: "inbox" },
  { to: "/welfare/requests", label: "Requests", icon: "requests" },
  { to: "/welfare/transactions", label: "Transactions", icon: "transactions" },
];

const bottomNavItems = [
  { to: "/welfare/ai", label: "AI Assistant", icon: "ai", gradient: true },
  { to: "/welfare/settings", label: "Settings", icon: "settings" },
];

function NavIcon({ type }) {
  const className = "h-[18px] w-[18px]";

  if (type === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (type === "wallet") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" />
        <path d="M15 11h5.5v2H15a1 1 0 1 1 0-2Z" />
      </svg>
    );
  }
  if (type === "profile") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19a7 7 0 0 1 14 0" />
      </svg>
    );
  }
  if (type === "marketplace") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="M4.5 8.5h15l-1 10h-13l-1-10Z" />
        <path d="M8 8.5V7a4 4 0 0 1 8 0v1.5" />
      </svg>
    );
  }
  if (type === "inbox") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="m4.5 8.5 7.5 5 7.5-5" />
      </svg>
    );
  }
  if (type === "requests") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="M7 4.5h10l2.5 2.5v12H7z" />
        <path d="M17 4.5V7h2.5" />
        <path d="M10 11h6M10 14.5h4" />
      </svg>
    );
  }
  if (type === "transactions") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="M6 7h11" />
        <path d="m13 4 4 3-4 3" />
        <path d="M18 17H7" />
        <path d="m11 14-4 3 4 3" />
      </svg>
    );
  }
  if (type === "settings") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} stroke="currentColor" strokeWidth="1.8">
      <rect x="3.5" y="4.5" width="17" height="13" rx="2" />
      <path d="M8 11.5h8M8 8.5h5M8 14.5h6" />
      <path d="M12 17.5v3M9.5 19.5h5" />
    </svg>
  );
}

export default function WelfareSidebar() {
  const { profile } = usePov();

  return (
    <aside className="fixed left-[5.25rem] top-4 z-40 hidden h-[calc(100vh-2rem)] w-[var(--sidebar-w)] rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 peer-hover:left-[15.5rem] md:flex md:flex-col">
      <div className="flex items-center gap-2 px-2 py-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-xs font-semibold text-white">W</div>
        <span className="text-sm font-semibold text-text-primary">Welfare</span>
      </div>

      <nav className="mt-2 flex-1 space-y-0">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium transition-all ${
                isActive ? "bg-blue-tint text-blue" : "text-text-secondary hover:bg-[#f1f5f9]"
              }`
            }
          >
            <span className="shrink-0">
              <NavIcon type={item.icon} />
            </span>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto space-y-1 border-t border-[#e8edf3] pt-2">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium transition-all ${
                item.gradient
                  ? `bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-violet-500/10 text-text-primary hover:from-blue-500/15 hover:via-indigo-500/15 hover:to-violet-500/15 ${isActive ? "ring-1 ring-blue-200" : ""}`
                  : isActive
                    ? "bg-blue-tint text-blue"
                    : "text-text-secondary hover:bg-[#f1f5f9]"
              }`
            }
          >
            <span className="shrink-0">
              <NavIcon type={item.icon} />
            </span>
            {item.label}
          </NavLink>
        ))}
      </div>

      <div className="mt-2 rounded-2xl bg-[#f8fafc] p-2.5">
        <p className="text-xs font-semibold text-text-primary">{profile.name}</p>
        <p className="text-[11px] text-text-muted">{profile.lifeStage} · {profile.workMode}</p>
      </div>
    </aside>
  );
}
