import { Outlet } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";

export default function PortalLayout() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4">
      <PortalSidebar />
      <div className="ml-[15.5rem] min-h-[calc(100vh-2rem)] rounded-2xl bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
        <Outlet />
      </div>
    </div>
  );
}
