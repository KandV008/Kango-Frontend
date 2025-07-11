import { useContext } from "react";
import { DashboardListContext } from "../contexts/dashboardList";
import Dashboard from "../entities/Dashboard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import getDashboardList from "@/lib/forms/dashboard/getDashboardList";

function DashboardList() {
  const { dashboardList, setDashboardList } = useContext(DashboardListContext);

  return (
      <ScrollArea className="grid items-center h-full">
        <section className="flex flex-col items-center self-center justify-center gap-5 px-5 ">
          {dashboardList.map((dashboard) => (
            <Dashboard
              dashboard={dashboard}
              key={"dashboard-" + dashboard.id}
              onDelete={() => {
                getDashboardList(setDashboardList);
              }}
            />
          ))}
        </section>
        <ScrollBar orientation="vertical" />
      </ScrollArea>
  );
}

export default DashboardList;
