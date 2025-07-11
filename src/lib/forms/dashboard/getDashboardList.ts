import { DashboardEntity } from "@/model/dashboard/dashboard";

export default async function getDashboardList(setDashboardList: (dashboardList: DashboardEntity[]) => void) {
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
}