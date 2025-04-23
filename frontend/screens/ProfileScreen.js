import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal, Pressable, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      {/* Profile Header */}
      <View style={styles.profileSection}>
        <Feather name="user" size={48} color="#000" />
        <Text style={styles.name}>Sabrina Aryan</Text>
        <Text style={styles.email}>SabrinaAry208@gmail.com</Text>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>

      {/* Option List */}
      <View style={styles.optionList}>
      <TouchableOpacity
  style={styles.optionRow}
  onPress={() => navigation.navigate('leadBoard')} // ✅ Add navigation handler
>
  <Feather name="heart" size={20} color="#000" />
  <Text style={styles.optionText}>LeadBoard</Text>
  <Feather name="chevron-right" size={18} color="#000" style={styles.arrow} />
</TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Feather name="download" size={20} color="#000" />
          <Text style={styles.optionText}>Download Receipt</Text>
          <Feather name="chevron-right" size={18} color="#000" style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow} onPress={() => setModalVisible(true)}>
          <Feather name="book-open" size={20} color="#000" />
          <Text style={styles.optionText}>Donor & Recipient Guidelines</Text>
          <Feather name="chevron-right" size={18} color="#000" style={styles.arrow} />
        </TouchableOpacity>

        <TouchableOpacity style={styles.optionRow}>
          <Feather name="info" size={20} color="#000" />
          <Text style={styles.optionText}>About Us</Text>
          <Feather name="chevron-right" size={18} color="#000" style={styles.arrow} />
        </TouchableOpacity>
      </View>

      {/* Guidelines Modal */}
      <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={() => setModalVisible(false)}>
        <View style={styles.centeredBackdrop}>
          <View style={styles.modalContentScrollable}>
            <ScrollView style={styles.modalScrollView}>
              <Text style={styles.modalTitle}>Donor & Recipient Guidelines</Text>
              <Text style={styles.modalText}>
                🩸 Donors must be 18–65 years old, in good health, and weigh at least 50kg.
                {'\n\n'}
                ✅ Avoid donating on an empty stomach.
                {'\n\n'}
                🕒 Wait 3 months between donations.
                {'\n\n'}
                🚫 Avoid if you have flu, recent surgery, or infections.
                {'\n\n'}
                👤 Recipients must match blood group & pass cross-match test.
                {'\n\n'}
                📋 More guidelines can be added here as needed...
              </Text>
              <Pressable style={styles.closeButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.closeButtonText}>Got it</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Logout Row */}
      <TouchableOpacity style={[styles.optionRow, styles.logoutRow]}>
        <Feather name="log-out" size={20} color="#000" />
        <Text style={styles.optionText}>Log Out</Text>
        <Feather name="chevron-right" size={18} color="#000" style={styles.arrow} />
      </TouchableOpacity>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Feather name="home" size={22} color="#111" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FindDonor')}>
          <Feather name="search" size={22} color="#111" />
          <Text style={styles.tabText}>Find Donor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Request')}>
          <Feather name="droplet" size={22} color="#111" />
          <Text style={styles.tabText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Feather name="user" size={22} color="#D2042D" />
          <Text style={[styles.tabText, { color: '#D2042D' }]}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
    justifyContent: 'space-between',
  },
  profileSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  email: {
    fontSize: 14,
    color: '#444',
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: '#007BFF',
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  optionList: {
    marginVertical: 30,
    paddingHorizontal: 20,
  },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 0.5,
    borderColor: '#aaa',
  },
  optionText: {
    flex: 1,
    fontSize: 16,
    marginLeft: 10,
  },
  arrow: {
    marginLeft: 'auto',
  },
  logoutRow: {
    marginTop: 20,
    borderTopWidth: 0.5,
    borderColor: '#aaa',
    paddingHorizontal: 20,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
  },
  tabItem: {
    alignItems: 'center',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#111',
  },
  centeredBackdrop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 20,
  },
  modalContentScrollable: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
    width: '100%',
    elevation: 10,
  },
  modalScrollView: {
    width: '100%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#870D25',
  },
  modalText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 22,
  },
  closeButton: {
    marginTop: 20,
    backgroundColor: '#870D25',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});
