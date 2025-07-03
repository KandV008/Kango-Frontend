import type { TableEntity } from "@/model/table/table";
import { Button } from "../ui/button";
import { Menu, Pen, Plus, Trash } from "lucide-react";
import { Label } from "../ui/label";
import Card from "./Card";
import { Popover, PopoverContent } from "../ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import TableForm from "../forms/tableForm";
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

interface componentProps {
  table: TableEntity;
}

function Table({ table }: componentProps) {
  const deleteTableAction = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/tables/${table.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete table (status: ${response.status})`);
      }

      toast.success("Table has been deleted.");
    } catch (error) {
      console.error("Error deleting table:", error);
      toast.error("Error deleting table. Please try again.");
    }
  };

  const sortCardListAction = async (formData: FormData) => {
    const sort = formData.get("sortType")?.toString();
    console.log("SORT", sort)

    try {
      const response = await fetch(
      `http://localhost:8080/api/tables/${table.id}/sort?sort=${encodeURIComponent(sort || "")}`,
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
    } catch (error) {
      console.error("Error sorting card list:", error);
      toast.error("Error sorting card list. Please try again.");
    }
  };

  return (
    <article className="flex flex-col items-start h-full gap-2 px-2 py-1 border-2 border-black rounded-b-md w-80 rounded-t-2xl">
      {/* Header */}
      <section className="flex flex-row items-center justify-between w-full gap-2 p-2 border-b-2 border-black h-fit">
        <Label>{table.name}</Label>
        <article className="flex flex-row gap-1">
          {/* Update Table Name */}
          <Popover>
            <PopoverTrigger asChild>
              <Button>
                <Pen />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="p-5 mt-5 mr-5 w-80 bg-neutral-100 rounded-2xl">
              <TableForm dashboardId={""} table={table} />
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
              <Label>Settings</Label>
              <Separator />
              {/* Sort Card List */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button variant="outline">Sort Card List</Button>
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
              <div>[...]</div>
              {/* Copy Card List */}
              <div>[...]</div>
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
      <section className="flex flex-col justify-start w-full h-full gap-3">
        <article className="grid justify-end w-full">
          <Dialog>
            <DialogTrigger asChild>
              <Button>
                <Plus />
                Add Card
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <form action={createCard} className="grid gap-5">
                <Input type="hidden" name="table_id" value={table.id} />
                <DialogHeader>
                  <DialogTitle>Create Card</DialogTitle>
                  <DialogDescription>
                    Set the attributes of the new Card
                  </DialogDescription>
                </DialogHeader>
                <CardForm />
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Create Card</Button>
                </DialogFooter>
              </form>
            </DialogContent>{" "}
          </Dialog>
        </article>
        <article className="grid gap-2">
          {table.cardList.map((card) => (
            <Card card={card} />
          ))}
        </article>
      </section>
    </article>
  );
}

export default Table;
