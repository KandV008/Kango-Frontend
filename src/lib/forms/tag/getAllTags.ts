import { DashboardEntity } from "@/model/dashboard/dashboard";
import { TagEntity } from "@/model/tag/tag";

export default async function getAllTags(dashboardId: string | undefined, setGlobalTagList: (tags: TagEntity[]) => void, setLocalTagList: (tags: TagEntity[]) => void){
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
}