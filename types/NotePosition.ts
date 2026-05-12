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
    // Define the note names in order for both clefs
    const noteNames: NoteName[] = ["Do", "Re", "Mi", "Fa", "Sol", "La", "Si"];

    if (clef === "treble") {
        // Treble clef: from high Do (200) down to low Do (25)
        // 15 notes total (2 octaves + 1 note)
        return noteNames
            .flatMap(name => Array(3).fill(name)) // Repeat each name 3 times for 3 octaves
            .slice(0, 15) // Take first 15 notes
            .map((name, index) => {
                // Calculate position: start at 200 and go down by 12.5 each step
                const y = 200 - (index * 12.5);
                // Line notes are at even indices (0, 2, 4, ...)
                const line = index % 2 === 0;
                return new NotePosition(y, line, name);
            });
    } else {
        // Bass clef: from low Do (50) up to high Do (225)
        // 15 notes total (2 octaves + 1 note)
        return noteNames
            .flatMap(name => Array(3).fill(name)) // Repeat each name 3 times for 3 octaves
            .slice(0, 15) // Take first 15 notes
            .map((name, index) => {
                // Calculate position: start at 50 and go up by 12.5 each step
                const y = 50 + (index * 12.5);
                // Line notes are at even indices (0, 2, 4, ...)
                const line = index % 2 === 0;
                return new NotePosition(y, line, name);
            });
    }
};

export type NoteName = "Do" | "Re" | "Mi" | "Fa" | "Sol" | "La" | "Si";
