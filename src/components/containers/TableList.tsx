import type { TableEntity } from "@/model/table/table";
import Table from "../entities/Table";
import { DropZone } from "../inputs/DropZone";
import { useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import updateTablePositionFromDashboard from "@/lib/forms/dashboard/updateTablePositionFromDashboard";

interface componentProps {
  tables: TableEntity[];
}

function TableList({ tables }: componentProps) {
  const tableList = [...tables].sort((a, b) => a.position - b.position);
  console.log("TABLES", tables);

  /* Monitoring Drag & Drop Logic */
  useEffect(() => {
    return monitorForElements({
      async onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) {
          return;
        }

        const typeDropZone = destination.data.type;
        const typeElement = source.data.type;

        if (typeElement !== "TABLE" || typeElement !== typeDropZone) {
          return;
        }

        const destinyDashboardId = Number(destination.data.destination);
        const destinyTableZone = Number(destination.data.zone);

        const originDashboardId = Number(source.data.dashboard);
        const tablePosition = Number(source.data.position);
        const tableId = Number(source.data.table);

        console.log(
          "DESTINY DASHBOARD:",
          destinyDashboardId,
          "DESTINY ZONE:",
          destinyTableZone,
          "ORIGIN DASHBOARD:",
          originDashboardId,
          "TABLE POSITION:",
          tablePosition,
          "TABLE ID:",
          tableId
        );

        const isNotNecessaryToMove =
          destinyTableZone === tablePosition ||
          destinyTableZone === tablePosition;

        if (isNotNecessaryToMove) {
          return;
        }

        const newPosition =
          tablePosition - destinyTableZone < 0
            ? destinyTableZone - 1
            : destinyTableZone;
        console.log("NEW POSITION", newPosition);
        await updateTablePositionFromDashboard(
          destinyDashboardId,
          tableId,
          newPosition
        );
      },
    });
  }, []);

  return (
    <section className="flex flex-row items-center justify-start gap-5 p-5 size-full ">
      {tableList.length !== 0 ? (
        <>
          <DropZone zone={0} destination={tables[0].dashboard} type={"TABLE"} />
          {tableList.map((table) => (
            <div className="flex flex-row h-full gap-2" key={table.id}>
              <Table table={table} tables={tables} />
              <DropZone
                zone={table.position + 1}
                destination={table.dashboard}
                type={"TABLE"}
              />
            </div>
          ))}
        </>
      ) : (
        <></>
      )}
    </section>
  );
}

export default TableList;
