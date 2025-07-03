import type { CardDTO } from "../card/cardDTO";

export interface TableDTO {
  name?: string;
  //tableList?: TableDTO[];
  cardList?: CardDTO[];
}
