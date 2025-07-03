import { toast } from "sonner";

export default async function updateCardPosition(tableId: number, cardId: number, newPosition: number) {
  const createTableRes = await fetch(`http://localhost:8080/api/tables/${tableId}/cards/${cardId}/position?position=${newPosition}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!createTableRes.ok) {
    console.error("Error updating card position:", await createTableRes.text(), " from table:", tableId);
    toast.error(`Error updating card position: ${await createTableRes.text()}`);
    throw Error(`Error updating card position: ${await createTableRes.text()} from table: ${tableId}`)
  }

  console.log("Card position updated successfully");
  toast.success("Card position has been updated.");
}