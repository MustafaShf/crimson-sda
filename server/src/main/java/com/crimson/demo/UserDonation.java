package com.crimson.demo;

public class UserDonation {
    private String name;
    private String location;
    private String timestamp;
    private int totalDonated;

    // Constructor with all fields
    public UserDonation(String name, String location, String timestamp, int totalDonated) {
        this.name = name;
        this.location = location;
        this.timestamp = timestamp;
        this.totalDonated = totalDonated;
    }

    // Getters and setters
    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(String timestamp) {
        this.timestamp = timestamp;
    }

    public int getTotalDonated() {
        return totalDonated;
    }

    public void setTotalDonated(int totalDonated) {
        this.totalDonated = totalDonated;
    }
}
