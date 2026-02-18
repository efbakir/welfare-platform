import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import mockData from "../../data/mock.json";

export default function Shell() {
  const user = mockData.user;

  return (
    <div className="min-h-screen bg-[#f7f8fa] p-4 md:p-6">
      <div className="mx-auto min-h-[calc(100vh-2rem)] max-w-[1540px] rounded-2xl bg-[#f7f8fa] md:min-h-[calc(100vh-3rem)]">
        <Sidebar user={user} />
        <div className="min-h-full md:ml-[calc(var(--sidebar-w)+1rem)]">
          <main className="flex flex-1 flex-col gap-6 p-1 md:p-2">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
}
