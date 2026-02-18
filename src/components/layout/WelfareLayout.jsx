import { Outlet } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";
import WelfareSidebar from "./WelfareSidebar";
import PovSwitcher from "./PovSwitcher";

export default function WelfareLayout() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4">
      <PortalSidebar compact />
      <WelfareSidebar />

      <div className="ml-[calc(5.25rem+var(--sidebar-w)+1rem)] min-h-[calc(100vh-2rem)] rounded-2xl bg-[#f7f8fa] p-2 transition-all duration-300 peer-hover:ml-[calc(15.5rem+var(--sidebar-w)+1rem)]">
        <div className="mb-3 flex justify-end">
          <PovSwitcher />
        </div>
        <main className="flex flex-col gap-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
