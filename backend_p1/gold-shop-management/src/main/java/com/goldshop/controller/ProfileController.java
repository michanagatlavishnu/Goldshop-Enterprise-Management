package com.goldshop.controller;

import com.goldshop.entity.Customer;
import com.goldshop.entity.User;
import com.goldshop.repository.CustomerRepository;
import com.goldshop.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/me")
@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:5173}")
public class ProfileController {

    private final UserRepository userRepository;
    private final CustomerRepository customerRepository;
    private final PasswordEncoder passwordEncoder;

    public ProfileController(UserRepository userRepository, CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.customerRepository = customerRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User) {
            return (User) auth.getPrincipal();
        }
        return null;
    }

    @GetMapping
    public ResponseEntity<?> getProfile() {
        User user = getAuthenticatedUser();
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Map<String, Object> profile = new HashMap<>();
        profile.put("id", user.getId());
        profile.put("email", user.getEmail());
        profile.put("name", user.getName());
        profile.put("role", user.getRole());
        profile.put("enabled", user.isEnabled());
        profile.put("memberSince", user.getCreatedAt()); // if exists

        Customer customer = customerRepository.findByUserId(user.getId());
        if (customer != null) {
            profile.put("phone", customer.getPhone());
            profile.put("address", customer.getAddress());
        }

        return ResponseEntity.ok(profile);
    }

    @PutMapping
    public ResponseEntity<?> updateProfile(@RequestBody Map<String, String> updates) {
        User user = getAuthenticatedUser();
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (updates.containsKey("name")) {
            user.setName(updates.get("name"));
            userRepository.save(user);
        }

        Customer customer = customerRepository.findByUserId(user.getId());
        if (customer != null) {
            if (updates.containsKey("phone")) customer.setPhone(updates.get("phone"));
            if (updates.containsKey("address")) customer.setAddress(updates.get("address"));
            if (updates.containsKey("name")) customer.setName(updates.get("name"));
            customerRepository.save(customer);
        }

        return ResponseEntity.ok(getProfile().getBody());
    }

    @PutMapping("/password")
    public ResponseEntity<?> updatePassword(@RequestBody Map<String, String> request) {
        User user = getAuthenticatedUser();
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        String oldPassword = request.get("oldPassword");
        String newPassword = request.get("newPassword");

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("message", "Incorrect old password"));
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userRepository.save(user);
        return ResponseEntity.ok(Map.of("message", "Password updated successfully"));
    }
}
