import React from "react";
import { View, Text, StyleSheet } from "react-native";

export default function EligibilityTestScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eligibility Test</Text>
      {/* Add your test content here */}
      <Text style={styles.text}>This is where the donor eligibility test will appear.</Text>
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
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
});
