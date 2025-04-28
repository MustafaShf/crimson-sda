package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.firebase.cloud.FirestoreClient;
import com.google.cloud.firestore.DocumentReference;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.cloud.firestore.QuerySnapshot;

import org.springframework.http.ResponseEntity;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/requests")
@CrossOrigin(origins = "*")
public class RequestBloodController {

    @PostMapping("/create")
    public ResponseEntity<String> createRequest(@RequestBody RequestBlood requestBlood) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Step 1: Save the request in "requests" collection
            String requestId = UUID.randomUUID().toString();
            ApiFuture<com.google.cloud.firestore.WriteResult> future = db.collection("requests").document(requestId)
                    .set(requestBlood);

            // Wait until write is completed
            future.get();
            System.out.println("Request created with ID: " + requestId + "  ->donorid" + requestBlood.getDonorId());

            // Step 2: Query the donations collection to find documents with the matching
            // userId
            ApiFuture<QuerySnapshot> donationsFuture = db.collection("donations").get();
            QuerySnapshot donationsSnapshot = donationsFuture.get();

            // Step 3: Iterate over each donation document and find the matching userId
            for (QueryDocumentSnapshot document : donationsSnapshot) {
                String userId = document.getString("userId");
                if (userId != null && userId.equals(requestBlood.getDonorId())) {
                    // Step 4: Document found, update the 'request' attribute to true
                    DocumentReference docRef = db.collection("donations").document(document.getId());
                    ApiFuture<com.google.cloud.firestore.WriteResult> updateFuture = docRef.update("requested", true);
                    updateFuture.get(); // Wait for update to complete
                    System.out.println("Updated donation document with userId: " + userId);
                    break; // Exit the loop once the document is updated
                }
            }

            return ResponseEntity.ok("{\"message\": \"Request created and donation updated successfully\"}");

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error processing request\"}");
        }
    }
}
