import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, FlatList } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function BlacklistManager() {
  const [blacklist, setBlacklist] = useState(['Spam Bot 2345', 'Fake Account']);
  const [input, setInput] = useState('');
  const [error, setError] = useState('');

  const handleAdd = () => {
    if (!input.trim()) {
      setError('Please enter a name to blacklist');
      return;
    }
    
    // Check for duplicates
    if (blacklist.includes(input.trim())) {
      setError('This name is already in your blacklist');
      return;
    }
    
    setBlacklist([...blacklist, input.trim()]);
    setInput('');
    setError('');
  };

  const handleRemove = (name) => {
    Alert.alert(
      "Remove from Blacklist",
      `Are you sure you want to remove "${name}" from your blacklist?`,
      [
        { text: "Cancel", style: "cancel" },
        { 
          text: "Remove", 
          onPress: () => setBlacklist(blacklist.filter(user => user !== name)),
          style: "destructive"
        }
      ]
    );
  };

  const renderEmptyList = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>Your blacklist is empty</Text>
      <Text style={styles.emptySubtext}>Names you add will appear here</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>Manage Blacklist</Text>
        
        <View style={styles.inputRow}>
          <TextInput
            style={styles.input}
            value={input}
            onChangeText={(text) => {
              setInput(text);
              setError('');
            }}
            placeholder="Enter name to blacklist"
            placeholderTextColor="#999"
          />
          <TouchableOpacity style={styles.addBtn} onPress={handleAdd}>
            <AntDesign name="pluscircle" size={46} color="#870D25" />
          </TouchableOpacity>
        </View>
        
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
        
        {blacklist.length > 0 ? (
          <FlatList
            data={blacklist}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View style={styles.blacklistItem}>
                <Text style={styles.user}>{item}</Text>
                <TouchableOpacity onPress={() => handleRemove(item)}>
                  <AntDesign name="closecircle" size={24} color="#870D25" />
                </TouchableOpacity>
              </View>
            )}
            style={styles.list}
          />
        ) : (
          renderEmptyList()
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  card: { 
    backgroundColor: 'white', 
    padding: 20, 
    borderRadius: 20, 
    marginBottom: 20, 
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  title: { 
    fontSize: 22, 
    fontWeight: 'bold', 
    marginBottom: 16, 
    color: '#870D25' 
  },
  inputRow: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginBottom: 12 
  },
  input: { 
    flex: 1, 
    borderWidth: 1, 
    borderColor: '#ddd', 
    borderRadius: 10, 
    padding: 12,
    fontSize: 16,
    marginRight: 10 
  },
  addBtn: {
    padding: 4,
  },
  list: {
    maxHeight: 300,
  },
  blacklistItem: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  user: { 
    fontSize: 16, 
    color: '#333',
    flex: 1,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
    fontSize: 14,
  },
  emptyContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    fontWeight: 'bold',
  },
  emptySubtext: {
    fontSize: 14,
    color: '#999',
    marginTop: 4,
  }
});