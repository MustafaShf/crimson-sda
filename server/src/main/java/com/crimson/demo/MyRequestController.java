package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.Query;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;

import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/myrequests")
@CrossOrigin(origins = "*")
public class MyRequestController {

    public static class UserIdRequest {
        private String userId;

        // Getter and Setter
        public String getUserId() {
            return userId;
        }

        public void setUserId(String userId) {
            this.userId = userId;
        }
    }

    @PostMapping("/get")
    public ResponseEntity<List<Map<String, Object>>> getMyRequests(@RequestBody UserIdRequest request) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Query where requesterId == userId
            ApiFuture<QuerySnapshot> future = db.collection("requests")
                    .whereEqualTo("requesterId", request.getUserId())
                    .get();

            QuerySnapshot querySnapshot = future.get();

            List<Map<String, Object>> requestList = new ArrayList<>();
            for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                requestList.add(document.getData());
            }

            return ResponseEntity.ok(requestList);

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).build();
        }
    }

    // Cancel request endpoint (new feature)
    @PostMapping("/cancel")
    public ResponseEntity<String> cancelRequest(@RequestBody UserIdRequest request) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Find and delete the request from "requests" collection where donorId ==
            // userId
            ApiFuture<QuerySnapshot> requestFuture = db.collection("requests")
                    .whereEqualTo("donorId", request.getUserId())
                    .get();

            QuerySnapshot requestSnapshot = requestFuture.get();
            for (QueryDocumentSnapshot document : requestSnapshot.getDocuments()) {
                db.collection("requests").document(document.getId()).delete();
            }

            // Find the donation and update the "requested" field to false
            ApiFuture<QuerySnapshot> donationFuture = db.collection("donations")
                    .whereEqualTo("userId", request.getUserId())
                    .get();

            QuerySnapshot donationSnapshot = donationFuture.get();
            for (QueryDocumentSnapshot donationDoc : donationSnapshot.getDocuments()) {
                DocumentReference donationRef = db.collection("donations").document(donationDoc.getId());
                donationRef.update("requested", false);
            }

            return ResponseEntity.ok("Request canceled successfully");

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("Error while canceling the request");
        }
    }
}
