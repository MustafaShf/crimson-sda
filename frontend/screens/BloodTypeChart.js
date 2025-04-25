import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // modern minimal icon

export default function BloodCompatibilityCard() {
  const data = [
    { type: 'A+', donate: 'A+, AB+', receive: 'A+, A-, O+, O-' },
    { type: 'O+', donate: 'O+, A+, B+, AB+', receive: 'O+, O-' },
    { type: 'B+', donate: 'B+, AB+', receive: 'B+, B-, O+, O-' },
    { type: 'AB+', donate: 'AB+', receive: 'All Types' },
    { type: 'A-', donate: 'A+, A-, AB+, AB-', receive: 'A-, O-' },
    { type: 'O-', donate: 'Everyone', receive: 'O-' },
  ];

  return (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Feather name="droplet" size={18} color="#D2042D" />
        <Text style={styles.title}>Blood Compatibility</Text>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={[styles.cell, styles.col1, styles.headerText]}>Type</Text>
          <Text style={[styles.cell, styles.col2, styles.headerText]}>Can Donate To</Text>
          <Text style={[styles.cell, styles.col3, styles.headerText]}>Can Receive From</Text>
        </View>

        {data.map((row, index) => (
          <View key={index} style={[styles.tableRow, index % 2 !== 0 && styles.stripedRow]}>
            <Text style={[styles.cell, styles.col1, styles.typeText]}>{row.type}</Text>
            <Text style={[styles.cell, styles.col2]}>{row.donate}</Text>
            <Text style={[styles.cell, styles.col3]}>{row.receive}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 16,
    marginTop: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 2 },
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#D2042D',
    marginLeft: 8,
  },
  table: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  tableHeader: {
    flexDirection: 'row',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#FAFAFA',
  },
  tableRow: {
    flexDirection: 'row',
    paddingVertical: 10,
    alignItems: 'center',
  },
  stripedRow: {
    backgroundColor: '#FFF6F6',
  },
  cell: {
    fontSize: 13,
    color: '#333',
    paddingHorizontal: 4,
  },
  headerText: {
    fontWeight: '600',
    color: '#444',
  },
  typeText: {
    fontWeight: '700',
    color: '#D2042D',
  },
  col1: { flex: 1.2 },
  col2: { flex: 2.5 },
  col3: { flex: 2.8 },
});
