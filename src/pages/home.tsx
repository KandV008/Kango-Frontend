import DashboardList from "@/components/containers/DashboardList";
import Header from "@/components/common/Header";
import SideBar from "@/components/common/SideBar";
import { useEffect, useState } from "react";
import { DashboardListContext } from "@/components/contexts/dashboardList";
import getDashboardList from "@/lib/forms/dashboard/getDashboardList";
import type { DashboardEntity } from "@/model/dashboard/dashboard";

function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [dashboardList, setDashboardList] = useState<DashboardEntity[]>([]);

  useEffect(() => {
    getDashboardList(setDashboardList).then();
  }, []);

  return (
    <DashboardListContext.Provider value={{ dashboardList, setDashboardList }}>
      <main className="flex flex-row h-screen">
        <SideBar
          isSideBarOpen={sidebarOpen}
          removeSideBar={() => setSidebarOpen(false)}
        />
        <div className="flex flex-col w-full gap-2">
          <Header toggleSideBar={() => setSidebarOpen((prev) => !prev)} />
          <div className="flex-1 overflow-hidden">
            <DashboardList />
          </div>
        </div>
      </main>
    </DashboardListContext.Provider>
  );
}

export default Home;
