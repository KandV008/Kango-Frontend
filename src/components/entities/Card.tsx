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
import { File, SquareCheck, Text, Trash } from "lucide-react";
import { getDataColor } from "@/model/utils/color";
import type { CardEntity } from "@/model/card/card";
import { useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import AboutCard from "../about/AboutCard";
import { Separator } from "../ui/separator";
import { getFormattedDate } from "@/lib/utils";
import { Badge } from "../ui/badge";

interface componentProps {
  card: CardEntity;
  dashboardId?: string;
}

function Card({ card, dashboardId }: componentProps) {
  const cardColor = getDataColor(card.color ? card.color : "BLACK");
  const visibleTags = card.tagList ? card.tagList.slice(0, 2) : [];

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
      await new Promise((resolve) => setTimeout(resolve, 1000));
      window.location.reload();
    } catch (error) {
      console.error("Error deleting card:", error);
      toast.error("Error deleting card. Please try again.");
    }
  };

  /* Drag Logic */
  const ref = useRef(null);
  const [dragging, setDragging] = useState<boolean>(false);

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
    "flex flex-col items-start justify-between w-68 h-36 gap-2 m-auto border-2 rounded-2xl";
  const dragCardStyle = dragging
    ? "border-gray-700 bg-gray-200 text-gray-600"
    : "border-black text-black";

  return (
    <article className={`${baseCardStyle} ${dragCardStyle}`} ref={ref}>
      {/* Top */}
      <section
        className="flex flex-row justify-between w-full p-2 h-fit rounded-t-xl"
        style={{ backgroundColor: "#" + cardColor.hex }}
      >
        {/* Tags */}
        <article className="flex flex-row flex-wrap gap-1">
          {visibleTags.map((tag) => {
            const tagColor = getDataColor(tag.color ?? "BLACK");
            const textColor =
              tag.color === "BLACK" ? "text-white" : "text-black";
            return (
              <Badge
                key={tag.id}
                className={`px-2 border border-black h-fit ${textColor}`}
                style={{ backgroundColor: "#" + tagColor.hex }}
              >
                {tag.label}
              </Badge>
            );
          })}
        </article>
        {/* Actions */}
        <article className="flex flex-row gap-1">
          {/* See Card */}
          <AboutCard card={card} dashboardId={dashboardId} />
          {/* Delete Card */}
          <AlertDialog>
            {/* Trigger */}
            <AlertDialogTrigger asChild>
              <Button>
                <Trash />
              </Button>
            </AlertDialogTrigger>
            {/* Content */}
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  this card.
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
        </article>
      </section>
      {/* Medium */}
      <section className="flex flex-row items-center w-full h-8 gap-2 mx-2">
        <h1 className="font-semibold">{card.title}</h1>
      </section>
      <Separator className="" />
      {/* Bottom */}
      <section className="flex flex-row items-center justify-between w-full h-12 px-3 pb-3">
        {/* Icons */}
        <article className="flex flex-row justify-start gap-2 w-fit">
          {/* Description Icon */}
          {card.description ? (
            <Text />
          ) : (
            <Text className="text-gray-300"></Text>
          )}
          {/* Check Icon */}
          {card.checks && card.checks.length !== 0 ? (
            <SquareCheck />
          ) : (
            <SquareCheck className="text-gray-300"></SquareCheck>
          )}
          {/* Files Icon */}
          {card.attachedFiled && card.attachedFiled.length !== 0 ? (
            <File />
          ) : (
            <File className="text-gray-300"></File>
          )}
        </article>
        {/** Deadline */}
        <article className="text-end">
          {card.deadLine ? (
            <div className="font-semibold">
              {getFormattedDate(card.deadLine)}
            </div>
          ) : (
            <></>
          )}
        </article>
      </section>
    </article>
  );
}

export default Card;
