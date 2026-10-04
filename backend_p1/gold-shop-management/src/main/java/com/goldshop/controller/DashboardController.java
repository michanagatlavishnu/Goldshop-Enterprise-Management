package com.goldshop.controller;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.goldshop.service.DashboardService;
import com.goldshop.entity.DashboardSummary;

import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:5173}")
@RestController
public class DashboardController {

    @Autowired
    private DashboardService service;

    @GetMapping("/dashboard/customers")
    public long totalCustomers() {
        return service.getTotalCustomers();
    }

    @GetMapping("/dashboard/ornaments")
    public long totalOrnaments() {
        return service.getTotalOrnaments();
    }

   
    @GetMapping("/dashboard/summary")
    public DashboardSummary getSummary() {
        return service.getSummary();
    }
}
