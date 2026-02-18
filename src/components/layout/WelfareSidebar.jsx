import { NavLink } from "react-router-dom";
import { usePov } from "../../context/PovContext";

const navItems = [
  { to: "/welfare/dashboard", label: "Dashboard" },
  { to: "/welfare/wallet", label: "Wallet" },
  { to: "/welfare/profile", label: "Profile" },
  { to: "/welfare/marketplace", label: "Marketplace" },
  { to: "/welfare/inbox", label: "Inbox" },
  { to: "/welfare/requests", label: "Requests" },
  { to: "/welfare/transactions", label: "Transactions" },
  { to: "/welfare/ai", label: "AI Assistant" },
];

export default function WelfareSidebar() {
  const { profile } = usePov();

  return (
    <aside className="fixed left-[5.25rem] top-4 z-40 hidden h-[calc(100vh-2rem)] w-[var(--sidebar-w)] rounded-2xl bg-white p-3 shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300 peer-hover:left-[15.5rem] md:flex md:flex-col">
      <div className="flex items-center gap-2 px-2 py-2.5">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue text-xs font-semibold text-white">W</div>
        <span className="text-sm font-semibold text-text-primary">Welfare</span>
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
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto rounded-2xl bg-[#f8fafc] p-2.5">
        <p className="text-xs font-semibold text-text-primary">{profile.name}</p>
        <p className="text-[11px] text-text-muted">{profile.lifeStage} · {profile.workMode}</p>
      </div>
    </aside>
  );
}
