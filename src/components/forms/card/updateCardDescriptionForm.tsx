import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { Textarea } from "@/components/ui/textarea";

interface componentProps {
  card: CardEntity;
}

function UpdateCardDescriptionForm({ card }: componentProps) {
  const udpateCardDescriptionAction = async (formData: FormData) => {
    try {
      const cardDTO: CardDTO = {
        description: formData.get("description")?.toString(),
      };

      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/description`,
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
      <PopoverTrigger className="grid items-center w-full break-words hover:bg-gray-200">
        {card.description && card.description.length !== 0 ? (
          <div className="w-[450px] break-words">{card.description}</div>
        ) : (
          <em className="w-full text-center ">
            This Card doesn't have any description.
          </em>
        )}{" "}
      </PopoverTrigger>
      <PopoverContent side="left">
        <form
          action={udpateCardDescriptionAction}
          className="grid w-full gap-2"
        >
          <Label htmlFor="description-input">Update Card's Description</Label>
          <Textarea
            id="description-input"
            name="description"
            defaultValue=""
            placeholder="Lore ipsum..."
          />
          <Button type="submit">
            <Pen /> Update
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateCardDescriptionForm;
