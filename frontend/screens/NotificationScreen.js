import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import { Feather, MaterialIcons } from '@expo/vector-icons';

export default function NotificationScreen({ navigation }) {
  const [tab, setTab] = useState('received');

  const requests = [
    {
      id: '1',
      name: 'Female, 21yr old',
      blood: 'AB+',
      units: '0.5 Unit',
      city: 'rediyarpalayam, puducherry',
      distance: '3 Km',
      hospital: 'AGS Hospital, Moolakulam',
      time: '15/11/2023',
      status: 'pending',
    },
    {
      id: '2',
      name: 'Female, 21yr old',
      blood: 'AB+',
      units: '0.5 Unit',
      city: 'rediyarpalayam, puducherry',
      distance: '3 Km',
      hospital: 'AGS Hospital, Moolakulam',
      time: '15/11/2023',
      status: 'accepted',
    },
  ];

  const renderRequest = (item) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.bloodGroup}>{item.blood}</Text>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>{item.city}</Text>
          <Text style={styles.details}>{item.distance}</Text>
          <Text style={styles.details}>{item.hospital}</Text>
          <Text style={styles.time}>Time Limit: {item.time}</Text>
        </View>
        <Feather name="more-vertical" size={18} color="#333" />
      </View>

      {tab === 'received' ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatText}>💬 chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptText}>✓ Accept</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.statusRow}>
          {item.status === 'pending' ? (
            <>
              <Text style={styles.pending}>⏳ Request pending</Text>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>✕ Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.accepted}>✔ Request accepted</Text>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoText}>👤 donor info</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab('received')}>
          <Text style={[styles.tabText, tab === 'received' && styles.activeTab]}>Received Requests(6)</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab('my')}>
          <Text style={[styles.tabText, tab === 'my' && styles.activeTab]}>My Request(5)</Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ padding: 16 }}>
        {requests.map(renderRequest)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    backgroundColor: '#870D25',
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    color: 'white',
    fontSize: 14,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: '#ddd',
  },
  tabText: {
    fontSize: 14,
    paddingVertical: 10,
    color: '#999',
  },
  activeTab: {
    color: '#D2042D',
    borderBottomWidth: 2,
    borderColor: '#D2042D',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  bloodGroup: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#D2042D',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  details: {
    fontSize: 12,
    color: '#444',
  },
  time: {
    fontSize: 12,
    color: 'green',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  chatText: {
    color: '#555',
  },
  acceptButton: {
    backgroundColor: '#D2042D',
    padding: 8,
    borderRadius: 8,
    width: '48%',
    alignItems: 'center',
  },
  acceptText: {
    color: 'white',
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    alignItems: 'center',
  },
  pending: {
    color: '#F59E0B',
    fontWeight: '600',
    fontSize: 12,
  },
  cancelButton: {
    backgroundColor: '#ddd',
    padding: 8,
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 12,
  },
  accepted: {
    color: 'green',
    fontWeight: '600',
    fontSize: 12,
  },
  infoButton: {
    backgroundColor: '#eee',
    padding: 8,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 12,
  },
});