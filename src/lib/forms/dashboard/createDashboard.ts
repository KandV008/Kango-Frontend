import type { DashboardDTO } from "@/model/dashboard/dashboardDTO";
import { DashboardEntity } from "@/model/dashboard/dashboard"; // importa esto
import { toast } from "sonner";

export default async function createDashboard(formData: FormData): Promise<DashboardEntity | null> {
  const dashboardDTO: DashboardDTO = {
    name: formData.get("name")?.toString(),
  };

  const res = await fetch("http://localhost:8080/api/dashboards", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dashboardDTO),
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error("Error creating dashboard:", errorText);
    toast.error(`Error creating dashboard: ${errorText}`);
    return null;
  }

  const data = await res.json();
  toast.success("Dashboard has been created.");
  console.log("Dashboard created successfully:", data);

  return DashboardEntity.fromJSON(data);
}
