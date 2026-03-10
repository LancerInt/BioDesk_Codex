import { useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { initializeDatabase, importSeedData } from './db/database';
import AppNavigator from './navigation/AppNavigator';

export default function App() {
  useEffect(() => {
    initializeDatabase();
    importSeedData();
  }, []);

  return (
    <>
      <StatusBar style="dark" />
      <AppNavigator />
    </>
  );
}
