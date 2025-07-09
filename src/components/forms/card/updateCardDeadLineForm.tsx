import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { InputCalendar } from "@/components/inputs/InputCalendar";
import { useState } from "react";
import { getFormattedDate } from "@/lib/utils";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface componentProps {
  card: CardEntity;
}

function UpdateCardDeadLineForm({ card }: componentProps) {
  const [deadLine, setDeadLine] = useState<Date | null>(card.deadLine);

  const udpateCardTitleAction = async (formData: FormData) => {
    try {
      const rawDate = formData.get("dead-line");
      const parsedDate = rawDate ? new Date(rawDate.toString()) : null;

      const cardDTO: CardDTO = {
        deadLine: parsedDate,
      };

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
      setDeadLine(parsedDate);
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Error updating card. Please try again.");
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger className="hidden w-full sm:block">
          <Button
            variant={"outline"}
            className="grid items-center w-24 h-12 sm:h-16 sm:w-40 hover:bg-gray-200"
          >
            {deadLine ? (
              <div className="text-base font-bold sm:text-xl">
                {getFormattedDate(deadLine)}
              </div>
            ) : (
              <em className="flex flex-col text-center break-words w-fit">
                <p>This Card doesn't</p> <p>have a deadline.</p>
              </em>
            )}
          </Button>{" "}
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
      <Dialog>
        <DialogTrigger className="block sm:hidden">
          <Button
            variant={"outline"}
            className="grid items-center w-24 h-12 sm:h-16 sm:w-40 hover:bg-gray-200"
          >
            {deadLine ? (
              <div className="text-base font-bold sm:text-xl">
                {getFormattedDate(deadLine)}
              </div>
            ) : (
              <em className="flex flex-col text-center break-words w-fit">
                <p>This Card doesn't</p> <p>have a deadline.</p>
              </em>
            )}
          </Button>{" "}
        </DialogTrigger>
        <DialogContent className="grid items-center w-fit">
          <form action={udpateCardTitleAction} className="grid justify-between gap-2 mx-auto">
            <Label htmlFor="title-input">Update Card's DeadLine</Label>
            <InputCalendar currentDate={card.deadLine} />
            <Button type="submit">
              <Pen /> Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateCardDeadLineForm;
