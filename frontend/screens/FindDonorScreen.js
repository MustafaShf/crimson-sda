import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TextInput,
  TouchableOpacity, 
  FlatList,
  SafeAreaView,
  StatusBar,
  Modal,
  ActivityIndicator
} from 'react-native';
import { Feather, Ionicons, MaterialIcons, FontAwesome5, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';

const BloodGroupSelector = ({ selectedBloodGroup, setSelectedBloodGroup, visible, onClose }) => {
  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Blood Group</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color="#333" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.bloodGroupGrid}>
            {bloodGroups.map((group) => (
              <TouchableOpacity
                key={group}
                style={[
                  styles.bloodGroupItem,
                  selectedBloodGroup === group && styles.selectedBloodGroup
                ]}
                onPress={() => {
                  setSelectedBloodGroup(group);
                  onClose();
                }}
              >
                <Text 
                  style={[
                    styles.bloodGroupItemText,
                    selectedBloodGroup === group && styles.selectedBloodGroupText
                  ]}
                >
                  {group}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const DonorCard = ({ donor, onCallPress, onRequestPress, onSharePress }) => {
  return (
    <View style={styles.donorCard}>
      <View style={styles.donorHeader}>
        <View style={styles.bloodGroupContainer}>
          <FontAwesome5 name="tint" size={18} color="#870D25" style={styles.dropIcon} />
          <Text style={styles.bloodGroup}>
            {donor.bloodGroup}
            {donor.bloodGroup.includes('+') ? null : 
             donor.bloodGroup.includes('-') ? null : 
             <Text style={styles.superscript}>+</Text>}
          </Text>
        </View>
        <View style={styles.donorInfo}>
          <Text style={styles.donorGenderAge}>{donor.gender}, {donor.age}yr old</Text>
          <TouchableOpacity style={styles.callButton} onPress={() => onCallPress(donor)}>
            <FontAwesome name="phone" size={18} color="#870D25" />
          </TouchableOpacity>
          <TouchableOpacity>
            <MaterialIcons name="more-vert" size={24} color="#888" />
          </TouchableOpacity>
        </View>
      </View>
      
      <View style={styles.donorDetails}>
        <View style={styles.detailItem}>
          <FontAwesome name="user" size={16} color="#666" />
          <Text style={styles.detailText}>{donor.name}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="location-outline" size={16} color="#666" />
          <Text style={styles.detailText}>{donor.location}</Text>
        </View>
        <View style={styles.detailItem}>
          <MaterialIcons name="directions" size={16} color="#666" />
          <Text style={styles.detailText}>{donor.distance} km away</Text>
        </View>
        <View style={styles.detailItem}>
          <Text style={styles.timeLabel}>Available until:</Text>
          <Text style={styles.timeValue}>{donor.timeLimit}</Text>
        </View>
        {donor.units && (
          <View style={styles.detailItem}>
            <FontAwesome5 name="prescription-bottle" size={14} color="#666" style={{marginLeft: 2, marginRight: 2}} />
            <Text style={[styles.detailText, styles.unitsText]}>{donor.units}</Text>
          </View>
        )}
      </View>
      
      <View style={styles.cardActions}>
        <TouchableOpacity style={styles.shareButton} onPress={() => onSharePress(donor)}>
          <Ionicons name="share-social-outline" size={18} color="#555" />
          <Text style={styles.actionText}>Share</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.requestButton} onPress={() => onRequestPress(donor)}>
          <Text style={styles.requestText}>Request</Text>
          <MaterialIcons name="arrow-forward" size={18} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const EmptyState = () => (
  <View style={styles.emptyState}>
    <View style={styles.emptyStateIconContainer}>
      <MaterialCommunityIcons name="account-search-outline" size={80} color="#CCCCCC" />
    </View>
    <Text style={styles.emptyStateTitle}>No donors found</Text>
    <Text style={styles.emptyStateMessage}>
      Try selecting a different blood group or expanding your search area
    </Text>
  </View>
);

const FindDonorScreen = ({ navigation }) => {
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filteredDonors, setFilteredDonors] = useState([]);
  const [searchRadius, setSearchRadius] = useState(10);
  
  const donors = [
    {
      id: '1',
      name: 'Kirithika',
      gender: 'Female',
      age: '21',
      bloodGroup: 'AB+',
      location: 'Rediyarpalayam, Puducherry',
      distance: '3',
      timeLimit: '15/11/2023',
      units: '0.3 Unit',
      phone: '+91 9876543210'
    },
    {
      id: '2',
      name: 'Rahul',
      gender: 'Male',
      age: '24',
      bloodGroup: 'AB-',
      location: 'Muthialpet, Puducherry',
      distance: '5',
      timeLimit: '15/11/2023',
      units: '0.3 Unit',
      phone: '+91 9876543211'
    },
    {
      id: '3',
      name: 'Divya',
      gender: 'Female',
      age: '28',
      bloodGroup: 'AB+',
      location: 'Lawspet, Puducherry',
      distance: '7',
      timeLimit: '15/11/2023',
      units: '0.3 Unit',
      phone: '+91 9876543212'
    },
    {
      id: '4',
      name: 'Arun',
      gender: 'Male',
      age: '32',
      bloodGroup: 'O+',
      location: 'White Town, Puducherry',
      distance: '2',
      timeLimit: '20/11/2023',
      units: '0.5 Unit',
      phone: '+91 9876543213'
    },
    {
      id: '5',
      name: 'Priya',
      gender: 'Female',
      age: '26',
      bloodGroup: 'A+',
      location: 'Orleanpet, Puducherry',
      distance: '4',
      timeLimit: '18/11/2023',
      units: '0.4 Unit',
      phone: '+91 9876543214'
    },
  ];

  const handleSearch = () => {
    setLoading(true);
    
    // Simulate API call delay
    setTimeout(() => {
      if (selectedBloodGroup) {
        setFilteredDonors(donors.filter(donor => donor.bloodGroup === selectedBloodGroup));
      } else {
        setFilteredDonors(donors);
      }
      setLoading(false);
    }, 800);
  };

  const handleCallPress = (donor) => {
    // In a real app, this would use Linking.openURL(`tel:${donor.phone}`)
    alert(`Calling ${donor.name} at ${donor.phone}`);
  };

  const handleRequestPress = (donor) => {
    navigation.navigate('RequestDetails', { donor });
  };

  const handleSharePress = (donor) => {
    // In a real app, this would use Share.share()
    alert(`Sharing ${donor.name}'s details`);
  };

  useEffect(() => {
    // Load all donors initially
    setFilteredDonors(donors);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#870D25" barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Find Donor</Text>
        <Text style={styles.headerSubtitle}>Blood donors around you</Text>
        
        {/* Top Right Icons */}
        <View style={styles.topRightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
            <Feather name="message-square" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('Notifications')}>
            <View style={styles.notificationContainer}>
              <Feather name="bell" size={20} color="white" />
              <View style={styles.notificationBadge}>
                <Text style={styles.notificationText}>2</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
        
        <View style={styles.filterSection}>
          <Text style={styles.filterTitle}>Choose Blood group</Text>
          <TouchableOpacity 
            style={styles.selectContainer}
            onPress={() => setModalVisible(true)}
          >
            <TextInput
              style={styles.selectInput}
              placeholder="Select blood group"
              value={selectedBloodGroup}
              editable={false}
              placeholderTextColor="#999"
            />
            <MaterialIcons name="arrow-drop-down" size={24} color="#666" style={styles.selectIcon} />
          </TouchableOpacity>
          
          <View style={styles.searchOptions}>
            <View style={styles.radiusSelector}>
              <Text style={styles.radiusLabel}>Radius: {searchRadius} km</Text>
              <View style={styles.radiusButtons}>
                <TouchableOpacity 
                  style={styles.radiusButton}
                  onPress={() => setSearchRadius(Math.max(1, searchRadius - 5))}
                >
                  <Text style={styles.radiusButtonText}>-</Text>
                </TouchableOpacity>
                <TouchableOpacity 
                  style={styles.radiusButton}
                  onPress={() => setSearchRadius(Math.min(50, searchRadius + 5))}
                >
                  <Text style={styles.radiusButtonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
              <Ionicons name="search" size={18} color="#870D25" />
              <Text style={styles.searchButtonText}>Search</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
      <BloodGroupSelector 
        selectedBloodGroup={selectedBloodGroup}
        setSelectedBloodGroup={setSelectedBloodGroup}
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
      />
      
      <View style={styles.resultsContainer}>
        <View style={styles.resultsHeader}>
          <Ionicons name="people" size={16} color="#666" />
          <Text style={styles.resultsText}>
            Found {filteredDonors.length} donors around you
          </Text>
          
          <TouchableOpacity style={styles.filterButton}>
            <Ionicons name="filter" size={16} color="#870D25" />
            <Text style={styles.filterButtonText}>Filter</Text>
          </TouchableOpacity>
        </View>
        
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#870D25" />
            <Text style={styles.loadingText}>Searching for donors...</Text>
          </View>
        ) : filteredDonors.length > 0 ? (
          <FlatList
            data={filteredDonors}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <DonorCard 
                donor={item} 
                onCallPress={handleCallPress}
                onRequestPress={handleRequestPress}
                onSharePress={handleSharePress}
              />
            )}
            contentContainerStyle={styles.donorsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <EmptyState />
        )}
      </View>
      
      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name="home" size={22} color="#111" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Feather name="search" size={22} color="#D2042D" />
          <Text style={[styles.tabText, styles.activeTabText]}>Find Donor</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Request')}
        >
          <Feather name="droplet" size={22} color="#111" />
          <Text style={styles.tabText}>Request</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Feather name="user" size={22} color="#111" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F5',
  },
  header: {
    backgroundColor: '#870D25',
    paddingVertical: 20,
    paddingTop: 60,
    paddingHorizontal: 16,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    position: 'relative',
    elevation: 5,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255, 255, 255, 0.8)',
    marginBottom: 15,
  },
  topRightIcons: {
    position: 'absolute',
    top: 30,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  notificationContainer: {
    marginLeft: 16,
    position: 'relative',
  },
  notificationBadge: {
    position: 'absolute',
    right: -6,
    top: -6,
    backgroundColor: '#FFC107',
    width: 16,
    height: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#870D25',
    fontSize: 10,
    fontWeight: 'bold',
  },
  filterSection: {
    marginTop: 10,
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  selectContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    marginBottom: 15,
    elevation: 2,
  },
  selectInput: {
    height: 42,
    flex: 1,
    fontSize: 16,
  },
  selectIcon: {
    marginLeft: 8,
  },
  searchOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  radiusSelector: {
    flex: 1,
    marginRight: 10,
  },
  radiusLabel: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  radiusButtons: {
    flexDirection: 'row',
  },
  radiusButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  radiusButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 25,
    elevation: 2,
  },
  searchButtonText: {
    color: '#870D25',
    fontWeight: 'bold',
    marginLeft: 5,
    fontSize: 16,
  },
  resultsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  resultsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 12,
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(135, 13, 37, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  filterButtonText: {
    color: '#870D25',
    fontSize: 12,
    fontWeight: 'bold',
    marginLeft: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    color: '#666',
    marginTop: 12,
    fontSize: 16,
  },
  donorsList: {
    paddingBottom: 80,
  },
  donorCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    borderWidth: 1,
    borderColor: '#eee',
  },
  donorHeader: {
    flexDirection: 'row',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    justifyContent: 'space-between',
  },
  bloodGroupContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropIcon: {
    marginRight: 5,
  },
  bloodGroup: {
    color: '#870D25',
    fontSize: 24,
    fontWeight: 'bold',
  },
  superscript: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#870D25',
    lineHeight: 22,
  },
  donorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  donorGenderAge: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#333',
    marginRight: 10,
  },
  callButton: {
    backgroundColor: 'rgba(135, 13, 37, 0.1)',
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  donorDetails: {
    padding: 12,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  detailText: {
    fontSize: 14,
    color: '#444',
    marginLeft: 8,
  },
  unitsText: {
    fontWeight: '500',
  },
  timeLabel: {
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  timeValue: {
    fontSize: 14,
    color: '#870D25',
    fontWeight: 'bold',
    backgroundColor: 'rgba(135, 13, 37, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
  },
  cardActions: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  shareButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRightWidth: 1,
    borderRightColor: '#f0f0f0',
  },
  actionText: {
    color: '#555',
    marginLeft: 6,
    fontSize: 14,
  },
  requestButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#870D25',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderBottomRightRadius: 12,
  },
  requestText: {
    color: 'white',
    fontWeight: 'bold',
    marginRight: 5,
    fontSize: 14,
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: 'white',
    justifyContent: 'space-around',
    paddingVertical: 10,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    elevation: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  tabItem: {
    alignItems: 'center',
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: 'rgba(210, 4, 45, 0.1)',
  },
  tabText: {
    fontSize: 12,
    marginTop: 4,
    color: '#111',
  },
  activeTabText: {
    color: '#D2042D',
    fontWeight: 'bold',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  bloodGroupGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  bloodGroupItem: {
    width: '23%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  selectedBloodGroup: {
    backgroundColor: 'rgba(135, 13, 37, 0.1)',
    borderColor: '#870D25',
  },
  bloodGroupItemText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  selectedBloodGroupText: {
    color: '#870D25',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 60,
  },
  emptyStateIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 120,
    height: 120,
    backgroundColor: '#F5F5F5',
    borderRadius: 60,
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptyStateMessage: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
  }
});

export default FindDonorScreen;