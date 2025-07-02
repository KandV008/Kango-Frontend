export const COLOR = {
    PURPLE: "PURPLE",
    PINK: "PINK",
    YELLOW: "YELLOW",
    BLUE: "BLUE",
    RED: "RED",
    GREEN: "GREEN",
    ORANGE: "ORANGE",
    BLACK: "BLACK",
} as const;

export type Color = keyof typeof COLOR;

export const COLOR_DATA: Record<Color, DataColor> = {
    PURPLE: { name: "Purple", hex: "9b51ff" },
    PINK: { name: "Pink", hex: "ec77ff" },
    YELLOW: { name: "Yellow", hex: "fff981" },
    BLUE: { name: "Blue", hex: "81dbff" },
    RED: { name: "Red", hex: "fe6262" },
    GREEN: { name: "Green", hex: "95ce65" },
    ORANGE: { name: "Orange", hex: "ffa846" },
    BLACK: { name: "Black", hex: "424242" },
};

export const availableColors = Object.entries(COLOR_DATA).map(([value, data]) => ({
    value,
    label: data.name,
}));

export interface DataColor {
    name: string;
    hex: string;
}

export function getDataColor(color: Color): DataColor {
    const data = COLOR_DATA[color];
    if (!data) throw new Error("Invalid Color");
    return data;
}
