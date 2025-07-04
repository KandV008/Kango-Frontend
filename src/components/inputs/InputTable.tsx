import type { TableEntity } from "@/model/table/table";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

interface componentProps{
    tables: TableEntity[]
}

export function InputTable({ tables }: componentProps) {
  return (
    <Select name="destination-table">
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a table" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Tables</SelectLabel>
          {
            tables.map(table => <SelectItem key={"select-item-table-" + table.id} value={table.id.toString()}>{table.name}</SelectItem>)
          }
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
