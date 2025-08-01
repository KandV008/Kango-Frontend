import type { AttachedFileProps } from "@/model/utils/attachedFile";
import { toast } from "sonner";

const BACKEND_URL = import.meta.env.VITE_API_URL;

export default async function addAttachedFile(formData: FormData) {
    const dashboardId = formData.get("dashboard_id")?.toString();
    const attachedFile: AttachedFileProps = {
        fileName: formData.get("file-name")?.toString(),
        fileUrl: formData.get("file-url")?.toString(),
    };

    const res = await fetch(`${BACKEND_URL}/api/dashboards/${dashboardId}/attached-files`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(attachedFile),
    });

    if (res.status !== 204) {
        console.error("Error adding file:", await res.text());
        toast.error(`Error adding file: ${await res.text()}`);
    }

    console.log("File added successfully");
    toast.success("File has been added.");
}