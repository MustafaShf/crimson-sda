package com.crimson.demo;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api/users") // This is important for route path!
@CrossOrigin(origins = "*")

public class UserController {

    @PostMapping("/login")
    public String loginUser(@RequestBody UserLoginRequest loginRequest) {
        System.out.println("Email: " + loginRequest.getEmail());
        System.out.println("Password: " + loginRequest.getPassword());
        return "{\"message\": \"Login successful\"}";
    }

    @PostMapping("/register")
    public String registerUser(@RequestBody UserRegisterRequest registerRequest) {
        System.out.println("Name: " + registerRequest.getName());
        System.out.println("Email: " + registerRequest.getEmail());
        System.out.println("Phone: " + registerRequest.getPhone());
        System.out.println("Address: " + registerRequest.getAddress());
        System.out.println("Is Eligible: " + registerRequest.getIsEligible());

        return "{\"message\": \"Register successful\"}";
    }

}
