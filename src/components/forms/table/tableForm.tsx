import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Upload } from "lucide-react";
import createTable from "@/lib/forms/table/createTable";
import { TableListContext } from "@/components/contexts/tableListContext";
import { useContext } from "react";

interface componentProps {
  dashboardId: string;
}

function TableForm({ dashboardId }: componentProps) {
  const { setTableList } = useContext(TableListContext);

  const handleForm = async (formData: FormData) => {
    const newTable = await createTable(formData);

    if (!newTable) return;
    
    setTableList((prev) => {
      return [...prev, newTable].sort((a, b) => a.position - b.position);
    });
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Create Table</h4>
        <p className="text-sm text-muted-foreground">
          Set the attributes of the new table.
        </p>
      </div>
      <form className="grid gap-5" action={handleForm}>
        <div className="grid items-center grid-cols-3 gap-4">
          <Input type="hidden" name="dashboard_id" value={dashboardId} />
          <Label htmlFor="width">Name</Label>
          <Input
            id="name-input"
            name="name"
            placeholder="Table X"
            className="h-8 col-span-2"
            required
          />
        </div>
        <Button type="submit">
          <Upload />
          Create Table
        </Button>
      </form>
    </div>
  );
}

export default TableForm;
