/* eslint-disable @typescript-eslint/no-explicit-any */
import { DashboardEntity } from "../dashboard/dashboard";
import type { Visibility } from "../enums/visibilty";
import type { Color } from "../utils/color";

export class TagEntity {
  id: number;
  label: string;
  color: Color | null;
  visibility: Visibility;
  dashboard: DashboardEntity;

  constructor(
    id?: number,
    label?: string,
    color?: Color,
    visibility?: Visibility,
    dashboard?: DashboardEntity
  ) {
    this.id = id ?? 0;
    this.label = label ?? '';
    this.color = color ?? null;
    this.visibility = visibility ?? "LOCAL";
    this.dashboard = dashboard ?? ({} as DashboardEntity);
  }

  static fromJSON(json: any): TagEntity {
    return new TagEntity(
      json.id,
      json.label,
      json.color ?? null, 
      json.visibility ?? "LOCAL",
      json.dashboard ? (DashboardEntity.fromJSON ? DashboardEntity.fromJSON(json.dashboard) : json.dashboard) : ({} as DashboardEntity)
    );
  }
}
