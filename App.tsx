import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View, Modal } from 'react-native';
import Porte from './Components/Porte';
import Notes from './Components/Notes';
import Parameters from './Components/Parameters';
import { getNotePositions, Note, NotePosition } from './types/NotePosition';
import { useEffect, useRef, useState } from 'react';

export type NoteStatus = 'idle' | 'correct' | 'wrong';

export default function App() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [clefMode, setClefMode] = useState<'treble' | 'bass' | 'random'>('bass');
  const [actualClef, setActualClef] = useState<'treble' | 'bass'>('bass');
  const [currentNoteIndex, setCurrentNoteIndex] = useState(0);
  const [noteStatus, setNoteStatus] = useState<NoteStatus>('idle');
  const feedbackTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [nbNote, setNbNote] = useState(6); // nombre de notes sur la portée
  const [intervalle, setIntervalle] = useState(10); // intervalle entre les notes
  const [parametersModalVisible, setParametersModalVisible] = useState(false);

  // Initialize actualClef based on clefMode
  useEffect(() => {
    if (clefMode === 'treble') {
      setActualClef('treble');
    } else if (clefMode === 'bass') {
      setActualClef('bass');
    } else if (clefMode === 'random') {
      // Only set initial random clef if we don't already have one set for random mode
      // This prevents resetting the clef on every re-render when in random mode
      setActualClef(Math.random() < 0.5 ? 'treble' : 'bass');
    }
  }, [clefMode]); // Only run when clefMode changes, not on every render

  const addRandomNotes = (clef: 'treble' | 'bass' = actualClef) => {
    const generatedNote: Note[] = [];
    let lastPosition: number | null = null;
    const notePositions = getNotePositions(clef);

    for (let index = 0; index < nbNote; index++) {
      let candidates: number[];

      if (lastPosition == null) {
        candidates = Array.from({ length: notePositions.length }, (_, i) => i);
      } else {
        const min = Math.max(0, lastPosition - intervalle);
        const max = Math.min(notePositions.length - 1, lastPosition + intervalle);

        candidates = [];
        for (let i = min; i <= max; i++) {
          if (i !== lastPosition) {
            candidates.push(i);
          }
        }
      }

      const position = candidates[Math.floor(Math.random() * candidates.length)];
      lastPosition = position;
      const notePosition = notePositions[position];

      generatedNote.push(createNote(Math.random() + Date.now(), 110 + (index * 40), notePosition, clef));
    }
    setNotes(generatedNote);
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

  const handleAddRandomNotes = () => {
    setCurrentNoteIndex(0);
    setNoteStatus('idle');
    if (clefMode === 'random') {
      const newClef = Math.random() < 0.5 ? 'treble' : 'bass';
      setActualClef(newClef);
      addRandomNotes(newClef);
    } else {
      addRandomNotes();
    }
  };

  const handleAnswer = (correct: boolean, nextIndex: number) => {
    if (feedbackTimeout.current) clearTimeout(feedbackTimeout.current);

    if (correct) {
      setNoteStatus('correct');
      setCurrentNoteIndex(nextIndex);
      feedbackTimeout.current = setTimeout(() => setNoteStatus('idle'), 500);
    } else {
      setNoteStatus('wrong');
      feedbackTimeout.current = setTimeout(() => setNoteStatus('idle'), 500);
    }
  };

  useEffect(() => {
    if (clefMode !== 'random') {
      addRandomNotes();
    }
  }, [actualClef]);

  useEffect(() => {
    addRandomNotes();
  }, [nbNote, intervalle]);

  useEffect(() => {
    setCurrentNoteIndex(0);
    setNoteStatus('idle');
  }, [notes]);

  const openParametersModal = () => {
    setParametersModalVisible(true);
  };

  const closeParametersModal = () => {
    setParametersModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.porte}>
        <Porte notes={notes} clef={actualClef} currentNoteIndex={currentNoteIndex} noteStatus={noteStatus} />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={handleAddRandomNotes} style={styles.buttonAdd}>
          <Text>add notes</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openParametersModal} style={styles.buttonParams}>
          <Text>paramètres</Text>
        </TouchableOpacity>
      </View>
      <Notes notes={notes} currentNoteIndex={currentNoteIndex} onAnswer={handleAnswer} endHook={handleAddRandomNotes} />
      <Parameters
        nbNote={nbNote}
        intervalle={intervalle}
        clefMode={clefMode}
        onNbNoteChange={setNbNote}
        onIntervalleChange={setIntervalle}
        onClefModeChange={setClefMode}
        visible={parametersModalVisible}
        onClose={closeParametersModal}
      />
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
  },
  buttonAdd: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
  },
  buttonClef: {
    backgroundColor: '#FF9500',
    padding: 10,
    borderRadius: 5,
  },
  buttonParams: {
    backgroundColor: '#9C27B0',
    padding: 10,
    borderRadius: 5,
  }
});