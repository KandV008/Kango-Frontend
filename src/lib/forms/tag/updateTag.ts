import type { TagDTO } from "@/model/tag/tagDTO";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function updateTag(formData: FormData) {
    const tagId = formData.get("id")?.toString();
    const tagDTO: TagDTO = {
        label: formData.get("label")?.toString(),
        color: formData.get("color")?.toString(),
        visibility: formData.get("visibility")?.toString(),
    };

    const res = await fetch(`${BACKEND_URL}/api/tags/${tagId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tagDTO),
    });

    if (!res.ok) {
        console.error("Error updating tag:", await res.text());
        toast.error(`Error updating tag: ${await res.text()}`);
    } else {
        console.log("Tag updated successfully");
        toast.success("Tag has been updated.");
    }
}