import { Outlet } from "react-router-dom";
import PortalSidebar from "./PortalSidebar";

export default function PortalLayout() {
  return (
    <div className="min-h-screen bg-bg">
      <PortalSidebar />
      <div className="ml-56 min-h-screen px-10 py-8">
        <Outlet />
      </div>
    </div>
  );
}
