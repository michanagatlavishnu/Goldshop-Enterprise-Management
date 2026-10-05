package com.goldshop.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.goldshop.entity.GoldRate;
import com.goldshop.service.GoldRateService;

@CrossOrigin(origins = "${FRONTEND_URL:http://localhost:5173}")
@RestController
@RequestMapping("/goldrates")
public class GoldRateController {

    @Autowired
    private GoldRateService service;

    @GetMapping
    public GoldRate getRates() {

        return service.getRates();

    }

    @org.springframework.security.access.prepost.PreAuthorize("hasAnyRole('ADMIN', 'MANAGER', 'STAFF')")
    @PutMapping
    public GoldRate updateRates(
            @RequestBody GoldRate goldRate) {
        goldRate.setLastUpdated(java.time.LocalDateTime.now());
        return service.updateRates(goldRate);
    }

}
