import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { UserContext } from "../context/userContext"; // ✅ Make sure path is correct
import Constants from 'expo-constants';
const { LOCALLINK } = Constants.expoConfig.extra;
export default function LoginScreen({ navigation }) {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { setUser } = useContext(UserContext); // ✅ Access setUser from context

  const handleLogin = async () => {
    if (!name || !password) {
      Alert.alert("Error", "Please enter both name and password.");
      return;
    }

    try {
      const response = await fetch(`http://${LOCALLINK}:8080/api/users/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: name,
          password: password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Login success:", data.name, data.userId);
        setUser(data); // ✅ Store user in global context
        navigation.replace("Home"); // ✅ Go to Home screen (replace to avoid back to login)
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong: " + error.message);
    }
  };

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
              name={showPassword ? "eye-off" : "eye"}
              size={20}
              color="#555"
            />
          </TouchableOpacity>
        </View>

        <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
          <Text style={styles.link}>Haven’t registered yet? Sign Up Now</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
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
    backgroundColor: "#fff",
    justifyContent: "center",
    paddingHorizontal: 20,
    // Note: fontFamily can only be applied to Text components in React Native
  },
  card: {
    backgroundColor: "#870D25", // Burgundy red
    borderRadius: 20,
    padding: 30,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowOffset: { width: 3, height: 5 },
    shadowRadius: 8,
    elevation: 5,
  },
  inputLabel: {
    color: "#fff",
    alignSelf: "flex-start",
    marginBottom: 8,
    fontWeight: "200",
  },
  title: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "200", // Using the numeric weight value for ExtraLight
    alignSelf: "center",
    marginBottom: 30,
    fontFamily: "Roboto", // Just specify the font family
  },
  input: {
    backgroundColor: "#ddd",
    borderRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 12,
    marginBottom: 20,
    color: "#000",
    fontFamily: "Roboto",
    fontWeight: "200",
  },
  passwordContainer: {
    position: "relative",
  },
  eyeIcon: {
    position: "absolute",
    right: 20,
    top: 14,
  },
  link: {
    color: "#fff",
    textDecorationLine: "underline",
    marginBottom: 25,
    textAlign: "center",
    fontFamily: "Roboto",
    fontWeight: "200",
  },
  primaryButton: {
    backgroundColor: "#6d0b1e",
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: "center",
    marginBottom: 15,
    // Add drop shadow for the button
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 8, // for Android
  },
  primaryButtonText: {
    color: "#fff",
    fontWeight: "200",
    fontFamily: "Roboto",
  },
  secondaryButton: {
    backgroundColor: "#ccc",
    paddingVertical: 10,
    borderRadius: 20,
    alignItems: "center",
  },
  secondaryButtonText: {
    color: "#444",
    fontFamily: "Roboto",
    fontWeight: "200",
  },
});
