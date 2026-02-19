import { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";
import WelfareSidebar from "./WelfareSidebar";
import PovSwitcher from "./PovSwitcher";
import { ONBOARDING_KEY } from "../../constants/onboarding";

export default function WelfareLayout() {
  const location = useLocation();
  const navigate = useNavigate();
  const inOnboarding = location.pathname.startsWith("/welfare/onboarding");

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
          <div className="mb-8 flex justify-end border-b border-border pb-4">
            <PovSwitcher />
          </div>
        )}
        <main className="flex flex-col gap-10">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
