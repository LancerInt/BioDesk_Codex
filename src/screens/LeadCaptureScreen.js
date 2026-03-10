import { useState } from 'react';
import { Alert, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { saveLead } from '../db/database';

const defaultForm = {
  fullName: '',
  clinicName: '',
  phone: '',
  email: '',
  interest: '',
};

export default function LeadCaptureScreen() {
  const [form, setForm] = useState(defaultForm);

  const update = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const submit = () => {
    if (!form.fullName || !form.clinicName) {
      Alert.alert('Missing required fields', 'Please fill full name and clinic name.');
      return;
    }
    saveLead(form);
    setForm(defaultForm);
    Alert.alert('Saved', 'Lead stored locally on this device.');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Lead Capture</Text>
      <TextInput placeholder="Full Name *" value={form.fullName} onChangeText={(v) => update('fullName', v)} style={styles.input} />
      <TextInput placeholder="Clinic/Hospital *" value={form.clinicName} onChangeText={(v) => update('clinicName', v)} style={styles.input} />
      <TextInput placeholder="Phone" keyboardType="phone-pad" value={form.phone} onChangeText={(v) => update('phone', v)} style={styles.input} />
      <TextInput placeholder="Email" keyboardType="email-address" value={form.email} onChangeText={(v) => update('email', v)} style={styles.input} />
      <TextInput placeholder="Product Interest" value={form.interest} onChangeText={(v) => update('interest', v)} style={styles.input} multiline />
      <TouchableOpacity onPress={submit} style={styles.button}>
        <Text style={styles.buttonLabel}>Save Lead</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#fff', flexGrow: 1 },
  heading: { fontSize: 24, fontWeight: '800', marginBottom: 12, color: '#111827' },
  input: {
    borderWidth: 1,
    borderColor: '#d1d5db',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 10,
    backgroundColor: '#f9fafb',
  },
  button: {
    marginTop: 8,
    backgroundColor: '#2563eb',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonLabel: { color: '#fff', fontWeight: '700' },
});
