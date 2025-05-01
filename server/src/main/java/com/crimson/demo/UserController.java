package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import org.springframework.http.ResponseEntity;
import com.google.cloud.Timestamp;
import com.google.cloud.firestore.FieldValue;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    // Login Route
    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody UserLoginRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        System.out.println("Email: " + email);
        System.out.println("Password: " + password);

        try {

            Firestore db = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> future = db.collection("users")
                    .whereEqualTo("email", email)
                    .limit(1)
                    .get();

            QuerySnapshot querySnapshot = future.get();

            // Check if any document exists
            if (!querySnapshot.getDocuments().isEmpty()) {
                // Get the first document
                DocumentSnapshot document = querySnapshot.getDocuments().get(0);

                // Convert document to User object
                User user = document.toObject(User.class);

                // Check if passwords match
                if (user != null && user.getPassword().equals(password)) {
                    // Create JSON manually (excluding password)
                    String responseJson = String.format(
                            "{\"userId\": \"%s\", \"name\": \"%s\", \"email\": \"%s\", \"phone\": \"%s\", \"address\": \"%s\", \"eligibilityStatus\": %b}",
                            user.getUserId(),
                            user.getName(),
                            user.getEmail(),
                            user.getPhone(),
                            user.getAddress(),
                            user.isEligibilityStatus());
                    return ResponseEntity.ok(responseJson);
                } else {
                    // Password doesn't match
                    return ResponseEntity.status(401).body("{\"message\": \"Incorrect password\"}");
                }
            } else {
                // User not found
                return ResponseEntity.status(404).body("{\"message\": \"User not found\"}");
            }
        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error during login\"}");
        }
    }

    // Register Route
    @PostMapping("/register")
    public ResponseEntity<String> registerUser(@RequestBody UserRegisterRequest registerRequest) {
        System.out.println("Name: " + registerRequest.getName());
        System.out.println("Email: " + registerRequest.getEmail());
        System.out.println("Password: " + registerRequest.getPassword());
        System.out.println("Phone: " + registerRequest.getPhone());
        System.out.println("Address: " + registerRequest.getAddress());
        System.out.println("Eligibility Status: " + registerRequest.getEligibilityStatus());

        try {
            // Generate unique user ID
            String userId = UUID.randomUUID().toString();

            // Get Firestore instance
            Firestore db = FirestoreClient.getFirestore();

            // Prepare data map
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("userId", userId);
            userMap.put("name", registerRequest.getName());
            userMap.put("email", registerRequest.getEmail());
            userMap.put("password", registerRequest.getPassword()); // Store hashed in production
            userMap.put("phone", registerRequest.getPhone());
            userMap.put("address", registerRequest.getAddress());
            userMap.put("eligibilityStatus", registerRequest.getEligibilityStatus());
            userMap.put("createdAt", FieldValue.serverTimestamp()); // Add timestamp here

            // Save user document with userId as document ID
            db.collection("users").document(userId).set(userMap);

            System.out.println("User registered: " + userId);

            return ResponseEntity.ok("{\"message\": \"User registered successfully\"}");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error during registration\"}");
        }
    }

    // Get User Info by userId
    @GetMapping("/{userId}")
    public ResponseEntity<String> getUserById(@PathVariable String userId) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Fetch the document using userId
            DocumentSnapshot document = db.collection("users").document(userId).get().get();

            if (document.exists()) {
                User user = document.toObject(User.class);

                if (user != null) {
                    String responseJson = String.format(
                            "{\"userId\": \"%s\", \"name\": \"%s\", \"email\": \"%s\", \"phone\": \"%s\", \"address\": \"%s\", \"eligibilityStatus\": %b}",
                            user.getUserId(),
                            user.getName(),
                            user.getEmail(),
                            user.getPhone(),
                            user.getAddress(),
                            user.isEligibilityStatus());
                    return ResponseEntity.ok(responseJson);
                } else {
                    return ResponseEntity.status(404).body("{\"message\": \"User data is corrupted\"}");
                }
            } else {
                return ResponseEntity.status(404).body("{\"message\": \"User not found\"}");
            }

        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error fetching user\"}");
        }
    }

    @PostMapping("/report")
    public ResponseEntity<String> reportUser(@RequestBody UserReportRequest reportRequest) {
        String reporterId = reportRequest.getReporterId();
        String reportedUserId = reportRequest.getReportedUserId();
        String reason = reportRequest.getReason();
        String description = reportRequest.getDescription();

        try {
            Firestore db = FirestoreClient.getFirestore();

            // Fetch reporter user data
            DocumentSnapshot reporterDoc = db.collection("users").document(reporterId).get().get();
            if (!reporterDoc.exists()) {
                return ResponseEntity.status(404).body("{\"message\": \"Reporter not found\"}");
            }
            User reporter = reporterDoc.toObject(User.class);

            // Fetch reported user data
            DocumentSnapshot reportedUserDoc = db.collection("users").document(reportedUserId).get().get();
            if (!reportedUserDoc.exists()) {
                return ResponseEntity.status(404).body("{\"message\": \"Reported user not found\"}");
            }
            User reportedUser = reportedUserDoc.toObject(User.class);

            // Check if a report already exists with the same reporterId and reportedUserId
            ApiFuture<QuerySnapshot> existingReportsFuture = db.collection("reports")
                    .whereEqualTo("reporterId", reporterId)
                    .whereEqualTo("reportedUserId", reportedUserId)
                    .get();

            List<QueryDocumentSnapshot> existingReports = existingReportsFuture.get().getDocuments();
            if (!existingReports.isEmpty()) {
                return ResponseEntity.status(400).body("{\"message\": \"You have already reported this user.\"}");
            }

            // Prepare report data
            Map<String, Object> reportData = new HashMap<>();
            reportData.put("reporterId", reporterId);
            reportData.put("reportedUserId", reportedUserId);
            reportData.put("reportReason", reason);
            reportData.put("reportDescription", description != null ? description : "");
            reportData.put("reporterName", reporter.getName());
            reportData.put("reporterEmail", reporter.getEmail());
            reportData.put("reportedUserName", reportedUser.getName());
            reportData.put("reportedUserEmail", reportedUser.getEmail());

            // Add new report
            db.collection("reports").add(reportData);

            return ResponseEntity.ok("{\"message\": \"Report submitted successfully\"}");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error submitting report\"}");
        }
    }

    @PostMapping("/reportedUsers")
    public ResponseEntity<Object> getReportedUsers(@RequestBody Map<String, String> request) {
        String reporterId = request.get("reporterId");

        try {
            Firestore db = FirestoreClient.getFirestore();

            ApiFuture<QuerySnapshot> future = db.collection("reports")
                    .whereEqualTo("reporterId", reporterId)
                    .get();

            QuerySnapshot querySnapshot = future.get();

            // Create a response list of reported user IDs
            List<Map<String, String>> reportedUsers = new ArrayList<>();
            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                String reportedUserId = document.getString("reportedUserId");

                Map<String, String> reported = new HashMap<>();
                reported.put("reportedUserId", reportedUserId);
                reportedUsers.add(reported);
            }

            return ResponseEntity.ok(reportedUsers);

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error fetching reported users\"}");
        }
    }

}
