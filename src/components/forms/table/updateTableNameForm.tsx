import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Upload } from "lucide-react";
import type { TableEntity } from "@/model/table/table";
import updateTable from "@/lib/forms/table/updateTable";
import { useState } from "react";

interface componentProps {
  table: TableEntity;
    updatedAction: (newValue: string) => void
}

function UpdateTableNameForm({ table, updatedAction }: componentProps) {
    const [defaultName, setDefaultName] = useState<string>(table.name)

  const handleForm = async (formData: FormData) => {
    updateTable(formData);

    const newName = formData.get("name")!.toString()
    updatedAction(newName)
    setDefaultName(newName)
  };

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">Update Table</h4>
        <p className="text-sm text-muted-foreground">
          Update the attributes of the table
        </p>
      </div>
      <form className="grid gap-5" action={handleForm}>
        <div className="grid items-center grid-cols-3 gap-4">
          <Input type="hidden" name="table_id" value={table.id} />
          <Label htmlFor="width">Name</Label>
          <Input
            id="name-input"
            name="name"
            placeholder="Table X"
            defaultValue={defaultName}
            className="h-8 col-span-2"
            required
          />
        </div>
        <Button type="submit">
          <Upload />
          Update Table
        </Button>
      </form>
    </div>
  );
}

export default UpdateTableNameForm;
