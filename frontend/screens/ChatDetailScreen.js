import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  Dimensions
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

const { width } = Dimensions.get('window');

const ChatDetailScreen = ({ route, navigation }) => {
  const { conversation } = route.params;
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      id: '1',
      text: 'Hello! How can I help you with your blood donation questions today?',
      time: '10:20 AM',
      sender: 'them',
    },
    {
      id: '2',
      text: 'I have some questions about the donation process. What should I do before donating?',
      time: '10:22 AM',
      sender: 'me',
    },
    {
      id: '3',
      text: 'Great question! Before donating, make sure to: \n\n1. Get a good night',
      sender: 'them',
    },
  ]);

  const flatListRef = useRef(null);

  useEffect(() => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  }, [messages]);

  const sendMessage = () => {
    if (message.trim().length === 0) return;
    
    const newMessage = {
      id: (messages.length + 1).toString(),
      text: message,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      sender: 'me',
    };
    
    setMessages([...messages, newMessage]);
    setMessage('');

    // Simulate reply
    setTimeout(() => {
      const replyMessage = {
        id: (messages.length + 2).toString(),
        text: "Thanks for your message. A coordinator will respond shortly. Is there anything else you'd like to know?",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sender: 'them',
      };
      setMessages(currentMessages => [...currentMessages, replyMessage]);
    }, 1000);
  };

  const renderMessageItem = ({ item }) => (
    <View style={[
      styles.messageBubble,
      item.sender === 'me' ? styles.myMessage : styles.theirMessage,
    ]}>
      <Text style={styles.messageText}>{item.text}</Text>
      <Text style={styles.messageTime}>{item.time}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#9A1C2E" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Icon name="arrow-left" size={22} color="white" />
          </TouchableOpacity>
          <View style={styles.headerProfile}>
            <View style={[styles.avatar, { backgroundColor: conversation.color || '#F3F3F3' }]}>
              <Text style={[styles.avatarText, { color: conversation.textColor || '#616161' }]}>
                {conversation.initials}
              </Text>
            </View>
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerName} numberOfLines={1}>
                {conversation.name}
              </Text>
              <Text style={styles.headerStatus} numberOfLines={1}>
                Active now
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="phone" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Icon name="more-vertical" size={20} color="white" />
          </TouchableOpacity>
        </View>
      </View>
      
      {/* Chat Messages */}
      <FlatList
        ref={flatListRef}
        data={messages}
        renderItem={renderMessageItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.messagesList}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
        showsVerticalScrollIndicator={true}
        showsHorizontalScrollIndicator={false}
      />
      
      {/* Message Input */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.attachButton}>
            <Icon name="paperclip" size={22} color="#757575" />
          </TouchableOpacity>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
            multiline
            maxLength={500}
          />
          <TouchableOpacity 
            style={[styles.sendButton, message.trim().length > 0 ? styles.sendButtonActive : null]}
            onPress={sendMessage}
            disabled={message.trim().length === 0}
          >
            <Icon name="send" size={20} color={message.trim().length > 0 ? 'white' : '#BDBDBD'} />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#9A1C2E',
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    width: '100%',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  backButton: {
    marginRight: 12,
    padding: 4,
  },
  headerProfile: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontSize: 14,
    fontWeight: '600',
  },
  headerTextContainer: {
    flex: 1,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: 'white',
  },
  headerStatus: {
    fontSize: 12,
    color: '#F8F8F8',
    marginTop: 2,
  },
  headerRight: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: 8,
    marginLeft: 8,
  },
  messagesList: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: '100%',
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 18,
    marginVertical: 4,
  },
  myMessage: {
    backgroundColor: '#E3F2FD',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 4,
  },
  theirMessage: {
    backgroundColor: 'white',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 4,
  },
  messageText: {
    fontSize: 14,
    color: '#212121',
    lineHeight: 20,
    flexWrap: 'wrap',
  },
  messageTime: {
    fontSize: 11,
    color: '#757575',
    alignSelf: 'flex-end',
    marginTop: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderTopWidth: 1,
    borderTopColor: '#EEEEEE',
    width: '100%',
  },
  attachButton: {
    padding: 8,
    marginRight: 4,
  },
  input: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxHeight: 80,
    fontSize: 14,
    width: '100%',
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: '#9A1C2E',
  },
});

export default ChatDetailScreen;