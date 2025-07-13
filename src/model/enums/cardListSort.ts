import type { CardEntity } from "../card/card";

export type CardListSort = "BY_ID" | "BY_ID_REVERSE" | "BY_TITLE" | "BY_TITLE_REVERSE";

export function sortCardList(cardList: CardEntity[], sort: CardListSort): CardEntity[] {
   const sortCardList = [...cardList].sort((a, b) => {
    switch (sort) {
      case "BY_ID":
        return a.id - b.id;
      case "BY_ID_REVERSE":
        return b.id - a.id;
      case "BY_TITLE":
        return a.title.localeCompare(b.title);
      case "BY_TITLE_REVERSE":
        return b.title.localeCompare(a.title);
      default:
        return 0;
    }
  });


  return sortCardList.map((card, index) => ({...card , position: index}) )
}

export function valueOfCardListSort(value: string): CardListSort | undefined {
  const validValues: CardListSort[] = ["BY_ID", "BY_ID_REVERSE", "BY_TITLE", "BY_TITLE_REVERSE"];
  return validValues.includes(value as CardListSort) ? (value as CardListSort) : undefined;
}