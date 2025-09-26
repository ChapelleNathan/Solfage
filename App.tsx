import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Porte from './Components/Porte';
import Notes from './Components/Notes';
import { getNotePositions, Note } from './types/NotePosition';
import { useEffect, useState } from 'react';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);

  const nbNote = 6;
  const intervale = 10;
  const clef : 'treble' | 'bass' = 'bass'
  const notePositions = getNotePositions(clef);

  const addRandomNotes = () => {

    const generatedNote: Note[] = []
    let lastPosition: number | null = null;
    for (let index = 0; index <= nbNote; index++) {
      let candidates: number[];

      if (lastPosition == null) {
        candidates = Array.from({ length: notePositions.length }, (_, i) => i)
      } else {
        const min = Math.max(0, lastPosition - intervale);
        const max = Math.min(notePositions.length - 1, lastPosition + intervale)

        candidates = [];
        for (let i = min; i <= max; i++) {
          if (i != lastPosition) {
            candidates.push(i)
          }
        }
      }

      const position = candidates[Math.floor(Math.random() * candidates.length)]
      lastPosition = position;
      const note = notePositions[position];
      generatedNote.push(new Note(Math.random() + Date.now(), 110 + (index * 40), notePositions[position], note.line && (position <= 2 || position >= 12), position >= 13))
    }
    setNotes(generatedNote)
  }

  useEffect(() => {
    addRandomNotes()
  }, [])


  return (
    <View style={styles.container}>
      <View style={styles.porte}>
        <Porte notes={notes} clef={clef}/>
      </View>
      <TouchableOpacity onPress={addRandomNotes}>
        <Text>add notes</Text>
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
});
