import type { TableEntity } from "@/model/table/table";
import Table from "../entities/Table";

interface componentProps {
  tables: TableEntity[];
}

function TableList({ tables }: componentProps) {
  console.log("TABLES", tables);
  
  return (
    <section className="flex flex-row items-center justify-start gap-5 p-5 size-full ">
      {
        tables.map(table => <Table table={table} key={table.id}/>)
      }
    </section>
  );
}

export default TableList;
