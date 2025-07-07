import { Button } from "../ui/button";
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
import { Trash } from "lucide-react";
import { getDataColor } from "@/model/utils/color";
import type { CardEntity } from "@/model/card/card";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import AboutCard from "../about/AboutCard";

interface componentProps {
  card: CardEntity;
  dashboardId?: string;
}

function Card({ card, dashboardId }: componentProps) {
  const cardColor = getDataColor(card.color ? card.color : "BLACK");

  const deleteDashboardACtion = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete card (status: ${response.status})`);
      }

      toast.success("Card has been deleted.");
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Error deleting card. Please try again.");
    }
  };

  /* Drag Logic */
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

  //console.log("CARD", card)
  const position = card.position;
  const tableId = card.table;
  const cardId = card.id;

  useEffect(() => {
    const el = ref.current;
    invariant(el);

    return draggable({
      element: el,
      getInitialData: () => ({
        position,
        table: tableId,
        card: cardId,
        type: "CARD",
      }),
      onDragStart: () => setDragging(true),
      onDrop: () => setDragging(false),
    });
  }, [cardId, position, tableId]);

  const baseCardStyle =
    "flex flex-row items-start justify-between w-full gap-2 p-4 m-auto border-2 rounded-2xl";
  const dragCardStyle = dragging
    ? "border-gray-700 bg-gray-200 text-gray-600"
    : "border-black text-black";

  return (
    <article className={`${baseCardStyle} ${dragCardStyle}`} ref={ref}>
      {/* Info */}
      <section className="flex flex-row items-center gap-2 size-full">
        <div
          className="size-10 rounded-xl"
          style={{ backgroundColor: "#" + cardColor.hex }}
        />
        <h1>{card.title}</h1>
      </section>
      {/* Actions */}
      <section className="flex flex-row gap-1">
        {/* See Card */}
        <AboutCard card={card} dashboardId={dashboardId} />
        {/* Delete Card */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                card.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteDashboardACtion}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </article>
  );
}

export default Card;
