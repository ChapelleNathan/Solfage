export class NotePosition {
    y: number
    line: boolean
    name: string

    constructor(y: number, line: boolean, name: NoteName) {
        this.y = y;
        this.line = line;
        this.name = name;
    }
}

export class Note {
    id: number
    x: number
    position: NotePosition
    needsLedgerLine: boolean
    needsIntermediateLedgerLine: boolean

    constructor(id: number, x: number, position: NotePosition, needsLedgerLine: boolean, needsIntermediateLedgerLine: boolean) {
        this.id = id;
        this.x = x;
        this.position = position;
        this.needsLedgerLine = needsLedgerLine;
        this.needsIntermediateLedgerLine = needsIntermediateLedgerLine;
    }
}

type NoteName = 'Do' | 'Re' | 'Mi' | 'Fa' | 'Sol' | 'La' | 'Si'
