package com.crimson.demo;

public class FindDonorRequest {
    private String userId;

    // Constructors
    public FindDonorRequest() {}

    public FindDonorRequest(String userId) {
        this.userId = userId;
    }

    // Getter and Setter
    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }
}
