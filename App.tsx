import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import Porte from './Components/Porte';
import Notes from './Components/Notes';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.porte}>
        <Porte />
      </View>
      <Notes />
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
