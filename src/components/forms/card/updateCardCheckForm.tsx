import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import type { CheckProps } from "@/model/utils/check";
import CheckComponent from "@/components/entities/Check";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CardContext } from "@/components/contexts/cardContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function UpdateCardCheckForm() {
  const { card, setCard } = useContext(CardContext);

  const sortedChecks = [...card.checks].sort(
    (a, b) => a.position! - b.position!
  );
  const [currentChecks, setCurrentCheks] = useState<CheckProps[]>(sortedChecks);

  const removeCheckFromCardAction = (position: number) => {
    const updatedChecks = currentChecks
      .filter((check) => check.position !== position)
      .map((check, index) => ({
        ...check,
        position: index,
      }));

    setCurrentCheks(updatedChecks);
    setCard({
      ...card,
      checks: updatedChecks,
    });
  };

  const addCheckToCardAction = async (formData: FormData) => {
    try {
      const check: CheckProps = {
        label: formData.get("check")?.toString(),
        checked: false,
        position: currentChecks.length,
      };

      const response = await fetch(
        `${BACKEND_URL}/api/cards/${card.id}/checks`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(check),
        }
      );

      if (response.status !== 204) {
        throw new Error(
          `Failed to add check to card (status: ${response.status})`
        );
      }

      toast.success("Check has been added to card.");
      setCurrentCheks((prev) => [...prev, check]);
      setCard({
        ...card,
        checks: [...currentChecks, check],
      });
    } catch (error) {
      console.error("Error adding check to card:", error);
      toast.error("Error adding check to card. Please try again.");
    }
  };

  return (
    <section className="grid self-center w-56 gap-1 sm:w-full">
      {/* Header */}
      <article className="flex flex-row justify-around sm:justify-between sm:px-2">
        <Label>Check List</Label>
        <>
          <Popover>
            <PopoverTrigger className="hidden sm:block">
              <Button>
                <Plus />
              </Button>
            </PopoverTrigger>
            <PopoverContent side="right">
              <form action={addCheckToCardAction} className="grid w-full gap-2">
                <Label htmlFor="check-input">Add new check</Label>
                <Input
                  id="check-input"
                  name="check"
                  defaultValue=""
                  placeholder="Check X"
                  required
                />{" "}
                <Button type="submit">
                  <Plus /> Add Check
                </Button>
              </form>
            </PopoverContent>
          </Popover>
          <Dialog>
            <DialogTrigger className="block sm:hidden">
              <Button>
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="grid items-center w-fit">
              <form action={addCheckToCardAction} className="grid gap-2 w-fit">
                <Label htmlFor="check-input">Add new check</Label>
                <Input
                  id="check-input"
                  name="check"
                  defaultValue=""
                  placeholder="Check X"
                  required
                />{" "}
                <Button type="submit">
                  <Plus /> Add Check
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      </article>
      <Separator />
      {/* Check List */}
      <article className="flex flex-col justify-center w-56 gap-1 sm:w-full">
        {currentChecks && currentChecks.length !== 0 ? (
          <>
            {currentChecks.map((check, index) => (
              <CheckComponent
                key={"check-" + index}
                check={check}
                cardId={card.id.toString()}
                onRemoved={removeCheckFromCardAction}
              />
            ))}
          </>
        ) : (
          <em className="w-full text-center ">
            This Card doesn't have any checks.
          </em>
        )}
      </article>
    </section>
  );
}

export default UpdateCardCheckForm;
