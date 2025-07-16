import type { TagDTO } from "@/model/tag/tagDTO";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function createGlobalTag(formData: FormData) {
    const tagDTO: TagDTO = {
        label: formData.get("label")?.toString(),
        color: formData.get("color")?.toString(),
        visibility: "GLOBAL",

    };

    const res = await fetch(`${BACKEND_URL}/api/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tagDTO),
    });

    if (!res.ok) {
        console.error("Error creating global tag:", await res.text());
        toast.error(`Error creating global tag: ${await res.text()}`);
    } else {
        console.log("Global Tag created successfully");
        toast.success("Global Tag has been created.");
    }
}