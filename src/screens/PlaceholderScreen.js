import { StyleSheet, Text, View } from 'react-native';

export default function PlaceholderScreen({ title, message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f9fafb',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
  },
  message: {
    marginTop: 10,
    textAlign: 'center',
    color: '#374151',
    lineHeight: 22,
  },
});
