package com.goldshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goldshop.entity.Purchase;
import com.goldshop.repository.PurchaseRepository;

@Service
public class PurchaseService {

    @Autowired
    private PurchaseRepository repo;

    public List<Purchase> getAllPurchases() {
        return repo.findAll();
    }

    public Purchase savePurchase(Purchase purchase) {
        return repo.save(purchase);
    }
    public List<Purchase> getPendingBalances() {
        return repo.findByBalanceAmountGreaterThan(0.0);
    }
    public void deletePurchase(Integer id) {
        repo.deleteById(id);
    }
    public Purchase getPurchaseById(Integer id) {
        return repo.findById(id).orElse(null);
    }
    public List<Purchase> getPurchasesByCustomerName(String name) {
        return repo.findByCustomerName(name);
    }

    public List<Purchase> getPurchasesByCustomerId(Integer customerId) {
        return repo.findByCustomerId(customerId);
    }
}