import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import { getDataColor } from "@/model/utils/color";
import { useEffect, useState } from "react";
import { TagEntity } from "@/model/tag/tag";
import getAllTags from "@/lib/forms/tag/getAllTags";
import { ScrollArea } from "@/components/ui/scroll-area";
import Tag from "@/components/entities/Tag";
import { Description } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

interface componentProps {
  card: CardEntity;
  dashboardId?: string;
}

function UpdateCardTagsForm({ card, dashboardId }: componentProps) {
  const [globalTagList, setGlobalTagList] = useState<TagEntity[]>([]);
  const [localTagList, setLocalTagList] = useState<TagEntity[]>([]);
  const allTags = [...globalTagList, ...localTagList];
  const [currentTags, setCurrentTags] = useState<TagEntity[]>(card.tagList);

  const tagListName = "tag-input-";

  useEffect(() => {
    getAllTags(dashboardId, setGlobalTagList, setLocalTagList);
  }, [dashboardId]);

  const updateCardTagListAction = async (formData: FormData) => {
    const selectedTags: string[] = [];

    for (let i = 0; i < allTags.length; i++) {
      const data = formData.get(tagListName + i)?.toString();
      if (data) selectedTags.push(data);
    }

    const tagsInside = allTags.filter((tag) =>
      currentTags.some((t) => t.id === tag.id)
    );

    const added = await addTagsToCard(selectedTags, tagsInside, card);
    const removed = await removeTagsFromCard(tagsInside, selectedTags, card);

    const currentTagsWithNewTags = [...currentTags, ...added];
    const updatedCurrentTags = currentTagsWithNewTags.filter(
      (tag) => !removed.some((t) => t.id === tag.id)
    );

    setCurrentTags(updatedCurrentTags);
  };

  const removeTagsFromCard = async (
    tagsInside: TagEntity[],
    selectedTags: string[],
    card: CardEntity
  ): Promise<TagEntity[]> => {
    const tagsToRemove = tagsInside.filter(
      (tag) => !selectedTags.includes(tag.id.toString())
    );

    for (const tag of tagsToRemove) {
      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/tags`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tag.id),
        }
      );

      if (response.status !== 204) {
        console.error("Error removing tag:", tag, "from card:", card.id);
        toast.error(`Error removing tag from card`);
      } else {
        toast.success(`Tag removed from card successfully`);
      }
    }

    return tagsToRemove;
  };

  const addTagsToCard = async (
    selectedTags: string[],
    tagsInside: TagEntity[],
    card: CardEntity
  ): Promise<TagEntity[]> => {
    const newTags = selectedTags.filter(
      (tagId) => !tagsInside.some((t) => t.id.toString() === tagId)
    );

    for (const tagId of newTags) {
      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/tags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tagId),
        }
      );

      if (response.status !== 204) {
        console.error("Error adding tag:", tagId, "to card:", card.id);
        toast.error(`Error adding tag to card`);
      } else {
        toast.success(`Tag added to card successfully`);
      }
    }

    return allTags.filter((t) => newTags.includes(t.id.toString()));
  };

  return (
    <>
      <Popover>
        <PopoverTrigger className="hidden lg:block">
          <Button
            variant={"outline"}
            className="flex flex-row flex-wrap items-center justify-center w-56 gap-1 p-1 place-self-center sm:w-full h-fit"
          >
            {currentTags.length > 0 ? (
              currentTags.map((tag) => {
                const tagColor = getDataColor(tag.color ?? "BLACK");
                const textColor =
                  tag.color === "BLACK" ? "text-white" : "text-black";
                return (
                  <Badge
                    key={tag.id}
                    className={`px-2 border border-black ${textColor}`}
                    style={{ backgroundColor: "#" + tagColor.hex }}
                  >
                    {tag.label}
                  </Badge>
                );
              })
            ) : (
              <em className="w-full text-center">
                This Card doesn't have any tag.
              </em>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent side="right">
          <form
            action={updateCardTagListAction}
            className="grid w-full h-full gap-2"
          >
            <Label>Update Card's Tag List</Label>
            <Description>Select or unselect some tags.</Description>
            <ScrollArea>
              <section className="flex flex-col justify-center gap-2">
                {allTags.length > 0 ? (
                  allTags.map((tag, index) => (
                    <article
                      key={"input-tag-" + tag.id}
                      className="flex flex-row gap-1"
                    >
                      <Input
                        type="checkbox"
                        name={tagListName + index}
                        value={tag.id}
                        className="self-center size-5"
                        defaultChecked={currentTags.some(
                          (t) => t.id === tag.id
                        )}
                      />
                      <Tag tag={tag} />
                    </article>
                  ))
                ) : (
                  <em className="w-full p-2 text-center">
                    Currently, there is no tag available.
                  </em>
                )}
              </section>
            </ScrollArea>
            <Button type="submit">
              <Pen className="mr-2 size-4" />
              Update
            </Button>
          </form>
        </PopoverContent>
      </Popover>
      <Dialog>
        <DialogTrigger className="block lg:hidden">
          <Button
            variant={"outline"}
            className="flex flex-row flex-wrap items-center justify-center w-56 gap-1 p-1 place-self-center sm:w-full h-fit"
          >
            {currentTags.length > 0 ? (
              currentTags.map((tag) => {
                const tagColor = getDataColor(tag.color ?? "BLACK");
                const textColor =
                  tag.color === "BLACK" ? "text-white" : "text-black";
                return (
                  <Badge
                    key={tag.id}
                    className={`px-2 border border-black ${textColor}`}
                    style={{ backgroundColor: "#" + tagColor.hex }}
                  >
                    {tag.label}
                  </Badge>
                );
              })
            ) : (
              <em className="w-full text-center">
                This Card doesn't have any tag.
              </em>
            )}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form
            action={updateCardTagListAction}
            className="grid w-full h-full gap-2"
          >
            <Label>Update Card's Tag List</Label>
            <Description>Select or unselect some tags.</Description>
            <ScrollArea>
              <section className="flex flex-col justify-center gap-2">
                {allTags.length > 0 ? (
                  allTags.map((tag, index) => (
                    <article
                      key={"input-tag-" + tag.id}
                      className="flex flex-row gap-1"
                    >
                      <Input
                        type="checkbox"
                        name={tagListName + index}
                        value={tag.id}
                        className="self-center size-5"
                        defaultChecked={currentTags.some(
                          (t) => t.id === tag.id
                        )}
                      />
                      <Tag tag={tag} />
                    </article>
                  ))
                ) : (
                  <em className="w-full p-2 text-center">
                    Currently, there is no tag available.
                  </em>
                )}
              </section>
            </ScrollArea>
            <Button type="submit">
              <Pen className="mr-2 size-4" />
              Update
            </Button>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default UpdateCardTagsForm;
