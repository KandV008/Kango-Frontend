import type { TagDTO } from "@/model/tag/tagDTO";
import { toast } from "sonner";

export default async function createLocalTag(formData: FormData) {
    const dashboardId = formData.get("dashboard_id")?.toString();
    const tagDTO: TagDTO = {
        label: formData.get("label")?.toString(),
        color: formData.get("color")?.toString(),
        visibility: "LOCAL",

    };

    const createTagRes = await fetch("http://localhost:8080/api/tags", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tagDTO),
    });

    if (!createTagRes.ok) {
        console.error("Error creating local tag:", await createTagRes.text());
        toast.error(`Error creating local tag: ${await createTagRes.text()}`);
    }

    const createdTag = await createTagRes.json();
    const tagId = createdTag.id;

    const res = await fetch(`http://localhost:8080/api/dashboards/${dashboardId}/tags`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(tagId),
    });

    if (!res.ok) {
        console.error("Error creating local tag:", await res.text());
        toast.error(`Error local tag: ${await res.text()}`);
    }

    console.log("Local Tag created successfully");
    toast.success("Local Tag has been created.");
}