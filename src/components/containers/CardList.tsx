import { useEffect, useState } from "react";
import { CardEntity } from "@/model/card/card";
import Card from "../entities/Card";

function CardList() {
  const [cardList, setTagList] = useState<CardEntity[]>([]);

  useEffect(() => {
    fetch("http://localhost:8080/api/global-template-cards")
      .then(response => {
        if (!response.ok) {
          throw new Error("Error en la petición: " + response.status);
        }
        return response.json();
      })
      .then(data => {
        console.log("Plantillas recibidass:", data);
        const mappedCards = data.map(CardEntity.fromJSON);
        setTagList(mappedCards)
      })
      .catch(error => {
        console.error("Error al obtener plantillas:", error);
      });
  }, []);
  return (
    <section className="flex flex-col flex-wrap items-center justify-center gap-5 px-5 size-full ">
        {cardList.map(
          card => <Card card={card} />
        )}
    </section>
  );
}

export default CardList;
