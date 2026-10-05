package com.goldshop.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.goldshop.entity.Ornament;
import com.goldshop.repository.OrnamentRepository;

@Service
public class OrnamentService {

    @Autowired
    private OrnamentRepository repo;

    public List<Ornament> getAllOrnaments() {
        return repo.findAll();
    }

    @Autowired
    private GoldRateService goldRateService;

    private void calculatePrice(Ornament ornament) {
        com.goldshop.entity.GoldRate rate = goldRateService.getRates();
        if (rate != null) {
            double ratePerGram = 0.0;
            if ("24K".equalsIgnoreCase(ornament.getPurity())) ratePerGram = rate.getGold24() / 10.0;
            else if ("22K".equalsIgnoreCase(ornament.getPurity())) ratePerGram = rate.getGold22() / 10.0;
            else if ("18K".equalsIgnoreCase(ornament.getPurity())) ratePerGram = rate.getGold18() / 10.0;

            if (ratePerGram > 0 && ornament.getWeight() != null) {
                double basePrice = ratePerGram * ornament.getWeight();
                double making = ornament.getMakingCharge() != null ? ornament.getMakingCharge() : 0.0;
                ornament.setPrice(basePrice + making);
            }
        }
    }

    public Ornament saveOrnament(Ornament ornament) {
        calculatePrice(ornament);
        return repo.save(ornament);
    }
    public Ornament getOrnamentById(Integer id) {
        return repo.findById(id).orElse(null);
    }
    public List<Ornament> getOrnamentsByCategory(String category) {
        return repo.findByCategory(category);
    }
    public List<Ornament> getLowStockOrnaments() {
        return repo.findByStockAvailableLessThan(3);
    }
    public void deleteOrnament(Integer id) {
        repo.deleteById(id);
    }
    public Ornament updateOrnament(Integer id, Ornament ornament) {
        ornament.setOrnamentId(id);
        calculatePrice(ornament);
        return repo.save(ornament);
    }
}
