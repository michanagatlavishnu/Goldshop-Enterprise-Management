package com.goldshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goldshop.entity.DashboardSummary;
import com.goldshop.repository.CustomerRepository;
import com.goldshop.repository.OrnamentRepository;
import com.goldshop.repository.PurchaseRepository;
import com.goldshop.repository.UserRepository;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@Service
public class DashboardService {

    @Autowired
    private CustomerRepository customerRepo;

    @Autowired
    private OrnamentRepository ornamentRepo;

    @Autowired
    private PurchaseRepository purchaseRepo;

    @Autowired
    private UserRepository userRepo;

    public long getTotalCustomers() {
        return customerRepo.count();
    }

    public long getTotalOrnaments() {
        return ornamentRepo.count();
    }

    public long getTotalPurchases() {
        return purchaseRepo.count();
    }

    public DashboardSummary getSummary() {
        DashboardSummary summary = new DashboardSummary();

        summary.setTotalCustomers(customerRepo.count());
        summary.setTotalOrnaments(ornamentRepo.count());
        summary.setPendingPayments(purchaseRepo.countByBalanceAmountGreaterThan(0.0));
        summary.setClearedPurchases(purchaseRepo.countByBalanceAmountEquals(0.0));
        summary.setTotalUsers(userRepo.count());
        summary.setTotalPurchases(purchaseRepo.count());

        Double rev = purchaseRepo.getTotalRevenue();
        summary.setTotalRevenue(rev != null ? rev : 0.0);

        String todayStr = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy-MM-dd"));
        Double today = purchaseRepo.getTodaysSales(todayStr);
        summary.setTodaysSales(today != null ? today : 0.0);

        return summary;
    }
}