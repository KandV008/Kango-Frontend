import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function updateCardPosition(tableId: number, cardId: number, newPosition: number) {
  const res = await fetch(`${BACKEND_URL}/api/tables/${tableId}/cards/${cardId}/position?position=${newPosition}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    console.error("Error updating card position:", await res.text(), " from table:", tableId);
    toast.error(`Error updating card position: ${await res.text()}`);
    throw Error(`Error updating card position: ${await res.text()} from table: ${tableId}`)
  }

  console.log("Card position updated successfully");
  toast.success("Card position has been updated.");
}