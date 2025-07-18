import type { TableEntity } from "@/model/table/table";
import { Button } from "../ui/button";
import {
  ArrowLeftRight,
  ArrowUpDown,
  Copy,
  Menu,
  Pen,
  Plus,
  Trash,
} from "lucide-react";
import { Label } from "../ui/label";
import Card from "./Card";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import CardForm from "../forms/cardForm";
import createCard from "@/lib/forms/card/createCard";
import { Input } from "../ui/input";
import { InputSort } from "../inputs/InputSort";
import { DropZone } from "../inputs/DropZone";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import updateCardPosition from "@/lib/forms/table/updateCardPositionFromTable";
import moveCardFormTableToAnotherTable from "@/lib/forms/table/moveCardFromTableToAnotherTable";
import { InputTable } from "../inputs/InputTable";
import moveCardListFromTableToAnotherTable from "@/lib/forms/table/moveCardListFromTableToAnotherTable";
import copyCardListFromTableToAnotherTable from "@/lib/forms/table/copyCardListFromTableToAnotherTable";
import { InputCardTemplate } from "../inputs/InputCardTemplate";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import UpdateTableNameForm from "../forms/table/updateTableNameForm";
import { TableListContext } from "../contexts/tableListContext";
import { CardListContext } from "../contexts/cardListContext";
import { CardEntity } from "@/model/card/card";
import { sortCardList, valueOfCardListSort } from "@/model/enums/cardListSort";
import getDashboard from "@/lib/forms/dashboard/getDashboard";

const BACKEND_URL = import.meta.env.VITE_API_URL;

interface componentProps {
  table: TableEntity;
  onChange: (tableList: TableEntity[]) => void;
}

