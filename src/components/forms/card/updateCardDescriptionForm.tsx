import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import { toast } from "sonner";
import type { CardDTO } from "@/model/card/cardDTO";
import { Textarea } from "@/components/ui/textarea";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CardContext } from "@/components/contexts/cardContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function UpdateCardDescriptionForm() {
  const { card, setCard } = useContext(CardContext);

  const [description, setDescription] = useState<string>(card.description);

  const udpateCardDescriptionAction = async (formData: FormData) => {
    try {
      const newDescription = formData.get("description")?.toString();
      const cardDTO: CardDTO = {
        description: newDescription,
      };

      const response = await fetch(
        `${BACKEND_URL}/api/cards/${card.id}/description`,
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
      setDescription(newDescription!);
      setCard({
        ...card,
        description: newDescription!,
      });
    } catch (error) {
      console.error("Error updating card:", error);
      toast.error("Error updating card. Please try again.");
    }
  };

  return (
    <>
      <Popover>
        <PopoverTrigger className="hidden lg:block">
          <Button
            variant={"outline"}
            className="grid items-center w-56 break-words sm:w-full h-fit place-self-center"
          >
            {description && description.length !== 0 ? (
              <p className="w-full text-center text-black break-all whitespace-pre-wrap dark:text-white">
                {description}
              </p>
            ) : (
              <em className="w-full text-center ">
                This Card doesn't have any description.
              </em>
            )}
          </Button>
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
              defaultValue={description}
              placeholder="Lore ipsum..."
            />
            <Button type="submit">
              <Pen /> Update
            </Button>
          </form>
        </PopoverContent>
      </Popover>
      <Dialog>
        <DialogTrigger className="block lg:hidden">
          <Button
            variant={"outline"}
            className="grid items-center w-56 break-words sm:w-full h-fit place-self-center"
          >
            {description && description.length !== 0 ? (
              <p className="w-full text-center text-black break-all whitespace-pre-wrap">
                {description}
              </p>
            ) : (
              <em className="w-full text-center ">
                This Card doesn't have any description.
              </em>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent className="grid items-center w-fit">
          <form
            action={udpateCardDescriptionAction}
            className="grid gap-2 w-fit"
          >
            <Label htmlFor="description-input">Update Card's Description</Label>
            <Textarea
              id="description-input"
              name="description"
              defaultValue={description}
              placeholder="Lore ipsum..."
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

export default UpdateCardDescriptionForm;
