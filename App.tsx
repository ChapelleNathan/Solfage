import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Porte from './Components/Porte';
import Notes from './Components/Notes';
import { getNotePositions, Note, NotePosition } from './types/NotePosition';
import { useEffect, useState } from 'react';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [clef, setClef] = useState<'treble' | 'bass'>('bass');

  // Configuration constants
  const NB_NOTE = 6;
  const INTERVALLE = 10;
  const notePositions = getNotePositions(clef);

  const addRandomNotes = () => {
    const generatedNote: Note[] = [];
    let lastPosition: number | null = null;

    for (let index = 0; index <= NB_NOTE; index++) {
      let candidates: number[];

      if (lastPosition == null) {
        candidates = Array.from({ length: notePositions.length }, (_, i) => i)
      } else {
        const min = Math.max(0, lastPosition - INTERVALLE);
        const max = Math.min(notePositions.length - 1, lastPosition + INTERVALLE)

        candidates = [];
        for (let i = min; i <= max; i++) {
          if (i != lastPosition) {
            candidates.push(i)
          }
        }
      }

      const position = candidates[Math.floor(Math.random() * candidates.length)];
      lastPosition = position;
      const notePosition = notePositions[position];

      // Refactored note creation for better readability
      const note = createNote(
        Math.random() + Date.now(),
        110 + (index * 40),
        notePosition,
        clef
      );

      generatedNote.push(note);
    }
    setNotes(generatedNote)
  };

  // Helper function to create notes with clef-specific logic
  const createNote = (
    id: number,
    x: number,
    position: NotePosition,
    clef: 'treble' | 'bass'
  ): Note => {
    let needsLedgerLine = false;
    let needsIntermediateLedgerLine = false;

    if (clef === 'treble') {
      needsLedgerLine = position.line && (position.name === 'Do' || position.name === 'Re' ||
                                         position.name === 'Mi' || position.name === 'Fa' ||
                                         position.name === 'Sol' || position.name === 'La' ||
                                         position.name === 'Si');
      needsIntermediateLedgerLine = position.name === 'Do' || position.name === 'Re';
    } else { // bass clef
      needsLedgerLine = position.line && (position.name === 'Do' || position.name === 'Re' ||
                                         position.name === 'Mi' || position.name === 'Fa' ||
                                         position.name === 'Sol' || position.name === 'La' ||
                                         position.name === 'Si');
      needsIntermediateLedgerLine = position.name === 'Sol' || position.name === 'La';
    }

    return new Note(id, x, position, needsLedgerLine, needsIntermediateLedgerLine);
  };

  useEffect(() => {
    addRandomNotes();
  }, [clef]); // Regenerate notes when clef changes


  return (
    <View style={styles.container}>
      <View style={styles.porte}>
        <Porte notes={notes} clef={clef}/>
      </View>
      <TouchableOpacity onPress={addRandomNotes} style={styles.buttonAdd}>
        <Text>add notes</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setClef(clef === 'treble' ? 'bass' : 'treble')} style={styles.buttonClef}>
        <Text>{clef === 'treble' ? 'Basse' : 'Sol'} clef</Text>
      </TouchableOpacity>
      <Notes notes={notes} endHook={addRandomNotes}/>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  porte: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
  },
  buttonAdd: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonClef: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 5,
  }
});
