package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.firebase.cloud.FirestoreClient;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.DocumentSnapshot;
import org.springframework.http.ResponseEntity;

import java.util.UUID;
import java.util.concurrent.ExecutionException;

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

            // Create User object with password included
            User user = new User(
                    userId,
                    registerRequest.getName(),
                    registerRequest.getEmail(),
                    registerRequest.getPassword(), // Save the password
                    registerRequest.getPhone(),
                    registerRequest.getAddress(),
                    registerRequest.getEligibilityStatus());

            // Get Firestore instance
            Firestore db = FirestoreClient.getFirestore();

            // Save user document with userId as the document ID
            db.collection("users").document(userId).set(user);

            System.out.println("User registered: " + userId);

            return ResponseEntity.ok("{\"message\": \"User registered successfully\"}");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body("{\"message\": \"Error during registration\"}");
        }
    }
}
