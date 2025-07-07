import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import AttachedFile from "@/components/entities/AttachedFile";
import type { AttachedFileProps } from "@/model/utils/attachedFile";
import AttachedFileForm from "../attachedFileForm";

interface componentProps {
  card: CardEntity;
}

function UpdateCardFileForm({ card }: componentProps) {
  const addFileToCardAction = async (formData: FormData) => {
    try {
      const check: AttachedFileProps = {
        fileName: formData.get("file-name")?.toString(),
        fileUrl: formData.get("file-url")?.toString(),
      };

      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/attached-files`,
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
          `Failed to add file to card (status: ${response.status})`
        );
      }

      toast.success("File has been added to card.");
    } catch (error) {
      console.error("Error adding file to card:", error);
      toast.error("Error adding file to card. Please try again.");
    }
  };

  return (
    <section className="grid w-full gap-1">
      {/* Header */}
      <article className="flex flex-row justify-between px-2">
        <Label>Attached Files</Label>
        <Popover>
          <PopoverTrigger>
            <Button>
              <Plus />
            </Button>
          </PopoverTrigger>
          <PopoverContent side="right">
            <form action={addFileToCardAction} className="grid w-full gap-2">
              <Label htmlFor="file-input">Add new check</Label>
              <AttachedFileForm />
              <Button type="submit">
                <Plus /> Add File
              </Button>
            </form>
          </PopoverContent>
        </Popover>
      </article>
      <Separator />
      {/* Check List */}
      <article className="flex flex-col gap-1">
        {card.attachedFiled && card.attachedFiled.length !== 0 ? (
          <>
            {card.attachedFiled.map((check, index) => (
              <AttachedFile
                key={"file-" + index}
                attachedFile={check}
                cardId={card.id.toString()}
                mode="CARD"
              />
            ))}
          </>
        ) : (
          <em className="w-full text-center ">
            This Card doesn't have any attached files.
          </em>
        )}
      </article>
    </section>
  );
}

export default UpdateCardFileForm;
