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
import { CardEntity } from "@/model/card/card";
import { useContext, useEffect, useRef, useState } from "react";
import invariant from "tiny-invariant";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import AboutCard from "../about/AboutCard";
import { Separator } from "../ui/separator";
import { getFormattedDate } from "@/lib/utils";
import { Badge } from "../ui/badge";
import { CardContext } from "../contexts/cardContext";
import { CardListContext } from "../contexts/cardListContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

interface componentProps {
  currentCard: CardEntity;
  dashboardId?: string;
}

function Card({ currentCard, dashboardId }: componentProps) {
  const [card, setCard] = useState<CardEntity>(new CardEntity());
  const { cardList, setCardList } = useContext(CardListContext);

  useEffect(() => {
    setCard(currentCard);
  }, [currentCard]);

  const cardColor = getDataColor(card.color ? card.color : "BLACK");
  const visibleTags = card.tagList ? card.tagList.slice(0, 2) : [];

  const deleteCarddAction = async () => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/cards/${card.id}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(`Failed to delete card (status: ${response.status})`);
      }

      toast.success("Card has been deleted.");

      const newCardList = cardList.filter((c) => c.id !== card.id);
      setCardList(newCardList);
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
    "flex flex-col items-start justify-between w-60 sm:w-68 h-32 sm:h-36 gap-2 m-auto border-2 rounded-2xl";
  const dragCardStyle = dragging
    ? "dark:border-gray-400 border-gray-700 dark:bg-gray-700 bg-gray-200 dark:text-gray-400 text-gray-600"
    : "dark:border-white border-black dark:text-white text-black";

  return (
    <CardContext value={{ card, setCard }}>
      <article className={`${baseCardStyle} ${dragCardStyle}`} ref={ref}>
        {/* Top */}
        <section
          className="flex flex-row justify-between w-full p-1 sm:p-2 h-fit rounded-t-xl"
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
                  className={`px-1 sm:px-2 border dark:border-white border-black h-fit ${textColor}`}
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
                  <AlertDialogAction onClick={deleteCarddAction}>
                    Continue
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </article>
        </section>
        {/* Medium */}
        <section className="flex flex-row items-center w-full h-4 gap-2 mx-2 sm:h-8">
          <h1 className="text-sm font-semibold sm:text-base">{card.title}</h1>
        </section>
        <Separator className="" />
        {/* Bottom */}
        <section className="flex flex-row items-center justify-between w-full h-12 px-2 pb-1 sm:pb-3 sm:px-3">
          {/* Icons */}
          <article className="flex flex-row justify-start gap-1 sm:gap-2 w-fit">
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
              <div className="text-sm font-semibold sm:text-base">
                {getFormattedDate(card.deadLine)}
              </div>
            ) : (
              <></>
            )}
          </article>
        </section>
      </article>
    </CardContext>
  );
}

export default Card;
