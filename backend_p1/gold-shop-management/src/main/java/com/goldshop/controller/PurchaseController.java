package com.goldshop.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import com.goldshop.entity.Customer;
import com.goldshop.entity.Purchase;
import com.goldshop.entity.User;
import com.goldshop.entity.UserRole;
import com.goldshop.repository.CustomerRepository;
import com.goldshop.service.PurchaseService;

@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:5173}")
@RestController
@RequestMapping("/purchases")
public class PurchaseController {

    @Autowired
    private PurchaseService service;
    
    @Autowired
    private CustomerRepository customerRepo;

    private User getAuthenticatedUser() {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        if (auth != null && auth.getPrincipal() instanceof User) {
            return (User) auth.getPrincipal();
        }
        return null;
    }

    private Customer getCustomerForUser(User user) {
        return customerRepo.findByUserId(user.getId());
    }

    private boolean isStaffOrAdmin(User user) {
        return user.getRole() == UserRole.ADMIN || user.getRole() == UserRole.MANAGER || user.getRole() == UserRole.STAFF;
    }

    @GetMapping
    public ResponseEntity<List<Purchase>> getAllPurchases() {
        User user = getAuthenticatedUser();
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (isStaffOrAdmin(user)) {
            return ResponseEntity.ok(service.getAllPurchases());
        }

        Customer customer = getCustomerForUser(user);
        if (customer == null) {
            return ResponseEntity.ok(List.of()); // No customer profile yet
        }
        return ResponseEntity.ok(service.getPurchasesByCustomerId(customer.getCustomerId()));
    }

    @PostMapping
    public ResponseEntity<?> savePurchase(@RequestBody Purchase purchase) {
        User user = getAuthenticatedUser();
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        if (isStaffOrAdmin(user)) {
            return ResponseEntity.ok(service.savePurchase(purchase));
        } else {
            Customer customer = getCustomerForUser(user);
            if (customer == null) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).body("No customer profile found.");
            }
            purchase.setCustomerId(customer.getCustomerId());
            purchase.setStatus("PENDING");
            purchase.setPurchaseDate(java.time.LocalDate.now().toString());
            return ResponseEntity.ok(service.savePurchase(purchase));
        }
    }
    
    @GetMapping("/pending")
    public ResponseEntity<List<Purchase>> getPendingBalances() {
        User user = getAuthenticatedUser();
        if (!isStaffOrAdmin(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(service.getPendingBalances());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePurchase(@PathVariable Integer id) {
        User user = getAuthenticatedUser();
        if (!isStaffOrAdmin(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied.");
        }
        service.deletePurchase(id);
        return ResponseEntity.ok("Purchase Deleted Successfully");
    }
    
    @GetMapping("/customer/{name}")
    public ResponseEntity<List<Purchase>> getPurchasesByCustomerName(@PathVariable String name) {
        User user = getAuthenticatedUser();
        if (!isStaffOrAdmin(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
        }
        return ResponseEntity.ok(service.getPurchasesByCustomerName(name));
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<?> getPurchaseById(@PathVariable Integer id) {
        User user = getAuthenticatedUser();
        if (user == null) return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();

        Purchase purchase = service.getPurchaseById(id);
        if (purchase == null) return ResponseEntity.notFound().build();

        if (isStaffOrAdmin(user)) {
            return ResponseEntity.ok(purchase);
        }

        Customer customer = getCustomerForUser(user);
        if (customer == null || !customer.getCustomerId().equals(purchase.getCustomerId())) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied.");
        }

        return ResponseEntity.ok(purchase);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updatePurchase(@PathVariable Integer id, @RequestBody Purchase purchase) {
        User user = getAuthenticatedUser();
        if (!isStaffOrAdmin(user)) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Access denied.");
        }
        purchase.setPurchaseId(id);
        return ResponseEntity.ok(service.savePurchase(purchase));
    }
}
