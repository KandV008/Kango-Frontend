import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardEntity } from "@/model/card/card";
import { DashboardEntity } from "@/model/dashboard/dashboard";
import { useContext, useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import Card from "../entities/Card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { CardListContext } from "../contexts/cardList";
import { Input } from "../ui/input";
import copyCardTemplate from "@/lib/forms/card/copyCardTemplate";

interface componentProps {
  dashboardId: string | undefined;
  tableId: string | undefined;
}

export function InputCardTemplate({ dashboardId, tableId }: componentProps) {
  const [globalCardList, setGlobalCardList] = useState<CardEntity[]>([]);
  const [localCardList, setLocalCardList] = useState<CardEntity[]>([]);
  const allTemplates = [...globalCardList, ...localCardList];
  const { setCardList } = useContext(CardListContext)

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

  const createCardUsingATemplateAction = async (formData: FormData) => {
    const newCard = await copyCardTemplate(formData)

    if(!newCard) return

    setCardList(prev => [...prev, newCard])
  };

  return (
    <form
      className="flex flex-col gap-3"
      action={createCardUsingATemplateAction}
    >
      <Input type="hidden" name="table_id" value={tableId} />
      <ScrollArea className="grid justify-center p-3 border rounded-md w-96 whitespace-nowrap">
        {allTemplates && allTemplates.length !== 0 ? (
          <RadioGroup
            name="card_id"
            defaultValue="comfortable"
            className="flex flex-row"
            required
          >
            {allTemplates.map((card) => (
              <div className="flex items-center gap-3">
                <RadioGroupItem
                  id={"template-card-" + card.id}
                  className=""
                  value={card.id.toString()}
                  key={"template-card-" + card.id}
                />
                <Card card={card} />
              </div>
            ))}
          </RadioGroup>
        ) : (
          <em className="w-full text-center ">
            Currently, there is no card template available.
          </em>
        )}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Button type="submit">
        <Copy />
        Copy
      </Button>
    </form>
  );
}
