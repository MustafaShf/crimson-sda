package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;

import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/receivedrequests")
@CrossOrigin(origins = "*")
public class ReceivedRequestController {

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
    public ResponseEntity<List<Map<String, Object>>> getReceivedRequests(@RequestBody UserIdRequest request) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Query where donorId == userId
            ApiFuture<QuerySnapshot> future = db.collection("requests")
                    .whereEqualTo("donorId", request.getUserId())
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
}
