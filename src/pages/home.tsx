import DashboardList from "@/components/containers/DashboardList";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { useState } from "react";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <main className="flex flex-row h-screen">
      <SideBar isSideBarOpen={sidebarOpen} removeSideBar={() => setSidebarOpen(false) } />
      <div className="flex flex-col w-full gap-2">
        <Header toggleSideBar={() => setSidebarOpen(prev => !prev)} />
        <div className="flex-1 overflow-hidden">
          <DashboardList />
        </div>
      </div>
    </main>
  );
}

export default Home;
