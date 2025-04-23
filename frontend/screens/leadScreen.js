// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
// import { Feather } from '@expo/vector-icons';

// const leaderboardData = [
//   { rank: 2, name: 'Suraj Khandwal', location: 'Jaipur, Rajasthan', image: 'https://randomuser.me/api/portraits/men/45.jpg' },
//   { rank: 4, name: 'Suraj Khandwal', location: 'Jaipur, Rajasthan', image: 'https://randomuser.me/api/portraits/women/65.jpg' },
//   { rank: 6, name: 'Suraj Khandwal', location: 'Jaipur, Rajasthan', image: 'https://randomuser.me/api/portraits/women/70.jpg' },
//   { rank: 6, name: 'Suraj Khandwal', location: 'Jaipur, Rajasthan', image: 'https://randomuser.me/api/portraits/women/71.jpg' },
// ];

// export default function LeaderboardScreen({ navigation }) {
//   return (
//     <View style={styles.container}>
//       {/* Header */}
//       <View style={styles.header}>
//         <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
//           <Text style={styles.backText}>Back</Text>
//         </TouchableOpacity>
//         <Text style={styles.greeting}>Hey Sabrina,</Text>
//         <Text style={styles.detail}>Your Impact Speaks Volumes.</Text>
//         <Text style={styles.detail}>Your Rank: #12</Text>
//         <Text style={styles.detail}>Total Donations: 5</Text>
//         <Text style={styles.detail}>Last Donated: 3 weeks ago ❤️</Text>
//       </View>

//       {/* Motivational Message */}
//       <View style={styles.messageBox}>
//         <Text style={styles.motivate}>EVERY DROP COUNTS.</Text>
//         <Text style={styles.subText}>You're more than a donor—you're part of something bigger.{"\n"}Keep giving. Stay a hero. ❤️</Text>
//       </View>

//       {/* Leaderboard List */}
//       <ScrollView contentContainerStyle={styles.listContainer}>
//         {leaderboardData.map((item, index) => (
//           <View key={index} style={styles.card}>
//             <Text style={styles.rank}>{item.rank}</Text>
//             <Image source={{ uri: item.image }} style={styles.avatar} />
//             <View style={styles.info}>
//               <Text style={styles.name}>{item.name}</Text>
//               <Text style={styles.location}>{item.location}</Text>
//             </View>
//             <TouchableOpacity style={styles.badge}>
//               <Text style={styles.badgeText}>Achievement</Text>
//             </TouchableOpacity>
//           </View>
//         ))}
//       </ScrollView>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF5F5',
//   },
//   header: {
//     backgroundColor: '#870D25',
//     padding: 20,
//     paddingTop: 60,
//     borderBottomLeftRadius: 20,
//     borderBottomRightRadius: 20,
//   },
//   backBtn: {
//     position: 'absolute',
//     top: 30,
//     right: 20,
//   },
//   backText: {
//     color: '#fff',
//     fontWeight: 'bold',
//   },
//   greeting: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   detail: {
//     color: 'white',
//     marginTop: 3,
//   },
//   messageBox: {
//     marginTop: 20,
//     paddingHorizontal: 20,
//   },
//   motivate: {
//     fontWeight: 'bold',
//     fontSize: 14,
//     color: '#000',
//   },
//   subText: {
//     color: '#111',
//     fontSize: 13,
//     marginTop: 4,
//   },
//   listContainer: {
//     paddingHorizontal: 16,
//     paddingBottom: 20,
//   },
//   card: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 12,
//     marginTop: 12,
//     flexDirection: 'row',
//     alignItems: 'center',
//     elevation: 3,
//   },
//   rank: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#6D6D6D',
//     marginRight: 10,
//   },
//   avatar: {
//     width: 46,
//     height: 46,
//     borderRadius: 23,
//     marginRight: 10,
//   },
//   info: {
//     flex: 1,
//   },
//   name: {
//     fontWeight: 'bold',
//     fontSize: 14,
//   },
//   location: {
//     fontSize: 12,
//     color: '#888',
//   },
//   badge: {
//     backgroundColor: '#FDEBD0',
//     paddingVertical: 6,
//     paddingHorizontal: 14,
//     borderRadius: 15,
//   },
//   badgeText: {
//     fontSize: 12,
//     color: '#E67E22',
//     fontWeight: '600',
//   },
// });
