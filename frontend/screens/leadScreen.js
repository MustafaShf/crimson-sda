import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

const leaderboardData = [
  { rank: 1, name: 'Ayesha Khan', location: 'Lahore, PK', image: 'https://randomuser.me/api/portraits/women/45.jpg' },
  { rank: 2, name: 'Ali Raza', location: 'Karachi, PK', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
  { rank: 3, name: 'Mehwish Fatima', location: 'Islamabad, PK', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
  { rank: 4, name: 'Saad Malik', location: 'Faisalabad, PK', image: 'https://randomuser.me/api/portraits/men/70.jpg' },
];

export default function LeaderboardScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Feather name="arrow-left" size={22} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>🏆 Leaderboard</Text>
        <Text style={styles.headerSubtitle}>
          Your Rank: <Text style={styles.bold}>#12</Text> | Donations: <Text style={styles.bold}>5</Text>
        </Text>
      </View>

      <View style={styles.motivationBox}>
        <Text style={styles.motivationText}>
          <Text style={styles.bold}>EVERY DROP COUNTS.{"\n"}</Text>
          You're more than a donor — you're part of something bigger.{"\n"}
          Keep giving. Stay a hero. ❤️
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.listContainer}>
        <Text style={styles.sectionTitle}>Top Donors</Text>
        {leaderboardData.map((item, index) => (
          <View key={index} style={[styles.card, index === 0 && styles.topCard]}>
            <Text style={[styles.rank, index === 0 && styles.topRank]}>#{item.rank}</Text>
            <Image source={{ uri: item.image }} style={styles.avatar} />
            <View style={styles.info}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.location}>{item.location}</Text>
            </View>
            <View style={[styles.badge, index < 3 && styles.goldBadge]}>
              <Text style={styles.badgeText}>
                {item.rank === 1 ? '🥇' : item.rank === 2 ? '🥈' : item.rank === 3 ? '🥉' : '⭐'}
              </Text>
            </View>
          </View>
        ))}
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
    paddingVertical: 60,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
    position: 'relative',
  },
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
  },
  headerSubtitle: {
    color: '#f9f9f9',
    fontSize: 14,
    marginTop: 8,
  },
  bold: {
    fontWeight: 'bold',
  },
  motivationBox: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    marginTop: 10,
  },
  motivationText: {
    fontSize: 14,
    color: '#222',
    lineHeight: 20,
  },
  listContainer: {
    padding: 20,
    paddingTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 14,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 3,
  },
  topCard: {
    backgroundColor: '#FFF3F3',
    borderWidth: 1,
    borderColor: '#FFD1DC',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D2042D',
    marginRight: 14,
  },
  topRank: {
    color: '#870D25',
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginRight: 14,
  },
  info: {
    flex: 1,
  },
  name: {
    fontWeight: '600',
    fontSize: 16,
    color: '#222',
  },
  location: {
    fontSize: 13,
    color: '#888',
    marginTop: 2,
  },
  badge: {
    backgroundColor: '#FFF0C1',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 14,
  },
  goldBadge: {
    backgroundColor: '#FFE8AC',
  },
  badgeText: {
    fontSize: 16,
    color: '#E67E22',
    fontWeight: 'bold',
  },
});