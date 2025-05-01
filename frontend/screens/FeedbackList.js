import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  FlatList,
  TextInput,
  ActivityIndicator
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function FeedbackList({ isDarkMode }) {
  const [expanded, setExpanded] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('');

  const themeStyles = getStyles(isDarkMode);

  const allFeedback = [
    { id: 1, user: 'Ali Raza', message: 'The blood donation process was smooth and the staff was very helpful!', date: '2 days ago', rating: 5 },
    { id: 2, user: 'Sara Khan', message: 'Great initiative but needs faster donor matching. Had to wait for 3 days.', date: '1 week ago', rating: 3 },
    { id: 3, user: 'Muhammad Ahmed', message: 'The app is intuitive and easy to use. Found a donor within hours.', date: '3 days ago', rating: 5 },
    { id: 4, user: 'Fatima Zahra', message: 'Could improve notification system, missed my appointment.', date: '5 days ago', rating: 2 },
    { id: 5, user: 'Hassan Ali', message: 'Excellent service! Helped me find a rare blood type donor quickly.', date: '1 day ago', rating: 5 },
  ];

  const filteredFeedback = filter 
    ? allFeedback.filter(item => 
        item.user.toLowerCase().includes(filter.toLowerCase()) || 
        item.message.toLowerCase().includes(filter.toLowerCase())
      )
    : allFeedback;

  const handleRefresh = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 1000);
  };

  const renderRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <MaterialIcons 
          key={i}
          name={i <= rating ? "star" : "star-border"} 
          size={16} 
          color={i <= rating ? "#F59E0B" : "#CBD5E1"} 
          style={themeStyles.star}
        />
      );
    }
    return <View style={themeStyles.ratingContainer}>{stars}</View>;
  };

  const renderFeedbackItem = ({ item }) => (
    <View style={themeStyles.feedbackItem}>
      <View style={themeStyles.feedbackHeader}>
        <View style={themeStyles.userContainer}>
          <View style={themeStyles.userInitial}>
            <Text style={themeStyles.initialText}>{item.user.charAt(0)}</Text>
          </View>
          <View>
            <Text style={themeStyles.user}>{item.user}</Text>
            <Text style={themeStyles.date}>{item.date}</Text>
          </View>
        </View>
        {renderRating(item.rating)}
      </View>
      <Text style={themeStyles.message}>{item.message}</Text>
    </View>
  );

  return (
    <View style={themeStyles.container}>
      <View style={themeStyles.header}>
        <Text style={themeStyles.title}>User Feedback</Text>
        <TouchableOpacity 
          style={themeStyles.refreshButton}
          onPress={handleRefresh}
        >
          <MaterialIcons name="refresh" size={20} color="#870D25" />
        </TouchableOpacity>
      </View>
      
      <View style={themeStyles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" style={themeStyles.searchIcon} />
        <TextInput
          style={themeStyles.searchInput}
          placeholder="Search feedback..."
          placeholderTextColor={isDarkMode ? '#999' : '#666'}
          value={filter}
          onChangeText={setFilter}
        />
        {filter !== "" && (
          <TouchableOpacity onPress={() => setFilter("")}>
            <MaterialIcons name="clear" size={20} color="#666" />
          </TouchableOpacity>
        )}
      </View>
      
      {loading ? (
        <View style={themeStyles.loadingContainer}>
          <ActivityIndicator size="large" color="#870D25" />
          <Text style={themeStyles.loadingText}>Loading feedback...</Text>
        </View>
      ) : (
        <>
          {filteredFeedback.length > 0 ? (
            <FlatList
              data={expanded ? filteredFeedback : filteredFeedback.slice(0, 3)}
              renderItem={renderFeedbackItem}
              keyExtractor={item => item.id.toString()}
              contentContainerStyle={themeStyles.listContainer}
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={themeStyles.separator} />}
            />
          ) : (
            <View style={themeStyles.emptyContainer}>
              <MaterialIcons name="feedback" size={50} color="#CBD5E1" />
              <Text style={themeStyles.emptyText}>No feedback matches your search</Text>
            </View>
          )}
          
          {allFeedback.length > 3 && (
            <TouchableOpacity
              style={themeStyles.expandButton}
              onPress={() => setExpanded(!expanded)}
            >
              <Text style={themeStyles.expandButtonText}>
                {expanded ? "Show Less" : `Show All (${allFeedback.length})`}
              </Text>
              <MaterialIcons 
                name={expanded ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#870D25" 
              />
            </TouchableOpacity>
          )}
        </>
      )}
    </View>
  );
}

const getStyles = (isDarkMode) => StyleSheet.create({
  container: {
    backgroundColor: isDarkMode ? '#121212' : 'white',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#1F2937' : '#FFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: isDarkMode ? '#333' : '#F1F5F9',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: isDarkMode ? '#F9FAFB' : '#111',
  },
  refreshButton: {
    padding: 8,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: isDarkMode ? '#2A2A2A' : '#F1F5F9',
    marginHorizontal: 20,
    marginVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 14,
    color: isDarkMode ? '#E0E0E0' : '#333',
  },
  listContainer: {
    paddingHorizontal: 20,
  },
  feedbackItem: {
    paddingVertical: 12,
  },
  feedbackHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  userContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  userInitial: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#870D25',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  initialText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  user: {
    fontWeight: 'bold',
    fontSize: 14,
    color: isDarkMode ? '#E5E5E5' : '#333',
  },
  date: {
    fontSize: 12,
    color: isDarkMode ? '#9CA3AF' : '#94A3B8',
  },
  ratingContainer: {
    flexDirection: 'row',
  },
  star: {
    marginLeft: 2,
  },
  message: {
    color: isDarkMode ? '#CCCCCC' : '#4B5563',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 46,
  },
  separator: {
    height: 1,
    backgroundColor: isDarkMode ? '#333' : '#F1F5F9',
    marginVertical: 8,
  },
  expandButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: isDarkMode ? '#2E2E2E' : '#F1F5F9',
  },
  expandButtonText: {
    color: '#870D25',
    fontWeight: '600',
    marginRight: 4,
  },
  loadingContainer: {
    padding: 40,
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    color: isDarkMode ? '#CCCCCC' : '#666',
  },
  emptyContainer: {
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    marginTop: 12,
    color: isDarkMode ? '#9CA3AF' : '#94A3B8',
    textAlign: 'center',
  }
});
