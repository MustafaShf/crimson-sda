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

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [bloodGroup, setBloodGroup] = useState("");
  const [password, setPassword] = useState("");
  const [willDonate, setWillDonate] = useState(null); // null, true, false

  const handleSubmit = () => {
    if (!name || !email || !bloodGroup || !password || willDonate === null) {
      Alert.alert("Error", "Please fill in all the fields.");
      return;
    }

    // TODO: Send data to backend here
    Alert.alert("Success", "Registration Complete");
    console.log("success");
    navigation.navigate("Login");
  };

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/6772/6772262.png",
          }}
          style={styles.logo}
        />

        <Text style={styles.title}>Register to Donate Blood</Text>

        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          placeholderTextColor="#ddd"
        />

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
          placeholder="Blood Group (e.g. A+, O-)"
          value={bloodGroup}
          onChangeText={setBloodGroup}
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

        <Text style={styles.questionText}>Will you donate in the future?</Text>
        <View style={styles.toggleContainer}>
          <TouchableOpacity
            style={[
              styles.toggleButton,
              willDonate === true && styles.toggleButtonActive,
            ]}
            onPress={() => setWillDonate(true)}
          >
            <Text
              style={[
                styles.toggleText,
                willDonate === true
                  ? styles.toggleTextActive
                  : styles.toggleTextInactive,
              ]}
            >
              Yes
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleButton,
              willDonate === false && styles.toggleButtonActive,
            ]}
            onPress={() => setWillDonate(false)}
          >
            <Text
              style={[
                styles.toggleText,
                willDonate === false
                  ? styles.toggleTextActive
                  : styles.toggleTextInactive,
              ]}
            >
              No
            </Text>
          </TouchableOpacity>
        </View>

        {willDonate === true && (
          <TouchableOpacity style={styles.healthButton}>
            <Text style={styles.buttonText}>Take Health Test</Text>
          </TouchableOpacity>
        )}
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "space-between",
    backgroundColor: "#fff5f5",
    padding: 20,
  },
  container: {
    alignItems: "center",
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#d32f2f",
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },
  questionText: {
    fontSize: 16,
    marginTop: 15,
    color: "#333",
  },
  toggleContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginTop: 10,
  },
  toggleButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#d32f2f",
  },
  toggleButtonActive: {
    backgroundColor: "#d32f2f",
    color: "#d32f2f",
  },
  toggleText: {
    color: "#ffff",
    fontWeight: "bold",
  },
  healthButton: {
    backgroundColor: "#d32f2f",
    padding: 12,
    borderRadius: 8,
    width: "100%",
    marginTop: 15,
  },
  submitButton: {
    backgroundColor: "#d32f2f",
    padding: 14,
    borderRadius: 8,
    width: "100%",
    marginBottom: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "bold",
  },
  toggleText: {
    fontWeight: "bold",
  },

  toggleTextActive: {
    color: "#fff",
  },

  toggleTextInactive: {
    color: "#d32f2f",
  },
});
