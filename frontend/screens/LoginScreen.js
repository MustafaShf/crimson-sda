import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>LOG IN</Text>

       <Text style={styles.inputLabel}>Your Name</Text>
        <TextInput
          placeholder="Enter Your Name"
          placeholderTextColor="#555"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />
        
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            placeholder="Password"
            placeholderTextColor="#555"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={styles.input}
          />
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            style={styles.eyeIcon}
          >
            <Ionicons
              name={showPassword ? 'eye-off' : 'eye'}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        {/* 🔗 Place this navigation link HERE */}
        <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
          <Text style={styles.link}>Haven’t registered yet? Sign Up Now</Text>
        </TouchableOpacity>

        {/* Buttons */}
        <TouchableOpacity
         style={styles.primaryButton}
        onPress={() => navigation.navigate('Home')}
          >
        <Text style={styles.primaryButtonText}>Step In, Be a Hero</Text>
        </TouchableOpacity>


        <TouchableOpacity style={styles.secondaryButton}>
          <Text style={styles.secondaryButtonText}>Access Admin Panel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    paddingHorizontal: 20,
    // Note: fontFamily can only be applied to Text components in React Native
  },
  card: {
    backgroundColor: '#870D25', // Burgundy red
    borderRadius: 20,
    padding: 30,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  inputLabel: {
    color: '#fff',
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontWeight: '200',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '200', // Using the numeric weight value for ExtraLight
    alignSelf: 'center',
    marginBottom: 30,
    fontFamily: 'Roboto', // Just specify the font family
  },
  input: {
    backgroundColor: '#ddd',
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 20,
    color: '#000',
    fontFamily: 'Roboto',
    fontWeight: '200',
  },
  passwordContainer: {
    position: 'relative',
  },
  eyeIcon: {
    position: 'absolute',
    right: 20,
    top: 14,
  },
  link: {
    color: '#fff',
    textDecorationLine: 'underline',
    marginBottom: 25,
    textAlign: 'center',
    fontFamily: 'Roboto',
    fontWeight: '200',
  },
  primaryButton: {
    backgroundColor: '#6d0b1e',
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
    marginBottom: 15,
    // Add drop shadow for the button
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8, // for Android
  },
  primaryButtonText: {
    color: '#fff',
    fontWeight: '200',
    fontFamily: 'Roboto',
  },
  secondaryButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#444',
    fontFamily: 'Roboto',
    fontWeight: '200',
  },
});