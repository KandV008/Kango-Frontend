import { DashboardEntity } from "@/model/dashboard/dashboard";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function getDashboard(
    id: string, 
) {
    const response = await fetch(
        `${BACKEND_URL}/api/dashboards/${id}`
    );

    if (!response.ok) {
        throw new Error(
            `Error fetching dashboard (status: ${response.status})`
        );
    }

    const data = await response.json();
    const mappedDashboard = DashboardEntity.fromJSON(data);
    const sortedTableList = [...mappedDashboard.tableList].sort((a,b) => a.position - b.position)
    return sortedTableList
}