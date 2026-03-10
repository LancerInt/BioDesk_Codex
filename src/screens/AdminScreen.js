import { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { adminPin } from '../data/seedData';
import { getLeadsCount, importSeedData } from '../db/database';

export default function AdminScreen() {
  const [pin, setPin] = useState('');
  const [authorized, setAuthorized] = useState(false);

  const unlock = () => {
    if (pin === adminPin) {
      setAuthorized(true);
      setPin('');
      return;
    }
    Alert.alert('Access denied', 'Invalid PIN.');
  };

  const seed = () => {
    importSeedData();
    Alert.alert('Success', 'Seed data imported into local SQLite DB.');
  };

  if (!authorized) {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Admin Access</Text>
        <Text style={styles.help}>Enter Admin PIN to access protected actions.</Text>
        <TextInput
          style={styles.pinInput}
          value={pin}
          onChangeText={setPin}
          keyboardType="number-pad"
          secureTextEntry
          placeholder="PIN"
        />
        <TouchableOpacity style={styles.primaryButton} onPress={unlock}>
          <Text style={styles.primaryText}>Unlock</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Admin Utilities</Text>
      <TouchableOpacity style={styles.primaryButton} onPress={seed}>
        <Text style={styles.primaryText}>Import/Refresh Seed Product Data</Text>
      </TouchableOpacity>
      <Text style={styles.metric}>Leads stored locally: {getLeadsCount()}</Text>
      <Text style={styles.help}>Protected actions are local-only and do not require backend/auth.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  heading: { fontSize: 24, fontWeight: '800', color: '#111827' },
  help: { marginTop: 10, color: '#4b5563' },
  pinInput: {
    marginTop: 14,
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  primaryButton: {
    marginTop: 14,
    backgroundColor: '#111827',
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },
  primaryText: { color: '#fff', fontWeight: '700' },
  metric: { marginTop: 20, fontSize: 16, color: '#1f2937' },
});
