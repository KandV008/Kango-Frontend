import { TableEntity } from "@/model/table/table";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function copyCardTemplate(formData: FormData) {
    const templateCardId = formData.get("card_id")?.toString();
    const tableId = formData.get("table_id")?.toString()
    
    const createCardRes = await fetch(
      `${BACKEND_URL}/api/cards/${templateCardId}/copy`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!createCardRes.ok) {
      console.error(
        "Error creating card using a template:",
        await createCardRes.text()
      );
      toast.error(
        `Error creating card using a template: ${await createCardRes.text()}`
      );
    }

    const createdCard = await createCardRes.json();
    const cardId = createdCard.id;

    const addCardRes = await fetch(
      `${BACKEND_URL}/api/tables/${tableId}/cards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardId),
      }
    );

    if (!addCardRes.ok) {
      console.error(
        "Error adding card:",
        await addCardRes.text(),
        " to table:",
        tableId
      );
      toast.error(`Error adding card: ${await addCardRes.text()}`);
      throw Error(
        `Error adding card: ${await addCardRes.text()} to table: ${tableId}`
      );
    }

    console.log("Card created successfully");
    toast.success("Card has been created.");

    const tableData = await addCardRes.json();
    const mappedTable = TableEntity.fromJSON(tableData)
    const newCard = mappedTable.cardList.filter(value => value.id === cardId)[0]
    return newCard
}