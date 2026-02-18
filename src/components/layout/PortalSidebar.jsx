import { NavLink, useLocation } from "react-router-dom";

const portalItems = [
  { label: "Overview", to: "/portal" },
  { label: "Notifications", to: "/portal" },
  { label: "Billing", to: "/portal" },
  { label: "Transactions", to: "/portal" },
  { label: "Suppliers", to: "/portal" },
  { label: "Welfare", to: "/welfare/dashboard" },
];

function CircleIcon({ active = false }) {
  return (
    <span
      className={`inline-flex h-4 w-4 items-center justify-center rounded-full border-2 ${
        active ? "border-blue bg-blue/20" : "border-current/60"
      }`}
    />
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
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-xs font-semibold text-white">C</div>
          <span className={`text-sm font-semibold text-white transition-all ${compact ? "max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:ml-1 group-hover:max-w-[140px] group-hover:opacity-100" : "opacity-100"}`}>
            Client Portal
          </span>
        </div>

        <div className="mt-2 space-y-1">
          {portalItems.map((item) => {
            const isActive = item.label === "Welfare" ? inWelfare : location.pathname === item.to;
            return (
              <NavLink
                key={item.label}
                to={item.to}
                className={`flex w-full items-center gap-2 rounded-full px-3 py-2 text-left text-sm font-medium transition-all ${
                  isActive ? "bg-sidebar-active text-white" : "bg-transparent text-sidebar-text hover:bg-sidebar-hover"
                }`}
              >
                <span className="w-4 text-center">
                  <CircleIcon active={isActive} />
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
