import type { CardDTO } from "@/model/card/cardDTO";
import { toast } from "sonner";

export default async function createGlobalTemplateCard(formData: FormData) {
    const tagDTO: CardDTO = {
        title: formData.get("title")?.toString(),
        cardType: "GLOBAL_TEMPLATE",
    };

    const res = await fetch("http://localhost:8080/api/cards", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tagDTO),
    });

    if (!res.ok) {
        console.error("Error creating global template card:", await res.text());
        toast.error(`Error global template card: ${await res.text()}`);
    } else {
        console.log("Global Template Card created successfully");
        toast.success("Global Template Card has been created.");
    }
}