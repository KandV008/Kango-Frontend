import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { useState } from "react";

interface componentProps {
  card: CardEntity;
}

function UpdateCardTitleForm({ card }: componentProps) {
  const [title, setTitle] = useState<string>(card.title);

  const udpateCardTitleAction = async (formData: FormData) => {
    try {
      const newTitle = formData.get("title")?.toString();
      const cardDTO: CardDTO = {
        title: newTitle,
      };

      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/title`,
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
      setTitle(newTitle!);
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Error updating card. Please try again.");
    }
  };

  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <h1 className="w-full hover:bg-gray-200">{title}</h1>
      </PopoverTrigger>
      <PopoverContent side="top">
        <form action={udpateCardTitleAction} className="grid w-full gap-2">
          <Label htmlFor="title-input">Update Card's Title</Label>
          <Input
            id="title-input"
            name="title"
            defaultValue={title}
            placeholder="Card X"
          />
          <Button type="submit">
            <Pen /> Update
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateCardTitleForm;
