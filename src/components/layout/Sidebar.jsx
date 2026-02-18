import { NavLink } from "react-router-dom";

const navItems = [
  { to: "/", label: "Dashboard", icon: "grid" },
  { to: "/wallet", label: "Wallet", icon: "wallet" },
  { to: "/profile", label: "Profile", icon: "user" },
  { to: "/marketplace", label: "Marketplace", icon: "store" },
  { to: "/inbox", label: "Inbox", icon: "inbox" },
  { to: "/requests", label: "Requests", icon: "list" },
  { to: "/transactions", label: "Transactions", icon: "ledger" },
  { to: "/ai-assistant", label: "AI Assistant", icon: "spark" },
];

const iconSvg = (icon) => {
  switch (icon) {
    case "grid":
      return <path d="M3 3h7v7H3zM14 3h7v7h-7zM3 14h7v7H3zM14 14h7v7h-7z" />;
    case "user":
      return <path d="M20 21a8 8 0 10-16 0M12 11a4 4 0 100-8 4 4 0 000 8z" />;
    case "wallet":
      return <path d="M2 7h20v12H2zM2 10h20M18 14h2" />;
    case "store":
      return <path d="M3 9l9-6 9 6v11H3zM9 20v-6h6v6" />;
    case "inbox":
      return <path d="M22 12h-4l-3 4H9l-3-4H2M5 5h14l3 7v7H2v-7z" />;
    case "list":
      return <path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01" />;
    case "ledger":
      return <path d="M5 3h14v18H5a2 2 0 010-4h14" />;
    case "spark":
      return <path d="M12 3l2.2 5.8L20 11l-5.8 2.2L12 19l-2.2-5.8L4 11l5.8-2.2z" />;
    default:
      return <path d="M12 12h.01" />;
  }
};

export default function Sidebar({ user }) {
  return (
    <aside className="fixed left-4 top-4 z-40 hidden h-[calc(100vh-2rem)] w-[var(--sidebar-w)] rounded-2xl bg-white p-3 shadow-[0_8px_24px_rgb(0,0,0,0.035)] md:flex md:flex-col">
      <div className="flex items-center px-2 py-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-xs font-bold text-white">W</div>
        <span className="ml-2 text-sm font-bold tracking-tight text-text-primary">Welfare</span>
      </div>

      <nav className="mt-2">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `mb-1 flex items-center gap-2 rounded-full px-3 py-2.5 text-sm font-medium transition-all ${
                isActive ? "bg-blue-tint text-blue" : "text-text-secondary hover:bg-[#f1f5f9]"
              }`
            }
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="opacity-80">
              {iconSvg(item.icon)}
            </svg>
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto p-1">
        <div className="flex items-center gap-2 rounded-2xl bg-[#f8fafc] p-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue text-xs font-semibold text-white">
            {user?.avatar ?? "U"}
          </div>
          <div className="min-w-0">
            <p className="truncate text-xs font-semibold text-text-primary">{user?.name ?? "User"}</p>
            <p className="truncate text-[11px] font-medium text-text-muted">Online</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
