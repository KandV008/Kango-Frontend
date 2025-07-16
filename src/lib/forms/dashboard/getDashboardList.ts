import { DashboardEntity } from "@/model/dashboard/dashboard";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function getDashboardList(setDashboardList: (dashboardList: DashboardEntity[]) => void) {
    fetch(`${BACKEND_URL}/api/dashboards`)
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