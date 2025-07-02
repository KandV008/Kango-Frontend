import { CardEntity } from "../card/card";
import { TableEntity } from "../table/table";
import type { TagDTO } from "../tag/tagDTO";

export interface DashboardDTO {
  name?: string;
  tableList?: TableEntity[];
  templateCardList?: CardEntity[];
  tagList?: TagDTO[];
}
