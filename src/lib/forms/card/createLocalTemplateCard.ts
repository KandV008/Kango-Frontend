import type { CardDTO } from "@/model/card/cardDTO";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function createLocalTemplateCard(formData: FormData) {
    const dashboardId = formData.get("dashboard_id")?.toString();
    const cardDTO: CardDTO = {
        title: formData.get("title")?.toString(),
        cardType: "LOCAL_TEMPLATE",
    };

    const createCardRes = await fetch(`${BACKEND_URL}/api/cards`, {
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

    const res = await fetch(`${BACKEND_URL}/api/dashboards/${dashboardId}/template-cards`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(cardId),
    });

    if (!res.ok) {
        console.error("Error creating local template card:", await res.text());
        toast.error(`Error local template card: ${await res.text()}`);
    } else {
        console.log("Local Template Card created successfully");
        toast.success("Local Template Card has been created.");
    }
}