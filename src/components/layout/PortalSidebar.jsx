import { NavLink, useLocation } from "react-router-dom";

const portalItems = [
  { label: "Overview", icon: "◦" },
  { label: "Notifications", icon: "◦" },
  { label: "Billing", icon: "◦" },
  { label: "Transactions", icon: "◦" },
  { label: "Suppliers", icon: "◦" },
];

export default function PortalSidebar({ compact = false }) {
  const location = useLocation();
  const inWelfare = location.pathname.startsWith("/welfare");

  return (
    <aside
      className={`group fixed left-4 top-4 z-50 h-[calc(100vh-2rem)] overflow-hidden rounded-2xl bg-sidebar-bg shadow-[0_14px_32px_rgba(2,6,23,0.26)] transition-all duration-300 ${
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
          {portalItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className="flex w-full items-center gap-2 rounded-full px-3 py-2 text-left text-sm font-medium text-sidebar-text hover:bg-sidebar-hover"
            >
              <span className="w-4 text-center">{item.icon}</span>
              <span className={`transition-all ${compact ? "max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[130px] group-hover:opacity-100" : "opacity-100"}`}>{item.label}</span>
            </button>
          ))}
        </div>

        <div className="mt-auto">
          <NavLink
            to="/welfare/dashboard"
            className={`flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-all ${
              inWelfare ? "bg-sidebar-active text-white" : "text-sidebar-text hover:bg-sidebar-hover"
            }`}
          >
            <span className="w-4 text-center">✦</span>
            <span className={`transition-all ${compact ? "max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover:max-w-[130px] group-hover:opacity-100" : "opacity-100"}`}>Welfare</span>
          </NavLink>
        </div>
      </div>
    </aside>
  );
}
