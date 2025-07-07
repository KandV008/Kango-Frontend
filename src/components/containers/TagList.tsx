import { useEffect, useState } from "react";
import { TagEntity } from "@/model/tag/tag";
import Tag from "../entities/Tag";
import getAllTags from "@/lib/forms/tag/getAllTags";

interface componentProps {
  dashboardId: string | undefined;
}

function TagList({ dashboardId }: componentProps) {
  const [globalTagList, setGlobalTagList] = useState<TagEntity[]>([]);
  const [localTagList, setLocalTagList] = useState<TagEntity[]>([]);
  const allTags = [...globalTagList, ...localTagList];

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
    <section className="flex flex-col flex-wrap items-center justify-center gap-5 px-5 size-full ">
      {allTags && allTags.length !== 0 ? (
        <>
          {globalTagList.map((tag) => (
            <Tag tag={tag} key={"global-tag-" + tag.id} />
          ))}
          {localTagList.map((tag) => (
            <Tag tag={tag} key={"local-tag-" + tag.id} />
          ))}
        </>
      ) : (
        <em className="w-full text-center ">Currently, there is no tag available.</em>
      )}
    </section>
  );
}

export default TagList;
