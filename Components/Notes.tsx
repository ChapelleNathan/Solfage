import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Notes() {
    return (
        <View style={styles.bottomBar}>
            {['Do', 'Re', 'Mi', 'Fa', 'Sol', 'La', 'Si'].map((btn, key) => (
                <TouchableOpacity key={key} style={styles.button}>
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