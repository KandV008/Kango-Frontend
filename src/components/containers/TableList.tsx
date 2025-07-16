import Table from "../entities/Table";
import { DropZone } from "../inputs/DropZone";
import { useCallback, useContext, useEffect } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import updateTablePositionFromDashboard from "@/lib/forms/dashboard/updateTablePositionFromDashboard";
import { TableListContext } from "../contexts/tableList";
import getDashboard from "@/lib/forms/dashboard/getDashboard";
import { useParams } from "react-router-dom";

function TableList() {
  const { id } = useParams();
  const { tableList, setTableList } = useContext(TableListContext);

  const updateTableList = useCallback(async () => {
    if (id) {
      const sortedTableList = await getDashboard(id);

      setTableList(
        sortedTableList.map((table) => ({
          ...table,
          cardList: [...table.cardList],
        }))
      );
    }
  }, [id, setTableList]);

  useEffect(() => {
    return monitorForElements({
      async onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const typeDropZone = destination.data.type;
        const typeElement = source.data.type;

        if (typeElement !== "TABLE" || typeElement !== typeDropZone) return;

        const destinyDashboardId = Number(destination.data.destination);
        const destinyTableZone = Number(destination.data.zone);
        const tablePosition = Number(source.data.position);
        const tableId = Number(source.data.table);

        const isNotNecessaryToMove = destinyTableZone === tablePosition || destinyTableZone === tablePosition + 1;

        if (isNotNecessaryToMove) return;

        const newPosition =
          tablePosition < destinyTableZone
            ? destinyTableZone - 1
            : destinyTableZone;

        await updateTablePositionFromDashboard(
          destinyDashboardId,
          tableId,
          newPosition
        );

        await updateTableList();
      },
    });
  }, [updateTableList]);

  return (
    <div className="flex flex-row h-full gap-2 p-5 ">
      {tableList.length !== 0 && (
        <>
          <DropZone
            zone={0}
            destination={tableList[0].dashboard}
            type="TABLE"
          />
          {tableList.map((table) => (
            <div className="flex flex-row h-full gap-2" key={table.id}>
              <Table table={table} onChange={setTableList} />
              <DropZone
                zone={table.position + 1}
                destination={table.dashboard}
                type="TABLE"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
}

export default TableList;
