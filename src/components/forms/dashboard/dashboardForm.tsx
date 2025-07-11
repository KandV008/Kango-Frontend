import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Upload } from "lucide-react";
import createDashboard from "@/lib/forms/dashboard/createDashboard";
import { useContext } from "react";
import { DashboardListContext } from "@/components/contexts/dashboardList";

function DashboardForm() {
  const { setDashboardList } = useContext(DashboardListContext);

  const handleForm = async (formData: FormData) => {
    const newDashboard = await createDashboard(formData);
    if (!newDashboard) return;
    
    setDashboardList((prev) => {
      return [...prev, newDashboard].sort((a, b) => a.id - b.id);
    });
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Create Dashboard</h4>
        <p className="text-sm text-muted-foreground">
          Set the attributes of the new dashboard.
        </p>
      </div>
      <form
        className="grid gap-5"
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          handleForm(formData);
        }}
      >
        <div className="grid items-center grid-cols-3 gap-4">
          <Label htmlFor="width">Name</Label>
          <Input
            id="name-input"
            name="name"
            placeholder="Dashboard X"
            defaultValue={""}
            className="h-8 col-span-2"
            required
          />
        </div>
        <Button type="submit">
          <Upload /> Create Dashboard
        </Button>
      </form>
    </div>
  );
}

export default DashboardForm;
