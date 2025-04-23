import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function SignUpScreen({ navigation }) {
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const passwordsMatch = password === confirmPassword;

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.title}>SIGN UP</Text>

        <Text style={styles.inputLabel}>Enter Your Name</Text>
        <TextInput
          value={name}
          onChangeText={setName}
          placeholder="Your Name"
          placeholderTextColor="#555"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Password</Text>
        <TextInput
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholder="Password"
          placeholderTextColor="#555"
          style={styles.input}
        />

        <Text style={styles.inputLabel}>Confirm Password</Text>
        <TextInput
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          placeholder="Confirm Password"
          placeholderTextColor="#555"
          style={styles.input}
        />

        {!passwordsMatch && (
          <Text style={{ color: 'yellow', marginBottom: 10 }}>
            Passwords do not match
          </Text>
        )}

<TouchableOpacity
  style={styles.button}
  disabled={!passwordsMatch}
  onPress={() => navigation.navigate('EligibilityQ1')}
>
  <Text style={styles.buttonText}>Take Eligibility Test</Text>
</TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={{ color: '#fff', textDecorationLine: 'underline', marginTop: 15 }}>
            Already have an account? Log In
          </Text>
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
    alignItems: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#870D25',
    borderRadius: 25,
    padding: 30,
    width: '100%',
    maxWidth: 350,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: '200',
    marginBottom: 30,
  },
  inputLabel: {
    color: '#fff',
    alignSelf: 'flex-start',
    marginBottom: 8,
    fontWeight: '200',
  },
  input: {
    backgroundColor: '#e0e0e0',
    width: '100%',
    borderRadius: 20,
    padding: 12,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8, // for Android
  },
  buttonText: {
    color: '#fff',
  },
});
