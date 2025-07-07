import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { InputCalendar } from "@/components/inputs/InputCalendar";

interface componentProps {
  card: CardEntity;
}

function UpdateCardDeadLineForm({ card }: componentProps) {
  const getFormattedDate = (date: Date) => {
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const udpateCardTitleAction = async (formData: FormData) => {
    try {
      const rawDate = formData.get("dead-line");
      const parsedDate = rawDate ? new Date(rawDate.toString()) : null;

      const cardDTO: CardDTO = {
        deadLine: parsedDate,
      };

      console.log("RAW DATE", rawDate)
      console.log("PARSE DATE", parsedDate)
      console.log("DTO", cardDTO)

      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/deadline`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(cardDTO),
        }
      );

      if (response.status !== 204) {
        throw new Error(`Failed to updated card (status: ${response.status})`);
      }

      toast.success("Card has been updated.");
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Error updating card. Please try again.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <h2 className="grid items-center hover:bg-gray-200">
          {card.deadLine ? (
            <>{getFormattedDate(card.deadLine)}</>
          ) : (
            <em className="justify-center w-full text-center self">
              This Card doesn't have a deadline.
            </em>
          )}
        </h2>{" "}
      </PopoverTrigger>
      <PopoverContent side="right">
        <form action={udpateCardTitleAction} className="grid w-full gap-2">
          <Label htmlFor="title-input">Update Card's DeadLine</Label>
          <InputCalendar currentDate={card.deadLine} />
          <Button type="submit">
            <Pen /> Update
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateCardDeadLineForm;
