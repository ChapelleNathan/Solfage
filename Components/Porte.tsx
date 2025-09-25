import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { G, Line, Path, SvgXml } from "react-native-svg";
import { Note, NotePosition } from "../types/NotePosition";

export default function Porte() {
    const [svgContent, setSvgContent] = useState('');
    const [clef, setClef] = useState<'treble' | 'bass'>('bass')
    const [notes, setNotes] = useState<Note[]>([]);

    const nbNote = 1;

    const notePositions: NotePosition[] = clef == 'treble' ? [
        new NotePosition(200, true, 'Do'),
        new NotePosition(187.5, false, 'Re'),
        new NotePosition(175, true, 'Mi'),
        new NotePosition(162.5, false, 'Fa'),
        new NotePosition(150, true, 'Sol'),
        new NotePosition(137.5, false, 'La'),
        new NotePosition(125, true, 'Si'),
        new NotePosition(112.5, false, 'Do'),
        new NotePosition(100, true, 'Re'),
        new NotePosition(87.5, false, 'Mi'),
        new NotePosition(75, true, 'Fa'),
        new NotePosition(62.5, false, 'Sol'),
        new NotePosition(50, true, 'La'),
        new NotePosition(37.5, false, 'Si'),
        new NotePosition(25, true, 'Do'),
    ] :
        [
            new NotePosition(50, true, 'Do'),
            new NotePosition(62.5, false, 'Si'),
            new NotePosition(75, true, 'La'),
            new NotePosition(87.5, false, 'Sol'),
            new NotePosition(100, true, 'Fa'),
            new NotePosition(112.5, false, 'Mi'),
            new NotePosition(125, true, 'Re'),
            new NotePosition(137.5, false, 'Do'),
            new NotePosition(150, true, 'Si'),
            new NotePosition(162.5, false, 'La'),
            new NotePosition(175, true, 'Sol'),
            new NotePosition(187.5, false, 'Fa'),
            new NotePosition(200, true, 'Mi'),
            new NotePosition(212.5, false, 'Re'),
            new NotePosition(225, true, 'Do')
        ];

    const addRandomNotes = () => {
        const notes: Note[] = []
        for (let index = 0; index < nbNote; index++) {
            const position = Math.floor(Math.random() * 15)
            const note = notePositions[position];
            notes.push(new Note(Math.random() + Date.now(), 120, notePositions[position], note.line && (position <= 2 || position >= 12), position >= 13))
        }
        setNotes(notes)
    }

    const clearNotes = () => {
        setNotes([]);
    }

    const width = 400;
    const height = 250;

    useEffect(() => {
        clearNotes();
        addRandomNotes();
    }, [])

    useEffect(() => {
        loadSvg();
    }, [clef, notes])

    const loadSvg = async () => {
        try {
            const asset = Asset.fromModule(
                clef === "treble"
                    ? require('../assets/trebleClef.svg')
                    : require('../assets/bass-clef.svg')
            );
            await asset.downloadAsync();

            const response = await fetch(asset.uri);
            const svgText = await response.text();
            combineStaffWithClef(svgText);
        } catch (error) {
            console.error('Erreur lors du chargement du SVG:', error);
        }
    };

    const combineStaffWithClef = (clefSvgText: string) => {
        // Extraire le contenu de votre clé SVG (sans les balises svg)
        let clefContent = clefSvgText
            .replace(/<\?xml[^>]*>/g, '') // Supprimer déclaration XML
            .replace(/<!DOCTYPE[^>]*>/g, '') // Supprimer DOCTYPE
            .replace(/<svg[^>]*>/g, '') // Supprimer balise svg ouvrante
            .replace(/<\/svg>/g, '') // Supprimer balise svg fermante
            .replace(/xmlns[^=]*="[^"]*"/g, '') // Supprimer namespace duplicata
            .trim();

        // Création du svg des notes
        const notesElements = notes.map(note => {
            let noteElement = '';

            if (note.needsLedgerLine) {
                noteElement += `<line x1="${note.x - 30}" y1="${note.position.y}" x2="${note.x + 30}" y2="${note.position.y}" stroke="#000" stroke-width="1"/>`;
            }

            if (note.needsIntermediateLedgerLine) {
                clef == 'treble' ?
                    noteElement += `<line x1="${note.x - 30}" y1="${note.position.y + (note.needsLedgerLine ? 25 : 12.5)}" x2="${note.x + 30}" y2="${note.position.y + (note.needsLedgerLine ? 25 : 12.5)}" stroke="#000" stroke-width="1"/>`
                    :
                    noteElement += `<line x1="${note.x - 30}" y1="${note.position.y - (note.needsLedgerLine ? 25 : 12.5)}" x2="${note.x + 30}" y2="${note.position.y - (note.needsLedgerLine ? 25 : 12.5)}" stroke="#000" stroke-width="1"/>`;
                }   

            noteElement += `
            <ellipse cx="${note.x}" cy="${note.position.y}" rx="14" ry="10" fill="#000" transform="rotate(-20 ${note.x} ${note.position.y})"/>
            `;
            

            return noteElement;
        }).join('');
        console.log('notes: ', notes);
        console.log('svg: ', notesElements);



        // Créer la portée complète avec votre clé
        const completeStaff = clef == 'treble' ? `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        
            <g>
                <!-- Les 5 lignes de la portée -->
                <line x1="20" y1="75" x2="${width - 20}" y2="75" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="100" x2="${width - 20}" y2="100" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="125" x2="${width - 20}" y2="125" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="150" x2="${width - 20}" y2="150" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="175" x2="${width - 20}" y2="175" stroke="#000" stroke-width="1"/>

                <!-- Votre clé SVG personnalisée -->
                <g transform="translate(0, 37) scale(1.2)">
                    ${clefContent}
                </g>
                ${notesElements}
            </g>
        </svg>
        ` :
            `
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        
            <g>
                <!-- Les 5 lignes de la portée -->
                <line x1="20" y1="75" x2="${width - 20}" y2="75" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="100" x2="${width - 20}" y2="100" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="125" x2="${width - 20}" y2="125" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="150" x2="${width - 20}" y2="150" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="175" x2="${width - 20}" y2="175" stroke="#000" stroke-width="1"/>

                <!-- Clé -->
                <g transform="translate(0, 35) scale(0.15)">
                    ${clefContent}
                </g>
                <!-- Affichage des notes -->
                    ${notesElements}
            </g>
            </svg>
        `;
        setSvgContent(completeStaff);
    };

    return (
        <View style={styles.staffContainer}>
            {svgContent ? (
                <>
                    <SvgXml xml={svgContent} width={width} height={height} />
                    <View style={{ flexDirection: 'row' }}>
                        <TouchableOpacity style={{ borderWidth: 1, width: 100, marginLeft: 100 }} onPress={() => clearNotes()}>
                            <Text>clear</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ borderWidth: 1, width: 100, marginLeft: 10 }} onPress={() => addRandomNotes()}>
                            <Text>add</Text>
                        </TouchableOpacity>
                    </View>
                </>
            ) : (
                <Text>Chargement de la portée...</Text>
            )}
        </View>
    )
}

const styles = StyleSheet.create({
    staffContainer: {
    }
})