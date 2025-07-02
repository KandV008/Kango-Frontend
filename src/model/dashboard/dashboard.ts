/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardEntity } from "../card/card";
import { TableEntity } from "../table/table";
import { TagEntity } from "../tag/tag";
import type { AttachedFile } from "../utils/attachedFile";

export class DashboardEntity {
  id: number;
  name: string;
  tableList: TableEntity[];
  atacchedFiles: AttachedFile[];
  templateCardList: CardEntity[];
  tagList: TagEntity[];

  constructor(
    id?: number,
    name?: string,
    tableList?: TableEntity[],
    atacchedFiles?: AttachedFile[],
    templateCardList?: CardEntity[],
    tagList?: TagEntity[]
  ) {
    this.id = id ?? 0;
    this.name = name ?? '';
    this.tableList = tableList ?? [];
    this.atacchedFiles = atacchedFiles ?? [];
    this.templateCardList = templateCardList ?? [];
    this.tagList = tagList ?? [];
  }

    static fromJSON(json: any): DashboardEntity {
    return new DashboardEntity(
      json.id,
      json.name,
      json.tableList?.map((t: any) => TableEntity.fromJSON ? TableEntity.fromJSON(t) : t) ?? [],
      json.attachedFiled ?? [], 
      json.templateCardList?.map((c: any) => CardEntity.fromJSON ? CardEntity.fromJSON(c) : c) ?? [],
      json.tagList?.map((tag: any) => TagEntity.fromJSON ? TagEntity.fromJSON(tag) : tag) ?? [],
    );
  }
}
