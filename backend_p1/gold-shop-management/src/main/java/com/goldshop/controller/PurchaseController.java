package com.goldshop.controller;

import java.util.List;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.goldshop.entity.Purchase;
import com.goldshop.service.PurchaseService;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/purchases")
public class PurchaseController {

    @Autowired
    private PurchaseService service;

    @GetMapping
    public List<Purchase> getAllPurchases() {
        return service.getAllPurchases();
    }

    @PostMapping
    public Purchase savePurchase(@RequestBody Purchase purchase) {
        return service.savePurchase(purchase);
    }
    @GetMapping("/pending")
    public List<Purchase> getPendingBalances() {
        return service.getPendingBalances();
    }
    @DeleteMapping("/{id}")
    public String deletePurchase(@PathVariable Integer id) {

        service.deletePurchase(id);

        return "Purchase Deleted Successfully";
    }
    @GetMapping("/customer/{name}")
    public List<Purchase> getPurchasesByCustomerName(
            @PathVariable String name) {

        return service
                .getPurchasesByCustomerName(name);
    }
    @GetMapping("/{id}")
    public Purchase getPurchaseById(
            @PathVariable Integer id) {

        return service.getPurchaseById(id);
    }

    @PutMapping("/{id}")
    public Purchase updatePurchase(
            @PathVariable Integer id,
            @RequestBody Purchase purchase) {

        purchase.setPurchaseId(id);

        return service.savePurchase(purchase);
    }
}