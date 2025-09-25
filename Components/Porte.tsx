import { Asset } from "expo-asset";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import Svg, { G, Line, Path, SvgXml } from "react-native-svg";

export default function Porte({ clef = "bass" }) {
    const [svgContent, setSvgContent] = useState('');



    const width = 400;
    const height = 200;

    useEffect(() => {
        loadSvg()
    }, [clef])


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

        // Créer la portée complète avec votre clé
        const completeStaff = clef == 'treble' ? `
        <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        
            <g>
                <!-- Les 5 lignes de la portée -->
                <line x1="20" y1="50" x2="${width - 20}" y2="50" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="75" x2="${width - 20}" y2="75" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="100" x2="${width - 20}" y2="100" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="125" x2="${width - 20}" y2="125" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="150" x2="${width - 20}" y2="150" stroke="#000" stroke-width="1"/>

                <!-- Votre clé SVG personnalisée -->
                <g transform="translate(0, 10) scale(1.2)">
                    ${clefContent}
                </g>
            </g>
        </svg>
        ` :
            `
            <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg">
        
            <g>
                <!-- Les 5 lignes de la portée -->
                <line x1="20" y1="50" x2="${width - 20}" y2="50" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="75" x2="${width - 20}" y2="75" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="100" x2="${width - 20}" y2="100" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="125" x2="${width - 20}" y2="125" stroke="#000" stroke-width="1"/>
                <line x1="20" y1="150" x2="${width - 20}" y2="150" stroke="#000" stroke-width="1"/>

                <!-- Votre clé SVG personnalisée -->
                <g transform="translate(0, 10) scale(0.15)">
                    ${clefContent}
                </g>
            </g>
            </svg>
        `;


        setSvgContent(completeStaff);
    };

    return (
        <View style={styles.staffContainer}>
            {svgContent ? (
                <SvgXml xml={svgContent} width={width} height={height} />
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