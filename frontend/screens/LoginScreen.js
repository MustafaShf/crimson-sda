import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Alert,
} from "react-native";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch(
        "http://192.168.18.29:8080/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Login Successful", [
          { text: "OK", onPress: () => navigation.navigate("Home") },
        ]);
      } else {
        Alert.alert("Error", data.message || "Invalid email or password");
      }
    } catch (error) {
      console.error("Error:", error);
      Alert.alert("Error", "Something went wrong!");
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image source={require("../assets/blood.png")} style={styles.logo} /> */}
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/6772/6772262.png",
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#ddd"
      />

      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#ddd"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkText}>Don't have an account? Register</Text>
      </TouchableOpacity>

      {/* <TouchableOpacity onPress={() => navigation.navigate("AdminLogin")}>
        <Text style={styles.adminLink}>Login as Admin</Text>
      </TouchableOpacity> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f5", // Light red/pink background
    padding: 20,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d32f2f", // Dark Red
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#d32f2f", // Red border
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#d32f2f", // Dark red button
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  linkText: {
    marginTop: 15,
    color: "#d32f2f", // Red color for the link
    fontSize: 16,
    fontWeight: "bold",
  },
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#fff5f5",
    padding: 20,
  },
  adminLink: {
    marginBottom: 20,
    color: "#6a1b9a", // Purple shade for contrast
    fontSize: 16,
    fontWeight: "bold",
  },
});
