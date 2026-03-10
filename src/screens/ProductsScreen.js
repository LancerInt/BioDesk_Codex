import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { databaseSupportsFts, getProducts, searchProducts } from '../db/database';

export default function ProductsScreen({ navigation }) {
  const [query, setQuery] = useState('');
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(getProducts());
  }, []);

  const onSearch = (value) => {
    setQuery(value);
    setProducts(searchProducts(value));
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search name or active ingredient"
        value={query}
        onChangeText={onSearch}
        style={styles.searchInput}
      />
      {!databaseSupportsFts() ? (
        <Text style={styles.infoText}>FTS not available on this device; using fallback text search.</Text>
      ) : null}
      <FlatList
        data={products}
        keyExtractor={(item) => String(item.id)}
        ListEmptyComponent={<Text style={styles.emptyText}>No products found.</Text>}
        renderItem={({ item }) => (
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate('ProductDetail', { productId: item.id })}
          >
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.meta}>Active: {item.active_ingredient}</Text>
            <Text style={styles.meta}>{item.category}</Text>
          </Pressable>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
    padding: 14,
  },
  searchInput: {
    borderColor: '#d1d5db',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 14,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e5e7eb',
  },
  title: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111827',
  },
  meta: {
    marginTop: 4,
    color: '#4b5563',
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    color: '#6b7280',
  },
  infoText: {
    marginBottom: 10,
    color: '#92400e',
  },
});
