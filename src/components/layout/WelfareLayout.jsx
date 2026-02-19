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
    <div className="min-h-screen bg-transparent p-4">
      <PortalSidebar compact />
      {!inOnboarding && <WelfareSidebar />}

      <div
        className={
          inOnboarding
            ? "ml-[5.25rem] min-h-[calc(100vh-2rem)] rounded-2xl bg-[rgba(247,247,251,0.76)] p-3 backdrop-blur-sm transition-all duration-300 peer-hover:ml-[15.5rem]"
            : "ml-[calc(5.25rem+var(--sidebar-w)+1rem)] min-h-[calc(100vh-2rem)] rounded-2xl bg-[rgba(247,247,251,0.76)] p-3 backdrop-blur-sm transition-all duration-300 peer-hover:ml-[calc(15.5rem+var(--sidebar-w)+1rem)]"
        }
      >
        {!inOnboarding && (
          <div className="mb-3 flex justify-end">
            <PovSwitcher />
          </div>
        )}
        <main className="flex flex-col gap-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
