import { Pressable, StyleSheet, Text, View } from 'react-native';

export default function HomeCard({ title, subtitle, onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.card}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      <View style={styles.ctaWrap}>
        <Text style={styles.cta}>Open</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 138,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    margin: 6,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1f2937',
  },
  subtitle: {
    marginTop: 8,
    color: '#4b5563',
  },
  ctaWrap: {
    marginTop: 'auto',
  },
  cta: {
    marginTop: 12,
    color: '#2563eb',
    fontWeight: '700',
  },
});
