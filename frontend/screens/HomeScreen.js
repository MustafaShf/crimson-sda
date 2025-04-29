import React, { useState, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import ChecklistCard from "./ChecklistCard";
import BloodTypeChart from "./BloodTypeChart";
import { UserContext } from "../context/userContext";

export default function HomeScreen({ navigation }) {
  const { user } = useContext(UserContext);
  const { name, email, phone, address, eligibilityStatus } = user || {};

  const [currentMonth, setCurrentMonth] = useState(new Date());

  const generateCalendarDays = () => {
    const daysInMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      currentMonth.getFullYear(),
      currentMonth.getMonth(),
      1
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push({ day: "", empty: true });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ day: i, empty: false });
    }

    return days;
  };

  const changeMonth = (direction) => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(currentMonth.getMonth() + direction);
    setCurrentMonth(newMonth);
  };

  const calendarDays = generateCalendarDays();
  const monthYearString = currentMonth.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const eligibilityMessage = eligibilityStatus
    ? "You're eligible to Donate"
    : "You're not eligible to Donate";

  const eligibilityButtonColor = eligibilityStatus ? "#539A77" : "#808080";

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Days Until Next Donation:</Text>
        <Text style={styles.countdown}>
          <Text style={styles.countNum}>3</Text> :{" "}
          <Text style={styles.countNum}>07</Text>
        </Text>
        <Text style={styles.unitLabel}>Months Days</Text>

        <TouchableOpacity
          style={[
            styles.eligibilityButton,
            { backgroundColor: eligibilityButtonColor },
          ]}
        >
          <Text style={styles.eligibilityText}>{eligibilityMessage}</Text>
        </TouchableOpacity>

        <View style={styles.topRightIcons}>
          <TouchableOpacity onPress={() => navigation.navigate("Chat")}>
            <Feather
              name="message-square"
              size={20}
              color="white"
              style={{ marginLeft: 12, marginTop: 15 }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Notification")}>
            <Feather
              name="bell"
              size={20}
              color="white"
              style={{ marginLeft: 12, marginTop: 15 }}
            />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.circleSmall} />
      <View style={styles.circleMedium} />
      <View style={styles.circleLarge} />
      <View style={[styles.circleSmall, { top: 40, right: 80 }]} />
      <View style={[styles.circleMedium, { bottom: 20, left: 60 }]} />

      <ScrollView style={styles.calendarContainer}>
        {/* Calendar only shows if eligibilityStatus is true */}
        {eligibilityStatus && (
          <View style={styles.calendarCard}>
            <View style={styles.calendarHeader}>
              <TouchableOpacity onPress={() => changeMonth(-1)}>
                <Feather name="chevron-left" size={24} color="#870D25" />
              </TouchableOpacity>
              <Text style={styles.monthYearText}>{monthYearString}</Text>
              <TouchableOpacity onPress={() => changeMonth(1)}>
                <Feather name="chevron-right" size={24} color="#870D25" />
              </TouchableOpacity>
            </View>

            <View style={styles.weekdaysRow}>
              {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day, index) => (
                <Text key={index} style={styles.weekdayText}>
                  {day}
                </Text>
              ))}
            </View>

            <View style={styles.calendarGrid}>
              {calendarDays.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.calendarDay,
                    item.empty ? styles.emptyDay : null,
                    item.day === 15 ? styles.currentDay : null,
                    item.day === 20 ? styles.donationDay : null,
                  ]}
                  disabled={item.empty}
                >
                  <Text
                    style={[
                      styles.dayText,
                      item.day === 15 ? styles.currentDayText : null,
                      item.day === 20 ? styles.donationDayText : null,
                    ]}
                  >
                    {item.day}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            <View style={styles.legendContainer}>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#870D25" }]}
                />
                <Text style={styles.legendText}>Donation Day</Text>
              </View>
              <View style={styles.legendItem}>
                <View
                  style={[styles.legendDot, { backgroundColor: "#539A77" }]}
                />
                <Text style={styles.legendText}>Today</Text>
              </View>
            </View>
          </View>
        )}

        {/* These components will always show */}
        <ChecklistCard />
        <BloodTypeChart />
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Home")}
        >
          <Feather name="home" size={22} color="#D2042D" />
          <Text style={[styles.tabText, { color: "#D2042D" }]}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("FindDonor")}
        >
          <Feather name="search" size={22} color="#111" />
          <Text style={styles.tabText}>Find Donor</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() => navigation.navigate("Request")}
        >
          <Feather name="droplet" size={22} color="#111" />
          <Text style={styles.tabText}>Request</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.tabItem}
          onPress={() =>
            navigation.navigate("Profile", {
              name: name,
              email: email,
            })
          }
        >
          <Feather name="user" size={22} color="#111" />
          <Text style={styles.tabText}>Profile</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// Styles part remains the same (no need to change your existing styles)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
    justifyContent: "space-between",
  },
  header: {
    backgroundColor: "#870D25",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 20,
    alignItems: "center",
    position: "relative",
  },
  headerTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  countdown: {
    fontSize: 32,
    color: "white",
    fontWeight: "bold",
  },
  countNum: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
  },
  unitLabel: {
    color: "white",
    fontSize: 12,
    marginTop: 2,
    letterSpacing: 1,
  },
  circleSmall: {
    position: "absolute",
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "rgba(255, 102, 128, 0.4)",
    top: 30,
    left: 30,
  },
  circleMedium: {
    position: "absolute",
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(255, 102, 128, 0.25)",
    top: 70,
    right: 60,
  },
  circleLarge: {
    position: "absolute",
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "rgba(255, 102, 128, 0.15)",
    top: 90,
    right: 20,
  },
  eligibilityButton: {
    marginTop: 16,
    backgroundColor: "#539A77",
    paddingVertical: 10,
    paddingHorizontal: 35,
    borderRadius: 30,
  },
  eligibilityText: {
    color: "white",
    fontWeight: "bold",
  },
  topRightIcons: {
    position: "absolute",
    top: 30,
    right: 20,
    flexDirection: "row",
  },
  calendarContainer: {
    flex: 1,
    paddingHorizontal: 15,
  },
  calendarCard: {
    backgroundColor: "white",
    borderRadius: 15,
    padding: 12,
    marginVertical: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  calendarHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  monthYearText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  weekdaysRow: {
    flexDirection: "row",
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 5,
  },
  weekdayText: {
    flex: 1,
    textAlign: "center",
    color: "#666",
    fontWeight: "bold",
  },
  calendarGrid: {
    flexWrap: "wrap",
    flexDirection: "row",
  },
  calendarDay: {
    width: "14.28%",
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 4,
    borderRadius: 6,
  },
  emptyDay: {
    backgroundColor: "transparent",
  },
  currentDay: {
    backgroundColor: "#539A77",
  },
  donationDay: {
    backgroundColor: "#870D25",
  },
  dayText: {
    color: "#333",
    fontWeight: "bold",
  },
  currentDayText: {
    color: "white",
  },
  donationDayText: {
    color: "white",
  },
  legendContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  legendItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 5,
  },
  legendText: {
    fontSize: 12,
    color: "#333",
  },
  tabBar: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  tabItem: {
    alignItems: "center",
  },
  tabText: {
    fontSize: 10,
    color: "#444",
    marginTop: 4,
  },
});
