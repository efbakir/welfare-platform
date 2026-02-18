import { NavLink, useLocation } from "react-router-dom";

const portalItems = [
  { label: "Overview", to: "/portal", icon: "overview" },
  { label: "Notifications", to: "/portal", icon: "notifications" },
  { label: "Billing", to: "/portal", icon: "billing" },
  { label: "Transactions", to: "/portal", icon: "transactions" },
  { label: "Suppliers", to: "/portal", icon: "suppliers" },
  { label: "Welfare", to: "/welfare/dashboard", icon: "welfare" },
];

function ItemIcon({ type, active = false }) {
  const sharedClass = `h-[18px] w-[18px] ${active ? "text-blue" : "text-current/75"}`;

  if (type === "overview") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={sharedClass} stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="3.5" width="7" height="7" rx="1.5" />
        <rect x="3.5" y="13.5" width="7" height="7" rx="1.5" />
        <rect x="13.5" y="13.5" width="7" height="7" rx="1.5" />
      </svg>
    );
  }
  if (type === "notifications") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={sharedClass} stroke="currentColor" strokeWidth="1.8">
        <path d="M7 10a5 5 0 1 1 10 0v3.2l1.4 2a1 1 0 0 1-.82 1.58H6.42a1 1 0 0 1-.82-1.58L7 13.2V10Z" />
        <path d="M10 18a2 2 0 0 0 4 0" />
      </svg>
    );
  }
  if (type === "billing") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={sharedClass} stroke="currentColor" strokeWidth="1.8">
        <rect x="3.5" y="5.5" width="17" height="13" rx="2" />
        <path d="M3.5 9.5h17" />
        <path d="M7 14h4" />
      </svg>
    );
  }
  if (type === "transactions") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={sharedClass} stroke="currentColor" strokeWidth="1.8">
        <path d="M6 7h11" />
        <path d="m13 4 4 3-4 3" />
        <path d="M18 17H7" />
        <path d="m11 14-4 3 4 3" />
      </svg>
    );
  }
  if (type === "suppliers") {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={sharedClass} stroke="currentColor" strokeWidth="1.8">
        <circle cx="8" cy="8" r="2.5" />
        <circle cx="16" cy="8" r="2.5" />
        <path d="M4.5 18a3.5 3.5 0 0 1 7 0" />
        <path d="M12.5 18a3.5 3.5 0 0 1 7 0" />
      </svg>
    );
  }
  if (type === "welfare") {
    return (
      <span className={`inline-flex h-[18px] w-[18px] items-center justify-center rounded-md border border-white/30 ${active ? "bg-white/10" : "bg-white/5"}`}>
        <img
          src="/logo-ts.png"
          alt=""
          aria-hidden
          className={`h-3 w-3 object-contain object-center ${active ? "brightness-0 invert" : "brightness-0 invert opacity-80"}`}
        />
      </span>
    );
  }
  return (
    <svg viewBox="0 0 24 24" fill="none" className={sharedClass} stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3.5a7.5 7.5 0 0 0-7.5 7.5c0 5.2 7.5 9.5 7.5 9.5s7.5-4.3 7.5-9.5A7.5 7.5 0 0 0 12 3.5Z" />
      <circle cx="12" cy="11" r="2.2" />
    </svg>
  );
}

export default function PortalSidebar({ compact = false }) {
  const location = useLocation();
  const inWelfare = location.pathname.startsWith("/welfare");

  return (
    <aside
      className={`peer group fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] overflow-hidden rounded-2xl bg-sidebar-bg shadow-[0_14px_32px_rgba(2,6,23,0.26)] transition-all duration-300 ${
        compact ? "w-16 hover:w-56" : "w-56"
      }`}
    >
      <div className="flex h-full flex-col p-3">
        <div className="flex items-center gap-2 px-2 py-2.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-white/20 bg-white/5">
            <img
              src="/logo-ts.png"
              alt="TeamSystems"
              className="h-full w-full object-contain object-center brightness-0 invert"
            />
          </div>
          <span className={`text-sm font-semibold text-white transition-all ${compact ? "max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:ml-1 group-hover:max-w-[140px] group-hover:opacity-100" : "opacity-100"}`}>
            Client Portal
          </span>
        </div>

        <div className="mt-2 space-y-1">
          {portalItems.map((item) => {
            const isActive = item.label === "Welfare" ? inWelfare : false;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`flex w-full items-center gap-2 rounded-sm px-3 py-2 text-left text-sm font-medium transition-all ${
                  isActive ? "bg-transparent text-white" : "bg-transparent text-sidebar-text hover:bg-sidebar-hover"
                }`}
              >
                <span className="w-[18px] shrink-0 text-center">
                  <ItemIcon type={item.icon} active={isActive} />
                </span>
                <span className={`transition-all ${compact ? "max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[130px] group-hover:opacity-100" : "opacity-100"}`}>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </aside>
  );
}
