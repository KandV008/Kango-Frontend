import type { CardDTO } from "@/model/card/cardDTO";
import { toast } from "sonner";

export default async function createCard(formData: FormData) {
    const tableId = formData.get("table_id")?.toString();
    const cardDTO: CardDTO = {
        title: formData.get("title")?.toString(),
        cardType: "NORMAL",
    };

    const createCardRes = await fetch("http://localhost:8080/api/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardDTO),
    });

    if (!createCardRes.ok) {
        console.error("Error creating card:", await createCardRes.text());
        toast.error(`Error card: ${await createCardRes.text()}`);
    }

    const createdCard = await createCardRes.json();
    const cardId = createdCard.id;

    const addCardRes = await fetch(`http://localhost:8080/api/tables/${tableId}/cards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardId),
    });

    if (!addCardRes.ok) {
        console.error("Error adding card:", await addCardRes.text(), " to table:", tableId);
        toast.error(`Error adding card: ${await addCardRes.text()}`);
        throw Error(`Error adding card: ${await addCardRes.text()} to table: ${tableId}`)
    }

    console.log("Card created successfully");
    toast.success("Card has been created.");

}