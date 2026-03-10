import { FlatList, StyleSheet, Text, View } from 'react-native';
import HomeCard from '../components/HomeCard';

const modules = [
  { key: 'Products', subtitle: 'Product list, details, and FTS search', route: 'Products' },
  { key: 'Lead Capture', subtitle: 'Capture doctor/hospital lead data locally', route: 'LeadCapture' },
  { key: 'Documents', subtitle: 'Placeholder module for PDFs and detail aids', route: 'Documents' },
  { key: 'Videos', subtitle: 'Placeholder module for patient and HCP videos', route: 'Videos' },
  { key: 'Admin', subtitle: 'PIN-protected actions and utilities', route: 'Admin' },
];

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>BioDesk</Text>
      <Text style={styles.subheading}>Medical rep utility app (offline-first)</Text>
      <FlatList
        data={modules}
        keyExtractor={(item) => item.key}
        numColumns={2}
        contentContainerStyle={styles.grid}
        renderItem={({ item }) => (
          <HomeCard
            title={item.key}
            subtitle={item.subtitle}
            onPress={() => navigation.navigate(item.route)}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: '#f3f4f6',
  },
  heading: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    paddingHorizontal: 16,
  },
  subheading: {
    color: '#374151',
    paddingHorizontal: 16,
    marginTop: 6,
    marginBottom: 10,
  },
  grid: {
    paddingHorizontal: 10,
    paddingBottom: 24,
  },
});
