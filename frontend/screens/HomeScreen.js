import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Header with Countdown */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Days Until Next Donation:</Text>
        <Text style={styles.countdown}>
          <Text style={styles.countNum}>3</Text> : <Text style={styles.countNum}>07</Text>
        </Text>
        <Text style={styles.unitLabel}>Months    Days</Text>

        <TouchableOpacity style={styles.eligibilityButton}>
          <Text style={styles.eligibilityText}>You're eligible to Donate</Text>
        </TouchableOpacity>

        {/* Top Right Icons */}
        <View style={styles.topRightIcons}>
          <Feather name="message-square" size={20} color="white" />
          <TouchableOpacity onPress={() => navigation.navigate('Notification')}>
            <Feather name="bell" size={20} color="white" style={{ marginLeft: 12 }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Decorative Circles */}
      <View style={styles.circleSmall} />
      <View style={styles.circleMedium} />
      <View style={styles.circleLarge} />
      <View style={[styles.circleSmall, { top: 40, right: 80 }]} />
      <View style={[styles.circleMedium, { bottom: 20, left: 60 }]} />

      {/* Bottom Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Home')}>
          <Feather name="home" size={22} color="#D2042D" />
          <Text style={[styles.tabText, { color: '#D2042D' }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('FindDonor')}>
          <Feather name="search" size={22} color="#111" />
          <Text style={styles.tabText}>Find Donor</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Request')}>
          <Feather name="droplet" size={22} color="#111" />
          <Text style={styles.tabText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem} onPress={() => navigation.navigate('Profile')}>
          <Feather name="user" size={22} color="#111" />
          <Text style={styles.tabText}>Profile</Text>
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
  header: {
    backgroundColor: '#870D25',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    position: 'relative',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
    marginBottom: 10,
  },
  countdown: {
    fontSize: 32,
    color: 'white',
    fontWeight: 'bold',
  },
  countNum: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
  },
  unitLabel: {
    color: 'white',
    fontSize: 12,
    marginTop: 2,
    letterSpacing: 1,
  },
  circleSmall: {
    position: 'absolute',
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(255, 102, 128, 0.4)',
    top: 30,
    left: 30,
  },
  circleMedium: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 102, 128, 0.25)',
    top: 70,
    right: 60,
  },
  circleLarge: {
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255, 102, 128, 0.15)',
    top: 90,
    right: 20,
  },
  eligibilityButton: {
    marginTop: 16,
    backgroundColor: '#539A77',
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  eligibilityText: {
    color: 'white',
    fontWeight: 'bold',
  },
  topRightIcons: {
    position: 'absolute',
    top: 30,
    right: 20,
    flexDirection: 'row',
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
});