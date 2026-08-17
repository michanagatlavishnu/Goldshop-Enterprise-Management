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

        return repo.findById(1).orElse(null);

    }

    public GoldRate updateRates(
            GoldRate goldRate) {

        goldRate.setId(1);

        return repo.save(goldRate);

    }

}