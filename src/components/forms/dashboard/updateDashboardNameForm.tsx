import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import { toast } from "sonner";
import type { DashboardEntity } from "@/model/dashboard/dashboard";
import type { DashboardDTO } from "@/model/dashboard/dashboardDTO";
import { useState } from "react";

interface componentProps {
  dashboard: DashboardEntity;
  updatedAction: (newValue: string) => void;
}

function UpdateDashboardNameForm({ dashboard, updatedAction }: componentProps) {
  const [defaultName, setDefaultName] = useState<string>(dashboard.name);

  const udpateCardTitleAction = async (formData: FormData) => {
    try {
      const dashboardDTO: DashboardDTO = {
        name: formData.get("name")?.toString(),
      };

      const response = await fetch(
        `http://localhost:8080/api/dashboards/${dashboard.id}/name`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(dashboardDTO),
        }
      );

      if (response.status !== 204) {
        throw new Error(
          `Failed to updated dashboard (status: ${response.status})`
        );
      }

      updatedAction(dashboardDTO.name!);
      setDefaultName(dashboardDTO.name!);

      toast.success("Dashboard has been updated.");
    } catch (error) {
      console.error("Error updating dashboard:", error);
      toast.error("Error updating dashboard. Please try again.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <Button>
          <Pen />
          <p className="hidden lg:block">Update</p>
        </Button>
      </PopoverTrigger>
      <PopoverContent side="top">
        <form action={udpateCardTitleAction} className="grid w-full gap-2">
          <Label htmlFor="title-input">Update Dashboard's Name</Label>
          <Input
            id="name-input"
            name="name"
            placeholder="Dashboard X"
            defaultValue={defaultName}
            className="h-8 col-span-2"
            required
          />
          <Button type="submit">
            <Pen /> Update
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateDashboardNameForm;
