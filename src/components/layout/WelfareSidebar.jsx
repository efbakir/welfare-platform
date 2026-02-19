import { useState } from "react";
import { NavLink } from "react-router-dom";
import { usePov } from "../../context/PovContext";
import PovSwitcher from "./PovSwitcher";

const mainNavItems = [
  { to: "/welfare/dashboard", label: "Dashboard", icon: "dashboard" },
  { to: "/welfare/wallet", label: "Wallet", icon: "wallet" },
  { to: "/welfare/history", label: "History", icon: "transactions" },
  { to: "/welfare/marketplace", label: "Marketplace", icon: "marketplace" },
  { to: "/welfare/requests", label: "Requests", icon: "requests" },
  { to: "/welfare/community", label: "Community", icon: "community" },
  { to: "/welfare/profile", label: "Profile", icon: "profile" },
];

const bottomNavItems = [
  { to: "/welfare/ai", label: "AI Assistant", icon: "ai", gradient: true },
  { to: "/welfare/settings", label: "Settings", icon: "settings" },
];

function NavIcon({ type, active = false }) {
  const className = "h-[18px] w-[18px]";
  const strokeProps = active
    ? { fill: "currentColor", stroke: "currentColor", strokeWidth: "0.9" }
    : { fill: "none", stroke: "currentColor", strokeWidth: "1.8" };

  if (type === "dashboard") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (type === "wallet") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <rect x="3.5" y="6.5" width="17" height="11" rx="2.5" />
        <path d="M15 11h5.5v2H15a1 1 0 1 1 0-2Z" />
      </svg>
    );
  }
  if (type === "profile") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <circle cx="12" cy="8" r="3.5" />
        <path d="M5 19a7 7 0 0 1 14 0" />
      </svg>
    );
  }
  if (type === "marketplace") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <path d="M4.5 8.5h15l-1 10h-13l-1-10Z" />
        <path d="M8 8.5V7a4 4 0 0 1 8 0v1.5" />
      </svg>
    );
  }
  if (type === "requests") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <path d="M7 4.5h10l2.5 2.5v12H7z" />
        <path d="M17 4.5V7h2.5" />
        <path d="M10 11h6M10 14.5h4" />
      </svg>
    );
  }
  if (type === "transactions") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <path d="M6 7h11" />
        <path d="m13 4 4 3-4 3" />
        <path d="M18 17H7" />
        <path d="m11 14-4 3 4 3" />
      </svg>
    );
  }
  if (type === "community") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <path d="M12 20s-6.5-3.7-8.5-7.9A4.8 4.8 0 0 1 12 7a4.8 4.8 0 0 1 8.5 5.1C18.5 16.3 12 20 12 20Z" />
      </svg>
    );
  }
  if (type === "settings") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
        <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
      </svg>
    );
  }
  if (type === "ai") {
    return (
      <svg viewBox="0 0 24 24" className={className} {...strokeProps} strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3.5 14.3 9l5.2 2.1-5.2 2.1L12 18.5l-2.3-5.3L4.5 11.1 9.7 9 12 3.5Z" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 24 24" className={className} {...strokeProps}>
      <rect x="3.5" y="4.5" width="17" height="13" rx="2" />
      <path d="M8 11.5h8M8 8.5h5M8 14.5h6" />
      <path d="M12 17.5v3M9.5 19.5h5" />
    </svg>
  );
}

export default function WelfareSidebar() {
  const { profile } = usePov();
  const [showPovControls, setShowPovControls] = useState(false);

  return (
    <aside className="fixed left-16 top-0 z-40 hidden h-screen w-[var(--sidebar-w)] border-r border-border bg-sidebar-bg transition-all duration-300 peer-hover:left-56 md:flex md:flex-col">
      <div className="flex items-center gap-2 px-2 pt-8 pb-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-[var(--color-grey-tint-hover)] text-xs font-semibold text-text-secondary">W</div>
        <span className="text-sm font-semibold text-text-primary">Welfare</span>
      </div>

      <nav className="mt-2 flex-1 space-y-0 px-2">
        {mainNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium transition-all ${
                isActive ? "bg-sidebar-active text-blue" : "text-text-secondary hover:bg-sidebar-hover"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="shrink-0">
                  <NavIcon type={item.icon} active={isActive} />
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      <div className="relative px-2 pt-3">
        <div className="flex flex-col items-center gap-2 pb-4">
          <button
            type="button"
            onClick={() => setShowPovControls((prev) => !prev)}
            aria-expanded={showPovControls}
            aria-controls="sidebar-switch-user-panel"
            className="inline-flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary transition hover:bg-surface-2"
          >
            <span className="shrink-0">
              <svg viewBox="0 0 24 24" fill="none" className="h-[16px] w-[16px]" stroke="currentColor" strokeWidth="1.8">
                <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
            </span>
            Switch user
          </button>
          {showPovControls && (
            <div
              id="sidebar-switch-user-panel"
              className="absolute bottom-[calc(100%+8px)] left-2 right-2 rounded-lg border border-border bg-surface p-2 shadow-[var(--shadow-sm)]"
            >
              <PovSwitcher compact showPersonalize={true} />
            </div>
          )}
        </div>
      </div>

      <div className="mt-auto space-y-1 border-t border-border px-2 pt-2">
        {bottomNavItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-2 rounded-sm px-3 py-2.5 text-sm font-medium transition-all ${
                item.gradient
                  ? `${isActive ? "bg-sidebar-active text-blue" : "text-text-secondary hover:bg-sidebar-hover"}`
                  : isActive
                    ? "bg-sidebar-active text-blue"
                    : "text-text-secondary hover:bg-sidebar-hover"
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="shrink-0">
                  <NavIcon type={item.icon} active={isActive} />
                </span>
                {item.label}
              </>
            )}
          </NavLink>
        ))}
      </div>

      <div className="mt-2 border-t border-border p-2.5">
        <p className="text-xs font-semibold text-text-primary">{profile.name}</p>
        <p className="text-[11px] text-text-muted">{profile.lifeStage} · {profile.workMode}</p>
      </div>
    </aside>
  );
}
