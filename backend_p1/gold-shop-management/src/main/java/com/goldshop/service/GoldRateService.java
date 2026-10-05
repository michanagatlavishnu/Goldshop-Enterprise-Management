package com.goldshop.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goldshop.entity.GoldRate;
import com.goldshop.repository.GoldRateRepository;

@Service
public class GoldRateService {

    @Autowired
    private GoldRateRepository repo;

    public GoldRate getRates() {
        return repo.findAll().stream().findFirst().orElse(null);
    }

    @Autowired
    private com.goldshop.repository.OrnamentRepository ornamentRepo;

    public GoldRate updateRates(GoldRate goldRate) {
        GoldRate existing = getRates();
        if (existing != null) {
            goldRate.setId(existing.getId());
        }
        GoldRate savedRate = repo.save(goldRate);

        // Update all ornament prices
        java.util.List<com.goldshop.entity.Ornament> ornaments = ornamentRepo.findAll();
        for (com.goldshop.entity.Ornament o : ornaments) {
            double ratePerGram = 0.0;
            if ("24K".equalsIgnoreCase(o.getPurity())) ratePerGram = savedRate.getGold24() / 10.0;
            else if ("22K".equalsIgnoreCase(o.getPurity())) ratePerGram = savedRate.getGold22() / 10.0;
            else if ("18K".equalsIgnoreCase(o.getPurity())) ratePerGram = savedRate.getGold18() / 10.0;

            if (ratePerGram > 0 && o.getWeight() != null) {
                double basePrice = ratePerGram * o.getWeight();
                double making = o.getMakingCharge() != null ? o.getMakingCharge() : 0.0;
                o.setPrice(basePrice + making);
                ornamentRepo.save(o);
            }
        }
        return savedRate;
    }

}