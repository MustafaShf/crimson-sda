import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  StatusBar 
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const ChatScreen = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample conversation data
  const [conversations, setConversations] = useState([
    {
      id: '1',
      name: 'John Donor',
      lastMessage: 'I have some questions about the donation process',
      time: '10:23 AM',
      unread: true,
      initials: 'JD',
      color: '#FFEBE6',
      textColor: '#D63031'
    },
    {
      id: '2',
      name: 'Dr. Maria Bloom',
      lastMessage: 'Your test results from the previous donation are ready',
      time: 'Yesterday',
      unread: false,
      initials: 'MB',
      color: '#E3F2FD',
      textColor: '#1976D2'
    },
    {
      id: '3',
      name: 'Regional Center',
      lastMessage: 'Thank you for your recent donation. Your blood helped save lives.',
      time: 'Apr 20',
      unread: false,
      initials: 'RC',
      color: '#F3F3F3',
      textColor: '#616161'
    },
    {
      id: '4',
      name: 'Appointment Scheduler',
      lastMessage: 'Your donation appointment has been confirmed for July 30',
      time: 'Apr 15',
      unread: false,
      initials: 'AS',
      color: '#E8F5E9',
      textColor: '#388E3C'
    },
    {
      id: '5',
      name: 'Donor Manager',
      lastMessage: 'Your donor profile has been updated with your recent activity',
      time: 'Apr 10',
      unread: false,
      initials: 'DM',
      color: '#F3E5F5',
      textColor: '#7B1FA2'
    },
  ]);

  const renderConversationItem = ({ item }) => (
    <TouchableOpacity 
  style={styles.conversationItem} 
  onPress={() => navigation.navigate('ChatDetailScreen', { conversation: item })}
>

      <View style={[styles.avatarContainer, { backgroundColor: item.color }]}>
        <Text style={[styles.avatarText, { color: item.textColor }]}>{item.initials}</Text>
        {item.unread && <View style={styles.unreadBadge} />}
      </View>
      <View style={styles.conversationContent}>
        <View style={styles.conversationHeader}>
          <Text style={styles.conversationName}>{item.name}</Text>
          <Text style={styles.conversationTime}>{item.time}</Text>
        </View>
        <View style={styles.messagePreviewContainer}>
          <Text 
            style={[styles.conversationMessage, item.unread && styles.unreadMessage]} 
            numberOfLines={1}
          >
            {item.lastMessage}
          </Text>
          <Icon name="chevron-right" size={16} color="#BDBDBD" />
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9A1C2E" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Messages</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>
      
      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Icon name="search" size={16} color="#9E9E9E" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search conversations"
          placeholderTextColor="#9E9E9E"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery('')}>
            <Icon name="x" size={16} color="#9E9E9E" />
          </TouchableOpacity>
        )}
      </View>
      
      {/* Conversation List */}
      <FlatList
        data={conversations}
        renderItem={renderConversationItem}
        keyExtractor={item => item.id}
        style={styles.conversationList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#9A1C2E',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: 'white',
  },
  backButton: {
    fontSize: 14,
    fontWeight: '500',
    color: 'white',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    height: 30,
    padding: 0,
  },
  conversationList: {
    flex: 1,
  },
  conversationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    position: 'relative',
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
  },
  unreadBadge: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#9A1C2E',
    borderWidth: 1,
    borderColor: 'white',
  },
  conversationContent: {
    flex: 1,
  },
  conversationHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  conversationName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#212121',
  },
  conversationTime: {
    fontSize: 12,
    color: '#9E9E9E',
  },
  messagePreviewContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  conversationMessage: {
    fontSize: 12,
    color: '#757575',
    flex: 1,
    marginRight: 8,
  },
  unreadMessage: {
    fontWeight: '500',
    color: '#212121',
  },
});

export default ChatScreen;