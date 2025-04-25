// ChecklistCard.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

const checklistItems = [
  { icon: 'moon', text: 'Get plenty of sleep' },
  { icon: 'coffee', text: 'Eat iron-rich foods' },
  { icon: 'droplet', text: 'Drink extra water' },
  { icon: 'credit-card', text: 'Bring ID to donation center' },
];

export default function ChecklistCard() {
  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Feather name="check-square" size={18} color="#870D25" />
        <Text style={styles.cardTitle}>Preparation Checklist</Text>
      </View>

      {checklistItems.map((item, index) => (
        <View style={styles.itemRow} key={index}>
          <View style={styles.iconCircle}>
            <Feather name={item.icon} size={16} color="#fff" />
          </View>
          <Text style={styles.itemText}>{item.text}</Text>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    marginHorizontal: 15,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
    color: '#333',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#870D25',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemText: {
    fontSize: 14,
    color: '#333',
  },
});
