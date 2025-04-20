import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import Constants from "expo-constants";
const { LOCALLINK } = Constants.expoConfig.extra;

export default function ResultScreen({ route, navigation }) {
  const { isValid, userData } = route.params;

  const handleConfirm = async () => {
    try {
      const response = await fetch(`http://${LOCALLINK}/api/users/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        Alert.alert("Success", "You have been registered successfully!", [
          { text: "OK", onPress: () => navigation.navigate("Login") },
        ]);
      } else {
        Alert.alert("Failed", "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Something went wrong.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Hello {userData.name},</Text>

      <Text style={[styles.result, isValid ? styles.green : styles.red]}>
        {isValid
          ? "✅ You are eligible to donate blood!"
          : "❌ You are not eligible to donate blood at the moment."}
      </Text>

      {/* User Info Box */}
      <View style={styles.dataBox}>
        <Text style={styles.boxTitle}>🧾 Your Information</Text>
        <Text style={styles.item}>👤 Name: {userData.name}</Text>
        <Text style={styles.item}>📧 Email: {userData.email}</Text>
        <Text style={styles.item}>📞 Phone: {userData.phone}</Text>
        <Text style={styles.item}>🏠 Address: {userData.address}</Text>
        <Text style={styles.item}>
          🩸 Eligibility: {isValid ? "Eligible ✅" : "Not Eligible ❌"}
        </Text>
      </View>

      {/* Confirm Button */}
      <TouchableOpacity style={styles.button} onPress={handleConfirm}>
        <Text style={styles.buttonText}>Confirm</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 100,
    backgroundColor: "#fff5f5",
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 20,
    textAlign: "center",
  },
  result: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  green: {
    color: "#388e3c",
  },
  red: {
    color: "#d32f2f",
  },
  dataBox: {
    backgroundColor: "#fff",
    borderColor: "#d32f2f",
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 10,
    padding: 15,
    width: "100%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  boxTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
    textAlign: "center",
  },
  item: {
    fontSize: 16,
    marginBottom: 6,
    color: "#444",
  },
  button: {
    backgroundColor: "#d32f2f",
    padding: 14,
    borderRadius: 8,
    width: "70%",
    marginTop: 40,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
