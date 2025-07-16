import type { TableDTO } from "@/model/table/tableDTO";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function updateTable(formData: FormData) {
  const tableId = formData.get("table_id")?.toString()  
  const tableDTO: TableDTO = {
    name: formData.get("name")?.toString(),
  };

  const createTableRes = await fetch(`${BACKEND_URL}/api/tables/${tableId}/name`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tableDTO),
  });

  if (!createTableRes.ok) {
    console.error("Error updating table:", await createTableRes.text());
    toast.error(`Error updating table: ${await createTableRes.text()}`);
    throw Error(`Error updating table: ${await createTableRes.text()}`)
  }

  console.log("Table updated successfully");
  toast.success("Table has been updated.");
}