package com.crimson.demo;

import org.springframework.web.bind.annotation.*;
import com.google.api.core.ApiFuture;
import com.google.cloud.firestore.Firestore;
import com.google.cloud.firestore.QuerySnapshot;
import com.google.cloud.firestore.DocumentSnapshot;
import com.google.firebase.cloud.FirestoreClient;
import org.springframework.http.ResponseEntity;
import java.util.concurrent.ExecutionException;
import java.util.List;
import java.util.ArrayList;

@RestController
@RequestMapping("/api/reports")
@CrossOrigin(origins = "*")
public class ReportsController {

    @GetMapping("/all")
    public ResponseEntity<List<ReportResponse>> getAllReports() {
        try {
            Firestore db = FirestoreClient.getFirestore();

            // Fetch all documents from the "reports" collection
            ApiFuture<QuerySnapshot> future = db.collection("reports").get();
            QuerySnapshot querySnapshot = future.get();

            List<ReportResponse> reportList = new ArrayList<>();

            for (DocumentSnapshot document : querySnapshot.getDocuments()) {
                ReportResponse report = document.toObject(ReportResponse.class);
                if (report != null) {
                    reportList.add(report);
                }
            }

            return ResponseEntity.ok(reportList);
        } catch (InterruptedException | ExecutionException e) {
            e.printStackTrace();
            return ResponseEntity.status(500).body(null);
        }
    }
}
