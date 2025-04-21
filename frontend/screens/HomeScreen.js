// screens/HomeScreen.js
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native";

export default function HomeScreen() {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isEligible, setIsEligible] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 60));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Red Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Welcome Back!</Text>
        <Text style={styles.subText}>You're eligible to donate</Text>
      </View>

      {/* Card Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Next Donation Countdown</Text>
        <Text style={styles.timer}>
          {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, "0")}
        </Text>
        <Text style={styles.caption}>Minutes : Seconds</Text>

        <TouchableOpacity style={styles.donateButton}>
          <Text style={styles.donateText}>Donate Now</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.eligibilityButton,
            { backgroundColor: isEligible ? "#4caf50" : "#f44336" },
          ]}
        >
          <Text style={styles.eligibilityText}>
            {isEligible ? "Eligible" : "Not Eligible"}
          </Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Nav */}
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fce4ec" },

  header: {
    backgroundColor: "#d32f2f",
    paddingVertical: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
  },
  subText: {
    color: "#fff9",
    fontSize: 16,
    marginTop: 4,
  },

  card: {
    backgroundColor: "#fff",
    margin: 20,
    padding: 20,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 18,
    color: "#333",
    fontWeight: "bold",
    marginBottom: 8,
  },
  timer: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#d32f2f",
  },
  caption: {
    color: "#888",
    fontSize: 14,
    marginBottom: 20,
  },
  donateButton: {
    backgroundColor: "#d32f2f",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 10,
  },
  donateText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  eligibilityButton: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  eligibilityText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },

  navBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 14,
    borderTopWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
  },
  navItem: {
    alignItems: "center",
  },
  navText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
  },
});
