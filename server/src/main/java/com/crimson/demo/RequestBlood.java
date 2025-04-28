package com.crimson.demo;

public class RequestBlood {
    private String requesterId;
    private String donorId;
    private String bloodGroup;
    private String name;
    private String gender;
    private String status;
    private String timestamp;

    // Empty constructor for Firestore
    public RequestBlood() {}

    // Constructor with all fields
    public RequestBlood(String requesterId, String donorId, String bloodGroup, String name, String gender, String status, String timestamp) {
        this.requesterId = requesterId;
        this.donorId = donorId;
        this.bloodGroup = bloodGroup;
        this.name = name;
        this.gender = gender;
        this.status = status;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public String getRequesterId() { return requesterId; }
    public void setRequesterId(String requesterId) { this.requesterId = requesterId; }

    public String getDonorId() { return donorId; }
    public void setDonorId(String donorId) { this.donorId = donorId; }

    public String getBloodGroup() { return bloodGroup; }
    public void setBloodGroup(String bloodGroup) { this.bloodGroup = bloodGroup; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
