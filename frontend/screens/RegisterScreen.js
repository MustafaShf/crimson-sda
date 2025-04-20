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

export default function RegisterDonorScreen({ navigation }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    const { name, email, password, phone, address } = formData;
    if (!name || !email || !password || !phone || !address) {
      Alert.alert("Error", "Please fill all the fields");
      return;
    }

    navigation.navigate("EligibilityTest", { userData: formData });
  };

  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/6772/6772262.png",
        }}
        style={styles.logo}
      />

      <Text style={styles.title}>Donor Registration</Text>

      <TextInput
        placeholder="Name"
        value={formData.name}
        onChangeText={(val) => handleChange("name", val)}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Email"
        value={formData.email}
        onChangeText={(val) => handleChange("email", val)}
        style={styles.input}
        keyboardType="email-address"
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        value={formData.password}
        onChangeText={(val) => handleChange("password", val)}
        style={styles.input}
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Phone Number"
        value={formData.phone}
        onChangeText={(val) => handleChange("phone", val)}
        style={styles.input}
        keyboardType="phone-pad"
        placeholderTextColor="#aaa"
      />
      <TextInput
        placeholder="Address"
        value={formData.address}
        onChangeText={(val) => handleChange("address", val)}
        style={styles.input}
        placeholderTextColor="#aaa"
      />

      <TouchableOpacity style={styles.button} onPress={handleNext}>
        <Text style={styles.buttonText}>Take Eligibility Test</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkText}>Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff5f5",
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
    color: "#d32f2f",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    padding: 12,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#d32f2f",
    borderRadius: 8,
    backgroundColor: "#fff",
    color: "#333",
  },
  button: {
    backgroundColor: "#d32f2f",
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
    color: "#d32f2f",
    fontSize: 16,
    fontWeight: "bold",
  },
});
