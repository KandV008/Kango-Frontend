/* eslint-disable @typescript-eslint/no-explicit-any */
import { CardEntity } from "../card/card";

export class TableEntity {
    id: number;
    name: string;
    position: number;
    cardList: CardEntity[];
    dashboard: number;

    constructor(
        id?: number,
        name?: string,
        position?: number,
        cardList?: CardEntity[],
        dashboard?: number,
    ) {
        this.id = id ?? -1;
        this.name = name ?? '';
        this.position = position ?? -1;
        this.cardList = cardList ?? [];
        this.dashboard = dashboard ?? -1;
    }

        static fromJSON(json: any): TableEntity {
        return new TableEntity(
            json.id,
            json.name,
            json.position,
            json.cardList?.map((c: any) => CardEntity.fromJSON ? CardEntity.fromJSON(c) : c) ?? [],
            json.dashboard,
        );
    }
}