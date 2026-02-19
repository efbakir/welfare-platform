import { Outlet } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";

export default function PortalLayout() {
  return (
    <div className="min-h-screen bg-transparent px-4 py-5">
      <PortalSidebar />
      <div className="ml-[15.5rem] min-h-[calc(100vh-2rem)] rounded-2xl border border-[rgba(255,255,255,0.7)] bg-[rgba(255,255,255,0.84)] p-10 shadow-[var(--shadow-sm)] backdrop-blur-md">
        <Outlet />
      </div>
    </div>
  );
}
