import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Note, NoteName } from "../types/NotePosition";
import { useEffect, useState } from "react";

interface NotesProps {
    notes: Note[],
    endHook: () => void;
}
export default function Notes({ notes, endHook }: NotesProps) {
    const [count, setCount] = useState(0);
    const buttons: NoteName[] = ['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'];

    const pressButton = (noteName: NoteName) => {
        if (notes[count].position.name == noteName && count < notes.length) {
            console.log('bravo');
            setCount(prev => prev + 1);
        }

        if (count >= notes.length - 1) {
            console.log('fin d\'exo');
            setCount(0);
            endHook();
            return;
        }
    }

    return (
        <View style={styles.bottomBar}>
            {buttons.map((btn, key) => (
                <TouchableOpacity onPress={() => pressButton(btn)} key={key} style={styles.button}>
                    <Text>{btn}</Text>
                </TouchableOpacity>
            ))}
        </View>
    )
}

const styles = StyleSheet.create({
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