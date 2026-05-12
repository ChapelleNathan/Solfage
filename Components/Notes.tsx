import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note, NoteName } from "../types/NotePosition";

interface NotesProps {
    notes: Note[],
    currentNoteIndex: number,
    onAnswer: (correct: boolean, nextIndex: number) => void,
    endHook: () => void;
}

export default function Notes({ notes, currentNoteIndex, onAnswer, endHook }: NotesProps) {
    const buttons: NoteName[] = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

    const currentNote = notes.length > 0 && currentNoteIndex < notes.length
        ? notes[currentNoteIndex]
        : null;

    const pressButton = (noteName: NoteName) => {
        if (!currentNote) return;

        const correct = currentNote.position.name === noteName;
        const nextIndex = currentNoteIndex + 1;

        onAnswer(correct, nextIndex);

        if (correct && nextIndex >= notes.length) {
            setTimeout(() => endHook(), 600);
        }
    };

    return (
        <View>
            {/* Debug */}
            <Text style={styles.debugText}>
                Note attendue : {currentNote ? currentNote.position.name : '—'} (#{currentNoteIndex + 1}/{notes.length})
            </Text>
            <View style={styles.bottomBar}>
                {buttons.map((btn, key) => (
                    <TouchableOpacity onPress={() => pressButton(btn)} key={key} style={styles.button}>
                        <Text>{btn}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    debugText: {
        textAlign: 'center',
        fontSize: 14,
        color: '#888',
        paddingVertical: 4,
    },
    bottomBar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: 10,
        paddingHorizontal: 5,
    },
    button: {
        flex: 1,
        marginHorizontal: 1,
        marginBottom: 60,
        paddingVertical: 100,
        alignItems: 'center',
        borderWidth: 1,
        borderBottomLeftRadius: 2,
        borderBottomRightRadius: 2
    }
})
