/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardEntity } from "../dashboard/dashboard";
import type { CardType } from "../enums/cardType";
import { TableEntity } from "../table/table";
import { TagEntity } from "../tag/tag";
import type { AttachedFile } from "../utils/attachedFile";
import type { Check } from "../utils/check";
import type { Color } from "../utils/color";

export class CardEntity {
  id: number;
  title: string;
  description: string;
  cardType: CardType;
  color: Color | null;
  position: number;
  attachedFiled: AttachedFile[];
  deadLine: Date;
  checks: Check[];
  tagList: TagEntity[];
  table: TableEntity;
  dashboard: DashboardEntity;

  constructor(
    id?: number,
    title?: string,
    description?: string,
    cardType?: CardType,
    color?: Color,
    position?: number,
    attachedFiled?: AttachedFile[],
    deadLine?: Date,
    checks?: Check[],
    tagList?: TagEntity[],
    table?: TableEntity,
    dashboard?: DashboardEntity
  ) {
    this.id = id ?? 0;
    this.title = title ?? '';
    this.description = description ?? '';
    this.cardType = cardType ?? "NORMAL";
    this.color = color ?? null;
    this.position = position ?? 0;
    this.attachedFiled = attachedFiled ?? [];
    this.deadLine = deadLine ?? new Date();
    this.checks = checks ?? [];
    this.tagList = tagList ?? [];
    this.table = table ?? ({} as TableEntity);
    this.dashboard = dashboard ?? ({} as DashboardEntity);
  }

  static fromJSON(json: any): CardEntity {
    return new CardEntity(
      json.id,
      json.title,
      json.description,
      json.cardType,
      json.color ?? null,  
      json.position,
      json.attachedFiled ?? [], 
      json.deadLine ? new Date(json.deadLine) : new Date(),
      json.checks ?? [],        
      json.tagList?.map((t: any) => TagEntity.fromJSON ? TagEntity.fromJSON(t) : t) ?? [],
      json.table ? (TableEntity.fromJSON ? TableEntity.fromJSON(json.table) : json.table) : ({} as TableEntity),
      json.dashboard ? (DashboardEntity.fromJSON ? DashboardEntity.fromJSON(json.dashboard) : json.dashboard) : ({} as DashboardEntity),
    );
  }
}
