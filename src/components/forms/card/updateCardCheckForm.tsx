import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import type { CheckProps } from "@/model/utils/check";
import CheckComponent from "@/components/entities/Check";
import { useState } from "react";

interface componentProps {
  card: CardEntity;
}

function UpdateCardCheckForm({ card }: componentProps) {
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
  };

  const addCheckToCardAction = async (formData: FormData) => {
    try {
      const check: CheckProps = {
        label: formData.get("check")?.toString(),
        checked: false,
        position: currentChecks.length,
      };

      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/checks`,
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
    } catch (error) {
      console.error("Error adding check to card:", error);
      toast.error("Error adding check to card. Please try again.");
    }
  };

  return (
    <section className="grid w-full gap-1">
      {/* Header */}
      <article className="flex flex-row justify-between px-2">
        <Label>Check List</Label>
        <Popover>
          <PopoverTrigger>
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
      </article>
      <Separator />
      {/* Check List */}
      <article className="flex flex-col gap-1">
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
