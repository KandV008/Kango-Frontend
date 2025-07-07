import { Button } from "../ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { toast } from "sonner";
import { SquareArrowOutUpRight, X } from "lucide-react";
import type { AttachedFileProps } from "@/model/utils/attachedFile";

interface componentProps {
  attachedFile: AttachedFileProps;
  dashboardId?: string;
  cardId?: string;
  mode?: "DASHBOARD" | "CARD";
  onRemove?: (file: AttachedFileProps) => void;
}

function AttachedFile({
  attachedFile,
  dashboardId,
  cardId,
  mode = "DASHBOARD",
  onRemove,
}: componentProps) {
  const dettachFileAction = async () => {
    const actionId = mode === "DASHBOARD" ? dashboardId : cardId;
    const entityRoute = mode === "DASHBOARD" ? "dashboards" : "cards";
    try {
      const response = await fetch(
        `http://localhost:8080/api/${entityRoute}/${actionId}/attached-files`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(attachedFile),
        }
      );

      if (response.status !== 204) {
        throw new Error(`Failed to detach file (status: ${response.status})`);
      }

      toast.success("File has been removed.");
      if (onRemove) {
        onRemove(attachedFile);
      }
    } catch (error) {
      console.error("Error detaching file:", error);
      toast.error("Error detaching file. Please try again.");
    }
  };

  return (
    <article className="flex flex-row items-start justify-between w-full gap-2 p-4 m-auto border-2 border-black rounded-2xl">
      {/* Info */}
      <section className="flex flex-row items-center gap-2 size-full">
        <h1>{attachedFile.fileName}</h1>
      </section>
      {/* Actions */}
      <section className="flex flex-row gap-1">
        {/* Access tpo File */}
        <Button asChild>
          <a href={attachedFile.fileUrl} target="_blank">
            <SquareArrowOutUpRight />
          </a>
        </Button>
        {/* Dettach File */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <X />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove this
                file.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={dettachFileAction}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </article>
  );
}

export default AttachedFile;
