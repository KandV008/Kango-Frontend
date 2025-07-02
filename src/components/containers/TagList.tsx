import { useEffect, useState } from "react";
import { TagEntity } from "@/model/tag/tag";
import Tag from "../entities/Tag";

function TagList() {
  const [tagList, setTagList] = useState<TagEntity[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/global-tags")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("Tags recibidos:", data);
        const mappedTags = data.map(TagEntity.fromJSON);
        setTagList(mappedTags)
      })
      .catch(error => {
        console.error("Error al obtener tags:", error);
      });
  }, []);
  return (
    <section className="flex flex-col flex-wrap items-center justify-center gap-5 px-5 size-full ">
        {tagList.map(
          tag => <Tag tag={tag} />
        )}
    </section>
  );
}

export default TagList;
