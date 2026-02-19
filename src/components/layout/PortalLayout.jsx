import { Outlet } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";

export default function PortalLayout() {
  return (
    <div className="min-h-screen bg-transparent p-4">
      <PortalSidebar />
      <div className="ml-[15.5rem] min-h-[calc(100vh-2rem)] rounded-2xl border border-[rgba(255,255,255,0.65)] bg-[rgba(255,255,255,0.8)] p-8 shadow-[var(--shadow-sm)] backdrop-blur-md">
        <Outlet />
      </div>
    </div>
  );
}
