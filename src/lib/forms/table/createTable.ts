import { DashboardEntity } from "@/model/dashboard/dashboard";
import type { TableDTO } from "@/model/table/tableDTO";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function createTable(formData: FormData) {
  const dashboardId = formData.get("dashboard_id")!.toString();
  const tableDTO: TableDTO = {
    name: formData.get("name")?.toString(),
    cardList: []
  };

  const createTableRes = await fetch(`${BACKEND_URL}/api/tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tableDTO),
  });

  if (!createTableRes.ok) {
    console.error("Error creating table:", await createTableRes.text());
    toast.error(`Error creating table: ${await createTableRes.text()}`);
    throw Error(`Error creating table: ${await createTableRes.text()}`)
  }

  const createdTable = await createTableRes.json();
  const tableId = createdTable.id;

  const addTableRes = await fetch(`${BACKEND_URL}/api/dashboards/${dashboardId}/tables`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tableId),
  });

  if (!addTableRes.ok) {
    console.error("Error adding table:", await addTableRes.text(), " to dashboard:", dashboardId);
    toast.error(`Error adding table: ${await addTableRes.text()}`);
    throw Error(`Error adding table: ${await addTableRes.text()} to dashboard: ${dashboardId}`)
  }

  console.log("Table created successfully");
  toast.success("Table has been created.");

  const dashboardData = await addTableRes.json();
  const mappedDashboard = DashboardEntity.fromJSON(dashboardData)
  const newTable = mappedDashboard.tableList.filter(value => value.id === tableId)[0]
  return newTable;
}