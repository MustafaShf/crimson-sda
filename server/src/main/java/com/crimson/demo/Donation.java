package com.crimson.demo;

public class Donation {
    private String donationId;
    private String fullname;
    private int age;
    private String gender;
    private String bloodgroup;
    private String location;
    private int unitsToDonate;
    private String userId;
    private String phone;
    private boolean requested;
    private String timestamp; // <-- ADD THIS

    public Donation() {
        // Empty constructor needed for Firestore
    }

    public Donation(String donationId, String fullname, int age, String gender, String bloodgroup, 
                    String location, int unitsToDonate, String userId, String phone, 
                    boolean requested, String timestamp) {  // <-- UPDATED
        this.donationId = donationId;
        this.fullname = fullname;
        this.age = age;
        this.gender = gender;
        this.bloodgroup = bloodgroup;
        this.location = location;
        this.unitsToDonate = unitsToDonate;
        this.userId = userId;
        this.phone = phone;
        this.requested = requested;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    // (add for timestamp too)

    public String getDonationId() { return donationId; }
    public void setDonationId(String donationId) { this.donationId = donationId; }

    public String getFullname() { return fullname; }
    public void setFullname(String fullname) { this.fullname = fullname; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public String getGender() { return gender; }
    public void setGender(String gender) { this.gender = gender; }

    public String getBloodgroup() { return bloodgroup; }
    public void setBloodgroup(String bloodgroup) { this.bloodgroup = bloodgroup; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public int getUnitsToDonate() { return unitsToDonate; }
    public void setUnitsToDonate(int unitsToDonate) { this.unitsToDonate = unitsToDonate; }

    public String getUserId() { return userId; }
    public void setUserId(String userId) { this.userId = userId; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public boolean isRequested() { return requested; }
    public void setRequested(boolean requested) { this.requested = requested; }

    public String getTimestamp() { return timestamp; }
    public void setTimestamp(String timestamp) { this.timestamp = timestamp; }
}
