import { Text, View, StyleSheet, TouchableOpacity, Modal } from "react-native";

interface ParametersProps {
  nbNote: number;
  intervalle: number;
  clefMode: 'treble' | 'bass' | 'random';
  onNbNoteChange: (value: number) => void;
  onIntervalleChange: (value: number) => void;
  onClefModeChange: (clefMode: 'treble' | 'bass' | 'random') => void;
  visible: boolean;
  onClose: () => void;
}

export default function Parameters({ nbNote, intervalle, clefMode, onNbNoteChange, onIntervalleChange, onClefModeChange, visible, onClose }: ParametersProps) {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.background}>
        <View style={styles.modal}>
          <Text style={styles.title}>Paramètres</Text>

          {/* Intervalle entre les notes */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Écart entre notes :</Text>
            <View style={styles.settingValueContainer}>
              <TouchableOpacity onPress={() => intervalle > 1 && onIntervalleChange(intervalle - 1)} style={[styles.button, intervalle <= 1 && styles.buttonDisabled]}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{intervalle}</Text>
              <TouchableOpacity onPress={() => intervalle < 10 && onIntervalleChange(intervalle + 1)} style={[styles.button, intervalle >= 10 && styles.buttonDisabled]}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Nombre de notes sur la portée */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Nombre de notes :</Text>
            <View style={styles.settingValueContainer}>
              <TouchableOpacity onPress={() => nbNote > 1 && onNbNoteChange(nbNote - 1)} style={[styles.button, nbNote <= 1 && styles.buttonDisabled]}>
                <Text>-</Text>
              </TouchableOpacity>
              <Text style={styles.settingValue}>{nbNote}</Text>
              <TouchableOpacity onPress={() => nbNote < 7 && onNbNoteChange(nbNote + 1)} style={[styles.button, nbNote >= 7 && styles.buttonDisabled]}>
                <Text>+</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Clef selection */}
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Clef :</Text>
            <View style={styles.clefContainer}>
              <TouchableOpacity
                onPress={() => onClefModeChange('treble')}
                style={[styles.clefButton, clefMode === 'treble' && styles.clefButtonActive]}
              >
                <Text>Sol</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onClefModeChange('bass')}
                style={[styles.clefButton, clefMode === 'bass' && styles.clefButtonActive]}
              >
                <Text>Fa</Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => onClefModeChange('random')}
                style={[styles.clefButton, clefMode === 'random' && styles.clefButtonActive]}
              >
                <Text>Aléatoire</Text>
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
    width: '90%',
    maxWidth: 500,
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
  buttonDisabled: {
    backgroundColor: '#bbb',
  },
  clefContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  clefButton: {
    backgroundColor: '#ddd',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  clefButtonActive: {
    backgroundColor: '#007AFF',
  },
});