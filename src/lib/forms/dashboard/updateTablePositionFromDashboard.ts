import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function updateTablePositionFromDashboard(dashboardId: number, tableId: number, newPosition: number) {
  const res = await fetch(`${BACKEND_URL}/api/dashboards/${dashboardId}/tables/${tableId}/position?position=${newPosition}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Error updating table position:", await res.text(), " from dashboard:", dashboardId);
    toast.error(`Error updating table position: ${await res.text()}`);
    throw Error(`Error updating table position: ${await res.text()} from dashboard: ${dashboardId}`)
  }

  console.log("Table position updated successfully");
  toast.success("Table position has been updated.");
}