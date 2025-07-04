/* eslint-disable @typescript-eslint/no-explicit-any */
import type { CardType } from "../enums/cardType";
import { TagEntity } from "../tag/tag";
import type { AttachedFileProps } from "../utils/attachedFile";
import type { Check } from "../utils/check";
import type { Color } from "../utils/color";

export class CardEntity {
  id: number;
  title: string;
  description: string;
  cardType: CardType;
  color: Color | null;
  position: number;
  attachedFiled: AttachedFileProps[];
  deadLine: Date;
  checks: Check[];
  tagList: TagEntity[];
  table: number;
  dashboard: number;

  constructor(
    id?: number,
    title?: string,
    description?: string,
    cardType?: CardType,
    color?: Color,
    position?: number,
    attachedFiled?: AttachedFileProps[],
    deadLine?: Date,
    checks?: Check[],
    tagList?: TagEntity[],
    table?: number,
    dashboard?: number
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
    this.table = table ?? -1;
    this.dashboard = dashboard ?? -1;
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
      json.table,
      json.dashboard,
    );
  }
}
