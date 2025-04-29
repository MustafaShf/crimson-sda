package com.crimson.demo;

import org.springframework.web.bind.annotation.*;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.*;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.ResponseEntity;

import java.util.Map;
import java.util.Set;
import java.util.concurrent.ExecutionException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;

@RestController
@RequestMapping("/api/acceptedrequests")
@CrossOrigin(origins = "*")
public class AcceptedRequestController {

    public static class AcceptRequestBody {
        private String donorId;
        private String requesterId;

        // Getters and Setters
        public String getDonorId() {
            return donorId;
        }

        public void setDonorId(String donorId) {
            this.donorId = donorId;
        }

        public String getRequesterId() {
            return requesterId;
        }

        public void setRequesterId(String requesterId) {
            this.requesterId = requesterId;
        }
    }

    @PostMapping("/accept")
    public ResponseEntity<String> acceptRequest(@RequestBody AcceptRequestBody requestBody) {
        Firestore db = FirestoreClient.getFirestore();

        try {
            // Step 1: Find the matching request document
            ApiFuture<QuerySnapshot> future = db.collection("requests")
                    .whereEqualTo("donorId", requestBody.getDonorId())
                    .whereEqualTo("requesterId", requestBody.getRequesterId())
                    .get();

            QuerySnapshot requestSnapshot = future.get();
            List<QueryDocumentSnapshot> documents = requestSnapshot.getDocuments();

            if (documents.isEmpty()) {
                return ResponseEntity.status(404).body("No matching request found");
            }

            QueryDocumentSnapshot matchedRequest = documents.get(0); // assuming one match
            String recipientId = matchedRequest.getString("requesterId");

            // Delete the matched request
            db.collection("requests").document(matchedRequest.getId()).delete();

            // Step 2: Get donor data
            DocumentSnapshot donorSnapshot = db.collection("users").document(requestBody.getDonorId()).get().get();
            String donorName = donorSnapshot.getString("name");
            String donorLocation = donorSnapshot.getString("address");
            String donorPhone = donorSnapshot.getString("phone");

            // Step 3: Get recipient data using the extracted recipientId
            DocumentSnapshot recipientSnapshot = db.collection("users").document(recipientId).get().get();
            String recipientName = recipientSnapshot.getString("name");
            String recipientLocation = recipientSnapshot.getString("address");
            String recipientPhone = recipientSnapshot.getString("phone");

            // Step 4: Add to acceptedrequests collection
            Map<String, Object> acceptedRequestData = new HashMap<>();
            acceptedRequestData.put("donorId", requestBody.getDonorId());
            acceptedRequestData.put("recipientId", recipientId);
            acceptedRequestData.put("donorName", donorName);
            acceptedRequestData.put("recipientName", recipientName);
            acceptedRequestData.put("donorLocation", donorLocation);
            acceptedRequestData.put("recipientLocation", recipientLocation);
            acceptedRequestData.put("donorPhone", donorPhone);
            acceptedRequestData.put("recipientPhone", recipientPhone);

            System.out.println(acceptedRequestData);

            db.collection("acceptedrequests").add(acceptedRequestData);

            return ResponseEntity.ok("Request accepted and added to acceptedrequests");

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error occurred while accepting the request");
        }
    }

    @GetMapping("/matched-users/{userId}")
    public ResponseEntity<?> getMatchedUsers(@PathVariable String userId) {
        Firestore db = FirestoreClient.getFirestore();

        try {
            ApiFuture<QuerySnapshot> future = db.collection("acceptedrequests").get();
            List<QueryDocumentSnapshot> documents = future.get().getDocuments();

            Set<String> addedUserIds = new HashSet<>();
            List<Map<String, Object>> matchedUsers = new ArrayList<>();

            for (QueryDocumentSnapshot doc : documents) {
                String donorId = doc.getString("donorId");
                String recipientId = doc.getString("recipientId");

                if (userId.equals(donorId)) {
                    // User is donor
                    if (!addedUserIds.contains(recipientId)) {
                        Map<String, Object> userMap = new HashMap<>();
                        userMap.put("name", doc.getString("recipientName"));
                        userMap.put("location", doc.getString("recipientLocation"));
                        userMap.put("phone", doc.getString("recipientPhone"));
                        userMap.put("userId", recipientId);
                        matchedUsers.add(userMap);
                        addedUserIds.add(recipientId);
                    }
                } else if (userId.equals(recipientId)) {
                    // User is recipient
                    if (!addedUserIds.contains(donorId)) {
                        Map<String, Object> userMap = new HashMap<>();
                        userMap.put("name", doc.getString("donorName"));
                        userMap.put("location", doc.getString("donorLocation"));
                        userMap.put("phone", doc.getString("donorPhone"));
                        userMap.put("userId", donorId);
                        matchedUsers.add(userMap);
                        addedUserIds.add(donorId);
                    }
                }
            }

            return ResponseEntity.ok(matchedUsers);

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error fetching matched users");
        }
    }

}
