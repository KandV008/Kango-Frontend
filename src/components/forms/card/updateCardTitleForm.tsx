import { Label } from "../../ui/label";
import { Input } from "../../ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CardContext } from "@/components/contexts/cardContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function UpdateCardTitleForm() {
    const { card, setCard } = useContext(CardContext);
  
  const [title, setTitle] = useState<string>(card.title);

  const udpateCardTitleAction = async (formData: FormData) => {
    try {
      const newTitle = formData.get("title")?.toString();
      const cardDTO: CardDTO = {
        title: newTitle,
      };

      const response = await fetch(
        `${BACKEND_URL}/api/cards/${card.id}/title`,
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
      setCard({
        ...card,
        title: newTitle!
      })
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Error updating card. Please try again.");
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger className="hidden sm:block">
          <Button
            variant={"outline"}
            className="w-full font-bold break-all sm:text-lg xl:text-xl h-fit text-start"
          >
            {title}
          </Button>
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
      <Dialog>
        <DialogTrigger className="block sm:hidden">
          <Button
            variant={"outline"}
            className="w-full font-bold break-all sm:text-lg xl:text-xl h-fit text-start"
          >
            {title}
          </Button>
        </DialogTrigger>
        <DialogContent className="grid items-center w-fit">
          <form action={udpateCardTitleAction} className="grid gap-2 w-fit">
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
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateCardTitleForm;
