import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { colorValueOf, getDataColor, type Color } from "@/model/utils/color";
import { InputColor } from "@/components/inputs/InputColor";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CardContext } from "@/components/contexts/cardContext";

function UpdateCardColorForm() {
  const { card, setCard } = useContext(CardContext);

  const [color, setColor] = useState<Color>(card.color ? card.color : "BLACK");
  const cardColor = getDataColor(color);

  const udpateCardColorAction = async (formData: FormData) => {
    try {
      const cardDTO: CardDTO = {
        color: formData.get("color")?.toString(),
      };

      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/color`,
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

      const newColor: Color = colorValueOf(cardDTO.color!);
      setColor(newColor);
      setCard({
        ...card,
        color: newColor
      })
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Error updating card. Please try again.");
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger className="hidden sm:block size-16 sm:size-24 rounded-xl">
          <div
            className="flex items-center justify-center text-transparent size-full rounded-xl hover:text-gray-200"
            style={{ backgroundColor: "#" + cardColor.hex }}
          >
            <Pen />
          </div>
        </PopoverTrigger>
        <PopoverContent side="left">
          <form action={udpateCardColorAction} className="grid w-full gap-2">
            <Label htmlFor="color-input">Update Card's Color</Label>
            <InputColor />
            <Button type="submit">
              <Pen /> Update
            </Button>
          </form>
        </PopoverContent>
      </Popover>
      <Dialog>
        <DialogTrigger className="block sm:hidden size-16 sm:size-24 rounded-xl">
          <div
            className="flex items-center justify-center text-transparent size-full rounded-xl hover:text-gray-200"
            style={{ backgroundColor: "#" + cardColor.hex }}
          >
            <Pen />
          </div>
        </DialogTrigger>
        <DialogContent className="grid items-center w-fit">
          <form action={udpateCardColorAction} className="grid gap-2 w-fit">
            <Label htmlFor="color-input">Update Card's Color</Label>
            <InputColor />
            <Button type="submit">
              <Pen /> Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateCardColorForm;