function Table({ table }: componentProps) {
  const [cardList, setCardList] = useState<CardEntity[]>([]);
  const { tableList, setTableList } = useContext(TableListContext);

  useEffect(() => {
    setCardList(table.cardList);
  }, [table.cardList]);

  const sortedCardList = [...cardList].sort((a, b) => a.position - b.position);
  const otherTables = [...tableList].filter((a) => a.id !== table.id);
  const [tableName, setTableName] = useState<string>(table.name);

  console.log("CARD-LIST", sortedCardList);

  const deleteTableAction = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/tables/${table.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete table (status: ${response.status})`);
      }

      toast.success("Table has been deleted.");

      const newTables = tableList.filter((t) => t.id !== table.id);
      setTableList(newTables);
    } catch (error) {
      console.error("Error deleting table:", error);
      toast.error("Error deleting table. Please try again.");
    }
  };

  const sortCardListAction = async (formData: FormData) => {
    const sort = formData.get("sortType")?.toString();

    try {
      const response = await fetch(
        `${BACKEND_URL}/api/tables/${
          table.id
        }/sort?sort=${encodeURIComponent(sort || "")}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to sort card list from table (status: ${response.status})`
        );
      }

      toast.success("Card List has been sorted.");
      const valueOf = valueOfCardListSort(sort!);
      const newSortedCardList = sortCardList(cardList, valueOf!);
      setCardList(newSortedCardList);
    } catch (error) {
      console.error("Error sorting card list:", error);
      toast.error("Error sorting card list. Please try again.");
    }
  };

  const handleMoveCardListAction = async (formData: FormData) => {
    await moveCardListFromTableToAnotherTable(formData);

    await updateTableList();
  };

  const handleCopyCardListAction = async (formData: FormData) => {
    await copyCardListFromTableToAnotherTable(formData);

    await updateTableList();
  };

  const handleCardCreationAction = async (formData: FormData) => {
    const newCard = await createCard(formData);
    if (!newCard) return;

    setCardList((prev) => [...prev, newCard]);
  };

  const updateTableList = useCallback(async () => {
    const sortedTableList = await getDashboard(table.dashboard.toString());

    setTableList(
      sortedTableList.map((table) => ({
        ...table,
        cardList: [...table.cardList],
      }))
    );
  }, [setTableList, table.dashboard]);

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

        if (typeElement !== "CARD" || typeElement !== typeDropZone) {
          return;
        }

        const destinyTableId = Number(destination.data.destination);
        const destinyTableZone = Number(destination.data.zone);

        const originTableId = Number(source.data.table);
        const cardPosition = Number(source.data.position);
        const cardId = Number(source.data.card);

        console.log("DESTINY TABLE", destinyTableId);
        console.log("ORIGIN TABLE", originTableId);
        console.log("DESTINY ZONE", destinyTableZone);
        console.log("CARD POSITION", cardPosition);

        if (destinyTableId === originTableId) {
          const isNotNecessaryToMove =
            destinyTableZone === cardPosition ||
            destinyTableZone === cardPosition + 1;

          if (isNotNecessaryToMove) {
            console.warn("IT IS NOT NECCESSARY TO MOVE");
            return;
          }

          const newPosition =
            cardPosition < destinyTableZone
              ? destinyTableZone - 1
              : destinyTableZone;

          console.log("NEW POSITION:", newPosition);
          console.log("ACTION:", "UPDATE CARD POSITION");
          await updateCardPosition(destinyTableId, cardId, newPosition);
        } else {
          console.log("ACTION:", "MOVE CARD FROM TABLE TO ANOTHER TABLE");
          await moveCardFormTableToAnotherTable(
            originTableId,
            cardId,
            destinyTableId,
            destinyTableZone
          );
        }

        await updateTableList();
      },
    });
  }, [updateTableList]);

  /* Drag Logic */
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  const position = table.position;
  const dashboardId = table.dashboard;
  const tableId = table.id;

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({
        position,
        dashboard: dashboardId,
        table: tableId,
        type: "TABLE",
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [tableId, position, dashboardId]);

  const baseCardStyle =
    "flex flex-col items-start gap-2 px-2 py-1 border-2 rounded-b-md w-72 sm:w-80 rounded-t-2xl";
  const dragCardStyle = dragging
    ? "dark:border-gray-400 border-gray-700 dark:bg-gray-700 bg-gray-200 dark:text-gray-400 text-gray-600"
    : "dark:border-white border-black dark:text-white text-black";

  return (
    <article
      ref={ref}
      className={`${baseCardStyle} ${dragCardStyle} grow shadow-xl`}
    >
      {/* Header */}
      <section className="flex flex-row items-center justify-between w-full gap-2 p-2 border-b-2 border-black dark:border-white h-fit">
        <Label className="text-xl xl:text-2xl">{tableName}</Label>
        <article className="flex flex-row gap-1">
          {/* Update Table Name */}
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Pen />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-5 mt-5 mr-5 w-80 bg-neutral-100 rounded-2xl">
              <UpdateTableNameForm
                table={table}
                updatedAction={(newValue: string) => {
                  setTableName(newValue);
                }}
              />
            </PopoverContent>
          </Popover>
          {/* Options */}
          <Popover>
            <PopoverTrigger>
              <Button>
                <Menu />
              </Button>
            </PopoverTrigger>
            {/* Items */}
            <PopoverContent className="grid gap-2 w-fit">
              <Label className="mx-auto w-fit">Settings</Label>
              <Separator />
              {/* Sort Card List */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <ArrowUpDown /> Sort Card List
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-80">
                  <form action={sortCardListAction}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Set Sort Method
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Set the sort method to apply to this table's card
                          list.
                        </p>
                      </div>
                      <div className="grid gap-2">
                        <InputSort />
                      </div>
                      <Button type="submit"> Apply</Button>
                    </div>
                  </form>
                </PopoverContent>
              </Popover>
              {/* Move Card List */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <ArrowLeftRight />
                    Move Card List
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-80">
                  <form action={handleMoveCardListAction}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Select the destination table
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Selet the table to move all of the cards associated to
                          this table.
                        </p>
                      </div>
                      <Input
                        type="hidden"
                        value={table.id}
                        name="origin-table"
                      ></Input>
                      <div className="grid gap-2">
                        <InputTable tables={otherTables} />
                      </div>
                      <Button type="submit">Apply</Button>
                    </div>
                  </form>
                </PopoverContent>
              </Popover>
              {/* Copy Card List */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">
                    <Copy />
                    Copy Card List
                  </Button>
                </PopoverTrigger>
                <PopoverContent side="right" className="w-80">
                  <form action={handleCopyCardListAction}>
                    <div className="grid gap-4">
                      <div className="space-y-2">
                        <h4 className="font-medium leading-none">
                          Select the destination table
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          Selet the table to copy all of the cards associated to
                          this table.
                        </p>
                      </div>
                      <Input
                        type="hidden"
                        value={table.id}
                        name="origin-table"
                      ></Input>
                      <div className="grid gap-2">
                        <InputTable tables={otherTables} />
                      </div>
                      <Button type="submit">Apply</Button>
                    </div>
                  </form>
                </PopoverContent>
              </Popover>{" "}
              <Separator />
              {/* Delete Table */}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button className="bg-red-700">
                    <Trash className="text-white" /> Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>
                      Are you absolutely sure?
                    </AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete
                      this table.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={deleteTableAction}>
                      Continue
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </PopoverContent>
          </Popover>
        </article>
      </section>
      {/* CardList */}
      <CardListContext.Provider
        value={{ cardList: sortedCardList, setCardList }}
      >
        <section className="flex flex-col justify-start flex-grow w-full gap-3 overflow-x-hidden">
          {/* Action Add Card */}
          <article className="grid justify-end w-full">
            <Dialog>
              <DialogTrigger asChild>
                <Button>
                  <Plus />
                  <p className="hidden lg:block">Add</p> Card
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <form action={handleCardCreationAction} className="grid gap-5">
                  {/* Header */}
                  <Input type="hidden" name="table_id" value={table.id} />
                  <DialogHeader>
                    <DialogTitle>Create Card</DialogTitle>
                    <DialogDescription>
                      Set the attributes of the new Card
                    </DialogDescription>
                  </DialogHeader>
                  {/* Form */}
                  <CardForm />
                  {/* Footer */}
                  <DialogFooter>
                    {/* Use a Template */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button>Use a template</Button>
                      </PopoverTrigger>
                      <PopoverContent className="grid gap-2 w-fit">
                        <Label>Select a template to use:</Label>
                        <InputCardTemplate
                          dashboardId={table.dashboard.toString()}
                          tableId={table.id.toString()}
                        />
                      </PopoverContent>
                    </Popover>
                    {/* Cancel Action */}
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    {/* Create Card */}
                    <Button type="submit">Create Card</Button>
                  </DialogFooter>
                </form>
              </DialogContent>{" "}
            </Dialog>
          </article>
          {/* All Cards */}
          <article className="grid w-full gap-1 overflow-y-auto sm:gap-2 h-max">
            <DropZone zone={0} destination={table.id} type={"CARD"} />
            {sortedCardList.map((card) => (
              <div className="grid gap-1 sm:gap-2" key={"card-" + card.id}>
                <Card currentCard={card} dashboardId={table.dashboard.toString()} />
                <DropZone
                  zone={card.position + 1}
                  destination={table.id}
                  type={"CARD"}
                />
              </div>
            ))}
          </article>
        </section>
      </CardListContext.Provider>
    </article>
  );
}

export default Table;
