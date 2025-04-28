package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.QueryDocumentSnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.ResponseEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutionException;

@RestController
@RequestMapping("/api/find-donors")
@CrossOrigin(origins = "*")
public class FindDonorController {

    @PostMapping("/search")
    public ResponseEntity<?> findDonors(@RequestBody FindDonorRequest request) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Fetch all donations
            ApiFuture<QuerySnapshot> future = db.collection("donations").get();
            QuerySnapshot querySnapshot = future.get();

            List<Donation> donors = new ArrayList<>();

            for (QueryDocumentSnapshot document : querySnapshot.getDocuments()) {
                Donation donation = document.toObject(Donation.class);

                // Exclude the same user
                if (!donation.getUserId().equals(request.getUserId())) {
                    donors.add(donation);
                }
            }

            return ResponseEntity.ok(donors);

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error fetching donors\"}");
        }
    }

    // New endpoint: Get donation by specific userId
    @PostMapping("/user-details")
    public ResponseEntity<?> findUserDonation(@RequestBody FindDonorRequest request) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Fetch all donations
            ApiFuture<QuerySnapshot> future = db.collection("donations")
                                                .whereEqualTo("userId", request.getUserId())
                                                .get();
            QuerySnapshot querySnapshot = future.get();

            if (!querySnapshot.isEmpty()) {
                // If user donation exists
                Donation donation = querySnapshot.getDocuments().get(0).toObject(Donation.class);
                return ResponseEntity.ok(donation);
            } else {
                // No donation found for this user
                return ResponseEntity.ok(null);
            }

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error fetching user donation\"}");
        }
    }
}
