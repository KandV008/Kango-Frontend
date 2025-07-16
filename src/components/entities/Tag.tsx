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
import { TagEntity } from "@/model/tag/tag";
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
import updateTag from "@/lib/forms/tag/updateTag";
import { colorValueOf, getDataColor, type Color } from "@/model/utils/color";
import { useContext, useState } from "react";
import { TagListContext } from "../contexts/tagListContext";
import { TagContext } from "../contexts/tagContext";

const BACKEND_URL = import.meta.env.VITE_API_URL;

interface componentProps {
  tag: TagEntity;
}

function Tag({ tag: currentTag }: componentProps) {
  const [tag, setTag] = useState<TagEntity>(currentTag);
  const { tagList, setTagList } = useContext(TagListContext);

  const [label, setLabel] = useState<string>(tag.label);
  const [color, setColor] = useState<Color>(tag.color ? tag.color : "BLACK");
  const tagColor = getDataColor(color);

  const deleteTagAction = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/tags/${tag.id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error(`Failed to delete tag (status: ${response.status})`);
      }

      toast.success("Tag has been deleted.");
      const newTagList = tagList.filter((t) => t.id !== tag.id);
      setTagList(newTagList);
    } catch (error) {
      console.error("Error deleting tag:", error);
      toast.error("Error deleting tag. Please try again.");
    }
  };

  const handleUpdateAction = async (formData: FormData) => {
    await updateTag(formData);

    const newLabel = formData.get("label")?.toString();
    setLabel(newLabel ? newLabel : "");
    const newColor = formData.get("color")?.toString();
    const valueOfColor = colorValueOf(newColor!);
    setColor(valueOfColor);

    setTag({
      ...tag,
      label: newLabel!,
      color: valueOfColor,
    })
  };

  return (
    <TagContext.Provider value={{tag, setTag}}>
      <article className="flex flex-row items-start justify-between w-full gap-1 p-2 border-2 border-black dark:border-white sm:gap-2 sm:m-auto sm:p-3 md:p-4 rounded-2xl">
        {/* Info */}
        <section className="flex flex-row items-center gap-2 text-sm sm:text-base *:sm:font-semibold xl:font-bold size-full">
          <div
            className="size-5 sm:size-10 rounded-xl"
            style={{ backgroundColor: "#" + tagColor.hex }}
          />
          <h1>{label ? label : <em>Empty label</em>}</h1>
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
              <form action={handleUpdateAction} className="grid gap-5">
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
                  <DialogClose asChild>
                    <Button type="submit">Update Tag</Button>
                  </DialogClose>
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
                  This action cannot be undone. This will permanently delete
                  this tag.
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
    </TagContext.Provider>
  );
}

export default Tag;
