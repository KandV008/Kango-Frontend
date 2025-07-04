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

  useEffect(() => {
    
    fetch(`http://localhost:8080/api/global-template-cards`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json();
      })
      .then((data) => {
        console.log("Plantillas recibidass:", data);
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
    <section className="flex flex-col flex-wrap items-center justify-center gap-5 px-5 size-full ">
      {globalCardList.map((card) => (
        <Card card={card} />
      ))}
      {localCardList.map((card) => (
        <Card card={card} />
      ))}
    </section>
  );
}

export default TemplateCardList;
