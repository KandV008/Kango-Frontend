import type { DashboardDTO } from "@/model/dashboard/dashboardDTO";
import { toast } from "sonner";

export default async function createDashboard(formData: FormData){
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
      console.error("Error creating dashboard:", await res.text());
      toast.error(`Error creating dashboard: ${await res.text()}`);
    } else {
      console.log("Dashboard created successfully");
      toast.success("Dashboard has been created.");
    }
}