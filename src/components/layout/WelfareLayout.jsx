import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";
import WelfareSidebar from "./WelfareSidebar";
import PovSwitcher from "./PovSwitcher";
import { ONBOARDING_KEY } from "../../constants/onboarding";

export default function WelfareLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const inOnboarding = location.pathname.startsWith("/welfare/onboarding");
  const [showPovControls, setShowPovControls] = useState(false);

  useEffect(() => {
    const done = localStorage.getItem(ONBOARDING_KEY) === "1";
    if (!done && !inOnboarding) {
      navigate("/welfare/onboarding", { replace: true });
    }
  }, [inOnboarding, navigate]);

  return (
    <div className="min-h-screen bg-bg">
      <PortalSidebar compact />
      {!inOnboarding && <WelfareSidebar />}

      <div
        className={
          inOnboarding
            ? "ml-16 min-h-screen px-6 py-6 transition-all duration-300 peer-hover:ml-56"
            : "ml-[calc(4rem+var(--sidebar-w))] min-h-screen px-8 py-6 transition-all duration-300 peer-hover:ml-[calc(14rem+var(--sidebar-w))]"
        }
      >
        {!inOnboarding && (
          <div className="mb-6 flex justify-end">
            <div className="flex flex-col items-end gap-2">
              <button
                type="button"
                onClick={() => setShowPovControls((prev) => !prev)}
                className="inline-flex items-center gap-1 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-semibold text-text-primary transition hover:bg-surface-2"
              >
                <span>Switch user</span>
              </button>
              {showPovControls && (
                <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-[var(--shadow-sm)]">
                  <PovSwitcher />
                </div>
              )}
            </div>
          </div>
        )}
        <main className="flex flex-col gap-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
