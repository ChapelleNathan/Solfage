import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";

interface ParametersProps {
  nbNote: number;
  intervalle: number;
  onNbNoteChange: (value: number) => void;
  onIntervalleChange: (value: number) => void;
  visible: boolean;
  onClose: () => void;
}

export default function Parameters({ nbNote, intervalle, onNbNoteChange, onIntervalleChange, visible, onClose }: ParametersProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.background}>
        <View style={styles.modal}>
          <Text style={styles.title}>Paramètres</Text>

          {/* Intervalle entre les notes */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Intervalle entre les notes :</Text>
            <View style={styles.settingValueContainer}>
              <TouchableOpacity onPress={() => onIntervalleChange(intervalle - 1)} style={styles.button}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{intervalle}</Text>
              <TouchableOpacity onPress={() => onIntervalleChange(intervalle + 1)} style={styles.button}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nombre de notes sur la portée */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Nombre de notes sur la portée :</Text>
            <View style={styles.settingValueContainer}>
              <TouchableOpacity onPress={() => onNbNoteChange(nbNote - 1)} style={styles.button}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{nbNote}</Text>
              <TouchableOpacity onPress={() => onNbNoteChange(nbNote + 1)} style={styles.button}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity onPress={onClose} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Fermer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    maxWidth: 400,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
  },
  settingValueContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#ddd',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  settingValue: {
    fontSize: 16,
    paddingHorizontal: 10,
    minWidth: 30,
    textAlign: 'center',
  },
  closeButton: {
    backgroundColor: '#007AFF',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});