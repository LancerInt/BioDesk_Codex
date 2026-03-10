import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { getProductById } from '../db/database';

export default function ProductDetailScreen({ route }) {
  const { productId } = route.params;
  const [product, setProduct] = useState(null);

  useEffect(() => {
    setProduct(getProductById(productId));
  }, [productId]);

  if (!product) {
    return (
      <View style={styles.container}>
        <Text>Product not found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.meta}>SKU: {product.sku}</Text>
      <Text style={styles.meta}>Category: {product.category}</Text>
      <Text style={styles.heading}>Active Ingredient</Text>
      <Text style={styles.body}>{product.active_ingredient}</Text>
      <Text style={styles.heading}>Description</Text>
      <Text style={styles.body}>{product.description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  name: { fontSize: 26, fontWeight: '800', color: '#111827' },
  meta: { marginTop: 6, color: '#6b7280' },
  heading: { marginTop: 18, fontWeight: '700', fontSize: 16, color: '#111827' },
  body: { marginTop: 8, lineHeight: 21, color: '#374151' },
});
