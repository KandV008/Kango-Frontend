import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { getDataColor } from "@/model/utils/color";
import { InputColor } from "@/components/inputs/InputColor";

interface componentProps {
  card: CardEntity;
}

function UpdateCardColorForm({ card }: componentProps) {
  const cardColor = getDataColor(card.color ? card.color : "BLACK");

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

      if (!response.ok) {
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
      <PopoverTrigger className="size-24 rounded-xl">
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
  );
}

export default UpdateCardColorForm;
