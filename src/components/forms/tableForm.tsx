import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Upload } from "lucide-react";
import createTable from "@/lib/forms/table/createTable";
import type { TableEntity } from "@/model/table/table";
import updateTable from "@/lib/forms/table/updateTable";

interface componentProps {
  dashboardId: string;
  table?: TableEntity;
}

function TableForm({ dashboardId, table }: componentProps) {
  const actionForm = table ? updateTable : createTable;
  const action = table ? "Update" : "Create";
  const description = table
    ? "Update the attributes of the table"
    : "Set the attributes of the new table.";

  return (
    <div className="grid gap-4">
      <div className="space-y-2">
        <h4 className="font-medium leading-none">{action} Table</h4>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <form className="grid gap-5" action={actionForm}>
        <div className="grid items-center grid-cols-3 gap-4">
          {table ? (
            <Input type="hidden" name="table_id" value={table.id} />
          ) : (
            <Input type="hidden" name="dashboard_id" value={dashboardId} />
          )}
          <Label htmlFor="width">Name</Label>
          <Input
            id="name-input"
            name="name"
            placeholder="Table X"
            defaultValue={table ? table.name : ""}
            className="h-8 col-span-2"
          />
        </div>
        <Button type="submit">
          <Upload />
          {action} Table
        </Button>
      </form>
    </div>
  );
}

export default TableForm;
