import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import { getNotePositions, Note, NotePosition } from "../types/NotePosition";
import { NoteStatus } from "../App";

interface PorteProps {
    notes: Note[],
    clef: 'treble' | 'bass',
    currentNoteIndex: number,
    noteStatus: NoteStatus,
}

export default function Porte({notes, clef, currentNoteIndex, noteStatus}: PorteProps) {
    const [svgContent, setSvgContent] = useState('');

    const width = 400;
    const height = 250;

    useEffect(() => {
        loadSvg();
    }, [clef, notes, currentNoteIndex, noteStatus])

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
        // Extraire le contenu de la clé SVG (sans les balises svg)
        let clefContent = clefSvgText
            .replace(/<\?xml[^>]*>/g, '') // Supprimer déclaration XML
            .replace(/<!DOCTYPE[^>]*>/g, '') // Supprimer DOCTYPE
            .replace(/<svg[^>]*>/g, '') // Supprimer balise svg ouvrante
            .replace(/<\/svg>/g, '') // Supprimer balise svg fermante
            .replace(/xmlns[^=]*="[^"]*"/g, '') // Supprimer namespace duplicata
            .trim();

        // Création du svg des notes
        const notesElements = notes.map((note, index) => {
            let noteElement = '';

            const isCurrent = index === currentNoteIndex;
            const isPast = index < currentNoteIndex;

            let fill: string;
            let opacity: string;

            if (isCurrent) {
                if (noteStatus === 'correct') {
                    fill = '#22c55e'; // vert
                } else if (noteStatus === 'wrong') {
                    fill = '#ef4444'; // rouge
                } else {
                    fill = '#000';
                }
                opacity = '1';
            } else if (isPast) {
                fill = '#000';
                opacity = '0.15';
            } else {
                fill = '#000';
                opacity = '0.15';
            }

            const ledgerStroke = isCurrent ? fill : '#000';
            const ledgerOpacity = isCurrent ? '1' : '0.15';

            if (note.needsLedgerLine) {
                noteElement += `<line x1="${note.x - 30}" y1="${note.position.y}" x2="${note.x + 30}" y2="${note.position.y}" stroke="${ledgerStroke}" stroke-width="1" opacity="${ledgerOpacity}"/>`;
            }

            if (note.needsIntermediateLedgerLine) {
                clef == 'treble' ?
                    noteElement += `<line x1="${note.x - 30}" y1="${note.position.y + (note.needsLedgerLine ? 25 : 12.5)}" x2="${note.x + 30}" y2="${note.position.y + (note.needsLedgerLine ? 25 : 12.5)}" stroke="${ledgerStroke}" stroke-width="1" opacity="${ledgerOpacity}"/>`
                    :
                    noteElement += `<line x1="${note.x - 30}" y1="${note.position.y - (note.needsLedgerLine ? 25 : 12.5)}" x2="${note.x + 30}" y2="${note.position.y - (note.needsLedgerLine ? 25 : 12.5)}" stroke="${ledgerStroke}" stroke-width="1" opacity="${ledgerOpacity}"/>`;
            }

            noteElement += `<ellipse cx="${note.x}" cy="${note.position.y}" rx="14" ry="10" fill="${fill}" opacity="${opacity}" transform="rotate(-20 ${note.x} ${note.position.y})"/>`;

            return noteElement;
        }).join('');

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