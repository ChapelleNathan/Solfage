export class NotePosition {
    y: number;
    line: boolean;
    name: string;

    constructor(y: number, line: boolean, name: NoteName) {
        this.y = y;
        this.line = line;
        this.name = name;
    }
}

export class Note {
    id: number;
    x: number;
    position: NotePosition;
    needsLedgerLine: boolean;
    needsIntermediateLedgerLine: boolean;

    constructor(
        id: number,
        x: number,
        position: NotePosition,
        needsLedgerLine: boolean,
        needsIntermediateLedgerLine: boolean
    ) {
        this.id = id;
        this.x = x;
        this.position = position;
        this.needsLedgerLine = needsLedgerLine;
        this.needsIntermediateLedgerLine = needsIntermediateLedgerLine;
    }
}

export const getNotePositions = (clef: "treble" | "bass"): NotePosition[] => {
    return clef === "treble"
        ? [
                new NotePosition(200, true, "Do"),
                new NotePosition(187.5, false, "Re"),
                new NotePosition(175, true, "Mi"),
                new NotePosition(162.5, false, "Fa"),
                new NotePosition(150, true, "Sol"),
                new NotePosition(137.5, false, "La"),
                new NotePosition(125, true, "Si"),
                new NotePosition(112.5, false, "Do"),
                new NotePosition(100, true, "Re"),
                new NotePosition(87.5, false, "Mi"),
                new NotePosition(75, true, "Fa"),
                new NotePosition(62.5, false, "Sol"),
                new NotePosition(50, true, "La"),
                new NotePosition(37.5, false, "Si"),
                new NotePosition(25, true, "Do"),
        ]
        : [
                new NotePosition(50, true, "Do"),
                new NotePosition(62.5, false, "Si"),
                new NotePosition(75, true, "La"),
                new NotePosition(87.5, false, "Sol"),
                new NotePosition(100, true, "Fa"),
                new NotePosition(112.5, false, "Mi"),
                new NotePosition(125, true, "Re"),
                new NotePosition(137.5, false, "Do"),
                new NotePosition(150, true, "Si"),
                new NotePosition(162.5, false, "La"),
                new NotePosition(175, true, "Sol"),
                new NotePosition(187.5, false, "Fa"),
                new NotePosition(200, true, "Mi"),
                new NotePosition(212.5, false, "Re"),
                new NotePosition(225, true, "Do"),
        ];
};

export type NoteName = "Do" | "Re" | "Mi" | "Fa" | "Sol" | "La" | "Si";
