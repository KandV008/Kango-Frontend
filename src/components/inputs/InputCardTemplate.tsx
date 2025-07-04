import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardEntity } from "@/model/card/card";
import { DashboardEntity } from "@/model/dashboard/dashboard";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Copy } from "lucide-react";
import Card from "../entities/Card";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { toast } from "sonner";

interface componentProps {
  dashboardId: string | undefined;
  tableId: string | undefined;
}

export function InputCardTemplate({ dashboardId, tableId }: componentProps) {
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
    const templateCardId = formData.get("card_id")?.toString();

    const createCardRes = await fetch(`http://localhost:8080/api/cards/${templateCardId}/copy`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!createCardRes.ok) {
      console.error("Error creating card using a template:", await createCardRes.text());
      toast.error(`Error creating card using a template: ${await createCardRes.text()}`);
    }

    const createdCard = await createCardRes.json();
    const cardId = createdCard.id;

    const addCardRes = await fetch(
      `http://localhost:8080/api/tables/${tableId}/cards`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cardId),
      }
    );

    if (!addCardRes.ok) {
      console.error(
        "Error adding card:",
        await addCardRes.text(),
        " to table:",
        tableId
      );
      toast.error(`Error adding card: ${await addCardRes.text()}`);
      throw Error(
        `Error adding card: ${await addCardRes.text()} to table: ${tableId}`
      );
    }

    console.log("Card created successfully");
    toast.success("Card has been created.");
  };

  return (
    <form
      className="flex flex-col gap-3"
      action={createCardUsingATemplateAction}
    >
      <ScrollArea className="p-3 border rounded-md w-96 whitespace-nowrap">
        <RadioGroup
          name="card_id"
          defaultValue="comfortable"
          className="flex flex-row"
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
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <Button type="submit">
        <Copy />
        Copy
      </Button>
    </form>
  );
}
