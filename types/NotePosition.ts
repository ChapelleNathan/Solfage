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
    const noteNames: NoteName[] = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];
    // 15 notes = 2 octaves + Do : Do Re Mi Fa Sol La Si Do Re Mi Fa Sol La Si Do
    const sequence: NoteName[] = Array.from({ length: 15 }, (_, i) => noteNames[i % 7]);

    if (clef === "treble") {
        return sequence.map((name, index) => {
            const y = 200 - (index * 12.5);
            const line = index % 2 === 0;
            return new NotePosition(y, line, name);
        });
    } else {
        return sequence.map((name, index) => {
            const y = 50 + (index * 12.5);
            const line = index % 2 === 0;
            return new NotePosition(y, line, name);
        });
    }
};

export type NoteName = "Do" | "Re" | "Mi" | "Fa" | "Sol" | "La" | "Si";
