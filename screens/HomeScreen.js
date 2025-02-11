import React, { useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import ProductCard from '../components/ProductCard';

const products = [
  { id: '1', name: 'Milk', price: 3.99, image: 'https://example.com/milk.png' },
  { id: '2', name: 'Eggs', price: 4.99, image: 'https://example.com/eggs.png' },
];

export default function HomeScreen() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => setCart([...cart, product]);

  return (
    <View style={styles.container}>
      <FlatList
        data={products}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ProductCard product={item} addToCart={addToCart} />}
      />
      <Text style={styles.cartText}>Cart: {cart.length} items</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 10 },
  cartText: { color: '#fff', fontSize: 16, textAlign: 'center', marginTop: 10 },
});
