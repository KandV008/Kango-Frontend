import { useEffect, useState } from "react";
import { TagEntity } from "@/model/tag/tag";
import Tag from "../entities/Tag";
import getAllTags from "@/lib/forms/tag/getAllTags";
import { TagListContext } from "../contexts/tagListContext";

interface componentProps {
  dashboardId: string | undefined;
}

function TagList({ dashboardId }: componentProps) {
  const [globalTagList, setGlobalTagList] = useState<TagEntity[]>([]);
  const [localTagList, setLocalTagList] = useState<TagEntity[]>([]);
  const [allTags, setTagList] = useState<TagEntity[]>([]);

  useEffect(() => {
    setTagList([...globalTagList, ...localTagList]);
  }, [globalTagList, localTagList]);

  useEffect(() => {
    const getGlobalTagList = (tags: TagEntity[]) => {
      setGlobalTagList(tags);
    };
    const getLocalTagList = (tags: TagEntity[]) => {
      setLocalTagList(tags);
    };

    getAllTags(dashboardId, getGlobalTagList, getLocalTagList);
  }, [dashboardId]);

  return (
    <TagListContext.Provider value={{ tagList: allTags, setTagList }}>
      <section className="flex flex-col justify-start flex-grow w-full gap-3 overflow-x-hidden max-h-96">
        {allTags && allTags.length !== 0 ? (
          <div className="grid w-full gap-1 overflow-y-auto sm:gap-2 h-max">
            {allTags.map((tag) => (
              <Tag tag={tag} key={"tag-" + tag.id} />
            ))}
          </div>
        ) : (
          <em className="w-full text-center ">
            Currently, there is no tag available.
          </em>
        )}
      </section>
    </TagListContext.Provider>
  );
}

export default TagList;
