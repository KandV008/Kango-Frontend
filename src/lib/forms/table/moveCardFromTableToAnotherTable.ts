import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function moveCardFormTableToAnotherTable(originTableId: number, cardId: number, destinyTableId:number, newPosition: number) {
  const createTableRes = await fetch(`${BACKEND_URL}/api/tables/${originTableId}/cards/${cardId}?newTable=${destinyTableId}&position=${newPosition}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!createTableRes.ok) {
    console.error("Error moving card:", await createTableRes.text(), " from table:", originTableId);
    toast.error(`Error moving card: ${await createTableRes.text()}`);
    throw Error(`Error moving card: ${await createTableRes.text()} from table: ${originTableId}`)
  }

  console.log("Card moved successfully");
  toast.success("Card moved successfully.");
}