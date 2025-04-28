package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.ResponseEntity;

import java.util.UUID;
import java.util.concurrent.ExecutionException;
import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/donations")
@CrossOrigin(origins = "*")
public class DonateNowController {

    @PostMapping("/create")
    public ResponseEntity<String> createDonation(@RequestBody DonationRequest donationRequest) {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Check if a donation already exists with this userId
            ApiFuture<QuerySnapshot> future = db.collection("donations")
                    .whereEqualTo("userId", donationRequest.getUserId())
                    .limit(1)
                    .get();

            QuerySnapshot querySnapshot = future.get();

            if (!querySnapshot.isEmpty()) {
                // Existing donation found
                DocumentSnapshot existingDoc = querySnapshot.getDocuments().get(0);
                Donation existingDonation = existingDoc.toObject(Donation.class);

                if (existingDonation != null) {
                    // Check if blood groups match
                    if (existingDonation.getBloodgroup().equalsIgnoreCase(donationRequest.getBloodgroup())) {
                        // Update unitsToDonate (add new units)
                        int updatedUnits = existingDonation.getUnitsToDonate() + donationRequest.getUnitsToDonate();
                        existingDoc.getReference().update("unitsToDonate", updatedUnits);

                        System.out.println("Donation updated for userId: " + donationRequest.getUserId());
                        return ResponseEntity.ok("{\"message\": \"Donation updated successfully\"}");
                    } else {
                        // Blood group mismatch
                        return ResponseEntity.status(400)
                                .body("{\"message\": \"Blood group mismatch for existing donation\"}");
                    }
                } else {
                    return ResponseEntity.status(500).body("{\"message\": \"Error fetching existing donation\"}");
                }
            } else {
                // No existing donation, create a new one
                String donationId = UUID.randomUUID().toString();

                // Now include the 'requested' field
                Donation donation = new Donation(
                        donationId,
                        donationRequest.getFullname(),
                        donationRequest.getAge(),
                        donationRequest.getGender(),
                        donationRequest.getBloodgroup(),
                        donationRequest.getLocation(),
                        donationRequest.getUnitsToDonate(),
                        donationRequest.getUserId(),
                        donationRequest.getPhone(),
                        donationRequest.isRequested(), // requested
                        donationRequest.getTimestamp() // <-- timestamp
                );

                db.collection("donations").document(donationId).set(donation);

                System.out.println("Donation created: " + donationId);
                return ResponseEntity.ok("{\"message\": \"Donation created successfully\"}");
            }

        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error during donation creation\"}");
        }
    }

    @GetMapping("/leaderboard")
    public ResponseEntity<List<UserDonation>> getLeaderboard() {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Query all donations from Firestore
            ApiFuture<QuerySnapshot> future = db.collection("donations").get();
            QuerySnapshot querySnapshot = future.get();

            // Map to hold the aggregated data for each user
            Map<String, UserDonation> leaderboard = new HashMap<>();

            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                Donation donation = document.toObject(Donation.class);

                if (donation != null) {
                    String userId = donation.getUserId();
                    int unitsToDonate = donation.getUnitsToDonate();

                    // Aggregate donation data by userId
                    if (leaderboard.containsKey(userId)) {
                        UserDonation userDonation = leaderboard.get(userId);
                        userDonation.setTotalDonated(userDonation.getTotalDonated() + unitsToDonate);
                    } else {
                        // If user not found in leaderboard, add new entry
                        leaderboard.put(userId, new UserDonation(
                                donation.getFullname(),
                                donation.getLocation(),
                                donation.getTimestamp(),
                                unitsToDonate));
                    }
                }
            }

            // Convert map to list to return the leaderboard
            List<UserDonation> leaderboardList = new ArrayList<>(leaderboard.values());

            // Sort leaderboard by total donated units
            leaderboardList.sort((d1, d2) -> Integer.compare(d2.getTotalDonated(), d1.getTotalDonated()));

            return ResponseEntity.ok(leaderboardList);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
