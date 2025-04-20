import React, { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const questions = [
  { id: 1, question: "Do you have any chronic disease?" },
  { id: 2, question: "Did you get a tattoo in the last 6 months?" },
  { id: 3, question: "Did you donate blood in the last 3 months?" },
];

export default function EligibilityTestScreen({ route, navigation }) {
  const { userData } = route.params;

  const [currentQ, setCurrentQ] = useState(0);
  const [isValid, setIsValid] = useState(true);

  const handleAnswer = (answer) => {
    if (answer === "yes") {
      setIsValid(false);
    }

    if (currentQ + 1 < questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      navigation.navigate("Result", {
        isValid,
        userData,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eligibility Test</Text>

      {/* Progress Indicator */}
      <Text style={styles.progressText}>
        Question {currentQ + 1} of {questions.length}
      </Text>

      {/* Question Box */}
      <View style={styles.questionBox}>
        <Text style={styles.questionText}>{questions[currentQ].question}</Text>
      </View>

      {/* Answer Buttons */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("yes")}
        >
          <Text style={styles.buttonText}>Yes</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => handleAnswer("no")}
        >
          <Text style={styles.buttonText}>No</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff5f5",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#d32f2f",
    marginBottom: 10,
  },
  progressText: {
    fontSize: 16,
    color: "#888",
    marginBottom: 20,
  },
  questionBox: {
    backgroundColor: "#fff",
    borderColor: "#d32f2f",
    borderWidth: 1,
    borderRadius: 12,
    padding: 30,
    width: "100%",
    minHeight: 150,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 30,
    elevation: 3,
  },
  questionText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  button: {
    backgroundColor: "#d32f2f",
    padding: 14,
    borderRadius: 10,
    width: "45%",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
