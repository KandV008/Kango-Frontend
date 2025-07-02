/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardEntity } from "../card/card";
import { DashboardEntity } from "../dashboard/dashboard";

export class TableEntity {
    id: number;
    name: string;
    position: number;
    cardList: CardEntity[];
    dashboard: DashboardEntity | null;

    constructor(
        id?: number,
        name?: string,
        position?: number,
        cardList?: CardEntity[],
        dashboard?: DashboardEntity,
    ) {
        this.id = id ?? -1;
        this.name = name ?? '';
        this.position = position ?? -1;
        this.cardList = cardList ?? [];
        this.dashboard = dashboard ?? null;
    }

        static fromJSON(json: any): TableEntity {
        return new TableEntity(
            json.id,
            json.name,
            json.position,
            json.cardList?.map((c: any) => CardEntity.fromJSON ? CardEntity.fromJSON(c) : c) ?? [],
            json.dashboard ? (DashboardEntity.fromJSON ? DashboardEntity.fromJSON(json.dashboard) : json.dashboard) : null,
        );
    }
}