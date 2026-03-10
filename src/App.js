import { useEffect, useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { initializeDatabase, importSeedData } from './db/database';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    try {
      initializeDatabase();
      importSeedData();
      setIsReady(true);
    } catch (initError) {
      setError(initError?.message ?? 'Failed to initialize local database.');
    }
  }, []);

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorTitle}>BioDesk failed to load</Text>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!isReady) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#2563eb" />
        <Text style={styles.loadingText}>Preparing local data…</Text>
      </View>
    );
  }

  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 12,
    color: '#374151',
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#991b1b',
  },
  errorText: {
    marginTop: 10,
    textAlign: 'center',
    color: '#7f1d1d',
  },
});
