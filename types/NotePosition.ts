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
        needsIntermediateLedgerLine: boolean,
    ) {
        this.id = id;
        this.x = x;
        this.position = position;
        this.needsLedgerLine = needsLedgerLine;
        this.needsIntermediateLedgerLine = needsIntermediateLedgerLine;
    }
}

export const getNotePositions = (clef: "treble" | "bass"): NotePosition[] => {
    const notes: NoteName[] = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do", "Re", "Mi", "Fa", "Sol", "La", "Si", "Do"];
    const notePositions: NotePosition[] = [];

    let start = clef === 'treble' ? 200 : 225;
    let hasLedgerLine = true;
    notes.map((note) => {
        const position = new NotePosition(start, hasLedgerLine, note);
        notePositions.push(position);
        start =  start - 12.5;
        hasLedgerLine = !hasLedgerLine;
    });

    return notePositions;
};

export type NoteName = "Do" | "Re" | "Mi" | "Fa" | "Sol" | "La" | "Si";
