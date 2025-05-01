package com.crimson.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.Timestamp; // ✅ Correct for Firestore `getTimestamp()`

import java.util.*;
import java.util.concurrent.ExecutionException;
import java.text.SimpleDateFormat;

@RestController
@RequestMapping("/api/stats")
@CrossOrigin(origins = "*")
public class StatsController {

    @GetMapping
    public ResponseEntity<Object> getStats() {
        Map<String, Object> response = new HashMap<>();
        Firestore db = FirestoreClient.getFirestore();

        try {
            // 1. Total number of donations
            int totalDonations = db.collection("donations").get().get().size();
            response.put("totalDonations", totalDonations);

            // 2. Total number of active users (requestStatus == false)
            int activeUsers = 0;
            for (DocumentSnapshot doc : db.collection("users").get().get().getDocuments()) {
                Boolean requestStatus = doc.getBoolean("requestStatus");
                if (requestStatus != null && !requestStatus) {
                    activeUsers++;
                }
            }
            response.put("totalActiveUsers", activeUsers);

            // 3. Total pending requests (status == "pending")
            int pendingRequests = 0;
            for (DocumentSnapshot doc : db.collection("requests").get().get().getDocuments()) {
                String status = doc.getString("status");
                if ("pending".equalsIgnoreCase(status)) {
                    pendingRequests++;
                }
            }
            response.put("totalPendingRequests", pendingRequests);

            // 4. Donations per month
            Map<String, Integer> monthlyDonations = new LinkedHashMap<>();
            SimpleDateFormat monthFormat = new SimpleDateFormat("MMM yyyy");

            for (DocumentSnapshot doc : db.collection("donations").get().get().getDocuments()) {
                Object timestampObj = doc.get("timestamp");

                if (timestampObj instanceof Timestamp) {
                    Timestamp ts = (Timestamp) timestampObj;
                    String month = monthFormat.format(ts.toDate());
                    monthlyDonations.put(month, monthlyDonations.getOrDefault(month, 0) + 1);
                } else if (timestampObj instanceof String) {
                    // If string, try to parse it as a date if possible
                    try {
                        Date parsedDate = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSSX")
                                .parse((String) timestampObj);
                        String month = monthFormat.format(parsedDate);
                        monthlyDonations.put(month, monthlyDonations.getOrDefault(month, 0) + 1);
                    } catch (Exception e) {
                        // Handle invalid format if needed
                        System.err.println("Invalid timestamp string: " + timestampObj);
                    }
                }
            }

            response.put("monthlyDonations", monthlyDonations);

            // 5. Donations by blood group
            Map<String, Integer> bloodGroupStats = new HashMap<>();
            for (DocumentSnapshot doc : db.collection("donations").get().get().getDocuments()) {
                String bg = doc.getString("bloodgroup");
                if (bg != null) {
                    bloodGroupStats.put(bg, bloodGroupStats.getOrDefault(bg, 0) + 1);
                }
            }
            response.put("bloodGroupStats", bloodGroupStats);

            // 6. User growth per month
            // 6. User growth per month
            Map<String, Integer> userGrowth = new LinkedHashMap<>();
            SimpleDateFormat firebaseFormat = new SimpleDateFormat("MMM d, yyyy 'at' h:mm:ss a z", Locale.ENGLISH);
            firebaseFormat.setTimeZone(TimeZone.getTimeZone("UTC")); // Match the timezone if necessary

            for (DocumentSnapshot doc : db.collection("users").get().get().getDocuments()) {
                Object createdAt = doc.get("createdAt");

                if (createdAt instanceof Timestamp) {
                    Date date = ((Timestamp) createdAt).toDate();
                    String month = monthFormat.format(date);
                    userGrowth.put(month, userGrowth.getOrDefault(month, 0) + 1);
                } else if (createdAt instanceof String) {
                    try {
                        Date date = firebaseFormat.parse((String) createdAt);
                        String month = monthFormat.format(date);
                        userGrowth.put(month, userGrowth.getOrDefault(month, 0) + 1);
                    } catch (Exception e) {
                        System.err.println("Failed to parse createdAt: " + createdAt);
                    }
                }
            }
            response.put("userGrowth", userGrowth);

            return ResponseEntity.ok(response);

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error fetching stats\"}");
        }
    }
}
