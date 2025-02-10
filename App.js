import React from 'react';
import { View, Text, TextInput, FlatList, Button, StyleSheet, Alert, useColorScheme, Image, TouchableOpacity } from 'react-native';

const products = [
  { id: '1', name: '🥛 Milk', price: 3.99, image: 'https://via.placeholder.com/100' },
  { id: '2', name: '🥚 Eggs', price: 4.99, image: 'https://via.placeholder.com/100' },
  { id: '3', name: '🖨️ Printing Service', price: 0.50, image: 'https://via.placeholder.com/100' },
  { id: '4', name: '🍞 Bread', price: 2.99, image: 'https://via.placeholder.com/100' },
];

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [search, setSearch] = React.useState('');
  const [cart, setCart] = React.useState([]);
  const [orderConfirmed, setOrderConfirmed] = React.useState(false);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const placeOrder = () => {
    if (cart.length === 0) {
      Alert.alert('Cart is empty!', 'Add some items before placing an order.');
      return;
    }
    setOrderConfirmed(true);
    Alert.alert('✅ Order Confirmed!', 'Your order is being processed.');
  };

  return (
    <View style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}> 
      <Text style={[styles.header, { color: isDarkMode ? '#fff' : '#000' }]}>🚀 Dash N Grab</Text>
      
      <TextInput
        placeholder='🔍 Search for products...'
        placeholderTextColor={isDarkMode ? '#aaa' : '#666'}
        value={search}
        onChangeText={setSearch}
        style={[styles.input, { color: isDarkMode ? '#fff' : '#000' }]}
      />
      
      <FlatList
        data={products.filter((p) => p.name.toLowerCase().includes(search.toLowerCase()))}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>
              <Text style={{ color: isDarkMode ? '#fff' : '#000' }}>{item.name} - ${item.price.toFixed(2)}</Text>
              <TouchableOpacity style={styles.addButton} onPress={() => addToCart(item)}>
                <Text style={styles.addText}>+ Add</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      
      <Text style={[styles.cart, { color: isDarkMode ? '#fff' : '#000' }]}>🛒 Cart: {cart.length} items</Text>
      <TouchableOpacity style={styles.orderButton} onPress={placeOrder}>
        <Text style={styles.orderText}>🚀 Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20, flex: 1 },
  header: { fontSize: 28, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginBottom: 10, borderRadius: 10 },
  item: { flexDirection: 'row', alignItems: 'center', padding: 10, borderBottomWidth: 1 },
  image: { width: 50, height: 50, marginRight: 10, borderRadius: 10 },
  info: { flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  addButton: { backgroundColor: '#007AFF', paddingVertical: 5, paddingHorizontal: 15, borderRadius: 5 },
  addText: { color: '#fff', fontWeight: 'bold' },
  cart: { marginTop: 20, fontSize: 18, fontWeight: 'bold' },
  orderButton: { backgroundColor: '#28A745', padding: 15, borderRadius: 10, alignItems: 'center', marginTop: 20 },
  orderText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
});

export default App;
