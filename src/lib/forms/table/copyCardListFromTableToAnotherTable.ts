import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function copyCardListFromTableToAnotherTable(formData: FormData) {
    const destinyTable = formData.get("destination-table")?.toString();
    const originTable = formData.get("origin-table")?.toString();

  const createTableRes = await fetch(`${BACKEND_URL}/api/tables/${originTable}/cards/copy?newTable=${destinyTable}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!createTableRes.ok) {
    console.error("Error copying card list:", await createTableRes.text(), " from table:", originTable);
    toast.error(`Error copying card list: ${await createTableRes.text()}`);
    throw Error(`Error copying card list: ${await createTableRes.text()} from table: ${originTable}`)
  }

  console.log("Card List copied successfully");
  toast.success("Card List copied successfully.");
}