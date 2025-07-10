import { useEffect, useState } from "react";
import Dashboard from "../entities/Dashboard";
import { DashboardEntity } from "@/model/dashboard/dashboard";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";

function DashboardList() {
  const [dashboardList, setDashboardList] = useState<DashboardEntity[]>([]);


  useEffect(() => {
    fetch("http://localhost:8080/api/dashboards")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dashboards recibidos:", data);
        const mappedDashboards = data.map(DashboardEntity.fromJSON);
        const dashboards = [...mappedDashboards].sort((a, b) => a.id - b.id);
        setDashboardList(dashboards);
      })
      .catch((error) => {
        console.error("Error al obtener dashboards:", error);
      });
  }, []);
  return (
    <ScrollArea className="grid items-center h-full ">
      <section className="flex flex-col items-center self-center justify-center gap-5 px-5 ">
        {dashboardList.map((dashboard) => (
          <Dashboard dashboard={dashboard} key={"dashboard-" + dashboard.id}/>
        ))}
      </section>
      <ScrollBar orientation="vertical" />
    </ScrollArea>
  );
}

export default DashboardList;
