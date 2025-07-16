import type { CardDTO } from "../card/cardDTO";
import type { TableDTO } from "../table/tableDTO";
import type { TagDTO } from "../tag/tagDTO";

export interface DashboardDTO {
  name?: string;
  tableList?: TableDTO[];
  templateCardList?: CardDTO[];
  tagList?: TagDTO[];
}
