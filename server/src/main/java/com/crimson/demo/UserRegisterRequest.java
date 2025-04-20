package com.crimson.demo;

public class UserRegisterRequest {
    private String name;
    private String email;
    private String phone;
    private String address;
    private boolean isEligible;

    // Default constructor
    public UserRegisterRequest() {}

    // Getters
    public String getName() {
        return name;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public String getAddress() {
        return address;
    }

    public boolean getIsEligible() {
        return isEligible;
    }

    // Setters
    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setIsEligible(boolean isEligible) {
        this.isEligible = isEligible;
    }
}
