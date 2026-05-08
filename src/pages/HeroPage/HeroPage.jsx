import { Outlet } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import Topbar from "../Topbar/Topbar";

export default function HeroPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar />
      <div className="flex-1 pl-64">
        <Topbar />
        <main className="pt-16 p-6 max-w-7xl mx-auto">
        {/* <ErrorBoundary> */}
          <Outlet />
          {/* </ErrorBoundary> */}
        </main>
      </div>
    </div>
  );
}