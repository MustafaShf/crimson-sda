import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Feather } from '@expo/vector-icons';
import RNPickerSelect from 'react-native-picker-select';

export default function DonateScreen({ navigation }) {
  const [bloodGroup, setBloodGroup] = useState('');
  const [gender, setGender] = useState('');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [units, setUnits] = useState('');

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Donate Blood</Text>
        <Text style={styles.headerSubtext}>Register yourself as a donor</Text>

        {/* Top Right Icons */}
        <View style={styles.topRightIcons}>
          <Feather name="message-square" size={20} color="white" />
          <Feather name="bell" size={20} color="white" style={{ marginLeft: 12 }} />
        </View>
      </View>

      {/* Form */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          
          {/* Name */}
          <Text style={styles.label}>Full Name</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your full name" 
            value={name}
            onChangeText={setName}
          />

          {/* Age */}
          <Text style={styles.label}>Age</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your age" 
            keyboardType="numeric"
            value={age}
            onChangeText={setAge}
          />

          {/* Gender */}
          <Text style={styles.label}>Gender</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={setGender}
              value={gender}
              placeholder={{ label: 'Select', value: null }}
              items={[
                { label: 'Male', value: 'male' },
                { label: 'Female', value: 'female' }
              ]}
            />
          </View>

          {/* Blood Group */}
          <Text style={styles.label}>Blood Group</Text>
          <View style={styles.pickerContainer}>
            <RNPickerSelect
              onValueChange={setBloodGroup}
              value={bloodGroup}
              placeholder={{ label: 'Select', value: null }}
              items={['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(group => ({ label: group, value: group }))}
            />
          </View>

          {/* Location */}
          <Text style={styles.label}>Location</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter your location" 
            value={location}
            onChangeText={setLocation}
          />

          {/* Units */}
          <Text style={styles.label}>Units to Donate</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Enter units (e.g., 1, 2)" 
            keyboardType="numeric"
            value={units}
            onChangeText={setUnits}
          />

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton}>
            <Text style={styles.submitButtonText}>Register as Donor</Text>
          </TouchableOpacity>

          {/* Space at the bottom */}
          <View style={{ height: 80 }} />
        </View>
      </ScrollView>

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Home')}
        >
          <Feather name="home" size={22} color="#111" />
          <Text style={styles.tabText}>Home</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('FindDonor')}
        >
          <Feather name="search" size={22} color="#111" />
          <Text style={styles.tabText}>Find Donor</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.tabItem, styles.activeTab]}>
          <Feather name="droplet" size={22} color="#D2042D" />
          <Text style={[styles.tabText, { color: '#D2042D' }]}>Donate</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.tabItem}
          onPress={() => navigation.navigate('Profile')}
        >
          <Feather name="user" size={22} color="#111" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF5F5' },
  header: {
    backgroundColor: '#870D25',
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    padding: 20,
    paddingTop: 60,
    position: 'relative',
  },
  headerTitle: { color: 'white', fontSize: 22, fontWeight: 'bold' },
  headerSubtext: { color: 'white', fontSize: 12, marginTop: 4 },
  topRightIcons: {
    position: 'absolute',
    top: 30,
    right: 20,
    flexDirection: 'row',
  },
  scrollContainer: { flex: 1 },
  formContainer: { padding: 20 },
  label: { fontSize: 14, fontWeight: 'bold', color: '#444', marginBottom: 5 },
  input: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 12,
    marginBottom: 15,
    elevation: 2,
  },
  submitButton: {
    backgroundColor: '#870D25',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
  },
  submitButtonText: { color: 'white', fontWeight: 'bold', fontSize: 16 },
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
  tabItem: { alignItems: 'center' },
  tabText: { fontSize: 12, marginTop: 4, color: '#111' },
  activeTab: { backgroundColor: 'rgba(210, 4, 45, 0.1)', borderRadius: 20 },
});
