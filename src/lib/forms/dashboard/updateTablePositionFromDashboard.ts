import { toast } from "sonner";

export default async function updateTablePositionFromDashboard(dashboardId: number, tableId: number, newPosition: number) {
  const res = await fetch(`http://localhost:8080/api/dashboards/${dashboardId}/tables/${tableId}/position?position=${newPosition}`, {
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