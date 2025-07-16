import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import AttachedFile from "@/components/entities/AttachedFile";
import type { AttachedFileProps } from "@/model/utils/attachedFile";
import AttachedFileForm from "../attachedFileForm";
import { useContext, useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { CardContext } from "@/components/contexts/cardContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

function UpdateCardFileForm() {
  const { card, setCard } = useContext(CardContext);

  const [currentFiles, setCurrentFiles] = useState<AttachedFileProps[]>(
    card.attachedFiled
  );

  const addFileToCardAction = async (formData: FormData) => {
    try {
      const file: AttachedFileProps = {
        fileName: formData.get("file-name")?.toString(),
        fileUrl: formData.get("file-url")?.toString(),
      };

      const response = await fetch(
        `${BACKEND_URL}/api/cards/${card.id}/attached-files`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(file),
        }
      );

      if (response.status !== 204) {
        throw new Error(
          `Failed to add file to card (status: ${response.status})`
        );
      }

      toast.success("File has been added to card.");
      setCurrentFiles((prev) => [...prev, file]);
      setCard({
        ...card,
        attachedFiled: [...currentFiles, file],
      });
    } catch (error) {
      console.error("Error adding file to card:", error);
      toast.error("Error adding file to card. Please try again.");
    }
  };

  const removeFile = (
    fileToRemove: AttachedFileProps,
    attachedFiles: AttachedFileProps[]
  ) => {
    const index = attachedFiles.findIndex(
      (f) =>
        f.fileName === fileToRemove.fileName &&
        f.fileUrl === fileToRemove.fileUrl
    );

    if (index !== -1) {
      const updatedFiles = [...attachedFiles];
      updatedFiles.splice(index, 1);
      setCurrentFiles(updatedFiles);
      setCard({
        ...card,
        attachedFiled: updatedFiles,
      });
    }
  };

  return (
    <section className="grid w-56 gap-1 sm:w-full place-self-center">
      {/* Header */}
      <article className="flex flex-row justify-around sm:px-2 sm:justify-between">
        <Label>Attached Files</Label>
        <>
          <Popover>
            <PopoverTrigger className="hidden sm:block">
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
          <Dialog>
            <DialogTrigger className="block sm:hidden">
              <Button>
                <Plus />
              </Button>
            </DialogTrigger>
            <DialogContent className="grid items-center w-fit">
              <form action={addFileToCardAction} className="grid gap-2 w-fit">
                <Label htmlFor="file-input">Add new check</Label>
                <AttachedFileForm />
                <Button type="submit">
                  <Plus /> Add File
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </>
      </article>
      <Separator />
      {/* Check List */}
      <article className="flex flex-col gap-1">
        {currentFiles && currentFiles.length !== 0 ? (
          <>
            {currentFiles.map((file, index) => (
              <AttachedFile
                key={"file-" + index}
                attachedFile={file}
                cardId={card.id.toString()}
                mode="CARD"
                onRemove={() => removeFile(file, currentFiles)}
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
