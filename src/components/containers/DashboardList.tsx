import { useEffect, useState } from "react";
import Dashboard from "../entities/Dashboard";
import { DashboardEntity } from "@/model/dashboard/dashboard";

function DashboardList() {
  const [dashboardList, setDashboardList] = useState<DashboardEntity[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/dashboards")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("Dashboards recibidos:", data);
        const mappedDashboards = data.map(DashboardEntity.fromJSON);
        setDashboardList(mappedDashboards)
      })
      .catch(error => {
        console.error("Error al obtener dashboards:", error);
      });
  }, []);
  return (
    <section className="flex flex-col items-center justify-center gap-5 px-5 size-full ">
        {dashboardList.map(
          dashboard => <Dashboard dashboard={dashboard} />
        )}
    </section>
  );
}

export default DashboardList;
