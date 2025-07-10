import { useEffect, useState } from "react";
import { CardEntity } from "@/model/card/card";
import Card from "../entities/Card";
import { DashboardEntity } from "@/model/dashboard/dashboard";

interface componentProps {
  dashboardId: string | undefined;
}

function TemplateCardList({ dashboardId }: componentProps) {
  const [globalCardList, setGlobalCardList] = useState<CardEntity[]>([]);
  const [localCardList, setLocalCardList] = useState<CardEntity[]>([]);
  const allTemplates = [...globalCardList, ...localCardList];

  useEffect(() => {
    fetch(`http://localhost:8080/api/global-template-cards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }

        return response.json();
      })
      .then((data) => {
        console.log("Plantillas recibidas:", data);
        const mappedCards = data.map(CardEntity.fromJSON);
        setGlobalCardList(mappedCards);
      })
      .catch((error) => {
        console.error("Error al obtener plantillas:", error);
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
        const localTemplateCardList = mappedDashboard.templateCardList;
        setLocalCardList(localTemplateCardList);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    if (dashboardId) fetchDashboard();
  }, [dashboardId]);

  return (
    <section className="flex flex-col justify-start flex-grow w-full gap-3 overflow-x-hidden h-96">
      {allTemplates && allTemplates.length !== 0 ? (
        <article className="grid w-full gap-1 overflow-y-scroll sm:gap-2 h-max">
          {globalCardList.map((card) => (
            <Card card={card} key={"global-template-card-" + card.id} />
          ))}
          {localCardList.map((card) => (
            <Card card={card} key={"local-template-card-" + card.id} />
          ))}
        </article>
      ) : (
        <em className="w-full text-center ">
          Currently, there is no card template available.
        </em>
      )}
    </section>
  );
}

export default TemplateCardList;
