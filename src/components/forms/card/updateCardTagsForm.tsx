import { Label } from "../../ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "../../ui/popover";
import { Button } from "../../ui/button";
import { Pen } from "lucide-react";
import type { CardEntity } from "@/model/card/card";
import { toast } from "sonner";
import { getDataColor } from "@/model/utils/color";
import { useEffect, useState } from "react";
import type { TagEntity } from "@/model/tag/tag";
import getAllTags from "@/lib/forms/tag/getAllTags";
import { ScrollArea } from "@/components/ui/scroll-area";
import Tag from "@/components/entities/Tag";
import { Description } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

interface componentProps {
  card: CardEntity;
  dashboardId?: string;
}

function UpdateCardTagsForm({ card, dashboardId }: componentProps) {
  const [globalTagList, setGlobalTagList] = useState<TagEntity[]>([]);
  const [localTagList, setLocalTagList] = useState<TagEntity[]>([]);
  const allTags = [...globalTagList, ...localTagList];

  const tagsInside = allTags.filter((tag) =>
    card.tagList.some((t) => t.id === tag.id)
  );

  const tagListName = "tag-input-";

  useEffect(() => {
    const getGlobalTagList = (tags: TagEntity[]) => {
      setGlobalTagList(tags);
    };
    const getLocalTagList = (tags: TagEntity[]) => {
      setLocalTagList(tags);
    };

    getAllTags(dashboardId, getGlobalTagList, getLocalTagList);
  }, [dashboardId]);

  const udpateCardTagListAction = async (formData: FormData) => {
    const selectedTags: string[] = [];
    const tagListLenght = allTags.length;
    for (let i = 0; i < tagListLenght; i++) {
      const data = formData.get(tagListName + i)?.toString();
      console.log(i, data);
      if (data) selectedTags.push(data);
    }

    const newTagsSelected = selectedTags.filter(
      (tagId) => !tagsInside.some((t) => t.id.toString() === tagId)
    );

    const tagsToRemove = tagsInside.filter(
      (tagId) => !selectedTags.some((t) => t === tagId.id.toString())
    );

    newTagsSelected.forEach(async (tag) => {
      const response = await fetch(
        `http://localhost:8080/api/cards/${card.id}/tags`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tag),
        }
      );

      if (response.status !== 204) {
        console.error("Error adding tag:", tag, "to card:", card.id);
        toast.error(`Error adding tag to card`);
        return;
      }

      toast.success(`Tag added to card successfully`);
    });

    tagsToRemove.forEach(async (tag) => {
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
        return;
      }

      toast.success(`Tag removed from card successfully`);
    });
  };

  return (
    <Popover>
      <PopoverTrigger className="flex flex-row flex-wrap items-center justify-center w-full h-full gap-1 p-1 break-words hover:bg-gray-200">
        {card.tagList && card.tagList.length !== 0 ? (
          <>
            {card.tagList.map((tag) => {
              const tagColor = getDataColor(tag.color ? tag.color : "BLACK");
              const textColor =
                tag.color === "BLACK" ? "text-white" : "text-black";
              return (
                <Badge
                  className={`px-2 border border-black ${textColor}`}
                  style={{ backgroundColor: "#" + tagColor.hex }}
                >
                  {tag.label}
                </Badge>
              );
            })}
          </>
        ) : (
          <em className="w-full text-center ">
            This Card doesn't have any tag.
          </em>
        )}{" "}
      </PopoverTrigger>
      <PopoverContent side="right" className="">
        <form
          action={udpateCardTagListAction}
          className="grid w-full h-full gap-2"
        >
          <Label>Update Card's Tag List</Label>
          <Description>Select or unselect some tags.</Description>
          <ScrollArea className="">
            <section className="flex flex-col justify-center gap-2">
              {allTags && allTags.length !== 0 ? (
                <>
                  {allTags.map((tag, index) => (
                    <article
                      key={"input-tag-" + tag.id}
                      className="flex flex-row gap-1"
                    >
                      <Input
                        type="checkbox"
                        name={tagListName + index}
                        value={tag.id}
                        className="self-center size-5"
                        defaultChecked={tagsInside.some((t) => t.id === tag.id)}
                      />
                      <Tag tag={tag} />
                    </article>
                  ))}
                </>
              ) : (
                <em className="w-full p-2 text-center">
                  Currently, there is no tag available.
                </em>
              )}
            </section>
          </ScrollArea>
          <Button type="submit">
            <Pen /> Update
          </Button>
        </form>
      </PopoverContent>
    </Popover>
  );
}

export default UpdateCardTagsForm;
