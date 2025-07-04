import { useEffect, useState } from "react";
import { TagEntity } from "@/model/tag/tag";
import Tag from "../entities/Tag";
import { DashboardEntity } from "@/model/dashboard/dashboard";

interface componentProps {
  dashboardId: string | undefined;
}

function TagList({ dashboardId }: componentProps) {
  const [globalTagList, setGlobalTagList] = useState<TagEntity[]>([]);
  const [localTagList, setLocalTagList] = useState<TagEntity[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/global-tags")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Tags recibidos:", data);
        const mappedTags = data.map(TagEntity.fromJSON);
        setGlobalTagList(mappedTags);
      })
      .catch((error) => {
        console.error("Error al obtener tags:", error);
      });

    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/dashboards/${dashboardId}`
        );

        if (!response.ok) {
          throw new Error(
            `Error fetching dashboard (status: ${response.status})`
          );
        }

        const data = await response.json();
        const mappedDashboard = DashboardEntity.fromJSON(data);
        const localTagList = mappedDashboard.tagList;
        setLocalTagList(localTagList);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (dashboardId) fetchDashboard();
  }, [dashboardId]);
  return (
    <section className="flex flex-col flex-wrap items-center justify-center gap-5 px-5 size-full ">
      {globalTagList.map((tag) => (
        <Tag tag={tag} key={"global-tag-" + tag.id} />
      ))}
      {localTagList.map((tag) => (
        <Tag tag={tag} key={"local-tag-" + tag.id}/>
      ))}
    </section>
  );
}

export default TagList;
