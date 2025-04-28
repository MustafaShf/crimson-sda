import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { UserContext } from "../context/userContext";

export default function NotificationScreen({ navigation }) {
  const [tab, setTab] = useState("received");
  const { user } = useContext(UserContext);
  const { userId } = user || {};
  const [myRequests, setMyRequests] = useState([]);
  const [receivedRequests, setReceivedRequests] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchReceivedRequests = async () => {
      if (!userId) return;
      try {
        const response = await fetch(
          "http://192.168.1.65:8080/api/receivedrequests/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await response.json();
        console.log("Received data:", data); // Log the received data

        // Check if the data is an array or handle null data
        if (Array.isArray(data) && data.length > 0) {
          const formattedData = data.map((item, index) => ({
            id: item.donorId || index.toString(), // fallback id if needed
            name: item.name,
            blood: item.bloodGroup,
            units: "1 Unit", // default unit (you can change if API provides)
            city: "Unknown City", // default, if API doesn’t provide
            distance: "0 Km", // default
            hospital: "Unknown Hospital", // default
            time: new Date(item.timestamp).toLocaleDateString(), // format timestamp nicely
            status: item.status,
          }));
          setReceivedRequests(formattedData);
        } else if (data === null || data == {}) {
          console.error("No data received or data is an empty object");
        } else {
          //console.error("Received data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching received requests:", error);
      }
    };

    const fetchMyRequests = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const response = await fetch(
          "http://192.168.1.65:8080/api/myrequests/get",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ userId }),
          }
        );

        const data = await response.json();
        if (Array.isArray(data)) {
          const formattedData = data.map((item) => ({
            id: item.donorId || item._id, // fallback id if needed
            name: item.name,
            blood: item.bloodGroup,
            units: "1 Unit", // default unit
            city: item.city || "Unknown City", // default if not provided
            distance: item.distance || "0 Km", // default
            hospital: item.hospital || "Unknown Hospital", // default
            time: new Date(item.timestamp).toLocaleDateString(), // formatted timestamp
            status: item.status,
          }));
          setMyRequests(formattedData);
        } else {
          console.error("My requests data is not an array:", data);
        }
      } catch (error) {
        console.error("Error fetching my requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReceivedRequests();
    fetchMyRequests();
  }, [userId]);

  const renderRequest = (item) => (
    <View style={styles.card}>
      <View style={styles.headerRow}>
        <Text style={styles.bloodGroup}>{item.blood}</Text>
        <View style={{ flex: 1, paddingLeft: 10 }}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.details}>{item.city}</Text>
          <Text style={styles.details}>{item.distance}</Text>
          <Text style={styles.details}>{item.hospital}</Text>
          <Text style={styles.time}>Time Limit: {item.time}</Text>
        </View>
        <Feather name="more-vertical" size={18} color="#333" />
      </View>

      {tab === "received" ? (
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.chatButton}>
            <Text style={styles.chatText}>💬 Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptText}>✓ Accept</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.statusRow}>
          {item.status === "pending" ? (
            <>
              <Text style={styles.pending}>⏳ Request pending</Text>
              <TouchableOpacity style={styles.cancelButton}>
                <Text style={styles.cancelText}>✕ Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.accepted}>✔ Request accepted</Text>
              <TouchableOpacity style={styles.infoButton}>
                <Text style={styles.infoText}>👤 Donor Info</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      )}
    </View>
  );

  const requestsToShow = tab === "received" ? receivedRequests : myRequests;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Notification</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>Back</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.tabs}>
        <TouchableOpacity onPress={() => setTab("received")}>
          <Text
            style={[styles.tabText, tab === "received" && styles.activeTab]}
          >
            Received Requests ({receivedRequests.length})
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setTab("my")}>
          <Text style={[styles.tabText, tab === "my" && styles.activeTab]}>
            My Requests ({myRequests.length})
          </Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <ActivityIndicator
          size="large"
          color="#007AFF"
          style={{ marginTop: 20 }}
        />
      ) : (
        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {requestsToShow.map((item) => (
            <View key={item.id}>{renderRequest(item)}</View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F5",
  },
  header: {
    backgroundColor: "#870D25",
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  backButton: {
    color: "white",
    fontSize: 14,
  },
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
    borderBottomWidth: 1,
    borderColor: "#ddd",
  },
  tabText: {
    fontSize: 14,
    paddingVertical: 10,
    color: "#999",
  },
  activeTab: {
    color: "#D2042D",
    borderBottomWidth: 2,
    borderColor: "#D2042D",
  },
  card: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 15,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  bloodGroup: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#D2042D",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  details: {
    fontSize: 12,
    color: "#444",
  },
  time: {
    fontSize: 12,
    color: "green",
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  chatButton: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  chatText: {
    color: "#555",
  },
  acceptButton: {
    backgroundColor: "#D2042D",
    padding: 8,
    borderRadius: 8,
    width: "48%",
    alignItems: "center",
  },
  acceptText: {
    color: "white",
  },
  statusRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    alignItems: "center",
  },
  pending: {
    color: "#F59E0B",
    fontWeight: "600",
    fontSize: 12,
  },
  cancelButton: {
    backgroundColor: "#ddd",
    padding: 8,
    borderRadius: 8,
  },
  cancelText: {
    fontSize: 12,
  },
  accepted: {
    color: "green",
    fontWeight: "600",
    fontSize: 12,
  },
  infoButton: {
    backgroundColor: "#eee",
    padding: 8,
    borderRadius: 8,
  },
  infoText: {
    fontSize: 12,
  },
});
