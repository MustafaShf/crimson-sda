package com.crimson.demo;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import java.util.*;
import java.util.concurrent.ExecutionException;
import com.google.api.core.ApiFuture;


@RestController
@RequestMapping("/api/blacklist")
@CrossOrigin(origins = "*")
public class BlacklistController {

    @PostMapping("/removeUser")
    public ResponseEntity<String> removeAndBlacklistUser(@RequestBody Map<String, String> request) {
        String userEmail = request.get("email");

        if (userEmail == null || userEmail.isEmpty()) {
            return ResponseEntity.badRequest().body("{\"message\": \"Email is required\"}");
        }

        try {
            Firestore db = FirestoreClient.getFirestore();

            // Step 1: Find user by email
            ApiFuture<QuerySnapshot> future = db.collection("users")
                    .whereEqualTo("email", userEmail)
                    .limit(1)
                    .get();

            QuerySnapshot snapshot = future.get();

            if (snapshot.isEmpty()) {
                return ResponseEntity.status(404).body("{\"message\": \"User not found\"}");
            }

            DocumentSnapshot userDoc = snapshot.getDocuments().get(0);
            String userId = userDoc.getId(); // Document ID
            Map<String, Object> userData = userDoc.getData();

            if (userData == null) {
                return ResponseEntity.status(500).body("{\"message\": \"User data is corrupted\"}");
            }

            // Step 2: Add to blacklisted_users collection
            db.collection("blacklisted_users").document(userId).set(userData);

            // Step 3: Add to reported_users collection with timestamp
            Map<String, Object> reportData = new HashMap<>();
            reportData.put("userId", userId);
            reportData.put("email", userEmail);
            reportData.put("reason", "User blacklisted and removed.");
            reportData.put("timestamp", FieldValue.serverTimestamp());

            db.collection("reported_users").add(reportData);

            // Step 4: Delete user from users collection
            db.collection("users").document(userId).delete();

            return ResponseEntity.ok("{\"message\": \"User successfully blacklisted and removed.\"}");

        } catch (ExecutionException | InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Internal server error\"}");
        }
    }
}
