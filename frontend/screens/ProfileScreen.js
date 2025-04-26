import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Modal,
  ScrollView,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [activeModal, setActiveModal] = useState(null);

  const user = {
    name: 'Sabrina Aryan',
    email: 'SabrinaAry208@gmail.com',
    donationsCount: 3,
    bloodType: 'A+',
  };

  // Sample donation history data
  const donationHistory = [
    { 
      id: 'DON001', 
      type: 'donation', 
      date: '2024-03-15', 
      hospital: 'City Medical Center',
      amount: '450ml',
      recipient: 'Emergency Blood Bank'
    },
    { 
      id: 'DON002', 
      type: 'donation', 
      date: '2023-12-10', 
      hospital: 'Community Hospital',
      amount: '450ml',
      recipient: 'John Doe (Patient)'
    },
    { 
      id: 'DON003', 
      type: 'donation', 
      date: '2023-09-05', 
      hospital: 'Regional Medical Center',
      amount: '450ml',
      recipient: 'Blood Drive Campaign'
    },
  ];

  // Sample received donations (for recipients)
  const receivedDonations = [
    { 
      id: 'REC001', 
      type: 'received', 
      date: '2022-07-20', 
      hospital: 'University Hospital',
      amount: '300ml',
      donor: 'Anonymous'
    },
    { 
      id: 'REC002', 
      type: 'received', 
      date: '2022-07-19', 
      hospital: 'University Hospital',
      amount: '300ml',
      donor: 'Anonymous'
    },
  ];

  // All blood transactions combined and sorted by date
  const bloodTransactions = [...donationHistory, ...receivedDonations].sort((a, b) => 
    new Date(b.date) - new Date(a.date)
  );

  const handleLogout = () => {
    Alert.alert('Log Out', 'Are you sure you want to log out?', [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Log Out',
        onPress: () => console.log('User logged out'),
        style: 'destructive',
      },
    ]);
  };

  const openModal = (modalType) => {
    setActiveModal(modalType);
    setModalVisible(true);
  };

  // Download consolidated donations receipt
  const downloadDonationsGivenReceipt = async () => {
    try {
      // Calculate total donation amount
      const totalDonated = donationHistory.reduce((total, donation) => {
        // Extract numeric value from the amount string
        const amountInMl = parseInt(donation.amount.replace(/\D/g, ''));
        return total + amountInMl;
      }, 0);
      
      // Create header for the receipt
      let receiptContent = 
        `LifeFlow - BLOOD DONATIONS GIVEN RECEIPT\n` +
        `=======================================\n` +
        `Donor: ${user.name}\n` +
        `Blood Type: ${user.bloodType}\n` +
        `Email: ${user.email}\n` +
        `Total Donations: ${donationHistory.length}\n` +
        `Total Volume Donated: ${totalDonated}ml\n\n` +
        `DONATION DETAILS:\n` +
        `=======================================\n\n`;
      
      // Add each donation to the receipt
      donationHistory.forEach((donation, index) => {
        receiptContent += 
          `Donation #${index + 1}\n` +
          `ID: ${donation.id}\n` +
          `Date: ${donation.date}\n` +
          `Hospital: ${donation.hospital}\n` +
          `Amount: ${donation.amount}\n` +
          `Recipient: ${donation.recipient}\n\n`;
      });
      
      // Add footer
      receiptContent += 
        `=======================================\n` +
        `Thank you for your generous blood donations!\n` +
        `Your contribution helps save lives.\n` +
        `Generated on: ${new Date().toLocaleDateString()}\n` +
        `LifeFlow Blood Donation Service`;
      
      // Create a temporary file path
      const fileUri = `${FileSystem.documentDirectory}donations-given-receipt.txt`;
      
      // Write the receipt content to the file
      await FileSystem.writeAsStringAsync(fileUri, receiptContent);
      
      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert(
          'Sharing not available',
          'Sharing is not available on your device'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download receipt: ' + error.message);
    }
  };

  // Download consolidated received donations receipt
  const downloadDonationsReceivedReceipt = async () => {
    try {
      // Calculate total received amount
      const totalReceived = receivedDonations.reduce((total, donation) => {
        // Extract numeric value from the amount string
        const amountInMl = parseInt(donation.amount.replace(/\D/g, ''));
        return total + amountInMl;
      }, 0);
      
      // Create header for the receipt
      let receiptContent = 
        `LifeFlow - BLOOD DONATIONS RECEIVED RECEIPT\n` +
        `==========================================\n` +
        `Recipient: ${user.name}\n` +
        `Blood Type: ${user.bloodType}\n` +
        `Email: ${user.email}\n` +
        `Total Transfusions: ${receivedDonations.length}\n` +
        `Total Volume Received: ${totalReceived}ml\n\n` +
        `TRANSFUSION DETAILS:\n` +
        `==========================================\n\n`;
      
      // Add each received donation to the receipt
      receivedDonations.forEach((donation, index) => {
        receiptContent += 
          `Transfusion #${index + 1}\n` +
          `ID: ${donation.id}\n` +
          `Date: ${donation.date}\n` +
          `Hospital: ${donation.hospital}\n` +
          `Amount: ${donation.amount}\n` +
          `Donor: ${donation.donor}\n\n`;
      });
      
      // Add footer
      receiptContent += 
        `==========================================\n` +
        `We hope your recovery is going well.\n` +
        `LifeFlow connects donors with those in need.\n` +
        `Generated on: ${new Date().toLocaleDateString()}\n` +
        `LifeFlow Blood Donation Service`;
      
      // Create a temporary file path
      const fileUri = `${FileSystem.documentDirectory}donations-received-receipt.txt`;
      
      // Write the receipt content to the file
      await FileSystem.writeAsStringAsync(fileUri, receiptContent);
      
      // Share the file
      if (await Sharing.isAvailableAsync()) {
        await Sharing.shareAsync(fileUri);
      } else {
        Alert.alert(
          'Sharing not available',
          'Sharing is not available on your device'
        );
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to download receipt: ' + error.message);
    }
  };

  // Generate monthly data for the chart
  const generateChartData = () => {
    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    
    // Initialize data with zeros
    const data = months.map(month => ({
      month,
      donated: 0,
      received: 0,
    }));
    
    // Fill in the actual data
    bloodTransactions.forEach(transaction => {
      const transactionDate = new Date(transaction.date);
      const transactionYear = transactionDate.getFullYear();
      
      // Only count transactions from the current year
      if (transactionYear === currentYear) {
        const monthIndex = transactionDate.getMonth();
        
        if (transaction.type === 'donation') {
          data[monthIndex].donated += 1;
        } else {
          data[monthIndex].received += 1;
        }
      }
    });
    
    return data;
  };

  const chartData = generateChartData();

  const renderModalContent = () => {
    switch (activeModal) {
      case 'guidelines':
        return (
          <>
            <Text style={styles.modalTitle}>Donor & Recipient Guidelines</Text>
            <Text style={styles.modalText}>
              <Text style={styles.boldText}>For Donors:</Text>{'\n'}
              • Must be 18–65 years old, in good health, and weigh at least 50kg{'\n'}
              • Avoid donating on an empty stomach{'\n'}
              • Wait 3 months between donations{'\n'}
              • Avoid donation if you have flu, recent surgery, or infections{'\n'}
              • Stay hydrated before and after donation{'\n\n'}
              <Text style={styles.boldText}>For Recipients:</Text>{'\n'}
              • Must match blood group compatibility{'\n'}
              • Must pass cross-match test{'\n'}
              • Medical assessment required before transfusion{'\n'}
              • Regular follow-ups may be needed{'\n'}
              • Report any adverse reactions immediately
            </Text>
          </>
        );
      case 'about':
        return (
          <>
            <Text style={styles.modalTitle}>About Us</Text>
            <Text style={styles.modalText}>
              LifeFlow is dedicated to connecting blood donors with those in need. Founded in 2022, our mission is to ensure that no patient goes without the life-saving blood they require.
              {'\n\n'}
              Our platform facilitates quick and efficient blood donation matching, helping hospitals and patients during critical situations. Through technology and community engagement, we aim to increase blood donation rates and save lives.
              {'\n\n'}
              Join us in our mission to make blood donation accessible, efficient, and impactful.
            </Text>
          </>
        );
      case 'history':
        return (
          <>
            <Text style={styles.modalTitle}>Blood Donation History</Text>
            
            {/* Blood donation visualization */}
            <View style={styles.chartContainer}>
              <Text style={styles.chartTitle}>Your Blood Activity (2024)</Text>
              <View style={styles.chartLegend}>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#D2042D' }]} />
                  <Text style={styles.legendText}>Donated</Text>
                </View>
                <View style={styles.legendItem}>
                  <View style={[styles.legendColor, { backgroundColor: '#5DA9E9' }]} />
                  <Text style={styles.legendText}>Received</Text>
                </View>
              </View>
              
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                <View style={styles.chart}>
                  {chartData.map((data, index) => (
                    <View key={index} style={styles.chartBarGroup}>
                      <View style={styles.chartBars}>
                        {data.donated > 0 && (
                          <View 
                            style={[
                              styles.chartBar, 
                              { 
                                height: 20 * data.donated, 
                                backgroundColor: '#D2042D' 
                              }
                            ]} 
                          />
                        )}
                        {data.received > 0 && (
                          <View 
                            style={[
                              styles.chartBar, 
                              { 
                                height: 20 * data.received, 
                                backgroundColor: '#5DA9E9',
                                marginLeft: data.donated > 0 ? 4 : 0
                              }
                            ]} 
                          />
                        )}
                      </View>
                      <Text style={styles.chartLabel}>{data.month}</Text>
                    </View>
                  ))}
                </View>
              </ScrollView>
            </View>
            
            {/* Transaction history section */}
            <Text style={styles.historyTitle}>Transaction History</Text>
            
            {/* Two download buttons for consolidated receipts */}
            <View style={styles.receiptButtonsContainer}>
              <TouchableOpacity 
                style={[styles.receiptButton, { backgroundColor: '#D2042D' }]}
                onPress={downloadDonationsGivenReceipt}
              >
                <Feather name="download" size={16} color="#fff" />
                <Text style={styles.receiptButtonText}>Download Donations Given Receipt</Text>
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.receiptButton, { backgroundColor: '#5DA9E9', marginTop: 12 }]}
                onPress={downloadDonationsReceivedReceipt}
              >
                <Feather name="download" size={16} color="#fff" />
                <Text style={styles.receiptButtonText}>Download Donations Received Receipt</Text>
              </TouchableOpacity>
            </View>
            
            {/* Donation History List */}
            <View style={styles.historySection}>
              <Text style={styles.historySubtitle}>Donations Given ({donationHistory.length})</Text>
              
              {donationHistory.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyHeader}>
                    <View style={styles.historyTitleContainer}>
                      <View style={[styles.historyTypeIndicator, { backgroundColor: '#D2042D' }]} />
                      <Text style={styles.historyItemTitle}>Donated Blood</Text>
                    </View>
                    <Text style={styles.historyDate}>{item.date}</Text>
                  </View>
                  
                  <View style={styles.historyDetails}>
                    <Text style={styles.historyDetailText}>ID: {item.id}</Text>
                    <Text style={styles.historyDetailText}>Hospital: {item.hospital}</Text>
                    <Text style={styles.historyDetailText}>Amount: {item.amount}</Text>
                    <Text style={styles.historyDetailText}>Recipient: {item.recipient}</Text>
                  </View>
                </View>
              ))}
            </View>
            
            {/* Received Donations List */}
            <View style={styles.historySection}>
              <Text style={styles.historySubtitle}>Donations Received ({receivedDonations.length})</Text>
              
              {receivedDonations.map((item, index) => (
                <View key={index} style={styles.historyItem}>
                  <View style={styles.historyHeader}>
                    <View style={styles.historyTitleContainer}>
                      <View style={[styles.historyTypeIndicator, { backgroundColor: '#5DA9E9' }]} />
                      <Text style={styles.historyItemTitle}>Received Blood</Text>
                    </View>
                    <Text style={styles.historyDate}>{item.date}</Text>
                  </View>
                  
                  <View style={styles.historyDetails}>
                    <Text style={styles.historyDetailText}>ID: {item.id}</Text>
                    <Text style={styles.historyDetailText}>Hospital: {item.hospital}</Text>
                    <Text style={styles.historyDetailText}>Amount: {item.amount}</Text>
                    <Text style={styles.historyDetailText}>Donor: {item.donor}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        );
      default:
        return null;
    }
  };

  const options = [
    {
      icon: 'award',
      text: 'Leaderboard',
      onPress: () => navigation.navigate('leadBoard'),
    },
    {
      icon: 'file-text',
      text: 'Donation & Recipient History',
      onPress: () => openModal('history'),
    },
    {
      icon: 'book-open',
      text: 'Donor & Recipient Guidelines',
      onPress: () => openModal('guidelines'),
    },
    {
      icon: 'info',
      text: 'About Us',
      onPress: () => openModal('about'),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.profileSection}>
          <View style={styles.profileImage}>
            <Feather name="user" size={40} color="#fff" />
          </View>
          <Text style={styles.name}>{user.name}</Text>
          <Text style={styles.email}>{user.email}</Text>

          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.donationsCount}</Text>
              <Text style={styles.statLabel}>Donations</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>{user.bloodType}</Text>
              <Text style={styles.statLabel}>Blood Type</Text>
            </View>
          </View>
        </View>

        <View style={styles.optionList}>
          {options.map((item, index) => (
            <Pressable
              key={index}
              style={({ pressed }) => [
                styles.optionRow,
                pressed && styles.optionPressed,
              ]}
              onPress={item.onPress}
            >
              <View style={styles.iconContainer}>
                <Feather name={item.icon} size={18} color="#fff" />
              </View>
              <Text style={styles.optionText}>{item.text}</Text>
              <Feather name="chevron-right" size={18} color="#999" />
            </Pressable>
          ))}
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.logoutButton,
            pressed && styles.logoutPressed,
          ]}
          onPress={handleLogout}
        >
          <Feather name="log-out" size={18} color="#fff" />
          <Text style={styles.logoutText}>Log Out</Text>
        </Pressable>
      </ScrollView>

      {/* Bottom Tab Bar (fixed outside the scroll) */}
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

      {/* Modal */}
      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.centeredBackdrop}>
          <Pressable
            style={styles.backdropTouchable}
            onPress={() => setModalVisible(false)}
          />
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={styles.modalScrollContent}>
              {renderModalContent()}
              <Pressable
                style={styles.closeButton}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.closeButtonText}>Close</Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F5' },
  profileSection: {
    alignItems: 'center',
    paddingVertical: 30,
    backgroundColor: '#fff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#870D25',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  name: { fontSize: 20, fontWeight: 'bold', color: '#111' },
  email: { fontSize: 14, color: '#666', marginBottom: 10 },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 10,
  },
  statItem: { alignItems: 'center', flex: 1 },
  statValue: { fontSize: 18, fontWeight: 'bold', color: '#870D25' },
  statLabel: { fontSize: 12, color: '#666', marginTop: 4 },
  statDivider: { width: 1, backgroundColor: '#DDD', marginHorizontal: 15 },
  optionList: { paddingHorizontal: 20, paddingTop: 20 },
  optionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
  },
  optionPressed: { backgroundColor: '#f0f0f0' },
  iconContainer: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#870D25',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  optionText: { flex: 1, fontSize: 16, color: '#333', fontWeight: '500' },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E63946',
    paddingVertical: 16,
    borderRadius: 12,
    margin: 20,
  },
  logoutPressed: { opacity: 0.8 },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    marginLeft: 8,
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
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 12, marginTop: 4, color: '#111' },
  centeredBackdrop: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdropTouchable: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 20,
    maxHeight: '80%',
    elevation: 5,
  },
  modalScrollContent: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#870D25',
    marginBottom: 16,
  },
  modalText: {
    fontSize: 15,
    color: '#333',
    lineHeight: 24,
  },
  boldText: { fontWeight: 'bold', color: '#222' },
  closeButton: {
    backgroundColor: '#870D25',
    padding: 14,
    borderRadius: 12,
    marginTop: 24,
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
  },
  // History styles
  historyTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 24,
    marginBottom: 16,
    color: '#333',
  },
  historySection: {
    marginTop: 16,
  },
  historySubtitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#444',
    marginBottom: 12,
  },
  historyItem: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
  },
  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  historyTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyTypeIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  historyItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#222',
  },
  historyDate: {
    fontSize: 14,
    color: '#666',
  },
  historyDetails: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
  },
  historyDetailText: {
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  // Receipt button styles
  receiptButtonsContainer: {
    marginTop: 8,
    marginBottom: 16,
  },
  receiptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    borderRadius: 12,
  },
  receiptButtonText: {
    color: '#fff',
    fontWeight: '500',
    fontSize: 16,
    marginLeft: 8,
  },
  // Chart styles
  chartContainer: {
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    padding: 16,
    marginTop: 8,
    marginBottom: 16,
  },
  chartTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
    textAlign: 'center',
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  legendColor: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 4,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
  chart: {
    flexDirection: 'row',
    height: 120,
    alignItems: 'flex-end',
    paddingHorizontal: 10,
    paddingBottom: 20,
  },
  chartBarGroup: {
    width: 40,
    marginHorizontal: 8,
    alignItems: 'center',
  },
  chartBars: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  chartBar: {
    width: 12,
    borderRadius: 4,
  },
  chartLabel: {
    fontSize: 10,
    color: '#666',
    marginTop: 6,
  },
});