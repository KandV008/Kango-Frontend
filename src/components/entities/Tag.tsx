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
import type { TagEntity } from "@/model/tag/tag";
import { Pen, Trash } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import TagForm from "../forms/tagForm";
import updateTag from "@/lib/forms/updateTag";
import { getDataColor } from "@/model/utils/color";

interface componentProps {
  tag: TagEntity;
}

function Tag({ tag }: componentProps) {
  const tagColor = getDataColor(tag.color ? tag.color : "BLACK");

  const deleteTagAction = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/tags/${tag.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete tag (status: ${response.status})`);
      }

      toast.success("Tag has been deleted.");
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Error deleting tag. Please try again.");
    }
  };

  return (
    <article className="flex flex-row items-start justify-between w-full gap-2 p-4 m-auto border-2 border-black rounded-2xl">
      {/* Info */}
      <section className="flex flex-row items-center gap-2 size-full">
        <div
          className="size-10 rounded-xl"
          style={{ backgroundColor: "#" + tagColor.hex }}
        />
        <h1>{tag.label ? tag.label : <em>Empty label</em>}</h1>
      </section>
      {/* Actions */}
      <section className="flex flex-row gap-1">
        {/* Update Tag */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Pen />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <form action={updateTag} className="grid gap-5">
              <DialogHeader>
                <DialogTitle>Update Tag</DialogTitle>
                <DialogDescription>
                  Update the attributes of the Tag
                </DialogDescription>
              </DialogHeader>
              <TagForm tag={tag} />
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Update Tag</Button>
              </DialogFooter>
            </form>
          </DialogContent>{" "}
        </Dialog>
        {/* Delete Tag */}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button>
              <Trash />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete this
                tag.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={deleteTagAction}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </section>
    </article>
  );
}

export default Tag;
